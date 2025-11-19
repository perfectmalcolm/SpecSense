import { Card } from "@/components/ui/card";
import { Smartphone, Laptop, Tablet, Headphones, Camera, Watch } from "lucide-react";

const categories = [
  { id: "smartphones", name: "Smartphones", icon: Smartphone },
  { id: "laptops", name: "Laptops", icon: Laptop },
  { id: "tablets", name: "Tablets", icon: Tablet },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "cameras", name: "Cameras", icon: Camera },
  { id: "wearables", name: "Wearables", icon: Watch },
];

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector = ({ selectedCategory, onSelectCategory }: CategorySelectorProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                p-6 cursor-pointer transition-all hover:scale-105 shadow-card
                ${isSelected 
                  ? 'bg-gradient-primary border-primary shadow-glow' 
                  : 'bg-card hover:bg-card/80 border-border'
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <Icon className={`w-8 h-8 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {category.name}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
