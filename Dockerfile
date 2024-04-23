FROM node:lts-alpine3.19

RUN apk add busybox-extras

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

COPY docker/start-app /usr/local/bin/start-app
RUN chmod +x /usr/local/bin/start-app

ENTRYPOINT [ "start-app" ]
