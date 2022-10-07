FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

# CMD ["npm", "run", "dev"]
 CMD ["npm", "start"]

