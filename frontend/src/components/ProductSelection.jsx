import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

function ProductSelection() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGadgets, setSelectedGadgets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [rankingPreference, setRankingPreference] = useState("newness");

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        const response = await fetch("https://specsense-backend-575113697963.us-central1.run.app/gadgets/");
        const data = await response.json();
        setGadgets(data);
        // Derive unique brands from the gadgets list
        const uniqueBrands = [...new Set(data.map(g => g.brand))];
        setBrands(uniqueBrands);
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

  const handleApplyFilters = async () => {
    try {
      const response = await fetch("https://specsense-backend-575113697963.us-central1.run.app/rankings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_min: parseFloat(priceMin) || 0,
          price_max: parseFloat(priceMax) || 99999,
          ranking_preference: rankingPreference,
        }),
      });
      let rankedGadgets = await response.json();

      // Filter by brand on the frontend
      if (selectedBrands.length > 0) {
        rankedGadgets = rankedGadgets.filter(g => selectedBrands.includes(g.brand));
      }

      setGadgets(rankedGadgets);
      setSearchResults([]); // Clear search results when applying filters
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation Bar */}
      <nav className="bg-gray-800/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                SpecSense
              </Link>
            </div>
            <div className="relative flex-1 max-w-xs mx-4">
              <input
                type="text"
                placeholder="Search for a gadget..."
                className="w-full px-4 py-2 text-sm bg-gray-700 text-white border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.link}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700"
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
                className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all ${selectedGadgets.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'}`}
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
            <div className="sticky top-24 bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-200 mb-2">Brand</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 bg-gray-700 border-gray-600 text-indigo-600 rounded focus:ring-indigo-500"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => {
                            const newSelectedBrands = selectedBrands.includes(brand)
                              ? selectedBrands.filter(b => b !== brand)
                              : [...selectedBrands, brand];
                            setSelectedBrands(newSelectedBrands);
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-300">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-200 mb-2">Price Range</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 text-sm bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 text-sm bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-200 mb-2">Ranking</h4>
                  <select
                    className="form-select block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={rankingPreference}
                    onChange={(e) => setRankingPreference(e.target.value)}
                  >
                    <option value="newness">Newness</option>
                    <option value="flagship">Flagship</option>
                    <option value="cheap">Cheap</option>
                  </select>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-green-600 hover:to-teal-600"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{searchParams.get("category") || "Search Results"}</h2>
              <div>
                <select className="form-select block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
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
                  className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white truncate">{gadget.name}</h3>
                    <p className="text-sm text-gray-400">{gadget.brand}</p>
                  </div>
                </div>
              ))}
              {searchResults.map((result) => (
                <div
                  key={result.link}
                  className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
                >
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={result.pagemap?.cse_image?.[0]?.src}
                      alt={result.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white truncate">{result.title}</h3>
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
