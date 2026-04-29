export interface OrderMessage {
  orderId: string;
  retryCount?: number;
}