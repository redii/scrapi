FROM node:16.15.1-alpine

# Enviroment Variables
ENV ORIGIN "http://localhost:3000"
ENV NODE_ENV "production"
ENV DATABASE_URL "file:/data/db.sqlite"
ENV VITE_FILES_PATH "/data/files"

# Build SvelteKit App
COPY . /app
WORKDIR /app
RUN npm install
RUN npx prisma migrate deploy
RUN npm run build

CMD node build
