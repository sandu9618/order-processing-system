import { Channel } from 'amqplib';
import { setOrderStatus } from '../services/order.service';
import { processOrderSteps } from '../services/business.service';

export function consumeOrders(channel: Channel) {
  console.log("Waiting for orders...");
  channel.prefetch(1);

  channel.consume('orders', async (msg) => {
    console.log("Received message:", msg?.content.toString());
    if (!msg) {
      console.warn("Received null message, ignoring.");
      return
    };

    const {orderId, retryCount = 0} = JSON.parse(
      msg.content.toString()
    );
    console.log(`Processing order ${orderId}, retry count: ${retryCount}`);

    try {
      await setOrderStatus(orderId, 'processing');

      await processOrderSteps(orderId);

      await setOrderStatus(orderId, 'completed');
      channel.ack(msg);
    } catch (error) {
      console.error(`Error processing order ${orderId}:`, error);

      await setOrderStatus(orderId, 'failed');

      if (retryCount >= 3) {
        channel.nack(msg, false, false); 
      } else {
        const newMsg = Buffer.from(
          JSON.stringify({ orderId, retryCount: retryCount + 1 })
        );
        channel.sendToQueue('orders', newMsg, { persistent: true });
        channel.ack(msg); 
      }
    }
  },
    { noAck: false }
  );
}