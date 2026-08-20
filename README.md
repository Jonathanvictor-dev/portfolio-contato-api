# Portfolio Contato API

API REST para gerenciamento de mensagens de contato, com autenticação JWT e sessões persistidas no banco de dados.

## Projeto Relacionado

Esta API é utilizada no portfólio para:

- Receber mensagens enviadas pelo formulário de contato
- Permitir autenticação administrativa
- Gerenciar mensagens recebidas
- Gerenciar e-mails bloqueados

Repositório Frontend:
https://github.com/jonathanvictor-dev/portfolio-frontend

## Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- bcrypt
- JWT

## Funcionalidades

### Públicas

- Envio de mensagens de contato
- Impedimento de mensagens enviadas por e-mails bloqueados

### Administrativas

- Login, logout e alteração de senha
- Sessões persistidas e invalidadas no logout
- Listagem, visualização, leitura e exclusão de mensagens
- Bloqueio e desbloqueio de e-mails com motivo

## Entidades

### User

| Campo | Tipo |
| --- | --- |
| id | String (UUID) |
| email | String |
| password | String |
| createdAt | DateTime |
| updatedAt | DateTime |

### AuthSession

| Campo | Tipo |
| --- | --- |
| id | String (UUID) |
| userId | String (UUID) |
| token | String |
| expiresAt | DateTime |
| createdAt | DateTime |

### Message

| Campo | Tipo |
| --- | --- |
| id | String (UUID) |
| name | String |
| email | String |
| content | String |
| createdAt | DateTime |
| read | MessageRead? |

### MessageRead

| Campo | Tipo |
| --- | --- |
| id | String (UUID) |
| messageId | String (UUID) |
| readAt | DateTime |

### BlockedEmail

| Campo | Tipo |
| --- | --- |
| id | String (UUID) |
| email | String |
| reason | String |
| createdAt | DateTime |

## Configuração

Crie o arquivo `.env` com as variáveis abaixo:

```env
PORT=3004
DATABASE_URL="postgresql://usuario:senha@localhost:5432/portfolio_api"
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=Admin@123
JWT_SECRET=sua-chave-secreta-aqui
```

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta da aplicação |
| `DATABASE_URL` | Conexão com PostgreSQL |
| `ADMIN_EMAIL` | E-mail do administrador criado pelo seed |
| `ADMIN_PASSWORD` | Senha inicial do administrador |
| `JWT_SECRET` | Chave usada para assinar e validar JWTs |

## Executar localmente

Pré-requisitos: Node.js 18+ e PostgreSQL 12+.

```bash
# Instala as dependências do projeto
npm install

# Aplica as migrations no banco de dados local
npx prisma migrate dev

# Cria o usuário administrador inicial
npm run seed

# Inicia a API em modo de desenvolvimento
npm run dev
```

O servidor inicia em `http://localhost:3004`.

## Autenticação

Faça login para receber o token:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@admin.com",
  "password": "Admin@123"
}
```

Cada login cria uma sessão ativa em `AuthSession`. Rotas protegidas aceitam apenas tokens JWT válidos, não expirados e cuja sessão ainda exista no banco.

Envie o token nas rotas protegidas:

```http
Authorization: Bearer <token>
```

O token expira em 24 horas. O logout remove a sessão e invalida o token imediatamente:

```http
POST /auth/logout
Authorization: Bearer <token>
```

Se a sessão não existir ou tiver expirado, faça login novamente.

## Endpoints

### Autenticação

| Método | Rota | Protegida |
| --- | --- | --- |
| POST | `/auth/login` | Não |
| POST | `/auth/logout` | Sim |
| PATCH | `/auth/password` | Sim |

### Mensagens

| Método | Rota | Protegida |
| --- | --- | --- |
| POST | `/messages` | Não |
| GET | `/messages` | Sim |
| GET | `/messages/:id` | Sim |
| PATCH | `/messages/:id/read` | Sim |
| DELETE | `/messages/:id` | Sim |

### E-mails bloqueados

| Método | Rota | Protegida |
| --- | --- | --- |
| POST | `/blocked-emails` | Sim |
| GET | `/blocked-emails` | Sim |
| DELETE | `/blocked-emails/:email` | Sim |

Para bloquear um e-mail, envie o motivo no corpo da requisição:

```http
POST /blocked-emails
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "email@exemplo.com",
  "reason": "Mensagens indevidas"
}
```

Para desbloquear, passe o e-mail como path parameter. O caractere `@` pode ser usado diretamente:

```http
DELETE /blocked-emails/email@exemplo.com
Authorization: Bearer <token>
```

## Executar em produção

```bash
# Instala as dependências conforme package-lock.json
npm ci

# Aplica as migrations já existentes no banco de produção
npx prisma migrate deploy

# Cria o usuário administrador inicial, se necessário
npm run seed

# Gera a versão de produção em dist/
npm run build

# Inicia a versão compilada
npm start
```
