from fastapi import APIRouter
from ..services.charts import get_target_distribution, get_top_features, get_top_correlations

router = APIRouter(prefix="/charts", tags=["charts"])

@router.get("/target")
def target_distribution():
    return get_target_distribution()

@router.get("/features")
def features_importance():
    return get_top_features(15)

@router.get("/correlation")
def features_correlation():
    return get_top_correlations(10)
