import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import sys
import os
import shap
import pickle
import plotly.express as px

# =========================================
# PAGE CONFIG
# =========================================

st.set_page_config(
    page_title="RetainAI",
    layout="wide",
    initial_sidebar_state="expanded"
)

# =========================================
# CUSTOM CSS
# =========================================

st.markdown("""
<style>

.main {
    background-color: #050816;
}

.block-container {
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
}

h1 {
    font-size: 4rem !important;
    font-weight: 800 !important;
    letter-spacing: -2px;
}

h2 {
    font-size: 2rem !important;
    font-weight: 700 !important;
}

h3 {
    font-size: 1.4rem !important;
}

[data-testid="metric-container"] {

    background: linear-gradient(
        145deg,
        #111827,
        #1f2937
    );

    border: 1px solid #374151;

    padding: 25px;

    border-radius: 20px;

    box-shadow: 0px 0px 20px rgba(0,0,0,0.3);
}

[data-testid="metric-container"]:hover {

    transform: translateY(-3px);

    transition: 0.3s ease;
}

.stButton button {

    background: linear-gradient(
        90deg,
        #2563eb,
        #7c3aed
    );

    color: white;

    border-radius: 12px;

    border: none;

    padding: 0.7rem 1.2rem;

    font-weight: 600;
}

.stTextInput input,
.stTextArea textarea {

    border-radius: 12px !important;
}

</style>
""", unsafe_allow_html=True)

# =========================================
# IMPORT AI COPILOT
# =========================================

sys.path.append(
    os.path.abspath("src")
)

from ai_copilot import ask_ai

# =========================================
# TITLE
# =========================================

st.title(
    "🏦 AI-Powered Banking Retention Intelligence"
)

st.markdown("""
### Predict Churn. Explain Risk. Protect Revenue.

An enterprise-grade AI platform that helps banks:

- Detect high-risk customers early
- Understand churn drivers using Explainable AI
- Segment behavioral personas
- Estimate revenue exposure
- Recommend retention strategies
- Generate strategic insights using AI Copilot
""")

st.markdown("---")

# =========================================
# LOAD DATA
# =========================================

df = pd.read_csv(
    "data/final_churn_intelligence.csv"
)

# =========================================
# LOAD SHAP + MODEL
# =========================================

with open("artifacts/shap_explainer.pkl", "rb") as f:
    explainer = pickle.load(f)

with open("artifacts/xgb_model.pkl", "rb") as f:
    xgb_model = pickle.load(f)

# =========================================
# MODEL FEATURES
# =========================================

model_features = [

    "age",
    "annual_income",
    "customer_lifetime_value",
    "digital_engagement_index",
    "total_digital_logins",
    "avg_monthly_balance",
    "balance_decline_percentage",
    "emi_payment_delay_count",
    "total_complaints",
    "escalation_count",
    "loan_default_risk_score",
    "customer_stability_index",
    "financial_stress_score",
    "silent_churn_risk",
    "complaint_severity_score",
    "relationship_strength_score"
]

# =========================================
# SIDEBAR
# =========================================

st.sidebar.markdown("# 🏦 RetainAI")

st.sidebar.markdown(
    "### Banking Intelligence Suite"
)

page = st.sidebar.radio(
    "Navigation",
    [
        "Executive Overview",
        "Customer Intelligence",
        "Risk Analytics",
        "ROI Simulator",
        "AI Copilot"
    ]
)

# =========================================
# EXECUTIVE OVERVIEW
# =========================================

if page == "Executive Overview":

    st.header("Executive Overview")

    st.write("""
    Real-time AI-powered customer retention intelligence
    for proactive banking decision-making.
    """)

    # =========================================
    # KPI CARDS
    # =========================================

    col1, col2, col3, col4 = st.columns(4)

    col1.metric(
        " Total Customers",
        f"{len(df):,}"
    )

    col2.metric(
        " Churn Rate",
        f"{df['churn'].mean()*100:.2f}%"
    )

    col3.metric(
        " High Risk Customers",
        f"{len(df[df['risk_level'] == 'High Risk']):,}"
    )

    col4.metric(
        " Revenue At Risk",
        f"${df['revenue_at_risk'].sum():,.0f}"
    )

    st.markdown("---")

    # =========================================
    # PERSONA DISTRIBUTION
    # =========================================

    st.subheader(
        "Customer Persona Distribution"
    )

    fig = px.pie(
        df,
        names="persona_name",
        title="Customer Persona Distribution",
        hole=0.55
    )

    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor="#050816",
        plot_bgcolor="#050816"
    )

    st.plotly_chart(
        fig,
        use_container_width=True
    )

    # =========================================
    # RISK DISTRIBUTION
    # =========================================

    st.subheader(
        "Risk Level Distribution"
    )

    fig = px.histogram(
        df,
        x="risk_level",
        color="risk_level",
        template="plotly_dark"
    )

    fig.update_layout(
        paper_bgcolor="#050816",
        plot_bgcolor="#050816"
    )

    st.plotly_chart(
        fig,
        use_container_width=True
    )

