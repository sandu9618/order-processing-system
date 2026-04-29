"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.seedProducts = exports.createProduct = void 0;
const seed_1 = require("../db/seed");
const client_1 = require("../../../prisma/client");
const createProduct = async (data) => {
    return client_1.prisma.product.create({
        data: {
            name: data.name,
            price: data.price,
        },
    });
};
exports.createProduct = createProduct;
const seedProducts = async () => {
    const allproducts = seed_1.products;
    return await Promise.all(allproducts.map((product) => client_1.prisma.product.create({ data: product })));
};
exports.seedProducts = seedProducts;
const getAllProducts = async () => {
    return client_1.prisma.product.findMany();
};
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    return client_1.prisma.product.findUnique({
        where: { id },
    });
};
exports.getProductById = getProductById;
