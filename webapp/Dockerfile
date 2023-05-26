FROM node:16.15.1-alpine

# Enviroment Variables
ENV ORIGIN "http://localhost:3000"
ENV DATABASE_URL "file:/scrapi/data/db.sqlite"
ENV VITE_FILES_PATH "/scrapi/data/files"

# Build SvelteKit App
COPY . /scrapi
WORKDIR /scrapi/webapp
RUN npx prisma migrate deploy
RUN npx prisma db seed
RUN npm install
RUN npm run build

CMD node build
