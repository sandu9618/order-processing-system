import { getChannel } from "../lib/rabbitmq";
import redis from "../lib/redis";
import { prisma } from "../prisma/client";

interface OrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderInput {
  customerId: string;
  orderItems: OrderItemInput[];
}

export const createOrder = async (data: CreateOrderInput) => {
  const order = await prisma.order.create({
    data: {
      customerId: data.customerId,
      status: "queued",
    },
  });
  await Promise.all(data.orderItems.map(item => {
    return prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      },
    });
  }));
  //Save to redis
  redis.set(`order:${order.id}`, JSON.stringify(order.status));

  //Enqueue order for processing
  getChannel().sendToQueue("order_queue", Buffer.from(order.id), { persistent: true });
  return order;
}

export const getOrderStatus = async (orderId: string) => {
  const cachedStatus = await redis.get(`order:${orderId}`);
  if (cachedStatus) {
    return cachedStatus;
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