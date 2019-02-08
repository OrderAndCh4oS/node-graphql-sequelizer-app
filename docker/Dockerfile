FROM node:10

WORKDIR /usr/app

COPY ./app .

RUN apt-get update
RUN apt-get install -y build-essential

RUN npm update
RUN npm install -g ts-node
RUN npm install -g nodemon
RUN npm install -g typescript
RUN npm install -g node-pre-gyp
RUN npm install
RUN npm audit --fix

CMD [ "ts-node",  "./src/server.js"]
