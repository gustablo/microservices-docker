FROM node:18

WORKDIR /app/pedidos

COPY ./order .

RUN npm ci

COPY ./shared ../shared

RUN npm --prefix ../shared install ../shared

CMD npm  start
