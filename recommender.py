# recommender.py

def get_recommendation(product_category: str):
    """
    Returns a dummy recommendation for a given product category.
    """
    return {
        "product_category": product_category,
        "recommendation": "Dummy Phone",
        "specs": {
            "display": "6.1-inch",
            "camera": "12MP",
            "battery": "3000mAh"
        }
    }