import pandas as pd
import joblib

from pathlib import Path

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent.parent

DATA_PATH = ROOT / "data" / "final_churn_intelligence.csv"
SAVE_PATH = ROOT / "artifacts" / "persona_model.pkl"

print(DATA_PATH)
df = pd.read_csv(DATA_PATH)

# Persona features
feat_cols = [
    "customer_lifetime_value",
    "digital_engagement_index",
    "number_of_products",
    "monthly_transaction_count",
    "avg_monthly_balance",
    "tenure_months"
]

X = df[feat_cols].fillna(0)

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

km = KMeans(
    n_clusters=5,
    random_state=42,
    n_init=10
)

km.fit(X_scaled)

persona_model = {
    "km": km,
    "scaler": scaler,
    "feat_cols": feat_cols
}

joblib.dump(
    persona_model,
    SAVE_PATH
)

print("Persona model saved.")