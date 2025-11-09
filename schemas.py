from pydantic import BaseModel
from typing import Optional, Dict

class GadgetCreate(BaseModel):
    name: str
    brand: str
    os: str
    release_year: int
    price: float
    specs: Dict

class Gadget(GadgetCreate):
    id: int

    class Config:
        orm_mode = True