import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  name: string;
  brand: string;
  price: number;
  specifications: string;
}

export const ProductCard = ({ name, brand, price, specifications }: ProductCardProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all hover:scale-[1.02]">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{brand}</p>
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Specifications:</span>
            <span className="font-medium">{specifications}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-2xl font-bold text-primary">
            ${price.toLocaleString()}
          </div>
          <Button size="sm" variant="outline">
            View Details
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
