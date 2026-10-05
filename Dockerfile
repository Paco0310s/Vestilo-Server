# Etapa 1: Construcción (Builder)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

# Recibimos el puerto como argumento de construcción (default 3000)
ARG PORT=3000
ENV PORT=${PORT}

# Exponemos el puerto de forma dinámica
EXPOSE ${PORT}

CMD ["node", "dist/main"]