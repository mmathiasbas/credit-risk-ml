from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.prediction import PredictionRequest, PredictionResponse
from ..database.db import get_db
from ..database.models import PredictionHistory
from ..services.model import predict_risk

router = APIRouter(prefix="/predict", tags=["prediction"])

@router.post("", response_model=PredictionResponse)
def make_prediction(request: PredictionRequest, db: Session = Depends(get_db)):
    data_dict = request.model_dump()
    
    # 1. Fetch prediction
    result = predict_risk(data_dict)
    
    # 2. Save to history
    history_record = PredictionHistory(
        **data_dict,
        probability=result["probability"],
        segment=result["segment"]
    )
    db.add(history_record)
    db.commit()
    db.refresh(history_record)
    
    # 3. Return response
    return PredictionResponse(**result)
