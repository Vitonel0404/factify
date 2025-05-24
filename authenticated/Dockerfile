FROM node:18-alpine

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto (package.json y package-lock.json/yarn.lock)
COPY package*.json ./

RUN npm install 


COPY . .


RUN npm run build

EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]