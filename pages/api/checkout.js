// import { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import { useRouter } from 'next/router';

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch cart items from local storage or API
//     fetch('/api/cart')
//       .then(res => res.json())
//       .then(data => {
//         setCart(data);
//         calculateTotalPrice(data);
//       });
//   }, []);

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   const handleChange = (e) => {
//     setShippingAddress(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit the checkout form
//     // Here, you might want to send the shipping address and cart data to your backend
//     console.log('Shipping Address:', shippingAddress);
//     console.log('Cart:', cart);

//     // Optionally, redirect to a confirmation or thank-you page
//     router.push('/thank-you');
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <div>
//               {cart.map(item => (
//                 <div key={item.id} className="border p-4 mb-2 rounded-lg flex items-center">
//                   <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold">{item.name}</h3>
//                     <p className="text-green-500">${item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                   </div>
//                 </div>
//               ))}
//               <div className="text-lg font-bold mt-4">Total Price: ${totalPrice.toFixed(2)}</div>
//             </div>
//           )}
//         </div>

//         <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//           <textarea
//             value={shippingAddress}
//             onChange={handleChange}
//             rows="4"
//             className="border p-2 w-full mb-4"
//             placeholder="Enter your shipping address"
//             required
//           />
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//             Complete Order
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Checkout;

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
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
    const { name, value } = e.target;
    switch (name) {
      case 'shippingAddress':
        setShippingAddress(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/checkout', { // Ensure this API endpoint is correctly set up in your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          shippingAddress,
          cart,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to confirmation or thank-you page
        router.push('/thank-you');
      } else {
        setError(data.message || 'An error occurred while processing your order');
      }
    } catch (err) {
      setError('An error occurred while processing your order');
    }
  };

  return (
    <>
      <Navbar />
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
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shippingAddress" className="block mb-1">Shipping Address</label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={shippingAddress}
              onChange={handleChange}
              rows="4"
              className="border p-2 w-full"
              placeholder="Enter your shipping address"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Complete Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
