FROM node:16.15.1-alpine

# Enviroment Variables
ENV DATABASE_URL "file:/scrapi/data/db.sqlite"
ENV FILES_PATH "/scrapi/data/files"

# Setup Daemon
COPY . /scrapi
WORKDIR /scrapi/daemon
RUN npm install
RUN npx prisma generate

CMD node index.mjs