

export const subject16 = {
  id: "predictive-maintenance",
  number: 16,
  title: "Predictive Maintenance",
  description:
    "Apply ML to predict equipment failures before they happen — reducing unplanned downtime and saving millions in fab operations.",
  phase: 5,
  chapters: [
    {
      id: "equipment-downtime",
      title: "The Equipment Downtime Problem",
      subtitle: "Cost of unplanned downtime, PM vs PdM, and the sensor data landscape",
      sections: [
        {
          id: "downtime-cost",
          title: "The Cost of Unplanned Downtime",
          content: `
<h2>The Cost of Unplanned Downtime</h2>
<p>A modern semiconductor fab runs 24/7/365, and every minute of equipment downtime is incredibly expensive:</p>
<ul>
  <li><strong>Direct cost:</strong> A single etch or deposition tool processes $50,000–200,000 worth of wafers per hour. Unplanned downtime directly stops production.</li>
  <li><strong>Ripple effects:</strong> Downstream tools sit idle waiting for wafers. Work-in-progress (WIP) inventory backs up. Cycle time increases for all wafers in the fab.</li>
  <li><strong>Quality risk:</strong> Sudden failures can damage wafers in the chamber — scrapping entire lots worth millions of dollars.</li>
  <li><strong>Typical cost:</strong> Industry estimates suggest unplanned downtime costs <strong>$100K–$500K per hour</strong> per critical tool, considering all effects.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: PM vs PdM</h3>
  <p><strong>Preventive Maintenance (PM):</strong> Replace parts on a fixed schedule (e.g., every 2,000 RF-hours). Safe but wasteful — parts are often replaced with useful life remaining. <strong>Predictive Maintenance (PdM):</strong> Use sensor data and ML to predict when a part will actually need replacement. Maximizes part life while preventing unexpected failures.</p>
</div>`,
        },
        {
          id: "equipment-health",
          title: "Equipment Health Monitoring",
          content: `
<h2>Equipment Health Monitoring</h2>
<p>Fab equipment generates vast amounts of sensor data that reflect equipment health:</p>
<ul>
  <li><strong>FDC (Fault Detection and Classification):</strong> Equipment sensors sampled at 1–10 Hz during processing — temperatures, pressures, flows, RF parameters, motor currents, valve positions.</li>
  <li><strong>Equipment logs:</strong> Discrete events — alarms, interlocks, PM events, error codes, recipe changes.</li>
  <li><strong>Chamber match data:</strong> Periodic qualification runs that measure chamber performance consistency.</li>
  <li><strong>Consumable tracking:</strong> RF hours on generators, wafer count on electrostatic chucks, process kit (focus ring, edge ring) usage.</li>
</ul>
<p>A single tool can generate <strong>1–10 GB of sensor data per day</strong>. Across a fab with 1,000+ tools, this creates a massive data lake for ML applications.</p>
<div class="analogy">
  <h3>Analogy: Car Diagnostics</h3>
  <p>Think of PdM as the "check engine" light — but instead of a simple warning, imagine your car constantly streaming thousands of sensor readings (engine temp, vibration, oil pressure, exhaust composition) to an AI that predicts exactly when each component will need service.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the estimated cost of unplanned downtime for a critical fab tool?",
          options: [
            "$100K–$500K per hour",
            "$1,000–$5,000 per hour",
            "$10–$50 per hour",
            "$1M+ per minute",
          ],
          correctIndex: 0,
          explanation:
            "Unplanned downtime for a critical semiconductor tool costs an estimated $100K–$500K per hour when considering lost production, ripple effects, and potential wafer damage.",
        },
        {
          question: "What is the key advantage of PdM over traditional PM?",
          options: [
            "Parts are replaced based on actual condition, maximizing life while preventing failures",
            "PdM is cheaper to implement",
            "PdM doesn't require any sensors",
            "PdM eliminates the need for spare parts",
          ],
          correctIndex: 0,
          explanation:
            "PdM uses sensor data and ML to predict actual component degradation, replacing parts only when needed — avoiding both premature replacement (waste) and unexpected failures (costly downtime).",
        },
      ],
    },
    {
      id: "sensor-data-features",
      title: "Sensor Data & Feature Engineering",
      subtitle: "Equipment traces, FDC data, time-series features, and health indicators",
      sections: [
        {
          id: "fdc-data-structure",
          title: "Understanding FDC Data",
          content: `
<h2>Understanding FDC Data</h2>
<p><strong>FDC (Fault Detection and Classification)</strong> data is the foundation of PdM in fabs. Understanding its structure is essential:</p>
<ul>
  <li><strong>Trace data:</strong> Time-series sensor readings during each process run. Example: chamber pressure sampled at 10 Hz during a 60-second etch step = 600 data points per parameter per run.</li>
  <li><strong>Summary statistics:</strong> Aggregated values per run — mean, std dev, max, min, slope of each parameter during each recipe step. This is often the starting point for ML models.</li>
  <li><strong>Context data:</strong> Which chamber, which recipe, lot ID, wafer slot, timestamp, PM history, consumable age.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Feature Engineering for Equipment Data</h3>
  <p>Raw sensor time series must be transformed into meaningful features. Common approaches:</p>
  <ul>
    <li>Step-level statistics (mean, std, trend, range per recipe step)</li>
    <li>Deviation from golden trace (DTW distance, residual analysis)</li>
    <li>Rolling statistics over recent runs (moving average, EWMA)</li>
    <li>Time since last PM, cumulative RF hours, wafer count</li>
    <li>Rate of change features (how fast is a parameter drifting?)</li>
  </ul>
</div>`,
        },
        {
          id: "health-indicators",
          title: "Building Health Indicators",
          content: `
<h2>Building Health Indicators</h2>
<p>A <strong>health indicator (HI)</strong> is a derived metric that tracks equipment degradation over time. Good HIs should:</p>
<ul>
  <li><strong>Monotonically degrade:</strong> Consistently trend in one direction as the component ages</li>
  <li><strong>Be prognostic:</strong> Start changing well before failure occurs, giving time to plan maintenance</li>
  <li><strong>Be interpretable:</strong> Engineers should understand what physical degradation the HI reflects</li>
</ul>
<p>Example HIs for a PVD chamber:</p>
<ul>
  <li>Target life remaining (based on deposition rate trend and voltage drift)</li>
  <li>Chamber matching score (statistical distance from reference chamber)</li>
  <li>Particle adder trend (from periodic blank wafer inspections)</li>
</ul>
<div class="analogy">
  <h3>Analogy: Blood Pressure for Machines</h3>
  <p>Health indicators are like vital signs for equipment. Just as a doctor monitors blood pressure, heart rate, and cholesterol to predict cardiovascular risk, a PdM system monitors equipment vitals to predict maintenance needs.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is FDC data in semiconductor manufacturing?",
          options: [
            "Sensor data collected during equipment processing for fault detection and classification",
            "Financial data about fab costs",
            "Data from final device characterization",
            "Floor plan data for cleanroom design",
          ],
          correctIndex: 0,
          explanation:
            "FDC (Fault Detection and Classification) data consists of equipment sensor readings (temperatures, pressures, flows, RF parameters) collected during wafer processing, used for monitoring equipment health and detecting anomalies.",
        },
        {
          question: "What makes a good health indicator for predictive maintenance?",
          options: [
            "It monotonically degrades, is prognostic (changes before failure), and is interpretable",
            "It's always perfectly constant",
            "It only changes at the moment of failure",
            "It requires no sensor data to compute",
          ],
          correctIndex: 0,
          explanation:
            "A good health indicator consistently trends toward failure (monotonic degradation), provides early warning (prognostic), and can be explained to engineers (interpretable).",
        },
      ],
    },
    {
      id: "ml-models-pdm",
      title: "ML Models for PdM",
      subtitle: "Survival analysis, anomaly detection, RUL estimation, and deep learning",
      sections: [
        {
          id: "pdm-model-types",
          title: "Types of PdM Models",
          content: `
<h2>Types of PdM Models</h2>
<p>Different ML approaches address different PdM questions:</p>
<table>
  <thead>
    <tr><th>Approach</th><th>Question Answered</th><th>Methods</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Anomaly Detection</strong></td><td>Is the tool behaving abnormally right now?</td><td>Isolation Forest, Autoencoders, PCA, One-Class SVM</td></tr>
    <tr><td><strong>Classification</strong></td><td>Will this component fail within N hours?</td><td>Random Forest, XGBoost, Neural Networks</td></tr>
    <tr><td><strong>RUL Estimation</strong></td><td>How many hours until failure?</td><td>LSTM, CNN on time series, survival models</td></tr>
    <tr><td><strong>Survival Analysis</strong></td><td>What's the probability of survival past time T?</td><td>Cox PH, Weibull, Random Survival Forests</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: The Rare Failure Problem</h3>
  <p>In a well-maintained fab, actual failures are rare (class imbalance: 99.9%+ normal). This creates challenges for supervised learning. Approaches: anomaly detection (unsupervised), synthetic oversampling (SMOTE), cost-sensitive learning, or semi-supervised methods that learn "normal" and flag deviations.</p>
</div>`,
        },
        {
          id: "deep-learning-pdm",
          title: "Deep Learning for PdM",
          content: `
<h2>Deep Learning for PdM</h2>
<p>Deep learning has shown promise for PdM, particularly for directly modeling raw sensor time series:</p>
<ul>
  <li><strong>1D-CNNs:</strong> Convolutional networks applied to sensor time series can automatically learn relevant temporal patterns without manual feature engineering.</li>
  <li><strong>LSTMs/GRUs:</strong> Recurrent networks capture long-range dependencies across multiple process runs (e.g., slow drift over hundreds of runs).</li>
  <li><strong>Transformer-based models:</strong> Attention mechanisms can identify which time steps and which sensors are most predictive of impending failure.</li>
  <li><strong>Autoencoders:</strong> Learn a compressed representation of "normal" equipment behavior. Large reconstruction error = abnormal behavior.</li>
</ul>
<p>In practice, <strong>gradient-boosted trees (XGBoost, LightGBM)</strong> on engineered features often outperform deep learning in this domain due to limited training data and the effectiveness of domain-informed features.</p>`,
        },
        {
          id: "survival-analysis-and-rul",
          title: "Survival Analysis and RUL Estimation",
          content: `
<h2>Survival Analysis and RUL Estimation</h2>
<p>Survival analysis is the statistical backbone of PdM. The central object is the <strong>survival function</strong>:</p>
<p style="text-align:center;font-family:serif"><em>S(t) = P(T &gt; t)</em></p>
<p>i.e. the probability that a component is still alive at time <em>t</em>. The complement is the cumulative failure probability F(t) = 1 − S(t), and the instantaneous failure rate (hazard) is <em>h(t) = f(t) / S(t)</em>.</p>
<h3>1. The Weibull model — the workhorse</h3>
<p>Fab equipment lifetimes are routinely fit with the two-parameter Weibull distribution:</p>
<p style="text-align:center;font-family:serif"><em>S(t) = exp(−(t/η)<sup>β</sup>)&nbsp;&nbsp;&nbsp;&nbsp;h(t) = (β/η)(t/η)<sup>β−1</sup></em></p>
<table>
  <thead>
    <tr><th>Shape parameter β</th><th>Meaning</th><th>Typical fab example</th></tr>
  </thead>
  <tbody>
    <tr><td>&lt; 1</td><td>Decreasing hazard ("infant mortality")</td><td>New chamber after install — early-life bugs</td></tr>
    <tr><td>= 1</td><td>Constant hazard (memoryless / exponential)</td><td>Random faults — power supply, sensor failures</td></tr>
    <tr><td>&gt; 1</td><td>Increasing hazard ("wear-out")</td><td>Heater coil, RF generator, focus ring</td></tr>
  </tbody>
</table>
<h3>2. Cox proportional hazards — using covariates</h3>
<p>Adds an exponential effect of covariates <em>x</em> on the baseline hazard:</p>
<p style="text-align:center;font-family:serif"><em>h(t | x) = h<sub>0</sub>(t) · exp(β·x)</em></p>
<p>This lets you say, e.g., "a 10% higher RF reflected power doubles the instantaneous failure rate," without committing to a specific h₀ shape.</p>
<h3>3. RUL from a Weibull HI model</h3>
<p>Once you have an estimated S(t) and the component has already survived to time <em>t<sub>now</sub></em>, the <strong>Remaining Useful Life</strong> is the expectation:</p>
<p style="text-align:center;font-family:serif"><em>RUL(t<sub>now</sub>) = E[T − t<sub>now</sub> | T &gt; t<sub>now</sub>] = ∫<sub>t<sub>now</sub></sub><sup>∞</sup> [S(u)/S(t<sub>now</sub>)] du</em></p>
<pre><code class="language-python">import numpy as np
from scipy.special import gamma

def weibull_rul(t_now: float, eta: float, beta: float) -&gt; float:
    """Remaining useful life under a Weibull lifetime distribution.

    Mean lifetime is eta * Gamma(1 + 1/beta); conditional mean
    given survival to t_now uses numeric integration of S(u)/S(t_now).
    """
    if t_now &lt; 0:
        raise ValueError("t_now must be non-negative")
    # Integrate from t_now to a horizon ~5x mean
    horizon = 5 * eta * gamma(1 + 1 / beta)
    u = np.linspace(t_now, horizon, 4000)
    S = np.exp(-(u / eta) ** beta)
    S_now = np.exp(-(t_now / eta) ** beta)
    return np.trapezoid(S / S_now, u)

# Example: focus ring with eta=1500 RF-hours, beta=2.5 (wear-out)
print(f"RUL at 800 RF-hr: {weibull_rul(800, 1500, 2.5):.0f} hours")
print(f"RUL at 1400 RF-hr: {weibull_rul(1400, 1500, 2.5):.0f} hours")
</code></pre>
<div class="key-concept">
  <h3>Key Concept: Censored Data</h3>
  <p>Most components on the floor right now haven't failed yet — their lifetimes are <strong>right-censored</strong>. Fitting Weibull/Cox models with maximum likelihood properly accounts for censoring (via the survival contribution S(t) for censored points). Use <code>lifelines</code> or <code>scikit-survival</code> in Python rather than ad-hoc dropping of unfinished runs.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why is anomaly detection often preferred over supervised classification for PdM?",
          options: [
            "Actual equipment failures are rare, creating severe class imbalance for supervised learning",
            "Anomaly detection is always more accurate",
            "Supervised learning can't handle time-series data",
            "Anomaly detection doesn't require any data",
          ],
          correctIndex: 0,
          explanation:
            "In well-maintained fabs, failures are extremely rare (<0.1% of runs), creating severe class imbalance. Anomaly detection learns 'normal' behavior and flags deviations, avoiding the need for labeled failure data.",
        },
        {
          question: "What does a Weibull shape parameter β > 1 indicate about a fab component?",
          options: [
            "Increasing hazard rate over time — classic wear-out behaviour",
            "Constant random failures (memoryless)",
            "Decreasing hazard rate — infant mortality",
            "The component never fails",
          ],
          correctIndex: 0,
          explanation:
            "β > 1 means the instantaneous failure rate grows with time. That's the signature of wear-out — heaters, RF generators, focus rings. β = 1 is exponential (constant rate), β < 1 is infant mortality.",
        },
        {
          question: "Why must Weibull/Cox lifetime models be fit with proper censoring handling?",
          options: [
            "Most parts on the floor haven't failed yet; dropping them biases the parameter estimates",
            "Censoring slows training",
            "Censored data contains illegal characters",
            "It's required by SEMI standards",
          ],
          correctIndex: 0,
          explanation:
            "Right-censored lifetimes (still alive at observation time) carry real information through their survival contribution S(t). Tools like lifelines or scikit-survival incorporate that via maximum likelihood; throwing those rows away systematically underestimates lifetimes.",
        },
      ],
    },
    {
      id: "pdm-deployment",
      title: "Deployment & Operations",
      subtitle: "Real-time inference, alert systems, maintenance scheduling, and ROI",
      sections: [
        {
          id: "deployment-challenges",
          title: "Deploying PdM in Production",
          content: `
<h2>Deploying PdM in Production</h2>
<p>Moving from a Jupyter notebook to a production PdM system involves significant engineering:</p>
<ul>
  <li><strong>Data pipeline:</strong> Real-time ingestion of FDC data from 1,000+ tools, cleaning, feature computation, and storage. Must handle missing data, sensor failures, and recipe changes.</li>
  <li><strong>Model serving:</strong> Low-latency inference after each process run (seconds, not minutes). Models must handle multi-chamber, multi-recipe scenarios.</li>
  <li><strong>Alert management:</strong> Converting model scores into actionable alerts. Too many false alarms = alert fatigue (engineers ignore them). Too few = missed failures.</li>
  <li><strong>Integration with MES:</strong> Alerts flow into the Manufacturing Execution System for maintenance scheduling and wafer routing decisions.</li>
  <li><strong>Model monitoring:</strong> Track model performance over time. Equipment changes (new PMs, recipe updates) can invalidate models — requiring retraining or adaptation.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: ROI of PdM</h3>
  <p>A successful PdM system typically delivers 5–15% reduction in unplanned downtime and 10–20% reduction in maintenance costs. For a large fab, this translates to <strong>$10–50M annual savings</strong>. The ROI is compelling, but achieving it requires strong data infrastructure and close collaboration between data scientists and equipment engineers.</p>
</div>`,
        },
        {
          id: "alert-thresholds-and-drift",
          title: "Alert Thresholds, Drift, and the MES Feedback Loop",
          content: `
<h2>Alert Thresholds, Drift, and the MES Feedback Loop</h2>
<p>A PdM model is only as good as the decisions it triggers. Three operational pieces dictate whether the savings actually land.</p>
<h3>1. Setting alert thresholds</h3>
<p>Most fabs adopt a tiered alert scheme — typically a Yellow / Orange / Red triage:</p>
<table>
  <thead>
    <tr><th>Tier</th><th>Trigger</th><th>Action</th></tr>
  </thead>
  <tbody>
    <tr><td>Yellow</td><td>Anomaly score &gt; μ + 3σ on recent window</td><td>Engineer notified, no production stop</td></tr>
    <tr><td>Orange</td><td>Predicted RUL &lt; 24 h with &gt;80% confidence</td><td>Schedule PM in next available slot</td></tr>
    <tr><td>Red</td><td>Predicted RUL &lt; 4 h or hard sensor limit breached</td><td>Tool placed in "PM hold" by MES</td></tr>
  </tbody>
</table>
<h3>2. Model drift</h3>
<p>Equipment evolves: new PMs, new chambers, recipe edits, target swaps. A model trained six months ago can quietly become useless. Monitor drift continuously:</p>
<pre><code class="language-python">from scipy import stats

def feature_drift(train_dist, recent_dist, alpha=0.01):
    """Return True if the recent feature distribution has drifted (KS test)."""
    ks_stat, p_value = stats.ks_2samp(train_dist, recent_dist)
    return p_value &lt; alpha, ks_stat

# Concept-drift retraining trigger
drifted, score = feature_drift(
    train_dist=feature_history["chamber_pressure_mean"][:30_000],
    recent_dist=feature_history["chamber_pressure_mean"][-2_000:],
)
if drifted:
    schedule_retrain(model_id="etch_chamber_rul", reason=f"KS={score:.3f}")
</code></pre>
<h3>3. The MES loop</h3>
<p>The output of the PdM system is not a CSV — it is a structured event posted to the <strong>Manufacturing Execution System (MES)</strong>:</p>
<ul>
  <li>A predicted failure event creates a maintenance ticket in the CMMS</li>
  <li>The scheduler reserves the tool for PM at a low-WIP window</li>
  <li>Wafer routing is rebalanced to peer chambers</li>
  <li>Once PM is closed, the model receives a labelled failure or no-failure event for future retraining</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Closed-Loop Feedback</h3>
  <p>The single biggest lever for PdM accuracy isn't a fancier model — it's a clean closed-loop label pipeline. Every PM ticket should carry the actual failure mode (or "no-fault-found") back to the training set within hours, not weeks. Without that loop, model accuracy decays steadily.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the biggest operational challenge in deploying PdM?",
          options: [
            "Balancing alert sensitivity (catching failures) with specificity (avoiding false alarms)",
            "Training the ML model",
            "Collecting any sensor data at all",
            "Getting management approval",
          ],
          correctIndex: 0,
          explanation:
            "The key operational challenge is tuning alert thresholds: too sensitive means engineers are overwhelmed with false alarms (and start ignoring them), too conservative means real failures are missed.",
        },
        {
          question: "Why is a closed-loop label pipeline (PM tickets feeding back to training) the most important lever for long-term PdM accuracy?",
          options: [
            "Without fresh failure / no-failure labels, the model can't adapt to drift and accuracy decays steadily",
            "It makes the alerts louder",
            "It removes the need for any sensors",
            "It avoids using ML at all",
          ],
          correctIndex: 0,
          explanation:
            "Equipment evolves and so does the failure-mode mix. A clean PM-to-training feedback loop keeps the labelled dataset current, lets retraining catch drift, and is what separates a one-off pilot from a system that quietly works for years.",
        },
      ],
    },
  ],
};
