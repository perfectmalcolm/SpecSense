from ddgs import DDGS
import re

def search_markets(query: str, limit: int = 10):
    """
    Performs a broad web search for product prices in Kenya using DuckDuckGo.
    Returns a list of structured product dictionaries.
    """
    results = []
    known_shops = ["jumia.co.ke", "kilimall.co.ke", "phoneplacekenya.com", "avechi.com", "priceinkenya.com", "gadgetsleo.com"]
    
    try:
        search_query = f"{query} price Kenya"
        print(f"Searching DuckDuckGo for: {search_query}")
        
        with DDGS() as ddgs:
            # Region 'ke-en' for Kenya
            ddg_results = ddgs.text(search_query, region="ke-en", max_results=limit)
            
            for r in ddg_results:
                title = r.get('title', '')
                link = r.get('href', '')
                snippet = r.get('body', '')
                
                # Basic price extraction from Title or Snippet
                # Patterns: "KSh 45,000", "KES 45,000", "45,000 KSh"
                price_text = title + " " + snippet
                price_match = re.search(r'((?:KSh|KES|Sh)\.?\s?([\d,]+(?:[.]\d+)?))', price_text, re.IGNORECASE)
                
                price = None
                currency = "KSh"
                
                if price_match:
                    try:
                        # Extract the numeric part of the price
                        price_str = price_match.group(2).replace(',', '')
                        price = float(price_str)
                        # Optionally extract the currency symbol found
                        currency = price_match.group(1).split(' ')[0]
                    except ValueError:
                        pass

                
                # Check if it's a known shop
                is_known_shop = any(shop in link.lower() for shop in known_shops)

                # Add if we found a price OR it's a known shop (even without price)
                if price or is_known_shop:
                    results.append({
                        "title": title,
                        "link": link,
                        "price": price,
                        "currency": currency if price else None,
                        "image": None, 
                        "source": "DuckDuckGo",
                        "description": snippet
                    })
                    
    except Exception as e:
        print(f"DuckDuckGo Search error: {e}")
        
    return results
