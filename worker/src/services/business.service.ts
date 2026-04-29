export async function validateInventory(orderId: string) {
  // simulate DB/API check
  return true;
}

export async function chargePayment(orderId: string) {
  return true;
}

export async function reserveStock(orderId: string) {
  return true;
}

export async function notifyWarehouse(orderId: string) {
  return true;
}

export async function processOrderSteps(orderId: string) {
  await validateInventory(orderId);
  await chargePayment(orderId);
  await reserveStock(orderId);
  await notifyWarehouse(orderId);

  await new Promise((r) => setTimeout(r, 2000));
}