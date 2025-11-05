import React, { useState, useEffect } from "react";

function ProductSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGadgets, setSelectedGadgets] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 2) {
        try {
          const response = await fetch(
            `http://localhost:8081/gadgets/?name_contains=${searchTerm}`
          );
          const data = await response.json();
          setSuggestions(data);
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
  }, [searchTerm]);

  const handleSelectGadget = (gadget) => {
    setSelectedGadgets([...selectedGadgets, gadget]);
    setSearchTerm("");
    setSuggestions([]);
  };

  const trendingGadgets = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      brand: "Apple",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      brand: "Samsung",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Google Pixel 7 Pro",
      brand: "Google",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "MacBook Pro 16-inch",
      brand: "Apple",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Dell XPS 15",
      brand: "Dell",
      image: "https://via.placeholder.com/150",
    },
  ];

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
            Trending Gadgets
          </h2>
          <div className="flex space-x-8 overflow-x-auto pb-4">
            {trendingGadgets.map((gadget) => (
              <div
                key={gadget.id}
                className="bg-figma-primary-bg rounded-2xl shadow-lg overflow-hidden flex-shrink-0 w-72"
              >
                <img
                  src={gadget.image}
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

