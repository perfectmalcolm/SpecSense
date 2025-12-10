from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

import crud, models, schemas, google_search, ranking, gemini_recommender, apify_scraper, verification, market_search
from database import SessionLocal, engine
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "https://specsense-c3c45bad.web.app",
    "http://localhost:3000", # Adding localhost for local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for the scraper request
class ScrapeRequest(BaseModel):
    api_token: str

# Pydantic model for the ranking request
class RankingRequest(BaseModel):
    price_min: float
    price_max: float
    ranking_preference: str

# Pydantic model for the recommendation request
class RecommendRequest(BaseModel):
    query: str
    google_api_key: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/search/unified")
def search_unified(query: str, limit: int = 10, google_api_key: Optional[str] = None):
    """
    Searches for products across various marketplaces via web search and verifies them against official specs from Gemini.
    """
    # Try to get API key from env if not provided
    import os
    if not google_api_key:
        google_api_key = os.environ.get("GOOGLE_API_KEY")

    # 1. Get Official Specs via Gemini
    official_specs = None
    if google_api_key:
        official_specs = gemini_recommender.get_product_specs(query, google_api_key)
        if official_specs:
            official_specs['source'] = "Gemini AI"
    else:
        print("Warning: No Google API Key found. Skipping official specs verification.")
    
    # 2. Get Marketplace Listings via DuckDuckGo (Blanket Search)
    all_listings = market_search.search_markets(query, limit=limit)
    
    # 3. Verify Listings
    verified_listings = []
    for item in all_listings:
        is_valid, reason = verification.verify_listing(item, official_specs)
        item['verification'] = {
            "status": "Verified" if is_valid else "Potential Mismatch",
            "reason": reason
        }
        verified_listings.append(item)
        
    return {
        "official_specs": official_specs,
        "listings": verified_listings
    }

@app.post("/scrape-gsmsarena/")
async def scrape_gsmsarena(request: ScrapeRequest):
    """
    Triggers the GSMArena scraper on Apify.
    """
    results = await apify_scraper.run_gsmarena_scraper(api_token=request.api_token)
    return {"status": "scraping finished", "results": results}

@app.post("/recommend/", response_model=str)
def get_recommendation(request: RecommendRequest, db: Session = Depends(get_db)):
    """
    Receives a user query, gets all gadgets, and uses Gemini to generate a recommendation.
    """
    gadgets = crud.get_gadgets(db, skip=0, limit=1000) # Get all gadgets
    if not gadgets:
        raise HTTPException(status_code=404, detail="No gadgets found in the database to recommend from.")

    # Convert SQLAlchemy models to dictionaries for the recommender
    gadgets_dict = [schemas.Gadget.from_orm(g).dict() for g in gadgets]
    
    recommendation = gemini_recommender.generate_recommendation(user_query=request.query, gadgets=gadgets_dict, google_api_key=request.google_api_key)
    return recommendation

@app.post("/gadgets/", response_model=schemas.Gadget)
def create_gadget(gadget: schemas.GadgetCreate, db: Session = Depends(get_db)):
    return crud.create_gadget(db=db, gadget=gadget)

@app.get("/gadgets/", response_model=List[schemas.Gadget])
def read_gadgets(skip: int = 0, limit: int = 100, name_contains: Optional[str] = None, db: Session = Depends(get_db)):
    gadgets = crud.get_gadgets(db, skip=skip, limit=limit, name_contains=name_contains)
    return gadgets

@app.get("/gadgets/{gadget_id}", response_model=schemas.Gadget)
def read_gadget(gadget_id: int, db: Session = Depends(get_db)):
    db_gadget = crud.get_gadget(db, gadget_id=gadget_id)
    if db_gadget is None:
        raise HTTPException(status_code=404, detail="Gadget not found")
    return db_gadget

@app.post("/rankings/", response_model=List[schemas.Gadget])
def get_rankings(request: RankingRequest, db: Session = Depends(get_db)):
    gadgets = crud.get_gadgets(db, skip=0, limit=1000) # Get all gadgets
    
    # The gadgets from crud are SQLAlchemy models, need to convert them to dicts
    gadgets_dict = [schemas.Gadget.model_validate(g).model_dump() for g in gadgets]

    ranked_gadgets = ranking.rank_gadgets(
        gadgets=gadgets_dict,
        price_min=request.price_min,
        price_max=request.price_max,
        ranking_preference=request.ranking_preference
    )
    return ranked_gadgets

@app.get("/search")
def search(query: str, category: str = None):
    return google_search.search_products(query, category)

@app.get("/")
def read_root():
    return {"Hello": "World"}