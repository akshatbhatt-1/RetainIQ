import streamlit as st
import pandas as pd
import plotly.express as px

from data_loader import load_enriched_data

# =====================================
# PAGE CONFIG
# =====================================

st.title("💰 ROI Simulator")

st.markdown(
    "Interactive retention budget planning tool for banking leadership."
)

# =====================================
# LOAD DATA
# =====================================

df = load_enriched_data()

if df is None:
    st.error("Enriched prediction data not found.")
    st.stop()

# =====================================
# FILTER HIGH RISK
# =====================================

high_risk = df[
    df["churn_probability"] >= 0.75
]

# =====================================
# SIDEBAR CONTROLS
# =====================================

st.sidebar.header("Simulation Controls")

budget = st.sidebar.slider(
    "Retention Budget (₹)",
    100000,
    5000000,
    3000000,
    step=100000
)

cost_per_customer = st.sidebar.slider(
    "Intervention Cost / Customer (₹)",
    500,
    10000,
    2000,
    step=500
)

retention_rate = st.sidebar.slider(
    "Retention Success Rate (%)",
    1,
    100,
    35
)

# =====================================
# CALCULATIONS
# =====================================

target_customers = int(
    budget / cost_per_customer
)

selected = high_risk.head(
    target_customers
)

total_risk = selected[
    "customer_lifetime_value"
].sum()

saved_revenue = (
    total_risk *
    (retention_rate / 100)
)

roi = (
    saved_revenue - budget
)

# =====================================
# KPI CARDS
# =====================================

col1, col2, col3, col4 = st.columns(4)

col1.metric(
    "Revenue At Risk",
    f"₹{total_risk/1e7:.2f} Cr"
)

col2.metric(
    "Customers Targeted",
    f"{len(selected)}"
)

col3.metric(
    "Expected Revenue Saved",
    f"₹{saved_revenue/1e7:.2f} Cr"
)

col4.metric(
    "Projected ROI",
    f"₹{roi/1e7:.2f} Cr"
)

# =====================================
# CHART
# =====================================

chart_df = pd.DataFrame({
    "Metric": [
        "Retention Budget",
        "Expected Revenue Saved"
    ],
    "Value": [
        budget,
        saved_revenue
    ]
})

fig = px.bar(
    chart_df,
    x="Metric",
    y="Value",
    color="Metric",
    title="Revenue Saved vs Intervention Cost"
)

st.plotly_chart(
    fig,
    use_container_width=True
)

# =====================================
# TABLE
# =====================================

st.subheader(
    "Top Customers Selected For Intervention"
)

cols = [
    "customer_id",
    "churn_probability",
    "customer_lifetime_value"
]

st.dataframe(
    selected[cols].head(20)
)