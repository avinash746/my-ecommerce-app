import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch the cart count from local storage or an API
    const storedCartCount = localStorage.getItem('cartCount') || 0;
    setCartCount(parseInt(storedCartCount, 10));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to the search results page or perform a search action
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <span className="text-lg font-bold cursor-pointer">E-Commerce</span>
      </Link>
      
      <form onSubmit={handleSearchSubmit} className="flex flex-1 mx-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="p-2 rounded-l-md border-none outline-none"
        />
        <button
          type="submit"
          className="bg-blue-700 p-2 rounded-r-md text-white cursor-pointer"
        >
          Search
        </button>
      </form>

      <div className="flex space-x-4 items-center">
        <Link href="/login">
          <span className="cursor-pointer">Login</span>
        </Link>
        <Link href="/signup">
          <span className="cursor-pointer">Signup</span>
        </Link>
        <Link href="/cart" legacyBehavior>
          <a className="relative">
            <span className="cursor-pointer">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </a>
        </Link>
      </div>
    </nav>
  );
}
