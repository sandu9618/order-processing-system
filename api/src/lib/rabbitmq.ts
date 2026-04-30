import amqp, { Channel } from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async (retries = 5): Promise<Channel> => {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
    channel = await conn.createChannel();
  
    await channel.assertQueue("orders", { durable: true });
    console.log("RabbitMQ connected");
    return channel;
  
  } catch (error) {
    console.error(`RabbitMQ connection failed (${retries} retries left)`);
    if (retries === 0) {
      console.error("Could not connect to RabbitMQ");
      throw error;
    }
    await new Promise((res) => setTimeout(res, 3000));
    return connectRabbitMQ(retries - 1);
  }
  
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};