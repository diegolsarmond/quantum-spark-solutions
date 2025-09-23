# Quantum Tecnologia - Website

Site institucional da Quantum Tecnologia - empresa especializada em soluções de IA, automações empresariais e CRM para advogados.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework de CSS utilitário
- **Vite** - Build tool moderna e rápida
- **Shadcn/ui** - Componentes UI reutilizáveis
- **Lucide React** - Ícones modernos

## 📦 Deploy - Easypanel

### Pré-requisitos
- Node.js 18+ 
- Npm ou Yarn

### Configuração para Produção

1. **Clone o repositório**
```bash
git clone <repository-url>
cd quantum-tecnologia
```

2. **Instale as dependências**
```bash
npm install
```

3. **Build para produção**
```bash
npm run build
```

4. **Preview do build (opcional)**
```bash
npm run preview
```

### Deploy no Easypanel

1. **Conecte o repositório** ao Easypanel
2. **Configure as variáveis de ambiente** (se necessário)
3. **Defina o comando de build**: `npm run build`
4. **Defina o diretório de build**: `dist`
5. **Configure o servidor** para servir uma SPA (Single Page Application)

### Deploy com Docker

Crie a imagem de produção utilizando o `Dockerfile` disponível no projeto. O build gera os arquivos estáticos com o Vite e um servidor Apache configurado para respeitar o `.htaccess`.

```bash
docker build -t quantum-spark-solutions .
docker run -p 8080:80 quantum-spark-solutions
```

### Configuração do Servidor

Para servir corretamente a aplicação React em produção, certifique-se de que o servidor:
- Redireciona todas as rotas para `index.html`
- Serve os arquivos estáticos da pasta `dist`
- Define os MIME types corretos para `.js` e `.css`

O arquivo `public/.htaccess` já está configurado para servidores Apache.

### Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` para configurações específicas:

```env
VITE_GOOGLE_ANALYTICS_ID=your-ga-id-here
VITE_CONTACT_EMAIL=contato@quantumtecnologia.com.br
VITE_CONTACT_PHONE=5531993054200
```

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
