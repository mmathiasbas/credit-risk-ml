import pandas as pd
import numpy as np
import joblib
import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '../../data')
MODELS_DIR = os.path.join(os.path.dirname(__file__), '../../models')

MODEL_PATH = os.path.join(MODELS_DIR, 'model.pkl')
SCALER_PATH = os.path.join(DATA_DIR, 'robust_scaler.pkl')
FEATURE_COLS_PATH = os.path.join(DATA_DIR, 'feature_cols.json')
SCALE_COLS_PATH = os.path.join(DATA_DIR, 'scale_cols.json')
PROCESSED_DATA_PATH = os.path.join(DATA_DIR, 'df_processed.csv')

model = None
scaler = None
feature_cols = None
scale_cols = None
winsorize_caps = {}

def load_artifacts():
    global model, scaler, feature_cols, scale_cols, winsorize_caps
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    with open(FEATURE_COLS_PATH, 'r') as f:
        feature_cols = json.load(f)
    with open(SCALE_COLS_PATH, 'r') as f:
        scale_cols = json.load(f)
        
    try:
        df_processed = pd.read_csv(PROCESSED_DATA_PATH)
        for i in range(1, 7):
            winsorize_caps[f'BILL_AMT{i}'] = df_processed[f'BILL_AMT{i}'].quantile(0.99)
            winsorize_caps[f'PAY_AMT{i}'] = df_processed[f'PAY_AMT{i}'].quantile(0.99)
    except:
        pass

load_artifacts()

