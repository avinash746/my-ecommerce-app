// Mock database for products
const products = [
    { id: 1, name: 'Product 1', price: 20, image: '/images/product1.jpg', description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 30, image: '/images/product2.jpg', description: 'Description 2' },
    { id: 3, name: 'Product 3', price: 40, image: '/images/product3.jpg', description: 'Description 3' },
    { id: 4, name: 'Product 4', price: 50, image: '/images/product4.jpg', description: 'Description 4' },
    { id: 5, name: 'Product 5', price: 60, image: '/images/product5.jpg', description: 'Description 5' },
    { id: 6, name: 'Product 6', price: 70, image: '/images/product6.jpg', description: 'Description 6' },
  ];
  
  export default function handler(req, res) {
    res.status(200).json(products);
  }
  