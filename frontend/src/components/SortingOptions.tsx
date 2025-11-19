import { Button } from "@/components/ui/button";
import { TrendingUp, Award, DollarSign } from "lucide-react";

interface SortingOptionsProps {
  selectedSort: string;
  onSortChange: (sortType: string) => void;
}

export const SortingOptions = ({ selectedSort, onSortChange }: SortingOptionsProps) => {
  const sortOptions = [
    { id: "newest", label: "Newest", icon: TrendingUp },
    { id: "flagship", label: "Flagship", icon: Award },
    { id: "value", label: "Best Value", icon: DollarSign },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {sortOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedSort === option.id;
        
        return (
          <Button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            variant={isSelected ? "default" : "outline"}
            className={isSelected ? "shadow-glow" : ""}
          >
            <Icon className="w-4 h-4 mr-2" />
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};
