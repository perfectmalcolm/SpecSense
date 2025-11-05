from pydantic import BaseModel

class Gadget(BaseModel):
    id: int
    name: str
    brand: str
    os: str
    release_year: int
    specs: dict

    class Config:
        orm_mode = True

class GadgetCreate(BaseModel):
    name: str
    brand: str
    os: str
    release_year: int
    specs: dict
