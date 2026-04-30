import { Router } from "express";
import * as customerController from "../controllers/customer.controller";

const router = Router();
router.post("/", customerController.createCustomer);
router.get("/", customerController.getAllCustomers);

export default router;