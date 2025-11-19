import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (values: number[]) => void;
}

export const PriceRangeFilter = ({ minPrice, maxPrice, onPriceChange }: PriceRangeFilterProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Price Range</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-background/50">
              ${minPrice}
            </Badge>
            <span className="text-muted-foreground">-</span>
            <Badge variant="outline" className="bg-background/50">
              ${maxPrice}
            </Badge>
          </div>
        </div>
        
        <Slider
          min={0}
          max={5000}
          step={50}
          value={[minPrice, maxPrice]}
          onValueChange={onPriceChange}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>$5000+</span>
        </div>
      </div>
    </Card>
  );
};
