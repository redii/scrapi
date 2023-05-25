FROM node:16.15.1-alpine

# Enviroment Variables
ENV DATABASE_URL "file:/data/db.sqlite"
ENV FILES_PATH "/data/files"

# Setup Daemon
COPY . /app
WORKDIR /app/daemon
RUN npm install

CMD node index.mjs