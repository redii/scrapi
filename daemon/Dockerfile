FROM node:16.15.1-alpine

ENV DATABASE_URL "file:/scrapi/data/db.sqlite"
ENV FILES_PATH "/scrapi/data/files"

COPY . /scrapi
WORKDIR /scrapi/daemon
RUN npm install
RUN npx prisma generate

CMD node index.mjs