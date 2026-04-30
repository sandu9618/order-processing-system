import "dotenv/config";
import { connectRedis } from "./lib/redis";
import { createRabbitChannel } from "./lib/rabbitmq";
import { consumeOrders } from "./consumers/order.consumer";

async function startWorker() {
  try {
    console.log("Worker starting...");
    console.log("DB URL:", process.env.DATABASE_URL);

    await connectRedis();
    console.log("Redis connected");

    const { channel } = await createRabbitChannel();
    console.log("RabbitMQ connected");

    consumeOrders(channel);

    console.log("Waiting for messages...");
  } catch (err) {
    console.error("Worker failed to start:", err);
    process.exit(1);
  }
}

startWorker();