"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.seedProducts = exports.createProduct = void 0;
const productService = __importStar(require("../services/product.service"));
const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const product = await productService.createProduct({ name, price });
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create product" });
    }
};
exports.createProduct = createProduct;
const seedProducts = async (req, res) => {
    try {
        const products = await productService.seedProducts();
        res.status(201).json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to seed products" });
    }
};
exports.seedProducts = seedProducts;
const getAllProducts = async (req, res) => {
    console.log("DB URL:", process.env.DATABASE_URL);
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
exports.getAllProducts = getAllProducts;
// export const getProductById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const product = await productService.getProductById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// };
