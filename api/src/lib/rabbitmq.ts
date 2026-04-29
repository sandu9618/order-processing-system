import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const conn = await amqp.connect("amqp://localhost");
  channel = await conn.createChannel();

  await channel.assertQueue("orders", { durable: true });

  console.log("RabbitMQ connected");
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};