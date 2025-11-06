import os
import requests

API_KEY = os.environ.get("GOOGLE_API_KEY")
SEARCH_ENGINE_ID = os.environ.get("GOOGLE_SEARCH_ENGINE_ID")

def search_products(query: str, category: str = None):
    url = "https://www.googleapis.com/customsearch/v1"
    if category:
        query = f"{query} in {category}"
    params = {
        "key": API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": query,
        "searchType": "image", # To get images
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()