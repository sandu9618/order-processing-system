import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const product = await productService.createProduct({ name, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const seedProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.seedProducts();
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to seed products" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  console.log("DB URL:", process.env.DATABASE_URL);
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// export const getProductById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const product = await productService.getProductById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// };