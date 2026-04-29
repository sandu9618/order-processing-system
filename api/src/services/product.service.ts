interface CreateProductInput {
  name: string;
  price: number;
}

import { products } from "../db/seed";
import { prisma } from "../../../prisma/client";

export const createProduct = async (data: CreateProductInput) => {
  return prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
    },
  });
};

export const seedProducts = async () => {
  const allproducts = products;
  return await Promise.all(
    allproducts.map((product) => prisma.product.create({ data: product })));
}

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};