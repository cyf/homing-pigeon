# server

## Installation

```bash
$ pnpm i
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```
## Endpoint

### Swagger

GET: `http://127.0.0.1:3001/api`

### WebSocket

~~`ws`: `ws://127.0.0.1:3001/ws`~~

`socket-io`: `http://127.0.0.1:3001/ws`

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## Known issues

1. [In @WebSocketGateway, I18nContext.current() returns undefined.](https://github.com/toonvanstrijp/nestjs-i18n/issues/568)
2. ~~[ERROR [WsExceptionsHandler] Cannot read properties of undefined (reading 'logIn')](https://github.com/nestjs/nest/issues/12195)~~
