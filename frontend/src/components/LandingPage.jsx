import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/select?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/select?category=${encodeURIComponent(category)}`);
  };

  const featuredGadgets = [
    {
      name: "iPhone 14 Pro",
      image: "https://source.unsplash.com/random/300x200?iphone",
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      image: "https://source.unsplash.com/random/300x200?samsung",
    },
    {
      name: "MacBook Pro 16-inch",
      image: "https://source.unsplash.com/random/300x200?macbook",
    },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-300">
      {/* Navigation Bar */}
      <nav className="bg-gray-800/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                SpecSense
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </a>
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </a>
                <Link to="/select">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
                    Compare Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">The smartest way to</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              compare your favorite gadgets.
            </span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-400">
            Find the perfect device for your budget and needs with AI-powered rankings.
          </p>
          <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a smartphone, laptop, etc..."
                className="w-full px-6 py-4 text-lg bg-gray-800 text-white border-2 border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </form>
          <div className="mt-8 flex justify-center space-x-4">
            <button onClick={() => handleCategoryClick("Phones")} className="text-gray-400 hover:text-white transition-colors">Phones</button>
            <button onClick={() => handleCategoryClick("Laptops")} className="text-gray-400 hover:text-white transition-colors">Laptops</button>
            <button onClick={() => handleCategoryClick("Earbuds")} className="text-gray-400 hover:text-white transition-colors">Earbuds</button>
            <button onClick={() => handleCategoryClick("TVs")} className="text-gray-400 hover:text-white transition-colors">TVs</button>
          </div>
        </div>
      </header>

      {/* Featured Gadgets Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Featured Gadgets</h2>
            <p className="mt-4 text-lg text-gray-400">Check out some of the most popular gadgets being compared right now.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredGadgets.map((gadget, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src={gadget.image} alt={gadget.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{gadget.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">&copy; {new Date().getFullYear()} SpecSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
