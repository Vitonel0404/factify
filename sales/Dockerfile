FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3005

CMD ["npm", "run", "start:dev"]