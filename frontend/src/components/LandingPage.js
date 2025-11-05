import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          SpecSense
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="What gadget are you looking for?"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Phones
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Laptops
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Earbuds
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            TVs
          </button>
        </div>
        <div className="text-center mt-8">
          <Link to="/select">
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
              Compare Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
