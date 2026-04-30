FROM node:22-alpine

WORKDIR /app

COPY order-frontend .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]