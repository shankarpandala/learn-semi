

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
      ],
    },
  ],
};
