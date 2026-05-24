import os
import pandas as pd


def load_enriched_data():
    root_dir = os.path.dirname(__file__)
    csv_path = os.path.normpath(
        os.path.join(root_dir, "..", "data", "final_churn_intelligence.csv")
    )

    if not os.path.exists(csv_path):
        return None

    try:
        return pd.read_csv(csv_path)
    except Exception:
        return None
