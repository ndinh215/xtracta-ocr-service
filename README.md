## Description

This is Xtracta API platform for Xtracta Application by employing NestJS.

## How to install

```bash
$ yarn install
```

## How to run

```bash
# Development
$ yarn run start

# Watch mode
$ yarn run start:dev

# Production mode
$ yarn run start:prod
```
Service link: http://localhost:3000

## How to test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# Test coverage
$ yarn run test:cov
```

## How to build docker
#### Build docker for microservices (Traefik and api)
Add the following entries to your /etc/hosts file:
```
127.0.0.1       xtracta.local
127.0.0.1       api.xtracta.local
```
Run command:
```bash
$ docker-compose -f ./docker-compose.microservices.yml up --build
```
Traefik admin link: http://localhost:80

Service link: http://api.xtracta.local

#### Build docker for api only
```
$ docker-compose up --build
```
Service link: http://localhost:3000
