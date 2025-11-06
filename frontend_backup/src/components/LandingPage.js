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

  return (
    <div className="bg-figma-primary-bg min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="max-w-2xl w-full mx-auto p-8 text-center">
        <h1 className="text-6xl font-bold text-figma-primary-text mb-4">
          SpecSense
        </h1>
        <p className="text-xl text-figma-secondary-text mb-12">
          The easiest way to compare your favorite gadgets.
        </p>
        <form onSubmit={handleSearch} className="relative mx-auto max-w-xl">
          <input
            type="text"
            placeholder="Search for a gadget..."
            className="w-full px-6 py-4 text-lg border-2 border-figma-outline rounded-full focus:outline-none focus:ring-2 focus:ring-figma-primary-action"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-figma-primary-action text-white px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Search
          </button>
        </form>
        <div className="flex justify-center space-x-4 mt-10">
          <button
            onClick={() => handleCategoryClick("Phones")}
            className="text-figma-secondary-text px-4 py-2 rounded-lg hover:text-figma-primary-text transition-colors"
          >
            Phones
          </button>
          <button
            onClick={() => handleCategoryClick("Laptops")}
            className="text-figma-secondary-text px-4 py-2 rounded-lg hover:text-figma-primary-text transition-colors"
          >
            Laptops
          </button>
          <button
            onClick={() => handleCategoryClick("Earbuds")}
            className="text-figma-secondary-text px-4 py-2 rounded-lg hover:text-figma-primary-text transition-colors"
          >
            Earbuds
          </button>
          <button
            onClick={() => handleCategoryClick("TVs")}
            className="text-figma-secondary-text px-4 py-2 rounded-lg hover:text-figma-primary-text transition-colors"
          >
            TVs
          </button>
        </div>
        <div className="mt-16">
          <Link to="/select">
            <button className="bg-figma-primary-action text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors">
              Compare Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

