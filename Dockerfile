ARG NODE_VERSION=20-bookworm
ARG PW_VERSION=v1.46.1
ARG OS=jammy

FROM node:${NODE_VERSION} AS BASE
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


FROM base 

ENV NODE_ENV true
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN pnpm i
RUN pnpm exec playwright install --with-deps
