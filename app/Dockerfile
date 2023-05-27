FROM node:18

WORKDIR /app/aplicativo

COPY ./app .

RUN npm ci

COPY ./shared ../shared

RUN npm --prefix ../shared install ../shared

EXPOSE 3000

CMD npm  start
