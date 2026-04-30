import { getChannel } from "../lib/rabbitmq";
import redis from "../lib/redis";
import { prisma } from "../../../packages/db/src/client";

interface CreateOrderInput {
  customerId: string;
  productId: string;
  quantity: number;
}

export const createOrder = async (data: CreateOrderInput) => {
  const order = await prisma.order.create({
    data: {
      customerId: data.customerId,
      productId: data.productId,
      quantity: data.quantity,
      status: "queued",
    },
  });
  //Save to redis
  redis.set(`order:${order.id}`, JSON.stringify(order.status));

  //Enqueue order for processing
  getChannel().sendToQueue("orders", Buffer.from(JSON.stringify({ orderId: order.id })), { persistent: true });
  return order;
}

export const getOrderStatus = async (orderId: string) => {
  const cachedStatus = await redis.get(`order:${orderId}`);
  console.log("Cached status for order ID", orderId, ":", cachedStatus);
  if (cachedStatus) {
    return JSON.parse(cachedStatus);
  }
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  // Cache the status in Redis
  redis.set(`order:${orderId}`, order.status);
  return order.status;
}
