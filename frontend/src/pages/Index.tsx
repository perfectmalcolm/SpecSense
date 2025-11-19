import { useState, useEffect } from "react";
import { RankingFilter } from "@/components/RankingFilter";
import { BrandFilter } from "@/components/BrandFilter";
import { CategorySelector } from "@/components/CategorySelector";
import { Hero } from "@/components/Hero";
import { PriceRangeFilter } from "@/components/PriceRangeFilter";
import { SortingOptions } from "@/components/SortingOptions";
import { ProductCard } from "@/components/ProductCard";

const Index = () => {
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
  const [selectedCategory, setSelectedCategory] = useState("smartphones");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        const response = await fetch("/api/gadgets/");
        const data = await response.json();
        setGadgets(data);
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
        let url = `/api/search?query=${searchTerm}`;
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
      const response = await fetch("/api/rankings/", {
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

  const filteredProducts = gadgets.filter(
    (product) =>
      product.category === selectedCategory &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
  );

  return (
    <div className="min-h-screen bg-background">
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        handleSelectSuggestion={handleSelectSuggestion}
      />
      
      <CategorySelector 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <BrandFilter
              brands={brands}
              selectedBrands={selectedBrands}
              onBrandChange={setSelectedBrands}
            />
            <RankingFilter
              selectedRanking={rankingPreference}
              onRankingChange={setRankingPreference}
            />
            <PriceRangeFilter
              minPrice={priceRange[0]}
              maxPrice={priceRange[1]}
              onPriceChange={setPriceRange}
            />
            <button
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-green-600 hover:to-teal-600"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filteredProducts.length} Results Found
              </h2>
              <SortingOptions
                selectedSort={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
