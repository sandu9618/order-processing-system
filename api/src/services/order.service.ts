import { prisma } from "../prisma/client";

interface CreateOrderInput {
  customerId: string;
  items: any;
}

export const createOrder = async (data: CreateOrderInput) => {
  return prisma.order.create({
    data: {
      customerId: data.customerId,
      items: data.items,
    },
  });
}