def predict_risk(input_data: dict) -> dict:
    df = pd.DataFrame([input_data])
    
    # Guardamos limit_bal log y original
    limit_bal_orig = df['LIMIT_BAL'].copy()
    
    # 1. Clip BILL_AMT a 0
    for i in range(1, 7):
        df[f'BILL_AMT{i}'] = df[f'BILL_AMT{i}'].clip(lower=0)
        
    # 2. Winsorizing
    for i in range(1, 7):
        if f'BILL_AMT{i}' in winsorize_caps:
            df[f'BILL_AMT{i}'] = df[f'BILL_AMT{i}'].clip(upper=winsorize_caps[f'BILL_AMT{i}'])
        if f'PAY_AMT{i}' in winsorize_caps:
            df[f'PAY_AMT{i}'] = df[f'PAY_AMT{i}'].clip(upper=winsorize_caps[f'PAY_AMT{i}'])
            
    # 3. Log1p
    for i in range(1, 7):
        df[f'PAY_AMT{i}'] = np.log1p(df[f'PAY_AMT{i}'])
    df['LIMIT_BAL'] = np.log1p(df['LIMIT_BAL'])
    
    # 4. Reagrupar
    df['EDUCATION'] = df['EDUCATION'].replace({0:4, 5:4, 6:4})
    df['MARRIAGE'] = df['MARRIAGE'].replace({0:3})
    
    # 5. SEX
    df['SEX'] = df['SEX'] - 1
    
    # 6. One Hot Encoding
    df['EDUCATION_2'] = (df['EDUCATION'] == 2).astype(int)
    df['EDUCATION_3'] = (df['EDUCATION'] == 3).astype(int)
    df['EDUCATION_4'] = (df['EDUCATION'] == 4).astype(int)
    df['MARRIAGE_2'] = (df['MARRIAGE'] == 2).astype(int)
    df['MARRIAGE_3'] = (df['MARRIAGE'] == 3).astype(int)
    
    # 7 & 8. Features engineered
    # Las formulas requieren cuidado. Asumimos variables transformadas excepto en ratios que puedan requerir el original para no ser > 1
    # Pero nos pedian en orden estricto. Utilizaremos las columnas transformadas porque es lo dictado, a menos de error matemático.
    # UtiL_RATE_1-6 = BILL_AMTx / LIMIT_BAL
    util_rates = []
    pay_ratios = []
    for i in range(1, 7):
        bill = df[f'BILL_AMT{i}'].values[0]
        limit = df['LIMIT_BAL'].values[0]
        # UTIL_RATE
        u_rate = bill / limit if limit > 0 else 0
        u_rate = np.clip(u_rate, 0, 1)
        df[f'UTIL_RATE_{i}'] = u_rate
        util_rates.append(u_rate)
        
        # PAY_RATIO
        pay = df[f'PAY_AMT{i}'].values[0]
        p_ratio = pay / bill if bill > 0 else 0
        p_ratio = np.clip(p_ratio, 0, 2)
        df[f'PAY_RATIO_{i}'] = p_ratio
        pay_ratios.append(p_ratio)
        
    df['AVG_UTIL_RATE'] = np.mean(util_rates)
    df['MAX_UTIL_RATE'] = np.max(util_rates)
    df['AVG_PAY_RATIO'] = np.mean(pay_ratios)
    df['MIN_PAY_RATIO'] = np.min(pay_ratios)
    
    # UNPAID_BAL_1
    bill_1 = df['BILL_AMT1'].values[0]
    pay_1 = df['PAY_AMT1'].values[0]
    df['UNPAID_BAL_1'] = np.log1p(max(bill_1 - pay_1, 0))
    
    # BILL_TREND: pendiente log-signed (BILL_AMT6 -> BILL_AMT1)
    bill_vals = [df[f'BILL_AMT{i}'].values[0] for i in range(6, 0, -1)]
    # simple slope over x=[1,2,3,4,5,6]
    x = np.arange(1, 7)
    if np.std(x) > 0:
        slope_bill = np.polyfit(x, bill_vals, 1)[0]
    else:
        slope_bill = 0
    df['BILL_TREND'] = slope_bill
    
    # PAY_TREND
    pay_vals = [df[f'PAY_AMT{i}'].values[0] for i in range(6, 0, -1)]
    if np.std(x) > 0:
        slope_pay = np.polyfit(x, pay_vals, 1)[0]
    else:
        slope_pay = 0
    df['PAY_TREND'] = slope_pay
    
    # MONTHS_IN_ARREARS
    pay_status = [df[f'PAY_{i}'].values[0] for i in [0, 2, 3, 4, 5, 6]]
    df['MONTHS_IN_ARREARS'] = sum(1 for p in pay_status if p >= 1)
    
    # MAX_ARREARS
    df['MAX_ARREARS'] = max(pay_status)
    
    # RECENT_ARREARS = suma ponderada con pesos [6,5,4,3,2,1] para [0,2,3,4,5,6] (recientes primero)
    weights = [6, 5, 4, 3, 2, 1]
    df['RECENT_ARREARS'] = sum(w * max(0, p) for w, p in zip(weights, pay_status))
    
    # EVER_IN_ARREARS
    df['EVER_IN_ARREARS'] = 1 if df['MONTHS_IN_ARREARS'].values[0] > 0 else 0
    
    # PAY_TO_LIMIT_RATIO
    avg_pay = np.mean([df[f'PAY_AMT{i}'].values[0] for i in range(1, 7)])
    df['PAY_TO_LIMIT_RATIO'] = np.log1p(avg_pay / df['LIMIT_BAL'].values[0])
    
    # Scale variables
    cols_to_scale = [c for c in scale_cols if c in df.columns]
    if cols_to_scale:
        df[cols_to_scale] = scaler.transform(df[cols_to_scale])
    
    # Ensure correct exact column order
    final_cols = [c for c in feature_cols if c in df.columns]
    # If any column is missing, fill with 0
    for c in feature_cols:
        if c not in df.columns:
            df[c] = 0
    
    X = df[feature_cols]
    
    # Predict
    prob = float(model.predict_proba(X)[0][1])
    
    if prob < 0.20:
        segment = "bajo"
        color = "green"
        msg = "Cliente con bajo riesgo de incumplimiento. Perfil favorable."
    elif prob < 0.42:
        segment = "medio"
        color = "yellow"
        msg = "Cliente con riesgo moderado. Se recomienda monitoreo."
    else:
        segment = "alto"
        color = "red"
        msg = "Cliente con alto riesgo de recaiga en mora. Rechazar o requerir garantías."
        
    return {
        "probability": prob,
        "segment": segment,
        "segment_color": color,
        "message": msg,
        "threshold_used": 0.42
    }
