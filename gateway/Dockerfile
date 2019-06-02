FROM node:8

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install
RUN npm install -g express-gateway 

COPY . /usr/src/app

CMD ["npm", "start"]

