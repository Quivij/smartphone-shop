FROM node:18-alpine

WORKDIR /SMARTPHONE-SHOP1/backend

COPY package*.json ./

RUN npm install
RUN npm install -g @babel/core @babel/cli @babel/preset-env

COPY . .

RUN npm run build-src

CMD [ "npm","run","build" ]
# # Chạy server từ file đã biên dịch
# CMD ["node", "build/server.js"]
#docker build --tag smartphone-shop-backend1 .
#docker run -p 3001:3001 -d smartphone-shop-backend1