from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.db import get_db
from ..database.models import PredictionHistory

router = APIRouter(prefix="/history", tags=["history"])

@router.get("")
def read_history(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    records = db.query(PredictionHistory).order_by(PredictionHistory.timestamp.desc()).offset(skip).limit(limit).all()
    total = db.query(PredictionHistory).count()
    return {"data": records, "total": total, "skip": skip, "limit": limit}

@router.delete("/{history_id}")
def delete_history(history_id: int, db: Session = Depends(get_db)):
    record = db.query(PredictionHistory).filter(PredictionHistory.id == history_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Regitro no encontrado")
    db.delete(record)
    db.commit()
    return {"message": "Registro eliminado exitosamente"}