# =========================================
# CUSTOMER INTELLIGENCE
# =========================================

elif page == "Customer Intelligence":

    st.header("Customer Intelligence")

    customer_id = st.selectbox(
        "Select Customer ID",
        df["customer_id"]
    )

    customer_data = df[
        df["customer_id"] == customer_id
    ]

    st.subheader(
        "Customer Profile"
    )

    st.dataframe(
        customer_data,
        use_container_width=True
    )

    # =========================================
    # SHAP FEATURES
    # =========================================

    customer_features = customer_data[
        model_features
    ]

    shap_values = explainer.shap_values(
        customer_features
    )

    # =========================================
    # RISK SCORE
    # =========================================

    st.subheader(
        "Churn Risk Score"
    )

    risk_score = customer_data[
        "churn_probability"
    ].values[0]

    if risk_score > 0.75:

        st.error(
            "🔴 Critical Churn Risk"
        )

    elif risk_score > 0.50:

        st.warning(
            "🟠 Moderate Churn Risk"
        )

    else:

        st.success(
            "🟢 Low Churn Risk"
        )

    st.metric(
        "Predicted Churn Probability",
        f"{risk_score:.2%}"
    )

    # =========================================
    # SHAP VISUALIZATION
    # =========================================

    st.subheader(
        "AI Explainability"
    )

    fig, ax = plt.subplots(
        figsize=(10,5)
    )

    shap.summary_plot(
        shap_values,
        customer_features,
        plot_type="bar",
        show=False
    )

    st.pyplot(fig)

    # =========================================
    # PERSONA
    # =========================================

    st.subheader(
        "Customer Persona"
    )

    st.success(
        customer_data[
            "persona_name"
        ].values[0]
    )

    # =========================================
    # RETENTION STRATEGY
    # =========================================

    st.subheader(
        "Recommended Retention Strategy"
    )

    st.info(
        customer_data[
            "retention_strategy"
        ].values[0]
    )

    # =========================================
    # REVENUE RISK
    # =========================================

    st.subheader(
        "Revenue At Risk"
    )

    revenue_risk = customer_data[
        "revenue_at_risk"
    ].values[0]

    st.metric(
        "Estimated Revenue Exposure",
        f"${revenue_risk:,.0f}"
    )

# =========================================
# RISK ANALYTICS
# =========================================

elif page == "Risk Analytics":

    st.header(
        "Risk Analytics"
    )

    top_risk = df.sort_values(
        by="revenue_at_risk",
        ascending=False
    ).head(20)

    st.subheader(
        "Top Revenue Risk Customers"
    )

    st.dataframe(
        top_risk[[
            "customer_id",
            "persona_name",
            "risk_level",
            "revenue_at_risk"
        ]],
        use_container_width=True
    )

    # =========================================
    # REVENUE RISK BY PERSONA
    # =========================================

    fig = px.bar(
        df,
        x="persona_name",
        y="revenue_at_risk",
        color="persona_name",
        template="plotly_dark",
        title="Revenue Risk by Persona"
    )

    fig.update_layout(
        paper_bgcolor="#050816",
        plot_bgcolor="#050816"
    )

    st.plotly_chart(
        fig,
        use_container_width=True
    )

# =========================================
# ROI SIMULATOR

elif page == "ROI Simulator":

    from pages.roi_simulator import render

    render()

# =========================================
# AI COPILOT
# =========================================

elif page == "AI Copilot":

    st.header(
        " AI Banking Intelligence Copilot"
    )

    st.write("""
    Ask AI-powered strategic questions about customer churn,
    retention risk, personas, and revenue exposure.
    """)

    st.markdown("""
    ### Example Questions

    - Which persona has the highest churn probability?
    - Why are high-value customers leaving?
    - What factors drive silent churn risk?
    - Which customers require immediate intervention?
    """)

    user_query = st.text_area(
        "Ask strategic banking questions..."
    )

    if st.button(
        "Generate AI Insight"
    ):

        with st.spinner(
            "Analyzing banking intelligence..."
        ):

            response = ask_ai(
                user_query
            )

            st.subheader(
                "AI Response"
            )

            st.write(response)
