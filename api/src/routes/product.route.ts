import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.post("/seed", productController.seedProducts);
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

export default router;