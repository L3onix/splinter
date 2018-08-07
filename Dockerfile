FROM node:alpine

WORKDIR /root/.webs-pev

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9000

CMD [ "npm", "start"]