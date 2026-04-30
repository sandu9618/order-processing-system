import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  const { customerId, productId, quantity = 1 } = req.body;
  console.log("Received order request:", { customerId, productId, quantity });
  try {
    const order = await orderService.createOrder({
      customerId,
      productId,
      quantity: Number(quantity),
    });
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
}

export const getOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Fetching status for order ID:", id);
  try {
    const status = await orderService.getOrderStatus(String(id));
    res.status(200).json({ status });
  } catch (err) {
    console.error("Error fetching order status:", err);
    res.status(500).json({ error: "Failed to fetch order status" });
  }
}