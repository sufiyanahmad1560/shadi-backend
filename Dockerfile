FROM node:alpine as base

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]