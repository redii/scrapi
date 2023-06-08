FROM node:16.15.1-alpine

ENV ORIGIN "http://localhost:3000"
ENV DATABASE_URL "file:/scrapi/data/db.sqlite"
ENV VITE_FILES_PATH "/scrapi/data/files"

# Build SvelteKit App
COPY . /scrapi
WORKDIR /scrapi/webapp
RUN npm install
RUN npx prisma generate
RUN npm run build

RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]