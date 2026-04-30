import { useEffect, useState } from "react";
import type { Order } from "../types/order";
import { createOrder, fetchProducts, getOrderStatus } from "../api/orders.api";
import ProductList from "../components/ProductList";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
  };

  const handleOrder = async (productId: string) => {
    const res = await createOrder("c83a7263-3d47-45dd-88db-47fdf1cbac1a", productId, 1);

    const newOrder = {
      id: res.id,
      productId,
      customerId: "c83a7263-3d47-45dd-88db-47fdf1cbac1a",
      quantity: 1,
      status: "queued",
    };

    setOrders((prev) => [...prev, newOrder]);

    startPolling(res.id);
  };

   const startPolling = (orderId: string) => {
    const interval = setInterval(async () => {
      const data = await getOrderStatus(orderId);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: data.status } : o
        )
      );
      console.log("Polled status for order ID", orderId, ":", data);

      if (data.status === "completed" || data.status === "failed") {
        clearInterval(interval);
      }
    }, 2000);
  };


  return (
    <div style={{ padding: 20 }}>
      <h2>Order System</h2>

      <ProductList products={products} onOrder={handleOrder} />

      <hr />

      <h3>Orders</h3>

      {orders.map((o) => (
        <div key={o.id}>
          <span>{o.id}</span> -
          <span>{o.productId}</span> -
          <span>{o.status}</span>
        </div>
      ))}
    </div>
  )
  
}