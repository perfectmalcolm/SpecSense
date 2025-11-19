import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

export const Hero = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  handleSelectSuggestion,
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tech gadgets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Powered by AI</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Find Your Perfect Gadget
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Compare price-to-performance ratios and discover the best electronic devices for your budget
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
        </form>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-3xl font-bold text-primary mb-1">1000+</div>
            <div className="text-sm text-muted-foreground">Devices</div>
          </div>
          <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-3xl font-bold text-accent mb-1">50K+</div>
            <div className="text-sm text-muted-foreground">Comparisons</div>
          </div>
          <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-3xl font-bold text-primary mb-1">AI</div>
            <div className="text-sm text-muted-foreground">Powered</div>
          </div>
        </div>
      </div>
    </section>
  );
};
