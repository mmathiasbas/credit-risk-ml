import pandas as pd
import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '../../data')
PROCESSED_DATA_PATH = os.path.join(DATA_DIR, 'df_processed.csv')

def get_target_distribution():
    try:
        df = pd.read_csv(PROCESSED_DATA_PATH)
        counts = df['TARGET'].value_counts()
        return [
            {"name": "Pagará (0)", "value": int(counts[0]), "color": "#10B981"},  # Green
            {"name": "Incumplirá (1)", "value": int(counts[1]), "color": "#EF4444"} # Red
        ]
    except Exception as e:
        return [{"name": "Error Loading Data", "value": 1, "color": "#gray"}]

def get_top_features(n=15):
    try:
        # In Random Forest with df_features we don't have direct importance unless from model
        # But for this task, we can load the model to get feature_importances_ or use a cached version
        import joblib
        MODEL_PATH = os.path.join(os.path.dirname(__file__), '../../models/model.pkl')
        model = joblib.load(MODEL_PATH)
        FEATURE_COLS_PATH = os.path.join(DATA_DIR, 'feature_cols.json')
        with open(FEATURE_COLS_PATH, 'r') as f:
            feature_cols = json.load(f)
            
        importances = model.feature_importances_
        features_df = pd.DataFrame({
            'name': feature_cols,
            'importance': importances
        }).sort_values('importance', ascending=False).head(n)
        
        return features_df.to_dict('records')
    except Exception as e:
        return []

def get_top_correlations(n=10):
    try:
        df = pd.read_csv(PROCESSED_DATA_PATH)
        if 'TARGET' not in df.columns:
            # Let's see if df_features has 'TARGET' if df_processed doesn't
            FEATURE_DATA_PATH = os.path.join(DATA_DIR, 'df_features.csv')
            df = pd.read_csv(FEATURE_DATA_PATH)

        corrs = df.corr()['TARGET'].drop('TARGET').sort_values(key=abs, ascending=False).head(n)
        res = []
        for feat, val in corrs.items():
            res.append({
                "name": feat,
                "correlation": float(val),
                "is_positive": val > 0
            })
        return res
    except Exception as e:
        return []
