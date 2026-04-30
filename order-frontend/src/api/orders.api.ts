const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  return res.json();
}

export async function createOrder(customerId: string, productId: string, quantity: number) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, productId, quantity }),
  });
  return res.json();
}

export async function getOrderStatus(orderId: string) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/status`);
  return res.json();
}

export async function fetchCustomers() {
  const res = await fetch(`${BASE_URL}/customers`);
  return res.json();
}