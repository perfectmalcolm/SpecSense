import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

function ProductSelection() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGadgets, setSelectedGadgets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [gadgets, setGadgets] = useState([]);

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        const response = await fetch("https://specsense-backend-575113697963.us-central1.run.app/gadgets/");
        const data = await response.json();
        setGadgets(data);
      } catch (error) {
        console.error("Error fetching gadgets:", error);
      }
    };
    fetchGadgets();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 2) {
        const category = searchParams.get("category");
        let url = `https://specsense-backend-575113697963.us-central1.run.app/search?query=${searchTerm}`;
        if (category) {
          url = `${url}&category=${category}`;
        }
        try {
          const response = await fetch(url);
          const data = await response.json();
          setSuggestions(data.items || []);
          setSearchResults([]);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchParams]);

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    setSearchResults([suggestion]);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                SpecSense
              </Link>
            </div>
            <div className="relative flex-1 max-w-xs mx-4">
              <input
                type="text"
                placeholder="Search for a gadget..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.link}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="hidden md:block">
              <button
                className={`bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all ${selectedGadgets.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                disabled={selectedGadgets.length < 2}
              >
                Compare ({selectedGadgets.length})
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Brand</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-600">Apple</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-600">Samsung</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-600">Google</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="price" className="form-radio h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">Any</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="form-radio h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">$0 - $500</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="form-radio h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">$500 - $1000</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{searchParams.get("category") || "Search Results"}</h2>
              <div>
                <select className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>Sort by relevance</option>
                  <option>Sort by price: low to high</option>
                  <option>Sort by price: high to low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gadgets.map((gadget) => (
                <div
                  key={gadget.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{gadget.name}</h3>
                    <p className="text-sm text-gray-600">{gadget.brand}</p>
                  </div>
                </div>
              ))}
              {searchResults.map((result) => (
                <div
                  key={result.link}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
                >
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={result.pagemap?.cse_image?.[0]?.src}
                      alt={result.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{result.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductSelection;
