ARG NODE_VERSION=20-bookworm
ARG PW_VERSION=v1.46.1

FROM node:${NODE_VERSION} AS BASE

WORKDIR /app

COPY . /app

FROM base 

ENV NODE_ENV true
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN npm i
RUN npx playwright install --with-deps

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

ADD https://astral.sh/uv/install.sh /uv-installer.sh

RUN sh /uv-installer.sh && rm /uv-installer.sh

ENV PATH="/root/.cargo/bin/:$PATH"

RUN uv python install 3.12
