import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  const { customerId, items } = req.body;
  try {
    const order = await orderService.createOrder({ customerId, items });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
}