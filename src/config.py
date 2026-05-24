from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# =========================
# DATA PATHS
# =========================

DATA_DIR = ROOT / "data"

DATA_RAW = DATA_DIR

DATA_PROC = DATA_DIR
TARGET = "churn"
ID_COL = "customer_id"

RANDOM_STATE = 42
# =========================
# MODEL / ARTIFACT PATHS
# =========================

MODELS_DIR = ROOT / "artifacts"

# =========================
# RISK THRESHOLDS
# =========================

RISK_HIGH = 0.75

RISK_MEDIUM = 0.50

# =========================
# PERSONA DEFINITIONS
# =========================

PERSONA_PROFILES = {

    0: {
        "name": "Digitally Loyal",
        "description": "Highly engaged digital-first customers"
    },

    1: {
        "name": "Silent Risk",
        "description": "Customers showing hidden churn behaviour"
    },

    2: {
        "name": "High Value",
        "description": "Premium customers with high lifetime value"
    },

    3: {
        "name": "Financially Stressed",
        "description": "Customers under financial pressure"
    },

    4: {
        "name": "Disengaged Customers",
        "description": "Low engagement and weak platform activity"
    }
}