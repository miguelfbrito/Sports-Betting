FROM node:8

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install
RUN npm install nodemon -g

COPY . /usr/src/app

# Change to npm start for deploy
CMD ["nodemon"]

