import shap
import numpy as np
import pandas as pd


def build_shap_explainer(
    model,
    X_sample
):

    explainer = shap.TreeExplainer(
        model
    )

    shap_values = explainer.shap_values(
        X_sample
    )

    return explainer, shap_values


def get_top_shap_features(
    shap_values,
    feature_names,
    top_n=10
):

    importance = np.abs(
        shap_values
    ).mean(axis=0)

    shap_df = pd.DataFrame({
        "feature": feature_names,
        "importance": importance
    })

    shap_df = shap_df.sort_values(
        by="importance",
        ascending=False
    )

    return shap_df.head(top_n)


def explain_customer(
    explainer,
    customer_row,
    feature_names,
    top_n=5
):

    shap_values = explainer.shap_values(
        customer_row
    )

    values = shap_values[0]

    explanation_df = pd.DataFrame({
        "feature": feature_names,
        "shap_value": values,
        "abs_value": np.abs(values)
    })

    explanation_df = explanation_df.sort_values(
        by="abs_value",
        ascending=False
    )

    top_features = explanation_df.head(
        top_n
    )

    risk_drivers = top_features[
        top_features["shap_value"] > 0
    ]

    protective_drivers = top_features[
        top_features["shap_value"] < 0
    ]

    return {
        "top_features": top_features,
        "risk_drivers": risk_drivers,
        "protective_drivers": protective_drivers
    }


def generate_shap_narrative(
    explanation
):

    risk_text = []

    for _, row in explanation[
        "risk_drivers"
    ].iterrows():

        risk_text.append(
            row["feature"]
        )

    protective_text = []

    for _, row in explanation[
        "protective_drivers"
    ].iterrows():

        protective_text.append(
            row["feature"]
        )

    narrative = f"""
Primary churn risk drivers:
{', '.join(risk_text)}

Protective retention factors:
{', '.join(protective_text)}
"""

    return narrative.strip()
import matplotlib.pyplot as plt


def build_explainer(model):

    explainer = shap.TreeExplainer(
        model
    )

    return explainer


def compute_global_shap(
    explainer,
    X_sample
):

    shap_values = explainer.shap_values(
        X_sample
    )

    return shap_values


def plot_global_importance(
    shap_values,
    X_sample
):

    shap.summary_plot(
        shap_values,
        X_sample,
        show=False
    )

    plt.tight_layout()

    plt.show()

    generate_risk_narrative = generate_shap_narrative
    import joblib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
MODELS_DIR = ROOT / "models"


def load_explainer(model_name="xgb"):
    return joblib.load(MODELS_DIR / "shap_explainer.pkl")