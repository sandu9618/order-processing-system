import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  const { customerId, items } = req.body;
  try {
    const order = await orderService.createOrder({ customerId, orderItems: items });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
}

export const getOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const status = await orderService.getOrderStatus(String(id));
    res.status(200).json({ status });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order status" });
  }
}