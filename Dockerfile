# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM httpd:2.4 AS runner

# Enable .htaccess overrides so SPA routing and MIME settings apply
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]
