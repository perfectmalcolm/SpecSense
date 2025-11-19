import { Checkbox } from "@/components/ui/checkbox";

export const BrandFilter = ({ brands, selectedBrands, onBrandChange }) => {
  return (
    <div>
      <h4 className="font-medium text-gray-200 mb-2">Brand</h4>
      <div className="space-y-2">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center">
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() => {
                const newSelectedBrands = selectedBrands.includes(brand)
                  ? selectedBrands.filter((b) => b !== brand)
                  : [...selectedBrands, brand];
                onBrandChange(newSelectedBrands);
              }}
            />
            <span className="ml-2 text-sm text-gray-300">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
