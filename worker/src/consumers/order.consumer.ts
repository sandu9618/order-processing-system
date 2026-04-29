import { Channel } from 'amqplib';
import { setOrderStatus } from '../services/order.service';
import { processOrderSteps } from '../services/business.service';

export function consumeOrders(channel: Channel) {
  channel.prefetch(1);

  channel.consume('orders', async (msg) => {
    if (!msg) return;

    const {orderId, retryCount = 0} = JSON.parse(
      msg.content.toString()
    );

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