FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
RUN npm install -g yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]