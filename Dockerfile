# Этап 1: Общий builder для установки зависимостей
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn config set cache-folder /root/.yarn && \
    yarn install --frozen-lockfile --network-timeout 600000

COPY . .
RUN yarn build

# Этап 2: Продакшен
FROM node:22-alpine AS prod

WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]

# Этап 3: Dev-режим
FROM node:22-alpine AS dev

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /root/.yarn /root/.yarn
COPY . .

EXPOSE 8081

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "8081"]