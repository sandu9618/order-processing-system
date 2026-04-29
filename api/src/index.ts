import "dotenv/config";
import express from "express";
import orderRoutes from "./routes/order.route";
import productRoutes from "./routes/product.route";
import { connectRabbitMQ } from "./lib/rabbitmq";
import redis from "./lib/redis";

const app = express();

app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectRabbitMQ();
  await redis.connect();
  await redis.ping();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Database URL:", process.env.DATABASE_URL);
  });
}

startServer();

export default app;