import "dotenv/config";
import express from "express";
import orderRoutes from "./routes/order.route";
import productRoutes from "./routes/product.route";

const app = express();

app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Database URL:", process.env.DATABASE_URL);
});

export default app;