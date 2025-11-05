from sqlalchemy.orm import Session
import models, schemas

def get_gadget(db: Session, gadget_id: int):
    return db.query(models.Gadget).filter(models.Gadget.id == gadget_id).first()

def get_gadgets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Gadget).offset(skip).limit(limit).all()

def create_gadget(db: Session, gadget: schemas.GadgetCreate):
    db_gadget = models.Gadget(**gadget.dict())
    db.add(db_gadget)
    db.commit()
    db.refresh(db_gadget)
    return db_gadget
