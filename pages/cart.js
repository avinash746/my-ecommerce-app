// import { useState, useEffect } from 'react';
// import CartItem from '../components/CartItem';
// import Navbar from '../components/Navbar';

// // Sample product data, replace with actual data fetching
// const fetchProducts = async () => {
//   // Simulate a fetch request (replace with actual API request)
//   return [
//     { id: 2, name: 'Product 2', price: 30, image: '/images/product2.jpg' },
//     { id: 3, name: 'Product 3', price: 50, image: '/images/product3.jpg' },
//   ];
// };

// // Fetch cart items from the server or local storage
// const fetchCartItems = async () => {
//   const response = await fetch('/api/cart');
//   const data = await response.json();
//   return data;
// };

// // Add item to the cart
// const addItemToCart = async (product) => {
//   await fetch('/api/cart', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(product),
//   });
// };

// // Remove item from the cart
// const removeItemFromCart = async (id) => {
//   await fetch('/api/cart', {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id }),
//   });
// };

// export default function Cart() {
//   const [items, setItems] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Initialize cart items from API
//     fetchCartItems().then(setItems);

//     // Fetch products
//     fetchProducts().then(setProducts);
//   }, []);

//   const handleQuantityChange = async (id, quantity) => {
//     const updatedItems = items.map(item =>
//       item.id === id
//         ? { ...item, quantity: Math.max(quantity, 1) }
//         : item
//     );
//     setItems(updatedItems);
//     // You can also update the server if needed
//   };

//   const handleRemoveItem = async (id) => {
//     await removeItemFromCart(id);
//     setItems(items.filter(item => item.id !== id));
//   };

//   const calculateSubtotal = () => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleAddItem = async (product) => {
//     const existingItem = items.find(item => item.id === product.id);
//     if (existingItem) {
//       // Update existing item quantity
//       const updatedItems = items.map(item =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setItems(updatedItems);
//     } else {
//       // Add new item to cart
//       const newItem = { ...product, quantity: 1 };
//       await addItemToCart(newItem);
//       setItems([...items, newItem]);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//         {items.length === 0 && <p>Your cart is empty.</p>}
//         {items.map(item => (
//           <CartItem
//             key={item.id}
//             item={item}
//             onQuantityChange={handleQuantityChange}
//             onRemove={handleRemoveItem}
//           />
//         ))}
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">Subtotal: ${calculateSubtotal()}</h2>
//           {/* Add discount logic and checkout button here */}
//         </div>
//         <div className="mt-4">
//           <h2 className="text-lg font-bold mb-2">Add More Items</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {products.map(product => (
//               <div key={product.id} className="border p-4 rounded">
//                 <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-gray-600">Price: ${product.price}</p>
//                 <button 
//                   onClick={() => handleAddItem(product)}
//                   className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch cart items from local storage or API
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        setCart(data);
        calculateTotalPrice(data);
      });
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the checkout form
    console.log('Shipping Address:', shippingAddress);
    console.log('Cart:', cart);

    // Optionally, redirect to a confirmation or thank-you page
    router.push('/thank-you');
  };

  // Add this function to show notification
  const handleAddToCart = (item) => {
    // Assuming this function adds the item to the cart and updates local storage
    // Show the notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 seconds
  };

  return (
    <>
      <Navbar onAddToCart={handleAddToCart} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} className="border p-4 mb-2 rounded-lg flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-green-500">${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="text-lg font-bold mt-4">Total Price: ${totalPrice.toFixed(2)}</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <textarea
            value={shippingAddress}
            onChange={handleChange}
            rows="4"
            className="border p-2 w-full mb-4"
            placeholder="Enter your shipping address"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Complete Order
          </button>
        </form>
        
        {/* Notification Display */}
        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Item added to cart!
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
