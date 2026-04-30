FROM node:22-alpine

WORKDIR /app

COPY . .

WORKDIR /app/api
RUN npm install

WORKDIR /app/packages/db
RUN npm install

RUN npx prisma generate --schema=prisma/schema.prisma

WORKDIR /app/api

EXPOSE 3000

CMD ["sh", "-c", "cd /app/packages/db && npx prisma migrate deploy && cd /app/api && npm run dev"]