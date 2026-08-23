FROM node:24.18.0-alpine AS build

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

CMD ["yarn", "dev", "--host", "0.0.0.0"]

