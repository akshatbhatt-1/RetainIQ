import pandas as pd

df = pd.read_csv(
    "data/final_churn_intelligence.csv"
)


def ask_ai(query):

    query = query.lower()

    # =========================================
    # CHURN RATE
    # =========================================

    if "churn rate" in query:

        churn_rate = (
            df["churn"].mean() * 100
        )

        return f"""
Current portfolio churn rate is
{churn_rate:.2f}%.

This indicates a moderate retention risk
across the banking customer base.
"""

    # =========================================
    # HIGH RISK PERSONA
    # =========================================

    elif (
        "highest risk persona" in query or
        "highest revenue risk" in query
    ):

        persona_risk = df.groupby(
            "persona_name"
        )["revenue_at_risk"].sum()

        top_persona = persona_risk.idxmax()

        value = persona_risk.max()

        return f"""
The persona contributing the highest
revenue risk is:

{top_persona}

Estimated exposure:
${value:,.0f}

This segment should be prioritized
for proactive retention campaigns.
"""

    # =========================================
    # HIGH VALUE CUSTOMERS
    # =========================================

    elif (
        "high-value customers" in query or
        "premium customers" in query
    ):

        high_value = df[
            df["customer_lifetime_value"]
            >
            df["customer_lifetime_value"].median()
        ]

        risk = (
            high_value["churn_probability"]
            .mean() * 100
        )

        return f"""
High-value customers currently show an
average churn probability of {risk:.2f}%.

Primary drivers include:
- declining engagement
- financial stress
- complaint escalation

Recommended strategy:
personalized retention incentives.
"""

    # =========================================
    # SILENT CHURN
    # =========================================

    elif (
        "silent churn" in query or
        "engagement" in query
    ):

        avg_risk = df[
            "silent_churn_risk"
        ].mean()

        return f"""
Silent churn indicators are increasing.

Average silent churn risk score:
{avg_risk:.2f}

Key behavioral signals:
- reduced logins
- declining digital engagement
- lower transaction activity
"""

    # =========================================
    # RETENTION STRATEGY
    # =========================================

    elif (
        "retention" in query or
        "strategy" in query
    ):

        return """
Recommended retention strategies:

- proactive outreach for high-risk users
- loyalty rewards for premium customers
- digital engagement campaigns
- complaint resolution acceleration
- personalized financial wellness offers
"""

    # =========================================
    # DEFAULT RESPONSE
    # =========================================

    else:

        return """
AI Copilot Analysis:

The banking portfolio shows elevated churn
risk among financially stressed and digitally
inactive customer segments.

Recommended focus areas:

- improve customer engagement
- prioritize high-value retention
- reduce complaint escalation
- monitor silent churn indicators
"""