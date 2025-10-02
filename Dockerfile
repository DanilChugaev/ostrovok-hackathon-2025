# Этап 1: Общий builder для установки зависимостей
FROM --platform=linux/amd64 node:22.12.0-alpine3.20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache curl && \
    yarn config set cache-folder /root/.yarn && \
    yarn install --frozen-lockfile --network-timeout 600000

COPY . .
RUN yarn build

# Этап 2: Продакшен
FROM --platform=linux/amd64 node:22.12.0-alpine3.20 AS prod

WORKDIR /app

RUN apk add --no-cache curl && \
    yarn global add serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Этап 3: Dev-режим
FROM --platform=linux/amd64 node:22.12.0-alpine3.20 AS dev

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /root/.yarn /root/.yarn
COPY . .

EXPOSE 8081

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8081/health || exit 1

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "8081"]