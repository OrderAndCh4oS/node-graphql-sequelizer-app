FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g ts-node
RUN npm install -g nodemon

RUN npm install

COPY . .

CMD [ "ts-node",  "index.js"]
