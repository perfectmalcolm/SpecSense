# recommender.py
from typing import List, Dict

def get_top_recommendation(gadgets: List[Dict]) -> Dict:
    """
    Returns the top recommended gadget from a list.
    For now, it just returns the first gadget.
    """
    if not gadgets:
        return {}
    return gadgets[0]
