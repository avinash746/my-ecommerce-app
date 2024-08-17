import { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
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
          action: 'login',
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the response contains a token
        localStorage.setItem('token', data.token);
        router.push('/'); // Redirect to home or dashboard page
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <>
      <Navbar />
      <div className="centered-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            Login
          </button>
          <Link href="/signup" legacyBehavior>
            <a className="block text-center mt-4 text-blue-500 hover:underline">
              Don't have an account? Sign Up
            </a>
          </Link>
        </form>
      </div>
    </>
  );
}
