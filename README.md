# Portfolio Contato API

API REST para gerenciamento de mensagens de contato com autenticação JWT.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- bcrypt
- JWT

## ✨ Funcionalidades

**Pública:**
- Envio de mensagens
- Validação de emails bloqueados

**Administrativa (com JWT):**
- Login e alteração de senha
- Listagem e visualização de mensagens
- Marcação de leitura e exclusão
- Bloqueio e desbloqueio de emails

## 📊 Entidades

### User
| Campo | Tipo |
|-------|------|
| id | String (UUID) |
| email | String |
| password | String |
| createdAt | DateTime |
| updatedAt | DateTime |

### Message
| Campo | Tipo |
|-------|------|
| id | String (UUID) |
| name | String |
| email | String |
| content | String |
| createdAt | DateTime |
| read | MessageRead? |

### MessageRead
| Campo | Tipo |
|-------|------|
| id | String (UUID) |
| messageId | String (UUID) |
| readAt | DateTime |

### BlockedEmail
| Campo | Tipo |
|-------|------|
| id | String (UUID) |
| email | String |
| createdAt | DateTime |

## 📁 Estrutura do Projeto

```
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── lib/
│   └── prisma.ts
├── types/
├── app.ts
└── server.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

## 🔧 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
PORT=3004
DATABASE_URL="postgresql://usuario:senha@localhost:5432/portfolio_api"
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=Admin@123
JWT_SECRET=sua-chave-secreta-aqui
```

| Variável | Descrição |
|----------|-----------|
| PORT | Porta da aplicação |
| DATABASE_URL | Conexão PostgreSQL |
| ADMIN_EMAIL | Email do admin (seed) |
| ADMIN_PASSWORD | Senha do admin (seed) |
| JWT_SECRET | Chave secreta JWT |

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js (v18+)
- PostgreSQL (v12+)

### Passo a Passo

1. **Clonar repositório**
```bash
git clone <url-do-repositorio>
cd portfolio-contato-api
```

2. **Instalar dependências**
```bash
npm install
```

3. **Criar banco de dados**
```bash
createdb portfolio_api
```

4. **Configurar variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

5. **Executar migrations**
```bash
npx prisma migrate dev
```

6. **Executar seed (criar admin)**
```bash
npm run seed
```

7. **Iniciar servidor**
```bash
npm run dev
```

Servidor rodando em: `http://localhost:3004`

## 🔌 Endpoints

### Autenticação
```
POST   /auth/login
PATCH  /auth/password
```

### Mensagens
```
POST   /messages
GET    /messages
GET    /messages/:id
PATCH  /messages/:id/read
DELETE /messages/:id
```

### Emails Bloqueados
```
POST   /blocked-emails
GET    /blocked-emails
DELETE /blocked-emails/:id
```

## 📜 Scripts

```bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Build para produção
npm start        # Iniciar produção
npm run seed     # Executar seed
```

## 🔒 Autenticação

Endpoints protegidos requerem token JWT:

```
Authorization: Bearer <token>
```

Tokens expiram em 24 horas.

## 📄 Licença

ISC

### 7. Iniciar aplicação

```bash
npm run dev
```

## Usuário Administrador

O administrador é criado automaticamente através do seed utilizando os valores configurados em:

```env
ADMIN_EMAIL
ADMIN_PASSWORD
```

Após o primeiro acesso, recomenda-se alterar a senha.

## Scripts

```bash
npm run dev
```

Executa a aplicação em ambiente de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run seed
```

Cria o usuário administrador inicial.
