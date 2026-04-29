"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const rabbitmq_1 = require("./lib/rabbitmq");
const redis_1 = __importDefault(require("./lib/redis"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/orders", order_route_1.default);
app.use("/api/products", product_route_1.default);
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    await (0, rabbitmq_1.connectRabbitMQ)();
    await redis_1.default.connect();
    await redis_1.default.ping();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("Database URL:", process.env.DATABASE_URL);
    });
};
startServer();
exports.default = app;
