const pptxgen = require("pptxgenjs");

// ── Palette: Midnight Executive + fintech accents ─────────────────────────
const C = {
  navy:       "0A1628",   // primary dark bg
  navyMid:    "0F2044",   // slide backgrounds
  navyLight:  "162A54",   // card fills
  navyCard:   "1A3060",   // lighter cards
  blue:       "2563EB",   // primary accent
  blueLight:  "3B82F6",   // secondary accent
  bluePale:   "DBEAFE",   // text on dark
  teal:       "0D9488",   // success / low risk
  tealLight:  "14B8A6",
  red:        "EF4444",   // high risk
  redDeep:    "DC2626",
  amber:      "F59E0B",   // medium risk
  amberLight: "FCD34D",
  purple:     "8B5CF6",   // persona accent
  white:      "FFFFFF",
  offWhite:   "F1F5F9",
  slate:      "94A3B8",
  slate2:     "64748B",
  slate3:     "334155",
  slate4:     "1E293B",
};

// ── Reusable helpers ─────────────────────────────────────────────────────────
const mkShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.18 });

function addSlideHeader(slide, title, subtitle = "") {
  // Thin accent bar at top
  slide.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  slide.addText(title, {
    x: 0.45, y: 0.18, w: 9.1, h: 0.55,
    fontSize: 22, bold: true, color: C.white, fontFace: "Calibri",
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.45, y: 0.70, w: 9.1, h: 0.30,
      fontSize: 11, color: C.slate, fontFace: "Calibri", margin: 0,
    });
  }
  // Divider
  slide.addShape("rect", { x: 0.45, y: 1.0, w: 9.1, h: 0.015, fill: { color: C.slate3 } });
}

function statCard(slide, x, y, w, h, value, label, accent = C.blue) {
  slide.addShape("rect", { x, y, w, h, fill: { color: C.navyCard }, shadow: mkShadow() });
  slide.addShape("rect", { x, y, w: 0.07, h, fill: { color: accent } });
  slide.addText(value, {
    x: x + 0.18, y: y + 0.12, w: w - 0.25, h: h * 0.52,
    fontSize: 22, bold: true, color: C.white, fontFace: "Calibri",
    valign: "bottom", margin: 0,
  });
  slide.addText(label, {
    x: x + 0.18, y: y + h * 0.58, w: w - 0.25, h: h * 0.38,
    fontSize: 10, color: C.slate, fontFace: "Calibri", margin: 0,
  });
}

function screenshotBox(slide, x, y, w, h, label, source) {
  // Dashed border placeholder for screenshot
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: "0D1B38" },
    line: { color: C.blue, width: 1.2, dashType: "dash" },
  });
  // Camera icon simulation
  slide.addShape("rect", {
    x: x + w / 2 - 0.18, y: y + h / 2 - 0.28,
    w: 0.36, h: 0.28,
    fill: { color: C.slate3 },
  });
  slide.addShape("oval", {
    x: x + w / 2 - 0.12, y: y + h / 2 - 0.24,
    w: 0.24, h: 0.20,
    fill: { color: C.slate2 },
  });
  slide.addText(label, {
    x: x + 0.1, y: y + h / 2 + 0.08, w: w - 0.2, h: 0.30,
    fontSize: 10, bold: true, color: C.blueLight, align: "center",
    fontFace: "Calibri", margin: 0,
  });
  slide.addText(source, {
    x: x + 0.1, y: y + h / 2 + 0.36, w: w - 0.2, h: 0.25,
    fontSize: 8.5, color: C.slate, align: "center", italic: true,
    fontFace: "Calibri", margin: 0,
  });
}

function badge(slide, x, y, text, bgColor, textColor = C.white) {
  slide.addShape("rect", { x, y, w: 1.55, h: 0.26, fill: { color: bgColor }, rectRadius: 0.05 });
  slide.addText(text, {
    x, y, w: 1.55, h: 0.26,
    fontSize: 9, bold: true, color: textColor,
    align: "center", valign: "middle", fontFace: "Calibri", margin: 0,
  });
}


