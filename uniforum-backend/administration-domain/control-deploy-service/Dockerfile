# Etapa de construcción (opcional, aquí solo instalamos dependencias)
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json si tienes
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Puerto que exponemos
EXPOSE 8040

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
