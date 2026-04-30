import { prisma } from "../../../packages/db/src/client";

export const createCustomer = async (name: string, email: string) => {
  const customer = await prisma.customer.create({
    data: {
      name,
      email,
    },
  });
  return customer;
}