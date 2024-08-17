import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = []; // Replace with database or persistent storage

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { action, email, password } = req.body;

    if (action === 'signup') {
      // Check if user already exists
      if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password and store the new user
      const hashedPassword = bcrypt.hashSync(password, 10);
      users.push({ email, password: hashedPassword });

      res.status(201).json({ message: 'User created' });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
