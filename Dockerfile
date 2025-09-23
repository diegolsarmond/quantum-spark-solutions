# syntax=docker/dockerfile:1

# Stage 1: install dependencies for the frontend build
FROM node:20-bullseye-slim AS deps
WORKDIR /app

# Copy only the package manifests from the frontend project
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Stage 2: build the React application
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ ./

RUN npm run build

# Stage 3: serve the built assets with Apache
FROM httpd:2.4 AS runner

# Allow the SPA to handle client-side routes and respect custom .htaccess rules
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
COPY frontend/public/.htaccess /usr/local/apache2/htdocs/.htaccess

EXPOSE 80

CMD ["httpd-foreground"]
