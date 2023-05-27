The idea here is practice my docker, docker network skills and rabbitmq too.

This project is a delivery app backend simulation. The customer request an order `(app folder)` and app comunicates to
order microservice `(order folder)` that create an order and returns back (webhook) to app (something like "this order is confirmed").

Maybe it isn't the best microservice architeture or something like but the main idea here is just practice.

## Requirements
    Docker

## Run
    docker compose up

## Run project endpoint
After run the project execute execute `curl -X POST http://localhost:3333/orders/request` in your terminal
