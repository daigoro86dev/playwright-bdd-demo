ARG PW_VERSION=v1.46.1-jammy

FROM mcr.microsoft.com/playwright:${PW_VERSION} AS base

WORKDIR /app

COPY . /app

FROM base

RUN npm install -g pnpm

ADD https://astral.sh/uv/install.sh /uv-installer.sh

RUN sh /uv-installer.sh && rm /uv-installer.sh

ENV PATH="/root/.cargo/bin/:$PATH"

RUN uv python install 3.12

RUN uv tool install trcli
