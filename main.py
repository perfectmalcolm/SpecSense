from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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
def read_gadgets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    gadgets = crud.get_gadgets(db, skip=skip, limit=limit)
    return gadgets

@app.get("/gadgets/{gadget_id}", response_model=schemas.Gadget)
def read_gadget(gadget_id: int, db: Session = Depends(get_db)):
    db_gadget = crud.get_gadget(db, gadget_id=gadget_id)
    if db_gadget is None:
        raise HTTPException(status_code=404, detail="Gadget not found")
    return db_gadget

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/add_test_gadget")
def add_test_gadget(db: Session = Depends(get_db)):
    gadget_data = schemas.GadgetCreate(
        name="Test Gadget",
        brand="Test Brand",
        os="Test OS",
        release_year=2024,
        specs={"test_spec": "test_value"}
    )
    crud.create_gadget(db=db, gadget=gadget_data)
    return {"message": "Test gadget added successfully!"}
