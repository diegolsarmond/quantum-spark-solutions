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
# Build de produção
npm run build
npm run start

# Executar a suíte de testes
npm test

# Atualizar o cliente Prisma gerado
npm run prisma:generate

```

### Banco de Dados e Migrações

- As migrações Prisma estão em [`backend/prisma/migrations`](./backend/prisma/migrations).
- Para criar o schema `site_quantum` e as tabelas necessárias, execute:

```bash
cd backend
npm install
npm run dev
```

Cada subprojeto mantém suas próprias dependências, scripts e ferramentas de lint/teste.
> O comando aplica as migrações e executa `prisma generate` automaticamente para manter o cliente Prisma sincronizado.


As tabelas incluem usuários administradores, posts de blog, serviços e tokens de sessão. Ajuste a string de conexão (`DATABASE_URL`) para apontar para o banco desejado antes de rodar o comando.

### Configurações Adicionais

1. **Google Analytics**: Descomente e configure o ID no `index.html`
2. **Domínio**: Configure seu domínio personalizado no Easypanel
3. **SSL**: Ative o certificado SSL automático
4. **CDN**: Configure cache para assets estáticos

### Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Verificação de código

### SEO e Performance

✅ Meta tags configuradas
✅ Open Graph tags
✅ Sitemap (robots.txt)
✅ Lazy loading de imagens
✅ Compressão de assets
✅ Fontes otimizadas (Google Fonts)

### Contato

**Quantum Tecnologia**
- 📧 contato@quantumtecnologia.com.br
- 📱 (31) 99305-4200
- 📍 R. Antônio de Albuquerque, 330 - Sala 901, Savassi - Belo Horizonte, MG

---

Desenvolvido com ❤️ pela equipe Quantum Tecnologia
