FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g express-gateway 

CMD ["npm", "start"]

