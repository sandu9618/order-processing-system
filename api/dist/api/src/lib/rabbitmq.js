"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
let channel;
const connectRabbitMQ = async () => {
    const conn = await amqplib_1.default.connect("amqp://localhost");
    channel = await conn.createChannel();
    await channel.assertQueue("orders", { durable: true });
    console.log("RabbitMQ connected");
};
exports.connectRabbitMQ = connectRabbitMQ;
const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }
    return channel;
};
exports.getChannel = getChannel;
