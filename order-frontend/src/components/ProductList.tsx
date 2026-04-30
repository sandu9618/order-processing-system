import type { Product } from "../types/product";

export default function ProductList({
  products,
  onOrder
}: {
  products: Product[];
  onOrder: (productId: string) => void;
}) {
  return (
    <div>
      <h3>Products</h3>

      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <span>{p.name}</span> - 
          <span> ${p.price}</span>

          <button onClick={() => onOrder(p.id)}>
            Place Order
          </button>
        </div>
      ))}
    </div>
  );
}