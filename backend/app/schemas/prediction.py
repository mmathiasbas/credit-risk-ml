from pydantic import BaseModel, Field
from typing import Optional

class PredictionRequest(BaseModel):
    LIMIT_BAL: float = Field(..., description="Monto del límite de crédito")
    SEX: int = Field(..., description="Género (1 = masculino, 2 = femenino)")
    EDUCATION: int = Field(..., description="Nivel de educación (1=posgrado, 2=universidad, 3=secundaria, 4=otros)")
    MARRIAGE: int = Field(..., description="Estado civil (1=casado, 2=soltero, 3=otros)")
    AGE: int = Field(..., description="Edad en años")
    
    PAY_0: int = Field(..., description="Estado de pago en septiembre (-1=pago a tiempo, 1=retraso 1 mes, etc.)")
    PAY_2: int = Field(..., description="Estado de pago en agosto")
    PAY_3: int = Field(..., description="Estado de pago en julio")
    PAY_4: int = Field(..., description="Estado de pago en junio")
    PAY_5: int = Field(..., description="Estado de pago en mayo")
    PAY_6: int = Field(..., description="Estado de pago en abril")
    
    BILL_AMT1: float = Field(..., description="Estado de cuenta en septiembre")
    BILL_AMT2: float = Field(..., description="Estado de cuenta en agosto")
    BILL_AMT3: float = Field(..., description="Estado de cuenta en julio")
    BILL_AMT4: float = Field(..., description="Estado de cuenta en junio")
    BILL_AMT5: float = Field(..., description="Estado de cuenta en mayo")
    BILL_AMT6: float = Field(..., description="Estado de cuenta en abril")
    
    PAY_AMT1: float = Field(..., description="Monto pagado en septiembre")
    PAY_AMT2: float = Field(..., description="Monto pagado en agosto")
    PAY_AMT3: float = Field(..., description="Monto pagado en julio")
    PAY_AMT4: float = Field(..., description="Monto pagado en junio")
    PAY_AMT5: float = Field(..., description="Monto pagado en mayo")
    PAY_AMT6: float = Field(..., description="Monto pagado en abril")

class PredictionResponse(BaseModel):
    probability: float
    segment: str
    segment_color: str
    message: str
    threshold_used: float = 0.42
