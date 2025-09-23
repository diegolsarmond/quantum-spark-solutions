# Quantum Tecnologia – Frontend

Esta pasta contém a Single Page Application institucional construída com **React 18**, **TypeScript**, **Vite** e **Tailwind CSS** (com componentes do shadcn/ui).

## Requisitos

- Node.js 18+ (recomendado Node 20)
- npm (ou outro gerenciador compatível)

## Como rodar localmente

```bash
cd frontend
npm install
npm run dev
```

O servidor de desenvolvimento roda em `http://localhost:5173` por padrão.

## Scripts úteis

| Comando            | Descrição                              |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Inicia o Vite em modo desenvolvimento. |
| `npm run build`    | Gera o build de produção em `dist/`.   |
| `npm run build:dev`| Build em modo development (útil p/ QA).|
| `npm run preview`  | Serve localmente o build gerado.       |
| `npm run lint`     | Executa o ESLint com as regras do projeto. |

## Deploy com Docker

O `Dockerfile` agora vive dentro deste diretório. Para gerar a imagem de produção:

```bash
cd frontend
docker build -t quantum-spark-frontend .
docker run -p 8080:80 quantum-spark-frontend
```

A imagem resultante usa Apache para servir os arquivos estáticos e respeita o `.htaccess` presente em `public/.htaccess`.

## Variáveis de ambiente

Opcionalmente você pode criar um arquivo `.env` com valores específicos para build/execução:

```bash
VITE_GOOGLE_ANALYTICS_ID=your-ga-id-here
VITE_CONTACT_EMAIL=contato@quantumtecnologia.com.br
VITE_CONTACT_PHONE=5531993054200
```

## Backend

O painel administrativo consome a API disponível em [`../backend`](../backend/). Certifique-se de que as URLs e credenciais estejam alinhadas entre os projetos.
