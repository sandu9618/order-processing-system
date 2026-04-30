import amqp from "amqplib";

export async function createRabbitChannel(retries = 5) {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
    const channel = await conn.createChannel();
  
    await channel.assertQueue("orders", { durable: true });
    return { conn, channel};
  } catch (error) {
    console.error(`RabbitMQ connection failed (${retries} retries left)`);
    if (retries === 0) {
      console.error("Could not connect to RabbitMQ");
      throw error;
    }
    await new Promise((res) => setTimeout(res, 3000));
    return createRabbitChannel(retries - 1);
  }
}