# ranking.py
from typing import List, Dict
from datetime import datetime

def rank_gadgets(gadgets: List[Dict], price_min: float, price_max: float, ranking_preference: str) -> List[Dict]:
    """
    Ranks gadgets based on price range and a given preference.
    """
    # 1. Filter by price range
    filtered_gadgets = [g for g in gadgets if price_min <= g['price'] <= price_max]

    # 2. Score and sort based on preference
    if ranking_preference == "newness":
        # Higher release year is better
        return sorted(filtered_gadgets, key=lambda g: g['release_year'], reverse=True)
    
    elif ranking_preference == "cheap":
        # Lower price is better
        return sorted(filtered_gadgets, key=lambda g: g['price'])

    elif ranking_preference == "flagship":
        # Heuristic for "old but flagship"
        # We'll define flagship as a top brand from the last 3 years, but not the current year.
        # This is a simple heuristic and can be improved.
        top_brands = ["Apple", "Samsung", "Google"]
        current_year = datetime.now().year
        
        def flagship_score(gadget):
            score = 0
            if gadget['brand'] in top_brands:
                score += 1
            if current_year - 3 <= gadget['release_year'] < current_year:
                score += 1
            return score

        return sorted(filtered_gadgets, key=flagship_score, reverse=True)

    else:
        return filtered_gadgets
