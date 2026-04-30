import * as customerService from "../services/customer.service";
import { Request, Response } from "express";

export const createCustomer = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const customer = await customerService.createCustomer(name, email);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer" });
  }
};
