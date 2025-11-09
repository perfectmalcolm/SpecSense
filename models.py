from sqlalchemy import Column, Integer, String, JSON, Float
from database import Base

class Gadget(Base):
    __tablename__ = "gadgets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String)
    os = Column(String)
    release_year = Column(Integer)
    price = Column(Float)
    specs = Column(JSON)