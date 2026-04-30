-- One product per order: remove OrderItem, attach product + quantity directly to Order.

DELETE FROM "OrderItem";
DELETE FROM "Order";

DROP TABLE "OrderItem";

ALTER TABLE "Order" ADD COLUMN "productId" TEXT NOT NULL;
ALTER TABLE "Order" ADD COLUMN "quantity" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
