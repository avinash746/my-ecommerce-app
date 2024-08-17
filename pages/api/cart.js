let cart = []; // In-memory cart (replace with a database in a real app)

// API handler for cart operations
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Return the current cart items
      res.status(200).json(cart);
      break;

    case 'POST':
      // Add a new item to the cart
      const newItem = req.body;
      if (!newItem.id || !newItem.name || !newItem.price) {
        return res.status(400).json({ message: 'Invalid item data' });
      }
      cart.push(newItem);
      res.status(201).json(newItem);
      break;

    case 'DELETE':
      // Remove an item from the cart by ID
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Invalid item ID' });
      }
      cart = cart.filter(item => item.id !== id);
      res.status(200).json({ message: 'Item removed' });
      break;

    case 'PUT':
      // Update the quantity of an existing item in the cart
      const { itemId, quantity } = req.body;
      if (!itemId || quantity === undefined) {
        return res.status(400).json({ message: 'Invalid item data' });
      }
      cart = cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      res.status(200).json({ message: 'Item updated' });
      break;

    default:
      // Method not allowed
      res.status(405).json({ message: 'Method not allowed' });
  }
}
