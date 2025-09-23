# Quantum Tecnologia – Backend

API administrativa construída com **Node.js**, **Express**, **Prisma ORM** e **TypeScript**. Ela expõe rotas autenticadas sob `/api/admin/*` para login/logout, gerenciamento de posts de blog e serviços exibidos no site.

## Requisitos

- Node.js 20+
- Banco PostgreSQL acessível via `DATABASE_URL`

## Configuração de ambiente

1. Crie um arquivo `.env` a partir do template fornecido:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Ajuste as variáveis conforme sua infraestrutura:

   ```env
   DATABASE_URL=postgres://postgres:C@104rm0nd1994@base-de-dados_postgres:5432/QuantumTecnologia?sslmode=disable
   JWT_SECRET=uma-chave-super-secreta
   CORS_ALLOWED_ORIGINS=http://localhost:3000,https://quantumtecnologia.com.br
   ```

   > As migrações criam e utilizam o schema `site_quantum` dentro do banco `QuantumTecnologia`.

## Scripts disponíveis

```bash
cd backend
npm install

# Desenvolvimento com recarga automática
npm run dev

# Build de produção
npm run build
npm run start

# Executar testes
npm test

# Aplicar migrações Prisma
npm run migrate
```

## Banco de dados

- As migrations Prisma residem em [`prisma/migrations`](prisma/migrations).
- `npm run migrate` executa `prisma migrate deploy`, garantindo a criação do schema `site_quantum` e tabelas relacionadas a usuários admin, posts e serviços.

## Estrutura principal

- `src/app.ts`: configuração do servidor Express (middlewares, rotas, erros).
- `src/routes`: definição das rotas (auth, blog, serviços).
- `src/middleware`: middlewares de autenticação JWT, validação e tratamento de erros.
- `src/__tests__`: testes com Jest/Supertest cobrindo login e operações CRUD.

Certifique-se de alinhar o `BASE_URL` utilizado pelo frontend com o endpoint exposto por esta API.
