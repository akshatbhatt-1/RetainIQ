# 🏦 RetainIQ — Customer Churn Prediction System

## 👥 Team RetainIQ



--------
| Name |
--------
| Akshat Bhatt | 
| Aishwariya Solanke | 
| Vipul Jain |



> **ChurnZero Hackathon Submission** | Team: RetainIQ  
> *Identify at-risk banking customers before they leave — and act fast.*

---

## 📌 Overview

**RetainIQ** is an end-to-end Customer Retention Intelligence System built for banking institutions. It predicts whether a customer will churn (close their account or become inactive) in an upcoming period, assigns a risk category, and surfaces actionable countermeasures powered by an AI API with Retrieval-Augmented Generation (RAG).

The system ingests 97 features across 8 behavioral and demographic categories, produces a churn probability score per customer, and enables retention teams to act with precision — not guesswork.

---

## 🚨 Problem Statement

Given a customer's profile, banking relationship, transactional behavior, digital engagement, complaint history, and marketing response data — **predict churn before it happens**.

| Dataset | Rows | Target |
|---|---|---|
| `ChurnZero_Dataset_v1.csv` | 8,101 | ✅ Included |
| `ChurnZero_Test_v1.csv` | 2,026 | ❌ Held-out |

---

## ✨ Key Features

- 🔴 **Risk Categorization** — Customers segmented into High / Medium / Low churn risk tiers
- ⚡ **Early Warning System** — Proactive alerts triggered by behavioral signals
- 🤖 **AI-Powered Countermeasures** — Smart RAG API suggests tailored retention actions per customer profile
- 📊 **EDA & Insights Dashboard** — Visual breakdown of churn drivers and customer segments
- 🔁 **Fully Reproducible Pipeline** — End-to-end Python notebook, from raw data to final predictions

---

## 🗂️ Project Structure

```
ChurnZero_RetainIQ/
│
├── data/
│   ├── ChurnZero_Dataset_v1.csv        # Training data (8,101 rows, labelled)
│   └── ChurnZero_Test_v1.csv           # Test data (2,026 rows, no target)
│
├── notebooks/
│   └── ChurnZero_RetainIQ_Code.ipynb   # Main reproducible pipeline (run top-to-bottom)
│
├── outputs/
│   ├── ChurnZero_RetainIQ_Predictions.csv    # Final predictions (churn_prediction + churn_probability)
│   └── feature_importance.png                # Top churn driver chart
│
├── rag/
│   ├── rag_engine.py                   # RAG query engine (AI API integration)
│   ├── knowledge_base/                 # Retention strategy documents (indexed)
│   └── countermeasures.py              # Maps risk tier → retention action
│
├── presentation/
│   └── ChurnZero_RetainIQ_Presentation.pptx
│
├── requirements.txt
└── README.md                           # You are here
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Python **3.9+**
- pip or conda

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/ChurnZero_RetainIQ.git
cd ChurnZero_RetainIQ
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

<details>
<summary>📦 Core dependencies</summary>

```
pandas
numpy
scikit-learn
xgboost
lightgbm
imbalanced-learn
matplotlib
seaborn
shap
optuna
jupyter
openai          # or anthropic — for the RAG/AI API feature
faiss-cpu       # vector store for RAG
```

</details>

### 4. Add Your Data

Place the dataset files inside the `data/` folder:

```
data/ChurnZero_Dataset_v1.csv
data/ChurnZero_Test_v1.csv
```

### 5. Run the Notebook

```bash
jupyter notebook notebooks/ChurnZero_RetainIQ_Code.ipynb
```

Run all cells top-to-bottom. Predictions will be saved automatically to `outputs/ChurnZero_RetainIQ_Predictions.csv`.

---

## 🤖 AI API & RAG — Smart Countermeasures

RetainIQ includes an optional AI-powered layer that uses **Retrieval-Augmented Generation (RAG)** to recommend real-time, context-aware retention actions for at-risk customers.

### How It Works

```
Customer Profile + Risk Score
         │
         ▼
  RAG Query Engine
  (searches indexed knowledge base of retention strategies)
         │
         ▼
  AI API (LLM)
  (generates personalized countermeasure recommendation)
         │
         ▼
  Retention Alert: "Offer 3-month fee waiver + dedicated RM callback"
```

### Setup

1. Add your API key to a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=your_key_here
# or
OPENAI_API_KEY=your_key_here
```

2. Index the knowledge base (run once):

```bash
python rag/rag_engine.py --index
```

3. Query for a specific customer:

```python
from rag.countermeasures import get_recommendation

recommendation = get_recommendation(
    customer_id="CUST_00123",
    risk_tier="High",
    top_drivers=["balance_decline_percentage", "complaint_resolution_time", "last_login_days"]
)
print(recommendation)
```

### Example Output

```
Customer CUST_00123 | Risk: 🔴 HIGH (probability: 0.87)

⚠️  Top Churn Signals:
  - Balance dropped 42% over last 3 months
  - 2 unresolved complaints (avg resolution: 11 days)
  - No app login in 28 days

💡 Recommended Actions:
  1. Trigger priority callback from Relationship Manager within 24 hrs
  2. Offer personalized fixed-deposit rate upgrade
  3. Escalate complaint ID #4421 to fast-track resolution team
```

---

## 📈 Model Performance

| Metric | Score |
|---|---|
| **PR-AUC** | *(fill after evaluation)* |
| **F1 Score (positive class)** | *(fill after evaluation)* |
| **Business Cost (FN=₹40K, FP=₹500)** | *(fill after evaluation)* |

### Risk Tier Thresholds

| Tier | Churn Probability | Action |
|---|---|---|
| 🔴 High | ≥ 0.70 | Immediate intervention |
| 🟡 Medium | 0.40 – 0.69 | Proactive outreach |
| 🟢 Low | < 0.40 | Monitor |

---

## 🔍 Feature Categories

| Category | Count | Example Features |
|---|---|---|
| Customer Profile | 12 | age, gender, annual_income, city_tier |
| Relationship & Tenure | 10 | tenure_months, customer_lifetime_value |
| Account & Transaction Behaviour | 15 | avg_monthly_balance, balance_decline_percentage |
| Product Holding | 10 | savings_account_flag, fixed_deposit_flag |
| Credit Card & Loan Behaviour | 10 | credit_utilization_ratio, loan_default_risk_score |
| Digital Banking Engagement | 10 | mobile_app_login_count, last_login_days |
| Service & Complaint Behaviour | 10 | total_complaints, nps_score, satisfaction_score |
| Marketing & Retention | 10 | retention_offer_accepted, competitor_bank_offer_awareness |

---

## 📤 Deliverables

| File | Description |
|---|---|
| `ChurnZero_RetainIQ_Predictions.csv` | 2,026 rows with `churn_prediction` (0/1) and `churn_probability` (float) |
| `ChurnZero_RetainIQ_Presentation.pptx` | Executive slide deck (≤15 slides) |
| `ChurnZero_RetainIQ_Code.ipynb` | Fully reproducible Python notebook |

---


---

## 📄 License

This project was built for the **ChurnZero Hackathon 2026**. All dataset usage is governed by the competition's terms and conditions.

---

*Built with ❤️ by Team RetainIQ*
