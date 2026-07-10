export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
}
