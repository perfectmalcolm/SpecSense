import React from 'react';

function ProductSelection() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Product Selection
      </h1>
      <div className="max-w-4xl mx-auto">
        {/* Search Box */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for a gadget..."
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Brand
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            OS
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Release Year
          </button>
        </div>

        {/* Trending Gadgets Carousel */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Trending Gadgets
          </h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {/* Carousel will go here */}
            <p>Trending gadgets carousel placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSelection;