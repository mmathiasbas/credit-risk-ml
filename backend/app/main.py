from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.db import engine, Base
from .routes import predict, charts, history
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Credit Risk Prediction API",
    description="API for predicting credit default probability based on customer features.",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(predict.router)
app.include_router(charts.router)
app.include_router(history.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "model_version": "1.0.0"}
