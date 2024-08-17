import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const products = [
  { id: 1, name: 'Product 1', price: 20, image: '/images/product1.jpg', description: 'Description 1' },
  { id: 2, name: 'watch', price: 20, image: '/images/smartwatch.jpg', description: 'Description 2' },
  { id: 3, name: 'watch', price: 20, image: '/images/watch.jpg', description: 'Description 3' },
  // Add more products here
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </>
  );
}
