import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ProductSelection() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGadgets, setSelectedGadgets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchGadgets = async () => {
      const category = searchParams.get("category");
      let url = "http://localhost:8081/gadgets/";

      if (searchTerm.length > 2) {
        url = `http://localhost:8081/gadgets/?name_contains=${searchTerm}`;
      } else if (category) {
        url = `http://localhost:8081/gadgets/?category=${category}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (searchTerm.length > 2) {
          setSuggestions(data);
          setSearchResults([]);
        } else {
          setSearchResults(data);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching gadgets:", error);
      }
    };

    const handler = setTimeout(() => {
      fetchGadgets();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchParams]);

  const handleSelectGadget = (gadget) => {
    setSelectedGadgets([...selectedGadgets, gadget]);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="bg-figma-secondary-bg min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-figma-primary-text text-center mb-12">
          Product Selection
        </h1>

        <div className="relative mb-12 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for a gadget..."
            className="w-full px-6 py-4 text-lg border-2 border-figma-outline rounded-full focus:outline-none focus:ring-2 focus:ring-figma-primary-action"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
              {suggestions.map((gadget) => (
                <li
                  key={gadget.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectGadget(gadget)}
                >
                  {gadget.name} ({gadget.brand})
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedGadgets.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-figma-primary-text mb-6">
              Selected Gadgets
            </h2>
            <div className="flex flex-wrap gap-4">
              {selectedGadgets.map((gadget) => (
                <span
                  key={gadget.id}
                  className="bg-figma-primary-action text-white px-4 py-2 rounded-full flex items-center text-lg"
                >
                  {gadget.name}
                  <button
                    className="ml-3 text-sm opacity-75 hover:opacity-100"
                    onClick={() =>
                      setSelectedGadgets(
                        selectedGadgets.filter((g) => g.id !== gadget.id)
                      )
                    }
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-figma-primary-text mb-6">
            {searchParams.get("category") || "Search Results"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchResults.map((gadget) => (
              <div
                key={gadget.id}
                className="bg-figma-primary-bg rounded-2xl shadow-lg overflow-hidden flex-shrink-0 w-72"
              >
                <img
                  src={gadget.image_url || 'https://via.placeholder.com/150'}
                  alt={gadget.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-figma-primary-text">
                    {gadget.name}
                  </h3>
                  <p className="text-figma-secondary-text mt-1">{gadget.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSelection;

