import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'signup',
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful signup
        router.push('/login'); // Redirect to login page after signup
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while signing up');
    }
  };

  return (
    <>
      <Navbar />
      <div className="centered-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign Up
          </button>
          <Link href="/login" className="block text-center mt-4 text-blue-500">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
}
