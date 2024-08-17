import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
  };

  return (
    <div className="border p-4 rounded-lg">
      <img src={product.image} alt={product.name} className="w-full h-20 object-cover mb-4" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-green-500">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className={`mt-4 ${isAdded ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded`}
      >
        {isAdded ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
}
