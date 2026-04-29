
import { redis } from '../lib/redis';
import { prisma } from "../../../prisma/client";

export async function setOrderStatus(orderId: string, status: string) {
  await redis.set(`
    order:${orderId}`, 
    JSON.stringify({orderId, status, updatedAt: Date.now()}),
    { EX: 60 * 60 });

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}