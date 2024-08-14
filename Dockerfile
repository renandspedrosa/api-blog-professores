FROM node:18-slim

workdir /app

COPY package.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]