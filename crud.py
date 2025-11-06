from sqlalchemy.orm import Session
from models import Gadget
from schemas import GadgetCreate

def get_gadget(db: Session, gadget_id: int):
    return db.query(Gadget).filter(Gadget.id == gadget_id).first()

def get_gadgets(db: Session, skip: int = 0, limit: int = 100, name_contains: str = None):
    query = db.query(Gadget)
    if name_contains:
        query = query.filter(Gadget.name.contains(name_contains))
    return query.offset(skip).limit(limit).all()

def create_gadget(db: Session, gadget: GadgetCreate):
    db_gadget = Gadget(**gadget.dict())
    db.add(db_gadget)
    db.commit()
    db.refresh(db_gadget)
    return db_gadget