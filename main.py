from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

import crud, models, schemas, google_search, ranking
from database import SessionLocal, engine
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "https://specsense-c3c45bad.web.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for the ranking request
class RankingRequest(BaseModel):
    price_min: float
    price_max: float
    ranking_preference: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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