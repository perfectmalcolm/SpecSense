import os
import requests
import re

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

def search_web(query: str):
    """
    Performs a standard web search using Google Custom Search API.
    """
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": query,
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def extract_product_info_from_google_results(results: dict) -> list:
    """
    Extracts structured product information (price, title, link, image)
    from Google Custom Search API results, leveraging the 'pagemap' data.
    """
    products = []
    if 'items' not in results:
        return products

    for item in results['items']:
        product_info = {
            "title": item.get('title'),
            "link": item.get('link'),
            "image": None,
            "price": None,
            "currency": None,
            "source": "Google Search"
        }

        pagemap = item.get('pagemap', {})

        # Attempt to get image
        if 'cse_image' in pagemap:
            product_info['image'] = pagemap['cse_image'][0].get('src')
        elif 'imageobject' in pagemap:
            product_info['image'] = pagemap['imageobject'][0].get('url')

        # Attempt to get price from 'offer' schema
        if 'offer' in pagemap:
            offer = pagemap['offer'][0]
            product_info['price'] = offer.get('price')
            product_info['currency'] = offer.get('pricecurrency')
        # Fallback for price from 'product' schema
        elif 'product' in pagemap:
            product = pagemap['product'][0]
            product_info['title'] = product.get('name', product_info['title']) # Use product name if better
            product_info['price'] = product.get('offers.price') # nested property
            product_info['currency'] = product.get('offers.pricecurrency')
            if not product_info['price'] and 'aggregatoffer' in pagemap:
                # Sometimes aggregateOffer holds the price
                agg_offer = pagemap['aggregatoffer'][0]
                product_info['price'] = agg_offer.get('price')
                product_info['currency'] = agg_offer.get('pricecurrency')

        # Clean price if it's a string, convert to float
        if product_info['price'] and isinstance(product_info['price'], str):
            try:
                # Remove currency symbols, commas, and convert to float
                product_info['price'] = float(re.sub(r'[^\d.]', '', product_info['price']))
            except ValueError:
                product_info['price'] = None
        
        # Only add if we found a price, or if it's a significant listing
        if product_info['price'] or ("jiji.co.ke" in product_info['link'].lower() or "jumia.co.ke" in product_info['link'].lower()):
            products.append(product_info)

    return products