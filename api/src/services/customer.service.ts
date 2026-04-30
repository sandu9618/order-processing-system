import { prisma } from "../../../prisma/client";

export const createCustomer = async (name: string, email: string) => {
  const customer = await prisma.customer.create({
    data: {
      name,
      email,
    },
  });
  return customer;
}