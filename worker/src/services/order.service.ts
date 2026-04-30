
import { redis } from '../lib/redis';
import { prisma } from "../../../packages/db/src/client";

export async function setOrderStatus(orderId: string, status: string) {
  console.log(`Setting status for order ${orderId} to ${status}`);
  await redis.set(`order:${orderId}`, 
    JSON.stringify(status),
    { EX: 60 * 60 });

  console.log('Order status set to', status);

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}