"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatus = exports.createOrder = void 0;
const rabbitmq_1 = require("../lib/rabbitmq");
const redis_1 = __importDefault(require("../lib/redis"));
const client_1 = require("../../../prisma/client");
const createOrder = async (data) => {
    const order = await client_1.prisma.order.create({
        data: {
            customerId: data.customerId,
            status: "queued",
        },
    });
    await Promise.all(data.orderItems.map(item => {
        return client_1.prisma.orderItem.create({
            data: {
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
            },
        });
    }));
    //Save to redis
    redis_1.default.set(`order:${order.id}`, JSON.stringify(order.status));
    //Enqueue order for processing
    (0, rabbitmq_1.getChannel)().sendToQueue("order_queue", Buffer.from(order.id), { persistent: true });
    return order;
};
exports.createOrder = createOrder;
const getOrderStatus = async (orderId) => {
    const cachedStatus = await redis_1.default.get(`order:${orderId}`);
    if (cachedStatus) {
        return cachedStatus;
    }
    const order = await client_1.prisma.order.findUnique({
        where: { id: orderId },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    // Cache the status in Redis
    redis_1.default.set(`order:${orderId}`, order.status);
    return order.status;
};
exports.getOrderStatus = getOrderStatus;
