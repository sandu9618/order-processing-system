FROM node:22-alpine

WORKDIR /app

COPY . .

WORKDIR /app/worker
RUN npm install

WORKDIR /app/packages/db
RUN npm install

RUN npx prisma generate --schema=prisma/schema.prisma

WORKDIR /app/worker

CMD ["sh", "-c", "cd /app/packages/db && npx prisma migrate deploy && cd /app/worker && npm run worker"]