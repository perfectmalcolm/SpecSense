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
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "MacBook Pro 16-inch",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                SpecSense
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </a>
                <Link to="/select">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all transform hover:scale-105">
                    Compare Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">The easiest way to</span>
            <span className="block text-blue-600">compare your favorite gadgets.</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Search for any gadget and get detailed specifications to make the best choice.
          </p>
          <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a gadget..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>
          <div className="mt-8 flex justify-center space-x-4">
            <button onClick={() => handleCategoryClick("Phones")} className="text-gray-500 hover:text-gray-900 transition-colors">Phones</button>
            <button onClick={() => handleCategoryClick("Laptops")} className="text-gray-500 hover:text-gray-900 transition-colors">Laptops</button>
            <button onClick={() => handleCategoryClick("Earbuds")} className="text-gray-500 hover:text-gray-900 transition-colors">Earbuds</button>
            <button onClick={() => handleCategoryClick("TVs")} className="text-gray-500 hover:text-gray-900 transition-colors">TVs</button>
          </div>
        </div>
      </header>

      {/* Featured Gadgets Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Gadgets</h2>
            <p className="mt-4 text-lg text-gray-500">Check out some of the most popular gadgets being compared right now.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredGadgets.map((gadget, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src={gadget.image} alt={gadget.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{gadget.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">&copy; {new Date().getFullYear()} SpecSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
