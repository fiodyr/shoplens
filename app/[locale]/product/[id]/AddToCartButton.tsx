// app/products/[id]/AddToCartButton.tsx
"use client"; // Явное указание на клиентский компонент

export default function AddToCartButton({ product }) {
  const handleAddToCart = () => {
    // Логика добавления продукта в корзину
    console.log(`${product.name} добавлен в корзину`);
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
