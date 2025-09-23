# Quantum Spark Solutions

Este repositório abriga dois projetos independentes que antes conviviam na mesma raiz. Agora cada um deles vive em um diretório dedicado para facilitar a publicação em repositórios separados ou pipelines distintas.

## Estrutura

- [`frontend/`](frontend/) – Single Page Application construída com React, Vite, Tailwind CSS e shadcn/ui. Consulte o [`frontend/README.md`](frontend/README.md) para instruções de desenvolvimento, build e deploy.
- [`backend/`](backend/) – API administrativa escrita em Node.js + Express com Prisma ORM, responsável por autenticação e CRUD do painel admin. Veja o [`backend/README.md`](backend/README.md) para configurar ambiente, banco de dados e testes.

## Separando em repositórios distintos

Se desejar publicar cada parte em um repositório git próprio, você pode usar `git subtree` (disponível em qualquer instalação Git recente):

```bash
git subtree split --prefix frontend -b extract-frontend
git remote add frontend-origin <url-do-repositorio-frontend>
git push frontend-origin extract-frontend:main

# Repita para o backend, se necessário
git subtree split --prefix backend -b extract-backend
git remote add backend-origin <url-do-repositorio-backend>
git push backend-origin extract-backend:main
```

Outra alternativa é utilizar [`git filter-repo`](https://github.com/newren/git-filter-repo) para gerar um histórico enxuto apenas com os arquivos desejados.

## Desenvolvimento local rápido

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

Cada subprojeto mantém suas próprias dependências, scripts e ferramentas de lint/teste.
