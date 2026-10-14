# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiamos la build generada de Vite a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos la configuración de Nginx para soportar React Router (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 (o mapearlo a 5173 en compose)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
