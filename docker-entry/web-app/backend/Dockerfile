FROM node:24

WORKDIR /app

COPY package*.json ./

# RUN: docker build のときに実行するコマンド。結果はイメージに含まれる
RUN ["npm", "install"]

COPY index.js ./

# CMD: docker run でコンテナが起動したときに実行するコマンド
CMD ["npm", "run", "start"]
