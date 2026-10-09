FROM node:24

WORKDIR /app

COPY package*.json ./

RUN ["npm", "install"]

COPY index.js ./

CMD ["npm", "run", "start"]
