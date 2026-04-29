import amqp from "amqplib";

export async function createRabbitChannel() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
  const channel = await conn.createChannel();

  await channel.assertQueue("orders", { durable: true });
  return { conn, channel};
}