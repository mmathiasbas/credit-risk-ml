from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from .db import Base

class PredictionHistory(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Inputs originales
    LIMIT_BAL = Column(Float)
    SEX = Column(Integer)
    EDUCATION = Column(Integer)
    MARRIAGE = Column(Integer)
    AGE = Column(Integer)
    PAY_0 = Column(Integer)
    PAY_2 = Column(Integer)
    PAY_3 = Column(Integer)
    PAY_4 = Column(Integer)
    PAY_5 = Column(Integer)
    PAY_6 = Column(Integer)
    BILL_AMT1 = Column(Float)
    BILL_AMT2 = Column(Float)
    BILL_AMT3 = Column(Float)
    BILL_AMT4 = Column(Float)
    BILL_AMT5 = Column(Float)
    BILL_AMT6 = Column(Float)
    PAY_AMT1 = Column(Float)
    PAY_AMT2 = Column(Float)
    PAY_AMT3 = Column(Float)
    PAY_AMT4 = Column(Float)
    PAY_AMT5 = Column(Float)
    PAY_AMT6 = Column(Float)
    
    # Resultados
    probability = Column(Float)
    segment = Column(String)