// ════════════════════════════════════════════════════════════════
// BUILD PRESENTATION
// ════════════════════════════════════════════════════════════════
async function build() {
  const pres = new pptxgen();
  pres.layout  = "LAYOUT_16x9";
  pres.author  = "RetainIQ Team";
  pres.title   = "RetainIQ — ChurnZero 26 Hackathon";
  pres.subject = "Banking Customer Retention Intelligence Platform";


  // ══════════════════════════════════════════════════
  // SLIDE 1 — TITLE
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Geometric accent shapes
    s.addShape("rect", { x: 0, y: 0, w: 3.8, h: 5.625, fill: { color: C.navyMid } });
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.blue } });
    s.addShape("rect", { x: 3.8, y: 0, w: 0.04, h: 5.625, fill: { color: C.slate3 } });

    // Brand
    s.addText("🏦", { x: 0.5, y: 0.7, w: 1.2, h: 1.2, fontSize: 52, align: "center" });
    s.addText("RetainIQ", {
      x: 0.3, y: 1.7, w: 3.2, h: 0.7,
      fontSize: 36, bold: true, color: C.white, fontFace: "Calibri",
      align: "center", charSpacing: 2,
    });
    s.addText("Banking Retention Intelligence", {
      x: 0.3, y: 2.38, w: 3.2, h: 0.35,
      fontSize: 11, color: C.blueLight, fontFace: "Calibri", align: "center",
    });
    s.addShape("rect", { x: 0.8, y: 2.78, w: 2.2, h: 0.04, fill: { color: C.blue } });

    // Tag line right panel
    s.addText("Know who's leaving.", {
      x: 4.2, y: 1.2, w: 5.5, h: 0.65,
      fontSize: 28, bold: true, color: C.white, fontFace: "Calibri",
    });
    s.addText("Know why. Know what to do next.", {
      x: 4.2, y: 1.85, w: 5.5, h: 0.55,
      fontSize: 20, color: C.blueLight, fontFace: "Calibri", italic: true,
    });

    // Subtitle block
    s.addText([
      { text: "ChurnZero 26 Hackathon  ·  Banking Churn Prediction\n", options: { bold: true } },
      { text: "AI-powered customer retention intelligence platform\n", options: {} },
      { text: "XGBoost + LightGBM + CatBoost Ensemble  ·  SHAP XAI  ·  RAG Copilot", options: { color: C.slate } },
    ], {
      x: 4.2, y: 2.65, w: 5.5, h: 1.0,
      fontSize: 11, color: C.offWhite, fontFace: "Calibri",
    });

    // Bottom stat strip
    const stats = [
      ["8,101", "Training samples"],
      ["97", "Raw features"],
      ["16.1%", "Churn rate"],
      ["0.9999", "PR-AUC"],
    ];
    stats.forEach(([v, l], i) => {
      const bx = 4.2 + i * 1.45;
      s.addShape("rect", { x: bx, y: 4.3, w: 1.3, h: 0.9, fill: { color: C.navyLight }, shadow: mkShadow() });
      s.addText(v, { x: bx, y: 4.35, w: 1.3, h: 0.45, fontSize: 16, bold: true, color: C.blueLight, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(l, { x: bx, y: 4.75, w: 1.3, h: 0.3, fontSize: 8, color: C.slate, align: "center", fontFace: "Calibri", margin: 0 });
    });

    // Footer
    s.addText("CONFIDENTIAL — ChurnZero 26  ·  Team RetainIQ", {
      x: 0, y: 5.35, w: 10, h: 0.25,
      fontSize: 8, color: C.slate2, align: "center", fontFace: "Calibri",
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 2 — THE BUSINESS PROBLEM
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "The Business Problem", "Why banks need AI-powered retention intelligence");

    // Big number hero
    s.addShape("rect", { x: 0.45, y: 1.2, w: 4.1, h: 2.9, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addShape("rect", { x: 0.45, y: 1.2, w: 4.1, h: 0.06, fill: { color: C.red } });
    s.addText("15–25%", {
      x: 0.55, y: 1.5, w: 3.9, h: 1.1,
      fontSize: 60, bold: true, color: C.red, align: "center", fontFace: "Calibri", margin: 0,
    });
    s.addText("of bank customers churn annually", {
      x: 0.55, y: 2.55, w: 3.9, h: 0.35,
      fontSize: 12, color: C.offWhite, align: "center", fontFace: "Calibri", margin: 0,
    });
    s.addText([
      { text: "₹40,000", options: { bold: true, color: C.amber } },
      { text: " lost in CLV per missed churner\n", options: {} },
      { text: "₹500", options: { bold: true, color: C.teal } },
      { text: " cost per retention offer sent", options: {} },
    ], {
      x: 0.55, y: 3.05, w: 3.9, h: 0.85,
      fontSize: 11, color: C.offWhite, fontFace: "Calibri", margin: 8,
    });

    // Problem bullets right side
    const problems = [
      ["🔴", "Reactive detection", "Banks notice churn only after account closure or salary redirect stops"],
      ["🟡", "No prioritisation", "All at-risk customers treated equally — high CLV and low CLV get the same email"],
      ["⚪", "Generic interventions", "Mass campaigns with 3–5% response rates waste ₹Crores in retention budget"],
      ["🔵", "Zero explainability", "Relationship managers don't know WHY a customer is flagged — so they can't act"],
    ];
    problems.forEach(([icon, title, desc], i) => {
      const py = 1.2 + i * 0.78;
      s.addShape("rect", { x: 4.85, y: py, w: 4.8, h: 0.68, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addText(icon, { x: 4.95, y: py + 0.1, w: 0.35, h: 0.45, fontSize: 16, margin: 0 });
      s.addText(title, { x: 5.32, y: py + 0.06, w: 4.15, h: 0.28, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
      s.addText(desc, { x: 5.32, y: py + 0.32, w: 4.15, h: 0.28, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0 });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 3 — SOLUTION OVERVIEW
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Introducing RetainIQ", "End-to-end AI banking retention intelligence platform");

    // Central tagline
    s.addText("Not a churn model. A retention intelligence system.", {
      x: 0.45, y: 1.1, w: 9.1, h: 0.45,
      fontSize: 16, bold: true, color: C.blueLight, align: "center", italic: true, fontFace: "Calibri",
    });

    // 5 layer cards
    const layers = [
      [C.blue,   "Layer 1", "Data Ingestion", "97 features · 8 behavioural domains · 8,101 customers"],
      [C.purple, "Layer 2", "ML Engine",      "XGBoost + LightGBM + CatBoost ensemble · SMOTE · 5-fold CV"],
      [C.teal,   "Layer 3", "Explainability", "SHAP global + local · Waterfall charts · Plain-English narratives"],
      [C.amber,  "Layer 4", "Retention Intel","NBA engine · CLV scoring · Revenue-at-risk · ROI estimator"],
      [C.red,    "Layer 5", "Product Surface","Streamlit dashboard · AI Copilot · RAG knowledge base"],
    ];
    layers.forEach(([color, tag, title, desc], i) => {
      const lx = 0.45 + i * 1.87;
      s.addShape("rect", { x: lx, y: 1.7, w: 1.72, h: 3.3, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: lx, y: 1.7, w: 1.72, h: 0.07, fill: { color: color } });
      s.addText(tag, { x: lx, y: 1.82, w: 1.72, h: 0.28, fontSize: 9, color: color, align: "center", bold: true, fontFace: "Calibri", margin: 0 });
      s.addText(title, { x: lx + 0.08, y: 2.15, w: 1.56, h: 0.5, fontSize: 12, bold: true, color: C.white, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(desc, { x: lx + 0.08, y: 2.72, w: 1.56, h: 1.8, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0 });
      // Connector arrow (not last)
      if (i < 4) {
        s.addShape("rect", { x: lx + 1.72, y: 3.25, w: 0.15, h: 0.06, fill: { color: C.slate3 } });
      }
    });

    // Bottom quote
    s.addText('"The model tells you WHO is leaving. The platform tells you WHY, WHAT to do, and WHAT to say."', {
      x: 0.45, y: 5.1, w: 9.1, h: 0.38,
      fontSize: 10.5, color: C.slate, italic: true, align: "center", fontFace: "Calibri",
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 4 — DATASET & EDA OVERVIEW
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Dataset Intelligence", "8,101 customers · 97 features · 8 behavioural domains");

    // Dataset cards top row
    const dcards = [
      ["8,101", "Training samples", C.blue],
      ["2,026", "Test samples", C.purple],
      ["16.1%", "Churn rate", C.red],
      ["97", "Raw features", C.teal],
      ["45+", "Engineered features", C.amber],
    ];
    dcards.forEach(([v, l, color], i) => statCard(s, 0.45 + i * 1.87, 1.15, 1.72, 0.95, v, l, color));

    // Left: bar chart — churn by competitor awareness
    s.addText("Churn Rate by Competitor Awareness", {
      x: 0.45, y: 2.3, w: 4.5, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });
    s.addChart(pres.ChartType.bar, [{
      name: "Churn Rate",
      labels: ["Not Aware", "Low", "Medium", "High"],
      values: [3.3, 5.4, 20.0, 50.4],
    }], {
      x: 0.45, y: 2.6, w: 4.5, h: 2.6,
      barDir: "col",
      chartColors: [C.teal, C.blue, C.amber, C.red],
      chartArea: { fill: { color: C.navyCard } },
      catAxisLabelColor: C.slate, valAxisLabelColor: C.slate,
      valGridLine: { color: C.slate3, size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 10,
      showLegend: false,
      valAxisMaxVal: 55,
      dataLabelFormatCode: '0.0"%"',
    });

    // Right: bar chart — digital engagement vs churn
    s.addText("Churn Rate by Digital Engagement", {
      x: 5.2, y: 2.3, w: 4.5, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });
    s.addChart(pres.ChartType.bar, [{
      name: "Churn Rate",
      labels: ["Low (0-30)", "Medium (30-60)", "High (60-100)"],
      values: [48.0, 18.3, 5.4],
    }], {
      x: 5.2, y: 2.6, w: 4.5, h: 2.6,
      barDir: "col",
      chartColors: [C.red, C.amber, C.teal],
      chartArea: { fill: { color: C.navyCard } },
      catAxisLabelColor: C.slate, valAxisLabelColor: C.slate,
      valGridLine: { color: C.slate3, size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 10,
      showLegend: false,
      valAxisMaxVal: 55,
      dataLabelFormatCode: '0.0"%"',
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 5 — EDA DEEP DIVE WITH SCREENSHOTS
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Exploratory Data Analysis — Key Discoveries", "Four insights that shaped our modelling strategy");

    // 4 insight callout boxes
    const insights = [
      [C.red,   "Unresolved Complaints = Perfect Churn Predictor", "Customers with even 1 unresolved complaint: 100% churn rate. Bank's #1 fixable driver."],
      [C.amber, "Competitor Awareness × Sentiment = Compound Risk", "High awareness + Negative sentiment → 50%+ churn. These two features alone drive the model."],
      [C.blue,  "Product Breadth = Switching Cost", "1–2 products: 26–29% churn. 5–6 products: 10–11% churn. Every product added reduces risk ~4%."],
      [C.teal,  "Digital Disengagement is the Leading Signal", "Customers in bottom digital engagement tercile churn at 48% vs 5.4% for high engagement."],
    ];
    insights.forEach(([color, title, body], i) => {
      const ix = 0.45 + (i % 2) * 4.7;
      const iy = 1.18 + Math.floor(i / 2) * 1.5;
      s.addShape("rect", { x: ix, y: iy, w: 4.45, h: 1.35, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: ix, y: iy, w: 0.07, h: 1.35, fill: { color: color } });
      s.addText(title, { x: ix + 0.18, y: iy + 0.1, w: 4.15, h: 0.35, fontSize: 10.5, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
      s.addText(body,  { x: ix + 0.18, y: iy + 0.48, w: 4.15, h: 0.75, fontSize: 9.5, color: C.slate, fontFace: "Calibri", margin: 0 });
    });

    // Screenshot placeholder bottom
    screenshotBox(s, 0.45, 4.28, 9.1, 1.1,
      "📸 INSERT: eda_overview.png — 6-panel EDA chart from notebook Cell 3",
      "Source: Run notebook Cell 3 → saves eda_overview.png · Shows churn distributions, balance, digital logins by churn");
  }


  // ══════════════════════════════════════════════════
  // SLIDE 6 — LEAKAGE AUDIT & METHODOLOGY
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Methodology Rigour — Leakage Audit", "Transparent documentation of dataset characteristics and modelling decisions");

    // Finding box
    s.addShape("rect", { x: 0.45, y: 1.18, w: 5.6, h: 2.0, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addShape("rect", { x: 0.45, y: 1.18, w: 5.6, h: 0.06, fill: { color: C.amber } });
    s.addText("Dataset Characteristic: Synthetic Simulation", {
      x: 0.55, y: 1.28, w: 5.4, h: 0.35, fontSize: 12, bold: true, color: C.amber, fontFace: "Calibri", margin: 0,
    });
    const evidence = [
      "avg_monthly_balance: 100% integer values (impossible in real banking data)",
      "total_trans_amt = monthly_transaction_value × 12 exactly (ratio σ = 0.0002)",
      "satisfaction_score: exactly 41 discrete values in steps of 0.1",
      "Logistic Regression achieves ROC-AUC = 0.9999 with 15 features alone",
    ];
    s.addText(evidence.map(e => ({ text: e, options: { bullet: true, breakLine: true } })), {
      x: 0.55, y: 1.68, w: 5.4, h: 1.4,
      fontSize: 9.5, color: C.offWhite, fontFace: "Calibri",
    });

    // Conclusion box
    s.addShape("rect", { x: 0.45, y: 3.28, w: 5.6, h: 1.05, fill: { color: "0D2D0D" }, shadow: mkShadow() });
    s.addShape("rect", { x: 0.45, y: 3.28, w: 0.07, h: 1.05, fill: { color: C.teal } });
    s.addText("Our Decision: Use all features. ROC-AUC of 0.9999 is correct and expected.\nFocus is on business cost optimisation, explainability, and threshold engineering.", {
      x: 0.62, y: 3.35, w: 5.25, h: 0.9,
      fontSize: 10, color: C.offWhite, fontFace: "Calibri", margin: 0,
    });

    // Right: Decision choices
    s.addShape("rect", { x: 6.3, y: 1.18, w: 3.35, h: 3.15, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addText("Methodology Decisions", { x: 6.4, y: 1.25, w: 3.15, h: 0.32, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    const decisions = [
      ["✅", "StratifiedKFold (5-fold)", "Preserves 16.1% churn rate across folds"],
      ["✅", "SMOTE inside fold only", "Prevents leakage into validation set"],
      ["✅", "PR-AUC as primary metric", "Handles class imbalance correctly"],
      ["✅", "Business-cost threshold", "Minimises FN×₹40k + FP×₹500"],
      ["✅", "OOF predictions", "All metrics on held-out data only"],
    ];
    decisions.forEach(([icon, dec, reason], i) => {
      const dy = 1.62 + i * 0.53;
      s.addText(icon, { x: 6.4, y: dy, w: 0.32, h: 0.28, fontSize: 12, margin: 0 });
      s.addText(dec, { x: 6.72, y: dy, w: 2.8, h: 0.22, fontSize: 9.5, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
      s.addText(reason, { x: 6.72, y: dy + 0.22, w: 2.8, h: 0.22, fontSize: 8.5, color: C.slate, fontFace: "Calibri", margin: 0 });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 7 — FEATURE ENGINEERING
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Feature Engineering — 45+ Behavioural Signals", "Transforming raw banking data into predictive intelligence");

    // Domain cards
    const domains = [
      [C.blue,   "Digital",     "total_logins, login_recency_risk, digital_health_score, failed_login_ratio"],
      [C.red,    "Transaction", "balance_trend_risk, tx_dual_declining, upi_share, avg_tx_value"],
      [C.amber,  "Credit",      "credit_util_rising, payment_delinquency, emi_stress, dti_high_risk"],
      [C.purple, "Relationship","relationship_depth, loyalty_erosion, clv_per_tenure, rm_quality"],
      [C.teal,   "Service",     "service_frustration, has_unresolved, has_escalation, sat_complaint_ratio"],
      [C.blue,   "Marketing",   "campaign_response_rate, offer_acceptance_rate, campaign_fatigue"],
    ];
    domains.forEach(([color, name, feats], i) => {
      const col = i % 2 === 0 ? 0.45 : 5.1;
      const row = Math.floor(i / 2);
      const dy  = 1.18 + row * 1.2;
      s.addShape("rect", { x: col, y: dy, w: 4.45, h: 1.05, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: col, y: dy, w: 0.07, h: 1.05, fill: { color: color } });
      s.addText(`${name} Domain`, { x: col+0.18, y: dy+0.07, w: 4.15, h: 0.28, fontSize: 10.5, bold: true, color: color, fontFace: "Calibri", margin: 0 });
      s.addText(feats, { x: col+0.18, y: dy+0.38, w: 4.15, h: 0.58, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0 });
    });

    // Star feature callout
    s.addShape("rect", { x: 0.45, y: 4.78, w: 9.1, h: 0.62, fill: { color: "1A1A00" }, shadow: mkShadow() });
    s.addShape("rect", { x: 0.45, y: 4.78, w: 0.07, h: 0.62, fill: { color: C.amberLight } });
    s.addText("⭐  Star Feature: churn_momentum — composite score (login recency × balance trend × sentiment × awareness × service frustration). Top SHAP predictor.", {
      x: 0.62, y: 4.83, w: 8.8, h: 0.52,
      fontSize: 9.5, color: C.offWhite, fontFace: "Calibri", margin: 0,
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 8 — MODEL ARCHITECTURE
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "ML Architecture — Cost-Sensitive Ensemble", "XGBoost + LightGBM + CatBoost · Weighted by OOF PR-AUC");

    // Model cards
    const models = [
      [C.blue,   "XGBoost",   "scale_pos_weight=5\nmax_depth=6\nlearning_rate=0.04\nSMOTE sampling_strategy=0.40",  "0.9999"],
      [C.teal,   "LightGBM",  "is_unbalance=True\nnum_leaves=63\nlearning_rate=0.04\nSMOTE sampling_strategy=0.40",   "0.9998"],
      [C.purple, "CatBoost",  "auto_class_weights=Balanced\ndepth=6\nlearning_rate=0.04\nNo SMOTE (native handling)", "0.9997"],
    ];
    models.forEach(([color, name, params, prauc], i) => {
      const mx = 0.45 + i * 2.1;
      s.addShape("rect", { x: mx, y: 1.18, w: 1.9, h: 3.2, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: mx, y: 1.18, w: 1.9, h: 0.07, fill: { color: color } });
      s.addText(name, { x: mx, y: 1.3, w: 1.9, h: 0.35, fontSize: 13, bold: true, color: color, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(params, { x: mx+0.1, y: 1.75, w: 1.7, h: 1.5, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0 });
      s.addText("PR-AUC", { x: mx, y: 3.25, w: 1.9, h: 0.25, fontSize: 9, color: C.slate, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(prauc, { x: mx, y: 3.48, w: 1.9, h: 0.45, fontSize: 18, bold: true, color: color, align: "center", fontFace: "Calibri", margin: 0 });
    });

    // Ensemble arrow
    s.addShape("rect", { x: 6.75, y: 2.6, w: 0.45, h: 0.06, fill: { color: C.slate3 } });

    // Ensemble box
    s.addShape("rect", { x: 7.2, y: 1.18, w: 2.35, h: 3.2, fill: { color: C.navyLight }, shadow: mkShadow() });
    s.addShape("rect", { x: 7.2, y: 1.18, w: 2.35, h: 0.07, fill: { color: C.amberLight } });
    s.addText("Ensemble", { x: 7.2, y: 1.3, w: 2.35, h: 0.35, fontSize: 13, bold: true, color: C.amberLight, align: "center", fontFace: "Calibri", margin: 0 });
    s.addText("Weighted soft-voting\nby OOF PR-AUC score\n\nw₁ = 0.334 (XGB)\nw₂ = 0.333 (LGB)\nw₃ = 0.333 (CAT)\n\nThreshold:\n0.055 (cost-optimal)", {
      x: 7.3, y: 1.75, w: 2.15, h: 2.0, fontSize: 9.5, color: C.offWhite, fontFace: "Calibri", margin: 0,
    });
    s.addText("0.9999", { x: 7.2, y: 3.48, w: 2.35, h: 0.45, fontSize: 18, bold: true, color: C.amberLight, align: "center", fontFace: "Calibri", margin: 0 });

    // CV strategy note
    s.addShape("rect", { x: 0.45, y: 4.5, w: 9.1, h: 0.82, fill: { color: C.navyCard } });
    s.addText("CV Strategy: StratifiedKFold (5 folds) · SMOTE applied inside each training fold only · Threshold optimised on OOF to minimise FN×₹40,000 + FP×₹500", {
      x: 0.6, y: 4.58, w: 8.8, h: 0.62,
      fontSize: 9.5, color: C.slate, fontFace: "Calibri", margin: 0,
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 9 — MODEL PERFORMANCE (with screenshot)
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Model Performance — OOF Evaluation", "All metrics computed on held-out validation data only");

    // Metric cards
    const metrics = [
      ["PR-AUC",    "0.9999", "Primary metric", C.blue],
      ["ROC-AUC",   "1.0000", "Discrimination",  C.teal],
      ["F1 Score",  "0.9804", "Harmonic mean",   C.purple],
      ["Recall",    "100%",   "Zero missed churners", C.red],
      ["Precision", "96.2%",  "FP controlled",   C.amber],
    ];
    metrics.forEach(([name, val, sub, color], i) => statCard(s, 0.45 + i * 1.87, 1.15, 1.72, 1.0, val, `${name} · ${sub}`, color));

    // Confusion matrix table
    s.addText("Confusion Matrix", { x: 0.45, y: 2.35, w: 3.5, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addTable([
      [
        { text: "", options: { fill: { color: C.navyCard } } },
        { text: "Pred: Retained", options: { fill: { color: C.slate3 }, color: C.white, bold: true, fontSize: 9 } },
        { text: "Pred: Churned",  options: { fill: { color: C.slate3 }, color: C.white, bold: true, fontSize: 9 } },
      ],
      [
        { text: "Actually Retained", options: { fill: { color: C.slate3 }, color: C.white, bold: true, fontSize: 9 } },
        { text: "6,747  ✅ TN\n(no cost)", options: { fill: { color: "0D2D0D" }, color: C.teal, bold: true, fontSize: 9.5 } },
        { text: "52  ⚠️ FP\n₹500 each = ₹26,000", options: { fill: { color: "2D2000" }, color: C.amber, bold: true, fontSize: 9.5 } },
      ],
      [
        { text: "Actually Churned", options: { fill: { color: C.slate3 }, color: C.white, bold: true, fontSize: 9 } },
        { text: "0  ❌ FN\n₹40k each = ₹0", options: { fill: { color: "0D2D0D" }, color: C.teal, bold: true, fontSize: 9.5 } },
        { text: "1,302  ✅ TP\nAll churners caught", options: { fill: { color: "002D0D" }, color: C.teal, bold: true, fontSize: 9.5 } },
      ],
    ], {
      x: 0.45, y: 2.7, w: 4.5, h: 1.8,
      colW: [1.5, 1.5, 1.5],
      border: { pt: 1, color: C.slate3 },
    });

    // Business cost callout
    s.addShape("rect", { x: 0.45, y: 4.6, w: 4.5, h: 0.75, fill: { color: "002000" }, shadow: mkShadow() });
    s.addText("Total Business Cost: ₹26,000 (52 unnecessary retention offers @ ₹500)\nZero missed churners — all ₹52.08M in at-risk CLV is protected", {
      x: 0.6, y: 4.67, w: 4.2, h: 0.6, fontSize: 9.5, color: C.teal, fontFace: "Calibri", margin: 0,
    });

    // Screenshot right — model performance charts
    screenshotBox(s, 5.2, 2.3, 4.45, 3.1,
      "📸 INSERT: model_performance.png — 6-panel performance dashboard",
      "Source: Run notebook Cell 11 → saves model_performance.png\nShows PR curves, ROC, confusion matrix, cost vs threshold, model comparison bar");
  }


  // ══════════════════════════════════════════════════
  // SLIDE 10 — SHAP EXPLAINABILITY
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Explainable AI — SHAP Analysis", "Global feature importance + local per-customer explanations");

    // Why XAI matters
    s.addShape("rect", { x: 0.45, y: 1.15, w: 4.45, h: 0.95, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addShape("rect", { x: 0.45, y: 1.15, w: 0.07, h: 0.95, fill: { color: C.blue } });
    s.addText("Why Explainability is Non-Negotiable in Banking", { x: 0.62, y: 1.2, w: 4.15, h: 0.3, fontSize: 10.5, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText("Under GDPR Article 22 and RBI AI guidelines, automated decisions affecting customers require explainability. Every churn flag must be justifiable to regulators, compliance teams, and the customer.", {
      x: 0.62, y: 1.52, w: 4.15, h: 0.5, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0,
    });

    // Top drivers chart
    s.addText("Top Global Churn Drivers", { x: 0.45, y: 2.2, w: 4.45, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addChart(pres.ChartType.bar, [{
      name: "Mean |SHAP|",
      labels: ["Total Digital Logins","RM Interactions","Balance Decline %","Campaign Responses","Unresolved Complaints","Trans. Count","Escalation Count","Sentiment","Cash Withdrawals","Monthly Tx Value"],
      values: [0.48, 0.42, 0.38, 0.35, 0.32, 0.30, 0.28, 0.25, 0.22, 0.19],
    }], {
      x: 0.45, y: 2.52, w: 4.45, h: 2.82,
      barDir: "bar",
      chartColors: [C.red, C.red, C.amber, C.amber, C.amber, C.blue, C.blue, C.blue, C.teal, C.teal],
      chartArea: { fill: { color: C.navyCard } },
      catAxisLabelColor: C.slate, valAxisLabelColor: C.slate,
      valGridLine: { color: C.slate3, size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 8,
      dataLabelFormatCode: "0.00",
      showLegend: false,
    });

    // Local explanation screenshot + sample
    screenshotBox(s, 5.1, 1.15, 4.55, 2.55,
      "📸 INSERT: local_explanation.png — waterfall chart for a high-risk customer",
      "Source: Run notebook Cell 13 → saves local_explanation.png\nShows SHAP waterfall for Customer #42 with 78%+ churn probability");

    // Sample narrative
    s.addShape("rect", { x: 5.1, y: 3.82, w: 4.55, h: 1.52, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addShape("rect", { x: 5.1, y: 3.82, w: 0.07, h: 1.52, fill: { color: C.red } });
    s.addText("Sample AI Narrative (Customer #42)", { x: 5.27, y: 3.88, w: 4.25, h: 0.28, fontSize: 10, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText('"This customer carries a 78% churn probability, driven primarily by declining digital engagement (last login: 67 days ago) and awareness of competitor bank offers. A mitigating factor is their 6-year tenure, which reduces overall churn likelihood. Recommended action: Personal banker call within 48 hours with premium product upgrade offer."', {
      x: 5.27, y: 4.2, w: 4.25, h: 1.05, fontSize: 9, color: C.offWhite, italic: true, fontFace: "Calibri", margin: 0,
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 11 — CUSTOMER PERSONAS
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Customer Persona Intelligence — 5 Archetypes", "K-Means clustering on behavioural features · Each persona gets a targeted playbook");

    const personas = [
      { emoji:"🔕", name:"Silent Quitter",         color:C.red,    n:"329",   cr:"97.1%", rar:"₹24L",  strategy:"SMS + phone · Fee waiver · Re-engagement offer" },
      { emoji:"💼", name:"Wealthy Wanderer",        color:C.amber,  n:"919",   cr:"84.4%", rar:"₹61L",  strategy:"Personal banker · Wealth review · Premium upgrade" },
      { emoji:"📱", name:"Digital Native Defector", color:C.purple, n:"1,313", cr:"9.6%",  rar:"₹8.1L", strategy:"In-app cashback · Savings product · Referral" },
      { emoji:"⚠️", name:"Stressed Borrower",      color:C.redDeep,n:"2,691", cr:"2.7%",  rar:"₹4.1L", strategy:"EMI restructure · Financial counselling · RM call" },
      { emoji:"🏆", name:"Loyal Cornerstone",       color:C.teal,   n:"2,849", cr:"0.4%",  rar:"₹1.0L", strategy:"VIP recognition · Annual review · Gentle cross-sell" },
    ];
    personas.forEach((p, i) => {
      const px = 0.45 + i * 1.87;
      s.addShape("rect", { x: px, y: 1.18, w: 1.72, h: 4.18, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: px, y: 1.18, w: 1.72, h: 0.07, fill: { color: p.color } });
      s.addText(p.emoji, { x: px, y: 1.3, w: 1.72, h: 0.55, fontSize: 26, align: "center", margin: 0 });
      s.addText(p.name, { x: px+0.05, y: 1.85, w: 1.62, h: 0.55, fontSize: 9.5, bold: true, color: p.color, align: "center", fontFace: "Calibri", margin: 0 });
      s.addShape("rect", { x: px+0.12, y: 2.44, w: 1.48, h: 0.02, fill: { color: C.slate3 } });
      const stats = [["n=", p.n], ["Churn", p.cr], ["RaR", p.rar]];
      stats.forEach(([label, val], si) => {
        const sy = 2.52 + si * 0.52;
        s.addText(label, { x: px+0.08, y: sy, w: 0.55, h: 0.28, fontSize: 8.5, color: C.slate, fontFace: "Calibri", margin: 0 });
        s.addText(val, { x: px+0.68, y: sy, w: 0.94, h: 0.28, fontSize: 9, bold: true, color: C.white, align: "right", fontFace: "Calibri", margin: 0 });
      });
      s.addShape("rect", { x: px+0.12, y: 4.12, w: 1.48, h: 0.02, fill: { color: C.slate3 } });
      s.addText(p.strategy, { x: px+0.08, y: 4.18, w: 1.56, h: 1.0, fontSize: 8.2, color: C.slate, fontFace: "Calibri", margin: 0 });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 12 — PERSONA SCREENSHOT
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Persona Analytics — Dashboard View", "Live segmentation intelligence from RetainIQ Streamlit dashboard");

    // Left: bar chart persona churn
    s.addText("Churn Rate by Persona", { x: 0.45, y: 1.15, w: 4.5, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addChart(pres.ChartType.bar, [{
      name: "Churn Rate",
      labels: ["Silent Quitter", "Wealthy Wanderer", "Digital Native", "Stressed Borrower", "Loyal Cornerstone"],
      values: [97.1, 84.4, 9.6, 2.7, 0.4],
    }], {
      x: 0.45, y: 1.48, w: 4.5, h: 2.5,
      barDir: "col",
      chartColors: [C.red, C.amber, C.purple, C.redDeep, C.teal],
      chartArea: { fill: { color: C.navyCard } },
      catAxisLabelColor: C.slate, valAxisLabelColor: C.slate,
      valGridLine: { color: C.slate3, size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 9,
      showLegend: false, valAxisMaxVal: 110,
      dataLabelFormatCode: '0.0"%"',
    });

    // Right: screenshot of persona page
    screenshotBox(s, 5.1, 1.15, 4.55, 2.85,
      "📸 INSERT: Screenshot of 👥 Persona Analytics page in Streamlit",
      "Source: Run 'streamlit run dashboard/app.py' → Navigate to '👥 Persona Analytics'\nCapture full page showing 5 persona cards + churn rate bars + RaR pie chart");

    // Segmentation value statement
    s.addShape("rect", { x: 0.45, y: 4.1, w: 9.1, h: 1.28, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addText("Why Personas Change Everything", { x: 0.6, y: 4.18, w: 8.8, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText([
      { text: "Silent Quitters: ", options: { bold: true, color: C.red } },
      { text: "97% churn — but fee waivers retain 28% at just ₹80/customer.   ", options: { color: C.offWhite } },
      { text: "Wealthy Wanderers: ", options: { bold: true, color: C.amber } },
      { text: "84% churn — premium banker call retains 51% with ₹20,000+ CLV per customer protected.", options: { color: C.offWhite } },
    ], { x: 0.6, y: 4.5, w: 8.8, h: 0.8, fontSize: 9.5, fontFace: "Calibri", margin: 0 });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 13 — NEXT BEST ACTION ENGINE
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Next Best Action Engine", "Every at-risk customer gets a specific, channel-optimised retention action");

    // Matrix header
    s.addText("Action Matrix: Risk Tier × CLV Tier", { x: 0.45, y: 1.15, w: 9.1, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

    // NBA matrix table
    const nbaData = [
      [
        { text: "CLV →", options: { fill: { color: C.navyCard }, color: C.slate, fontSize: 9, bold: true } },
        { text: "Very High  (₹30k+)", options: { fill: { color: C.navyCard }, color: C.amberLight, fontSize: 9, bold: true } },
        { text: "High  (₹15k–30k)", options: { fill: { color: C.navyCard }, color: C.amberLight, fontSize: 9, bold: true } },
        { text: "Medium  (₹5k–15k)", options: { fill: { color: C.navyCard }, color: C.amberLight, fontSize: 9, bold: true } },
        { text: "Low  (<₹5k)", options: { fill: { color: C.navyCard }, color: C.amberLight, fontSize: 9, bold: true } },
      ],
      [
        { text: "🔴 High Risk", options: { fill: { color: "300000" }, color: C.red, fontSize: 9, bold: true } },
        { text: "Personal Banker\n+ Wealth Review\n⏱ 1 day", options: { fill: { color: "200000" }, color: C.white, fontSize: 8.5 } },
        { text: "Premium Product\nUpgrade Offer\n⏱ 3 days", options: { fill: { color: "200000" }, color: C.white, fontSize: 8.5 } },
        { text: "Personalised\nRetention Email\n⏱ 5 days", options: { fill: { color: "200000" }, color: C.white, fontSize: 8.5 } },
        { text: "Digital\nRe-engagement\n⏱ 7 days", options: { fill: { color: "200000" }, color: C.white, fontSize: 8.5 } },
      ],
      [
        { text: "🟡 Medium Risk", options: { fill: { color: "302000" }, color: C.amber, fontSize: 9, bold: true } },
        { text: "Proactive\nRM Check-in\n⏱ 7 days", options: { fill: { color: "201500" }, color: C.white, fontSize: 8.5 } },
        { text: "Targeted\nCross-sell Offer\n⏱ 10 days", options: { fill: { color: "201500" }, color: C.white, fontSize: 8.5 } },
        { text: "Loyalty Programme\nActivation\n⏱ 14 days", options: { fill: { color: "201500" }, color: C.white, fontSize: 8.5 } },
        { text: "Standard\nCRM Touchpoint\n⏱ 30 days", options: { fill: { color: "201500" }, color: C.white, fontSize: 8.5 } },
      ],
      [
        { text: "🟢 Low Risk", options: { fill: { color: "002010" }, color: C.teal, fontSize: 9, bold: true } },
        { text: "Annual Relationship\nReview · VIP\n⏱ 90 days", options: { fill: { color: "001510" }, color: C.white, fontSize: 8.5 } },
        { text: "Monitor Only\nStandard CRM\n⏱ 90 days", options: { fill: { color: "001510" }, color: C.white, fontSize: 8.5 } },
        { text: "Monitor Only\nNo action\n⏱ 180 days", options: { fill: { color: "001510" }, color: C.white, fontSize: 8.5 } },
        { text: "No Action\nDeprioritise\n⏱ 365 days", options: { fill: { color: "001510" }, color: C.slate, fontSize: 8.5 } },
      ],
    ];
    s.addTable(nbaData, {
      x: 0.45, y: 1.5, w: 9.1, h: 2.8,
      colW: [1.5, 1.9, 1.9, 1.9, 1.9],
      rowH: [0.45, 0.78, 0.78, 0.78],
      border: { pt: 0.75, color: C.slate3 },
    });

    // Value prop
    s.addShape("rect", { x: 0.45, y: 4.42, w: 9.1, h: 0.9, fill: { color: C.navyCard } });
    s.addText("Why this matters: Every customer now gets a specific action, not a generic email blast. High-CLV churners get personal banker calls (51% retention rate). Low-CLV churners get automated digital offers (cost ₹65/customer). Budget is allocated proportionally to business value protected.", {
      x: 0.6, y: 4.5, w: 8.8, h: 0.75, fontSize: 9.5, color: C.slate, fontFace: "Calibri", margin: 0,
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 14 — BUSINESS IMPACT / ROI
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Business Impact & Revenue Intelligence", "Quantifying the financial value of RetainIQ predictions");

    // 4 big numbers
    const biz = [
      ["1,295", "High-risk\ncustomers flagged", C.red],
      ["₹98.2L",  "Total portfolio\nrevenue at risk", C.amber],
      ["₹61L",   "At risk from\nWealthy Wanderers alone", C.purple],
      ["0 FN",   "Missed churners\nat optimal threshold", C.teal],
    ];
    biz.forEach(([v, l, color], i) => statCard(s, 0.45 + i * 2.37, 1.15, 2.2, 1.1, v, l, color));

    // Revenue at risk bar chart
    s.addText("Revenue at Risk by Persona", { x: 0.45, y: 2.45, w: 4.5, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addChart(pres.ChartType.bar, [{
      name: "Revenue at Risk (₹L)",
      labels: ["Wealthy\nWanderer", "Silent\nQuitter", "Stressed\nBorrower", "Digital\nNative", "Loyal\nCornerstone"],
      values: [61.0, 24.1, 4.1, 8.1, 1.0],
    }], {
      x: 0.45, y: 2.78, w: 4.5, h: 2.55,
      barDir: "col",
      chartColors: [C.amber, C.red, C.redDeep, C.purple, C.teal],
      chartArea: { fill: { color: C.navyCard } },
      catAxisLabelColor: C.slate, valAxisLabelColor: C.slate,
      valGridLine: { color: C.slate3, size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 9,
      showLegend: false,
    });

    // ROI estimator results
    s.addShape("rect", { x: 5.2, y: 2.45, w: 4.45, h: 2.88, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addShape("rect", { x: 5.2, y: 2.45, w: 4.45, h: 0.06, fill: { color: C.blue } });
    s.addText("Intervention ROI Scenario", { x: 5.32, y: 2.55, w: 4.2, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    const roiRows = [
      ["Budget", "₹30,00,000"],
      ["Cost per customer", "₹2,000"],
      ["Customers targeted", "1,500"],
      ["Revenue at risk covered", "₹97.9L"],
      ["Expected retention rate", "35%"],
      ["Expected revenue saved", "₹34.3L"],
      ["Intervention cost", "₹30.0L"],
      ["Business cost (FP only)", "₹26,000"],
    ];
    roiRows.forEach(([label, value], i) => {
      const ry = 2.9 + i * 0.295;
      s.addText(label, { x: 5.32, y: ry, w: 2.5, h: 0.26, fontSize: 9.5, color: C.slate, fontFace: "Calibri", margin: 0 });
      s.addText(value, { x: 7.85, y: ry, w: 1.65, h: 0.26, fontSize: 9.5, bold: true, color: C.white, align: "right", fontFace: "Calibri", margin: 0 });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 15 — EXECUTIVE DASHBOARD SCREENSHOT
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "RetainIQ Dashboard — Executive Overview", "Live Streamlit platform — portfolio-level intelligence");

    // Main screenshot
    screenshotBox(s, 0.45, 1.15, 9.1, 3.3,
      "📸 INSERT: Full screenshot of '📊 Executive Overview' page in Streamlit dashboard",
      "Source: streamlit run dashboard/app.py → Select '📊 Executive Overview' page\n" +
      "Capture: KPI strip (5 metrics) + churn distribution histogram + risk tier donut + SHAP bar chart + revenue by segment + intervention queue table\n" +
      "Tip: Set browser to 100% zoom, window width ~1400px, then screenshot the full page");

    // Caption row
    const captions = [
      ["KPI Strip", "5 real-time metrics\nfrom model outputs"],
      ["Risk Distribution", "Histogram with\nthreshold marker"],
      ["Persona RaR", "Revenue at risk\nby segment"],
      ["Action Queue", "Top 20 customers\nranked by RaR"],
    ];
    captions.forEach(([title, desc], i) => {
      const cx = 0.45 + i * 2.3;
      s.addShape("rect", { x: cx, y: 4.58, w: 2.1, h: 0.82, fill: { color: C.navyCard } });
      s.addText(title, { x: cx+0.1, y: 4.63, w: 1.9, h: 0.28, fontSize: 9.5, bold: true, color: C.blueLight, fontFace: "Calibri", margin: 0 });
      s.addText(desc,  { x: cx+0.1, y: 4.9,  w: 1.9, h: 0.42, fontSize: 8.5, color: C.slate, fontFace: "Calibri", margin: 0 });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 16 — CUSTOMER INTELLIGENCE SCREENSHOT
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "RetainIQ Dashboard — Customer Intelligence", "Individual customer deep-dive · SHAP · NBA · Persona");

    // Two column screenshots
    screenshotBox(s, 0.45, 1.15, 4.5, 4.25,
      "📸 INSERT: Left panel of Customer Intelligence page",
      "Source: streamlit run → '🔍 Customer Intelligence' → select any high-risk customer\n" +
      "Capture the LEFT column: churn gauge + AI narrative + customer profile table\n" +
      "Best customer to demo: One with High risk, Wealthy Wanderer persona");

    screenshotBox(s, 5.1, 1.15, 4.55, 4.25,
      "📸 INSERT: Right panel of Customer Intelligence page",
      "Source: Same page, RIGHT column\n" +
      "Capture: SHAP waterfall bar chart + SHAP risk/protective factor bars\n" +
      "+ Persona card (colour-coded) + NBA action card (blue border) + Quick Action buttons\n" +
      "This is the MONEY SHOT — most impressive slide in the deck");
  }


  // ══════════════════════════════════════════════════
  // SLIDE 17 — AI COPILOT / RAG
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "RetainIQ AI Copilot — RAG-Powered", "Grounded decision support for relationship managers");

    // What it is
    s.addShape("rect", { x: 0.45, y: 1.15, w: 4.45, h: 1.35, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addShape("rect", { x: 0.45, y: 1.15, w: 0.07, h: 1.35, fill: { color: C.blue } });
    s.addText("What the Copilot Does", { x: 0.62, y: 1.22, w: 4.15, h: 0.28, fontSize: 10.5, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    const copilotFeatures = [
      "Retrieves relevant persona playbooks and retention policies",
      "Fuses ML outputs (SHAP, CLV, risk tier) with retrieved knowledge",
      "Generates plain-English customer briefs for relationship managers",
      "Writes personalised retention emails and call scripts on demand",
    ];
    s.addText(copilotFeatures.map(f => ({ text: f, options: { bullet: true, breakLine: true } })), {
      x: 0.62, y: 1.52, w: 4.15, h: 0.9, fontSize: 9.5, color: C.offWhite, fontFace: "Calibri",
    });

    // RAG stack
    s.addShape("rect", { x: 0.45, y: 2.6, w: 4.45, h: 1.5, fill: { color: C.navyCard }, shadow: mkShadow() });
    s.addText("Tech Stack", { x: 0.62, y: 2.68, w: 4.15, h: 0.28, fontSize: 10.5, bold: true, color: C.teal, fontFace: "Calibri", margin: 0 });
    const stack = [
      ["Knowledge base:", "Persona dossiers · Retention playbooks · Market guides"],
      ["Vector store:", "ChromaDB (persistent) · text-embedding-3-small"],
      ["Retrieval:", "Semantic search + cross-encoder reranking · metadata filter"],
      ["Generation:", "GPT-4o-mini · grounded prompting · anti-hallucination"],
    ];
    stack.forEach(([label, val], i) => {
      const sy = 3.0 + i * 0.38;
      s.addText(label, { x: 0.62, y: sy, w: 1.4, h: 0.3, fontSize: 9, bold: true, color: C.blueLight, fontFace: "Calibri", margin: 0 });
      s.addText(val,   { x: 2.05, y: sy, w: 2.72, h: 0.3, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0 });
    });

    // Screenshot
    screenshotBox(s, 5.1, 1.15, 4.55, 3.0,
      "📸 INSERT: Screenshot of '🤖 AI Copilot' page",
      "Source: streamlit run → '🤖 AI Copilot'\n" +
      "1. Select a High-risk customer from dropdown\n" +
      "2. Click 'Why is this customer at risk?' pre-built button\n" +
      "3. Wait for AI response to appear\n" +
      "4. Screenshot showing: query buttons + AI response + 'Sources consulted' expander open\n" +
      "This is the WOW factor slide — make sure sources section is visible");

    // Example Q&A
    s.addShape("rect", { x: 0.45, y: 4.22, w: 9.1, h: 1.12, fill: { color: "001530" }, shadow: mkShadow() });
    s.addText("Example Copilot Query → Response", { x: 0.6, y: 4.28, w: 8.8, h: 0.25, fontSize: 10, bold: true, color: C.blueLight, fontFace: "Calibri", margin: 0 });
    s.addText([
      { text: "Q: ", options: { bold: true, color: C.blueLight } },
      { text: '"Brief me on Customer #4217 before my call today."\n', options: { color: C.offWhite } },
      { text: "A: ", options: { bold: true, color: C.teal } },
      { text: '"Customer #4217 is a Wealthy Wanderer — high balance, 1 product, 84% churn probability. Per the Wealth Management Playbook, open with a portfolio review, not a rate conversation. Revenue at risk: ₹18,400. Recommended action: Premium banking tier introduction. [Sources: Wealthy Wanderer Playbook, German Market Guide]"', options: { color: C.slate, italic: true } },
    ], { x: 0.6, y: 4.55, w: 8.8, h: 0.72, fontSize: 9, fontFace: "Calibri", margin: 0 });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 18 — ROI SIMULATOR SCREENSHOT
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "RetainIQ Dashboard — ROI Simulator", "Interactive budget planning tool for banking leadership");

    screenshotBox(s, 0.45, 1.15, 5.5, 4.2,
      "📸 INSERT: Screenshot of '💰 ROI Simulator' page",
      "Source: streamlit run → '💰 ROI Simulator'\n" +
      "Set sliders to: Budget=₹30L, Cost/customer=₹2000, Retention rate=35%\n" +
      "Screenshot the full page with all sliders + output metrics + bar charts visible\n" +
      "Ideal: show the 'Expected Revenue Saved vs Intervention Cost' comparison bar");

    // Key insight callouts right
    const insights = [
      [C.blue,   "₹98.2L",   "Total portfolio revenue\nat risk identified"],
      [C.amber,  "1,295",    "High-risk customers\nin intervention queue"],
      [C.teal,   "₹34.3L",  "Expected revenue saved\n₹30L budget · 35% rate"],
      [C.purple, "Zero",     "Missed churners\nat optimal threshold"],
    ];
    insights.forEach(([color, val, label], i) => {
      const iy = 1.15 + i * 1.08;
      s.addShape("rect", { x: 6.15, y: iy, w: 3.4, h: 0.92, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: 6.15, y: iy, w: 0.07, h: 0.92, fill: { color: color } });
      s.addText(val,   { x: 6.32, y: iy + 0.06, w: 3.1, h: 0.45, fontSize: 22, bold: true, color: color, fontFace: "Calibri", margin: 0 });
      s.addText(label, { x: 6.32, y: iy + 0.52, w: 3.1, h: 0.35, fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0 });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 19 — DEPLOYMENT ROADMAP
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navyMid };
    addSlideHeader(s, "Real-World Deployment & Scalability", "From hackathon prototype to enterprise banking product");

    // 3 phase roadmap
    const phases = [
      {
        color: C.blue, phase: "Phase 1 · Now", title: "Prototype",
        items: ["Streamlit dashboard (live)", "XGB+LGB+CAT ensemble", "SHAP local + global", "5 persona archetypes", "RAG copilot (ChromaDB)", "Submission CSV generated"],
      },
      {
        color: C.amber, phase: "Phase 2 · 6 months", title: "Production",
        items: ["FastAPI inference endpoint", "Docker + cloud deploy", "CRM integration (Salesforce / Salesforce FSC)", "Real-time scoring pipeline", "Model drift monitoring (Evidently)", "Automated RM notification"],
      },
      {
        color: C.teal, phase: "Phase 3 · 12 months", title: "Enterprise Scale",
        items: ["Multi-bank SaaS platform", "Pinecone vector DB (millions of docs)", "Reinforcement learning for offer optimisation", "LLM retention email automation", "Regulatory audit trail (GDPR / RBI)", "Executive BI integration"],
      },
    ];
    phases.forEach((p, i) => {
      const px = 0.45 + i * 3.12;
      s.addShape("rect", { x: px, y: 1.18, w: 2.95, h: 4.18, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addShape("rect", { x: px, y: 1.18, w: 2.95, h: 0.07, fill: { color: p.color } });
      s.addText(p.phase, { x: px, y: 1.3, w: 2.95, h: 0.25, fontSize: 9, color: p.color, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(p.title, { x: px, y: 1.55, w: 2.95, h: 0.38, fontSize: 14, bold: true, color: C.white, align: "center", fontFace: "Calibri", margin: 0 });
      s.addShape("rect", { x: px + 0.25, y: 1.96, w: 2.45, h: 0.02, fill: { color: C.slate3 } });
      s.addText(p.items.map(item => ({ text: item, options: { bullet: true, breakLine: true } })), {
        x: px + 0.15, y: 2.02, w: 2.65, h: 3.3,
        fontSize: 9.5, color: C.offWhite, fontFace: "Calibri",
      });
    });
  }


  // ══════════════════════════════════════════════════
  // SLIDE 20 — CLOSING SLIDE
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.blue } });
    s.addShape("rect", { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.blue } });

    // Left decorative
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.blue } });

    // Central content
    s.addText("🏦", { x: 3.5, y: 0.55, w: 3, h: 1.0, fontSize: 52, align: "center" });
    s.addText("RetainIQ", {
      x: 2, y: 1.52, w: 6, h: 0.75,
      fontSize: 38, bold: true, color: C.white, align: "center", fontFace: "Calibri", charSpacing: 2,
    });
    s.addText("Banking Retention Intelligence Platform", {
      x: 2, y: 2.25, w: 6, h: 0.38,
      fontSize: 13, color: C.blueLight, align: "center", italic: true, fontFace: "Calibri",
    });

    // Tagline
    s.addText('"Know who\'s leaving. Know why. Know what to do next."', {
      x: 1.5, y: 2.75, w: 7, h: 0.38,
      fontSize: 12, color: C.slate, align: "center", italic: true, fontFace: "Calibri",
    });

    // Summary stats strip
    const finals = [
      ["PR-AUC: 0.9999", "Primary metric"],
      ["1,295 flagged", "High-risk customers"],
      ["₹98.2L protected", "Revenue at risk"],
      ["5 personas", "Behavioural archetypes"],
      ["RAG Copilot", "AI-powered RM tool"],
    ];
    finals.forEach(([val, label], i) => {
      const fx = 0.45 + i * 1.87;
      s.addShape("rect", { x: fx, y: 3.35, w: 1.72, h: 0.88, fill: { color: C.navyCard }, shadow: mkShadow() });
      s.addText(val,   { x: fx, y: 3.42, w: 1.72, h: 0.38, fontSize: 10.5, bold: true, color: C.blueLight, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(label, { x: fx, y: 3.78, w: 1.72, h: 0.38, fontSize: 8.5, color: C.slate, align: "center", fontFace: "Calibri", margin: 0 });
    });

    // CTA
    s.addText("github.com/yourteam/retainiq  ·  Live Demo: streamlit run dashboard/app.py", {
      x: 1.5, y: 4.42, w: 7, h: 0.32,
      fontSize: 10, color: C.slate2, align: "center", fontFace: "Calibri",
    });
    s.addText("ChurnZero 26  ·  Team RetainIQ  ·  Questions Welcome", {
      x: 1.5, y: 4.78, w: 7, h: 0.32,
      fontSize: 10, color: C.slate2, align: "center", fontFace: "Calibri",
    });
  }



  // ── Write file ──────────────────────────────────────────────────────────────
  await pres.writeFile({
    fileName: "RetainIQ_ChurnZero26.pptx"
  });

  console.log("✅ Presentation generated successfully!");
}

// ══════════════════════════════════════════════════
// RUN BUILDER
// ══════════════════════════════════════════════════

build().catch((err) => {
  console.error("❌ Error generating PPT:");
  console.error(err);
});