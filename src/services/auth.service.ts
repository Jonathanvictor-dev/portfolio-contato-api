import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository';
import * as authSessionRepository from '../repositories/auth-session.repository';
import { LoginRequest, ChangePasswordRequest, TokenPayload } from '../types/auth.types';

const jwtSecret = process.env.JWT_SECRET || 'chave-secreta-padrao';
const tokenExpiration = '24h';

export async function login(data: LoginRequest): Promise<{ token: string }> {
  const user = await userRepository.findUserByEmail(data.email);

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email } as TokenPayload,
    jwtSecret,
    { expiresIn: tokenExpiration }
  );

  const decoded = jwt.decode(token);

  if (typeof decoded !== 'object' || !decoded?.exp) {
    throw new Error('Não foi possível criar a sessão');
  }

  await authSessionRepository.createAuthSession(
    user.id,
    token,
    new Date(decoded.exp * 1000)
  );

  return { token };
}

export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  const user = await userRepository.findUserById(data.userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordMatch = await bcrypt.compare(
    data.currentPassword,
    user.password
  );

  if (!passwordMatch) {
    throw new Error('Senha atual incorreta');
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  await userRepository.updateUser(data.userId, {
    password: hashedPassword,
  });
}

export async function logout(token: string): Promise<void> {
  await authSessionRepository.deleteAuthSession(token);
}
