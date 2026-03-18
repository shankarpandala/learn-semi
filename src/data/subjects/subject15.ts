import { Subject } from "../curriculum";

export const subject15: Subject = {
  id: "virtual-metrology-process-control",
  number: 15,
  title: "Virtual Metrology & Process Control",
  description:
    "Learn how ML models predict wafer measurements from equipment sensor data, enabling 100% wafer coverage and real-time process control without physical metrology delays.",
  phase: 5,
  chapters: [
    // ==================== Chapter 1 ====================
    {
      id: "what-is-vm",
      title: "What is Virtual Metrology?",
      subtitle:
        "Predicting metrology from sensor data — why it matters for cost, speed, and 100% coverage",
      sections: [
        {
          id: "vm-overview",
          title: "The Metrology Bottleneck",
          content: `
<h2>The Metrology Bottleneck</h2>
<p>In semiconductor manufacturing, <strong>metrology</strong> — the act of measuring wafer properties like film thickness, critical dimension (CD), overlay, or etch depth — is essential for maintaining process quality. But physical metrology is expensive and slow:</p>
<ul>
  <li><strong>Sampling rate:</strong> Typically only 5–10% of wafers are measured. The rest fly blind.</li>
  <li><strong>Cycle time:</strong> A wafer might wait hours for metrology, blocking downstream processing.</li>
  <li><strong>Cost:</strong> Metrology tools (SEM, ellipsometer, OCD) cost $5–20M each and require dedicated operators.</li>
</ul>

<div class="analogy">
  <h3>Analogy: The Hospital Blood Test</h3>
  <p>Imagine a hospital that can only run blood tests on 1 in 10 patients. The other 9 are treated based on symptoms alone. Virtual metrology is like building an ML model that predicts blood test results from vital signs (temperature, blood pressure, heart rate) — the "sensors" you already have. It's not a replacement for the lab, but it covers the 90% gap.</p>
</div>

<div class="key-concept">
  <h3>Key Concept: Virtual Metrology (VM)</h3>
  <p>Virtual Metrology uses ML models to predict post-process metrology values from <strong>equipment sensor data</strong> (FDC — Fault Detection and Classification data) collected during wafer processing. The equipment already logs thousands of sensor traces per wafer — pressures, temperatures, RF power, gas flows, endpoint signals — all at sub-second resolution.</p>
</div>
`,
        },
        {
          id: "vm-value-proposition",
          title: "Why VM Matters",
          content: `
<h2>Why VM Matters</h2>
<p>Virtual Metrology delivers three game-changing capabilities:</p>

<h3>1. 100% Wafer Coverage</h3>
<p>Instead of sampling 5–10% of wafers, VM provides predictions for <em>every single wafer</em>. This means no wafer passes through the fab un-measured — defective wafers are caught immediately, not lots later.</p>

<h3>2. Faster Feedback</h3>
<p>Physical metrology introduces 2–8 hour delays. VM predictions are available <strong>within seconds</strong> of process completion, enabling real-time control loops that would be impossible with physical measurements alone.</p>

<h3>3. Cost Reduction</h3>
<p>With VM providing reliable predictions, fabs can reduce physical metrology sampling — freeing up expensive tools and operators for other tasks, or deferring metrology tool purchases entirely.</p>

<div class="did-you-know">
  <h3>Did You Know?</h3>
  <p>A single advanced fab may have 50+ metrology tools costing $500M+ in aggregate. VM doesn't eliminate them, but even a 30% reduction in sampling saves tens of millions annually while <em>improving</em> quality coverage.</p>
</div>

<h3>The VM Data Pipeline</h3>
<pre><code class="language-python">import pandas as pd
import numpy as np

# Typical FDC sensor data: one row per wafer, thousands of features
# Each feature is a summary statistic of a sensor trace during processing
fdc_data = pd.DataFrame({
    'wafer_id': ['W001', 'W002', 'W003'],
    'chamber_pressure_mean': [4.52, 4.51, 4.53],
    'chamber_pressure_std': [0.012, 0.015, 0.011],
    'rf_power_mean': [250.1, 249.8, 250.3],
    'rf_power_std': [1.2, 1.5, 1.1],
    'gas_flow_Ar_mean': [100.2, 100.1, 100.3],
    'etch_time': [45.2, 45.1, 45.3],
    'endpoint_signal_peak': [0.87, 0.85, 0.88],
    # ... typically 500-5000 features per wafer
})

# Metrology target: the value we want to predict
metrology = pd.DataFrame({
    'wafer_id': ['W001', 'W002', 'W003'],
    'etch_depth_nm': [52.1, 51.8, 52.3],  # measured by ellipsometer
})

# In reality: ~70% of wafers have FDC but NO metrology
# VM fills this gap
print(f"FDC coverage: 100% of wafers")
print(f"Metrology coverage: ~10% of wafers")
print(f"VM goal: predict metrology for the other 90%")
</code></pre>
`,
        },
        {
          id: "vm-architecture",
          title: "VM System Architecture",
          content: `
<h2>VM System Architecture</h2>
<p>A production VM system has several interacting components:</p>

<h3>Data Sources</h3>
<ul>
  <li><strong>FDC (Fault Detection and Classification):</strong> Equipment sensor traces — the primary input features.</li>
  <li><strong>Context data:</strong> Recipe ID, chamber ID, wafer slot position, lot history, consumable age (e.g., hours since last chamber clean).</li>
  <li><strong>Upstream metrology:</strong> Measurements from previous process steps (e.g., incoming film thickness before etch).</li>
</ul>

<h3>The Modeling Pipeline</h3>
<pre><code class="language-python">from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import GradientBoostingRegressor

# A typical VM pipeline
vm_pipeline = Pipeline([
    ('scaler', StandardScaler()),           # Normalize sensor ranges
    ('pca', PCA(n_components=50)),          # Reduce 2000+ features
    ('model', GradientBoostingRegressor(    # Predict metrology
        n_estimators=200,
        max_depth=5,
        learning_rate=0.05
    ))
])

# Key challenge: feature count >> sample count
# 2000 FDC features, but only 500 labeled wafers (those with metrology)
print("This is a classic high-dimensional, low-sample-size problem")
print("PCA, LASSO, or domain-guided feature selection are essential")
</code></pre>

<div class="key-concept">
  <h3>Key Concept: FDC Summary Statistics</h3>
  <p>Raw sensor traces are time-series (e.g., pressure sampled at 10 Hz over a 60-second step). Before modeling, these are summarized into statistics: mean, std, min, max, slope, integral, peak value, time-to-peak, etc. A single process step with 50 sensors and 10 statistics each yields 500 features — and multi-step recipes can produce 2,000–5,000 features per wafer.</p>
</div>
`,
        },
        {
          id: "vm-types",
          title: "Types of Virtual Metrology",
          content: `
<h2>Types of Virtual Metrology</h2>

<h3>Conjecture VM vs. Reliance VM</h3>
<p>The SEMI E133 standard defines two tiers:</p>
<ul>
  <li><strong>Conjecture VM:</strong> Predictions used for monitoring and trending only. No process decisions are made based on them. Lower accuracy bar — useful for early warning.</li>
  <li><strong>Reliance VM:</strong> Predictions trusted enough to replace physical metrology for process control decisions. Requires rigorous validation, confidence bounds, and continuous monitoring.</li>
</ul>

<h3>Global vs. Local Models</h3>
<ul>
  <li><strong>Global VM:</strong> One model trained on data from all chambers running the same recipe. Simpler to maintain, but may miss chamber-specific quirks.</li>
  <li><strong>Local VM:</strong> Separate models per chamber. Better accuracy, but requires more labeled data per chamber and more maintenance overhead.</li>
</ul>

<div class="did-you-know">
  <h3>Did You Know?</h3>
  <p>Leading fabs like TSMC and Samsung have deployed VM on hundreds of process steps. TSMC's "VM Mark II" system reportedly covers 80%+ of critical process steps with conjecture-level VM, and a growing fraction with reliance-level VM for active process control.</p>
</div>

<pre><code class="language-python"># Global vs. Local VM comparison
from sklearn.model_selection import GroupKFold
from sklearn.metrics import mean_absolute_error

def evaluate_global_vs_local(X, y, chamber_ids):
    """Compare global model vs per-chamber local models."""
    # Global model: train on all chambers
    gkf = GroupKFold(n_splits=5)
    global_errors = []
    for train_idx, test_idx in gkf.split(X, y, groups=chamber_ids):
        vm_pipeline.fit(X.iloc[train_idx], y.iloc[train_idx])
        preds = vm_pipeline.predict(X.iloc[test_idx])
        global_errors.append(mean_absolute_error(y.iloc[test_idx], preds))

    # Local models: one per chamber
    local_errors = []
    for chamber in chamber_ids.unique():
        mask = chamber_ids == chamber
        X_ch, y_ch = X[mask], y[mask]
        if len(y_ch) < 50:  # Need minimum samples
            continue
        # Simple train/test split for each chamber
        split = int(0.8 * len(y_ch))
        vm_pipeline.fit(X_ch.iloc[:split], y_ch.iloc[:split])
        preds = vm_pipeline.predict(X_ch.iloc[split:])
        local_errors.append(mean_absolute_error(y_ch.iloc[split:], preds))

    print(f"Global MAE: {np.mean(global_errors):.3f} nm")
    print(f"Local MAE:  {np.mean(local_errors):.3f} nm")
    # Local usually wins by 10-30%, but needs more data per chamber
</code></pre>
`,
        },
      ],
      quiz: [
        {
          question:
            "What is the primary data source used as input features for Virtual Metrology models?",
          options: [
            "Physical metrology measurements from downstream tools",
            "Equipment sensor data (FDC) collected during wafer processing",
            "Design layout (GDSII) files",
            "Final electrical test results",
          ],
          correctIndex: 1,
          explanation:
            "VM models use FDC (Fault Detection and Classification) sensor data — pressures, temperatures, RF power, gas flows, etc. — collected by the process equipment during wafer processing. This data is available for every wafer, unlike physical metrology which only covers a small sample.",
        },
        {
          question:
            "What distinguishes 'Reliance VM' from 'Conjecture VM' per the SEMI E133 standard?",
          options: [
            "Reliance VM uses deep learning while Conjecture VM uses linear regression",
            "Reliance VM predictions are trusted for process control decisions; Conjecture VM is for monitoring only",
            "Reliance VM runs in the cloud while Conjecture VM runs on-premise",
            "Reliance VM predicts electrical parameters while Conjecture VM predicts physical dimensions",
          ],
          correctIndex: 1,
          explanation:
            "Reliance VM predictions are trusted enough to replace physical metrology for actual process control decisions (e.g., adjusting recipes). Conjecture VM predictions are used only for monitoring and trending — no automated process decisions are made based on them.",
        },
        {
          question:
            "Why is dimensionality reduction (e.g., PCA) commonly needed in VM models?",
          options: [
            "To make the model run on GPU hardware",
            "Because the number of FDC features (2000+) greatly exceeds the number of labeled wafers with metrology",
            "To convert time-series data into images",
            "Because metrology tools produce high-dimensional output",
          ],
          correctIndex: 1,
          explanation:
            "VM faces a classic high-dimensional, low-sample-size problem. Equipment sensors produce 2,000–5,000 summary features per wafer, but only 5–10% of wafers have physical metrology labels. PCA, LASSO, or domain-guided feature selection are essential to avoid overfitting.",
        },
      ],
    },

    // ==================== Chapter 2 ====================
    {
      id: "vm-model-building",
      title: "VM Model Building",
      subtitle:
        "Feature engineering from sensor traces, regression models, and rigorous validation for fab-grade predictions",
      sections: [
        {
          id: "feature-engineering",
          title: "Feature Engineering from Sensor Traces",
          content: `
<h2>Feature Engineering from Sensor Traces</h2>
<p>The raw data from a process chamber is a collection of <strong>time-series traces</strong> — one per sensor, sampled at 1–100 Hz over the duration of the process step (often 30–300 seconds). Converting these into tabular features suitable for ML is the most critical step in VM.</p>

<h3>Step-Based Segmentation</h3>
<p>Semiconductor recipes have discrete steps (e.g., "strike plasma," "main etch," "over-etch," "purge"). Feature extraction should be done <em>per step</em>, not over the entire trace, because the physics and expected sensor behavior differ dramatically between steps.</p>

<pre><code class="language-python">import pandas as pd
import numpy as np
from scipy import stats

def extract_trace_features(trace: np.ndarray, sensor_name: str,
                           step_name: str) -> dict:
    """Extract summary statistics from a single sensor trace within one step."""
    features = {}
    prefix = f"{step_name}_{sensor_name}"

    # Basic statistics
    features[f"{prefix}_mean"] = np.mean(trace)
    features[f"{prefix}_std"] = np.std(trace)
    features[f"{prefix}_min"] = np.min(trace)
    features[f"{prefix}_max"] = np.max(trace)
    features[f"{prefix}_range"] = np.ptp(trace)
    features[f"{prefix}_median"] = np.median(trace)

    # Shape statistics
    features[f"{prefix}_skew"] = stats.skew(trace)
    features[f"{prefix}_kurtosis"] = stats.kurtosis(trace)

    # Trend features
    x = np.arange(len(trace))
    slope, intercept, r_value, _, _ = stats.linregress(x, trace)
    features[f"{prefix}_slope"] = slope
    features[f"{prefix}_r_squared"] = r_value ** 2

    # Integral (area under curve — proxy for total energy/dose)
    features[f"{prefix}_integral"] = np.trapz(trace)

    # Settling features (important for pressure, temperature)
    features[f"{prefix}_first_10pct_mean"] = np.mean(trace[:len(trace)//10])
    features[f"{prefix}_last_10pct_mean"] = np.mean(trace[-len(trace)//10:])
    features[f"{prefix}_settling_delta"] = (
        features[f"{prefix}_last_10pct_mean"] -
        features[f"{prefix}_first_10pct_mean"]
    )

    return features

# Example: 50 sensors × 4 steps × 14 features = 2,800 features per wafer
</code></pre>

<div class="key-concept">
  <h3>Key Concept: Domain-Guided Features</h3>
  <p>Generic statistics work, but domain knowledge unlocks better features. For example: in a CVD process, the <em>ratio</em> of precursor flow to carrier gas flow matters more than either alone. In plasma etch, the <em>time derivative</em> of optical emission at a specific wavelength signals endpoint. Always collaborate with process engineers to identify physically meaningful derived features.</p>
</div>
`,
        },
        {
          id: "model-selection",
          title: "Choosing the Right Model",
          content: `
<h2>Choosing the Right Model</h2>
<p>VM is fundamentally a <strong>supervised regression problem</strong> with high dimensionality and limited labels. Here's what works in practice:</p>

<h3>Model Landscape for VM</h3>
<ul>
  <li><strong>PLS (Partial Least Squares):</strong> The workhorse of traditional VM. Handles multicollinearity naturally, interpretable, fast. Often the baseline to beat.</li>
  <li><strong>LASSO / Elastic Net:</strong> Automatic feature selection via L1 penalty. Excellent when only a handful of sensors truly matter.</li>
  <li><strong>Gradient Boosting (XGBoost, LightGBM):</strong> Captures nonlinearities and interactions. Often the best accuracy, but requires more tuning and care with small datasets.</li>
  <li><strong>Neural Networks:</strong> Generally overkill for tabular VM. Exception: when using raw time-series traces (1D-CNN or LSTM) instead of hand-crafted features.</li>
</ul>

<pre><code class="language-python">from sklearn.cross_decomposition import PLSRegression
from sklearn.linear_model import LassoCV, ElasticNetCV
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score
import numpy as np

def compare_vm_models(X_train, y_train):
    """Compare common VM model architectures."""
    models = {
        'PLS (10 components)': PLSRegression(n_components=10),
        'LASSO (auto-alpha)': LassoCV(cv=5, max_iter=10000),
        'ElasticNet': ElasticNetCV(cv=5, max_iter=10000),
        'GBM': GradientBoostingRegressor(
            n_estimators=200, max_depth=4,
            learning_rate=0.05, subsample=0.8
        ),
    }

    for name, model in models.items():
        scores = cross_val_score(
            model, X_train, y_train,
            cv=5, scoring='neg_mean_absolute_error'
        )
        mae = -scores.mean()
        std = scores.std()
        print(f"{name:25s}  MAE: {mae:.3f} ± {std:.3f} nm")

    # Typical results for etch depth VM:
    # PLS (10 components)         MAE: 0.45 ± 0.08 nm
    # LASSO (auto-alpha)          MAE: 0.42 ± 0.07 nm
    # ElasticNet                  MAE: 0.41 ± 0.07 nm
    # GBM                         MAE: 0.36 ± 0.09 nm
</code></pre>

<div class="analogy">
  <h3>Analogy: The Right Tool for the Job</h3>
  <p>PLS is like a reliable sedan — it gets you there safely every time. LASSO is a sports car — fast and sleek but needs the right road. GBM is a pickup truck — powerful and versatile but burns more fuel. In VM, start with PLS as your baseline, then see if GBM's extra complexity buys meaningful improvement.</p>
</div>
`,
        },
        {
          id: "validation-strategy",
          title: "Validation Strategy for VM",
          content: `
<h2>Validation Strategy for VM</h2>
<p>Standard k-fold cross-validation can be <strong>dangerously optimistic</strong> for VM. Semiconductor data has temporal and grouping structure that must be respected.</p>

<h3>Why Random Splits Fail</h3>
<ul>
  <li><strong>Temporal leakage:</strong> If you randomly split, future wafers leak into training. In production, you only have past data to train on.</li>
  <li><strong>Lot correlation:</strong> Wafers from the same lot are highly similar. Random splits put correlated wafers in both train and test.</li>
  <li><strong>Chamber drift:</strong> A model validated on data from the same chamber state will look great — until the chamber is cleaned and all sensor baselines shift.</li>
</ul>

<pre><code class="language-python">from sklearn.model_selection import TimeSeriesSplit
import pandas as pd
import numpy as np

def temporal_cv_for_vm(X, y, timestamps, n_splits=5):
    """Time-series cross-validation that respects temporal ordering."""
    # Sort by time
    sort_idx = timestamps.argsort()
    X_sorted = X.iloc[sort_idx]
    y_sorted = y.iloc[sort_idx]

    tscv = TimeSeriesSplit(n_splits=n_splits)
    results = []

    for fold, (train_idx, test_idx) in enumerate(tscv.split(X_sorted)):
        X_train = X_sorted.iloc[train_idx]
        y_train = y_sorted.iloc[train_idx]
        X_test = X_sorted.iloc[test_idx]
        y_test = y_sorted.iloc[test_idx]

        # Ensure no temporal leakage
        train_end = timestamps.iloc[sort_idx[train_idx[-1]]]
        test_start = timestamps.iloc[sort_idx[test_idx[0]]]
        assert train_end < test_start, "Temporal leakage detected!"

        model = GradientBoostingRegressor(n_estimators=200, max_depth=4)
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        mae = np.mean(np.abs(y_test - preds))
        results.append({'fold': fold, 'mae': mae, 'n_test': len(y_test)})
        print(f"Fold {fold}: MAE = {mae:.3f} nm (n={len(y_test)})")

    return pd.DataFrame(results)

# Additional validation: test on data AFTER a chamber clean event
# This is the hardest but most realistic test
</code></pre>

<div class="key-concept">
  <h3>Key Concept: Chamber Clean Boundary Test</h3>
  <p>The ultimate VM stress test: train on data from one "chamber life" (period between preventive maintenance events) and test on the <em>next</em> chamber life. If your model survives this, it's ready for production. Many models that look great on random splits collapse after a chamber clean because sensor baselines shift.</p>
</div>
`,
        },
        {
          id: "vm-metrics",
          title: "VM Performance Metrics",
          content: `
<h2>VM Performance Metrics</h2>
<p>Fab engineers don't think in terms of RMSE or R². They care about whether VM predictions are good enough to <em>replace</em> or <em>supplement</em> physical metrology. Industry-standard metrics include:</p>

<h3>Key Metrics</h3>
<ul>
  <li><strong>MAE / RMSE:</strong> Basic accuracy. Must be well within the metrology tool's own repeatability (typically 0.5–2% of the measured value).</li>
  <li><strong>MAPE (Mean Absolute Percentage Error):</strong> Normalized accuracy. Target: &lt;1% for reliance VM.</li>
  <li><strong>Cp/Cpk of residuals:</strong> Process capability indices applied to VM errors. Cpk &gt; 1.33 is a common reliance threshold.</li>
  <li><strong>Prediction interval coverage:</strong> Do the 95% confidence intervals actually contain 95% of true values?</li>
</ul>

<pre><code class="language-python">import numpy as np
from scipy import stats

def vm_performance_report(y_true, y_pred, spec_limit=2.0):
    """Generate a fab-standard VM performance report."""
    residuals = y_true - y_pred
    n = len(residuals)

    mae = np.mean(np.abs(residuals))
    rmse = np.sqrt(np.mean(residuals ** 2))
    mape = np.mean(np.abs(residuals / y_true)) * 100
    r_squared = 1 - np.sum(residuals**2) / np.sum((y_true - y_true.mean())**2)

    # Cpk of residuals (how well-centered within spec)
    mu = np.mean(residuals)
    sigma = np.std(residuals)
    cpk = min(spec_limit - mu, spec_limit + mu) / (3 * sigma)

    # Coverage check for 95% prediction interval
    z_95 = 1.96
    lower = y_pred - z_95 * sigma
    upper = y_pred + z_95 * sigma
    coverage = np.mean((y_true >= lower) & (y_true <= upper)) * 100

    print(f"=== VM Performance Report ===")
    print(f"Samples:         {n}")
    print(f"MAE:             {mae:.4f} nm")
    print(f"RMSE:            {rmse:.4f} nm")
    print(f"MAPE:            {mape:.2f}%")
    print(f"R²:              {r_squared:.4f}")
    print(f"Cpk (residuals): {cpk:.2f}  {'PASS' if cpk > 1.33 else 'FAIL'}")
    print(f"95% PI Coverage: {coverage:.1f}%  {'PASS' if coverage >= 93 else 'FAIL'}")

    return {'mae': mae, 'rmse': rmse, 'mape': mape,
            'r2': r_squared, 'cpk': cpk, 'coverage': coverage}
</code></pre>

<div class="did-you-know">
  <h3>Did You Know?</h3>
  <p>Metrology tools themselves have measurement uncertainty. An ellipsometer measuring 50 nm film thickness might have a repeatability of ±0.2 nm. If your VM model achieves MAE of 0.3 nm, you're approaching the noise floor of the measurement itself — going below that is impossible without a better reference.</p>
</div>
`,
        },
      ],
      quiz: [
        {
          question:
            "Why should feature extraction from sensor traces be done per recipe step rather than over the entire trace?",
          options: [
            "To reduce computational cost",
            "Because different steps have different physics and expected sensor behavior",
            "To comply with SEMI standards",
            "Because sensors are turned off between steps",
          ],
          correctIndex: 1,
          explanation:
            "Recipe steps (e.g., 'strike plasma,' 'main etch,' 'over-etch') have fundamentally different physics. A sensor's mean pressure during 'strike' has a completely different meaning than during 'main etch.' Step-based segmentation produces more physically meaningful features.",
        },
        {
          question:
            "What makes random k-fold cross-validation dangerous for VM model validation?",
          options: [
            "It's too slow for large datasets",
            "It doesn't work with regression problems",
            "It causes temporal leakage and ignores lot/chamber correlations",
            "It requires too many hyperparameter settings",
          ],
          correctIndex: 2,
          explanation:
            "Random splits allow future wafers to leak into training data and place correlated wafers from the same lot in both train and test sets. Time-series cross-validation that respects temporal ordering and lot/chamber groupings gives a realistic estimate of production performance.",
        },
        {
          question:
            "What does Cpk > 1.33 for VM residuals signify in a fab context?",
          options: [
            "The model has more than 133 training samples",
            "The prediction errors are well-centered and within specification limits — suitable for reliance VM",
            "The model uses 133% of available features",
            "The inference latency is under 1.33 seconds",
          ],
          correctIndex: 1,
          explanation:
            "Cpk (process capability index) applied to VM residuals measures how well the prediction errors fit within specification limits. Cpk > 1.33 means errors are well-centered and have enough margin — a standard threshold for trusting VM predictions to drive process control decisions.",
        },
      ],
    },

    // ==================== Chapter 3 ====================
    {
      id: "vm-deployment",
      title: "Deploying VM in Production",
      subtitle:
        "Handling model drift, building adaptive models, and estimating confidence for every prediction",
      sections: [
        {
          id: "model-drift",
          title: "Model Drift in Semiconductor Fabs",
          content: `
<h2>Model Drift in Semiconductor Fabs</h2>
<p>Unlike many ML domains where data distributions shift gradually, semiconductor processes experience <strong>abrupt, predictable drift events</strong>:</p>

<h3>Sources of Drift</h3>
<ul>
  <li><strong>Preventive Maintenance (PM):</strong> Chamber cleaning, part replacement. Sensor baselines shift overnight. This is the #1 cause of VM model degradation.</li>
  <li><strong>Consumable wear:</strong> Focus rings, showerheads, and electrostatic chuck coatings wear slowly, causing gradual drift between PMs.</li>
  <li><strong>Recipe changes:</strong> Process engineers tweak recipes for yield improvement. Even small changes can invalidate VM models.</li>
  <li><strong>Upstream variation:</strong> Changes in incoming wafer properties (e.g., different film thickness from a preceding step) alter the relationship between sensors and outcomes.</li>
</ul>

<div class="analogy">
  <h3>Analogy: The Recalibrated Scale</h3>
  <p>Imagine you built a model to predict someone's weight from their height. Then everyone starts wearing heavy boots (PM event). Your model's predictions are all off by 5 kg — not because the model is wrong, but because the "input distribution" shifted. You need to recalibrate.</p>
</div>

<pre><code class="language-python">import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error

def detect_vm_drift(predictions, actuals, timestamps,
                    window_size=50, threshold_multiplier=2.0):
    """Detect VM model drift using moving-window residual monitoring."""
    residuals = actuals - predictions

    # Baseline statistics from qualification period
    baseline_mae = np.mean(np.abs(residuals[:window_size]))
    baseline_bias = np.mean(residuals[:window_size])
    baseline_std = np.std(residuals[:window_size])

    # Moving window monitoring
    drift_alerts = []
    for i in range(window_size, len(residuals)):
        window = residuals[i-window_size:i]
        current_mae = np.mean(np.abs(window))
        current_bias = np.mean(window)

        # Check for drift
        mae_ratio = current_mae / baseline_mae
        bias_shift = abs(current_bias - baseline_bias) / baseline_std

        if mae_ratio > threshold_multiplier or bias_shift > 3.0:
            drift_alerts.append({
                'timestamp': timestamps.iloc[i],
                'mae_ratio': mae_ratio,
                'bias_shift_sigma': bias_shift,
                'type': 'accuracy' if mae_ratio > threshold_multiplier else 'bias'
            })

    return pd.DataFrame(drift_alerts)
</code></pre>
`,
        },
        {
          id: "adaptive-models",
          title: "Adaptive and Self-Updating Models",
          content: `
<h2>Adaptive and Self-Updating Models</h2>
<p>Static models degrade. Production VM systems must adapt. Here are the major strategies:</p>

<h3>1. Moving Window Retraining</h3>
<p>Retrain the model periodically using only the most recent N wafers. Simple and effective, but requires a steady stream of physical metrology data.</p>

<h3>2. Bias Correction (Global Bias + Local Bias)</h3>
<p>Instead of retraining, adjust predictions by the recent average residual. This handles systematic shifts (like post-PM offset) cheaply.</p>

<h3>3. Incremental / Online Learning</h3>
<p>Update model weights with each new metrology measurement without full retraining. Works well for linear models; harder for tree ensembles.</p>

<pre><code class="language-python">import numpy as np
from collections import deque

class AdaptiveVMPredictor:
    """VM predictor with bias correction and drift detection."""

    def __init__(self, base_model, bias_window=20, confidence_window=50):
        self.base_model = base_model
        self.bias_window = bias_window
        self.recent_residuals = deque(maxlen=bias_window)
        self.confidence_residuals = deque(maxlen=confidence_window)
        self.global_bias = 0.0

    def predict_with_confidence(self, X):
        """Predict with bias correction and confidence interval."""
        raw_pred = self.base_model.predict(X.reshape(1, -1))[0]

        # Apply bias correction
        corrected_pred = raw_pred + self.global_bias

        # Confidence interval from recent residual distribution
        if len(self.confidence_residuals) >= 10:
            residual_std = np.std(list(self.confidence_residuals))
            ci_lower = corrected_pred - 1.96 * residual_std
            ci_upper = corrected_pred + 1.96 * residual_std
        else:
            ci_lower = ci_upper = None  # Not enough data

        return {
            'prediction': corrected_pred,
            'raw_prediction': raw_pred,
            'bias_correction': self.global_bias,
            'ci_lower': ci_lower,
            'ci_upper': ci_upper,
        }

    def update(self, actual_value, predicted_value):
        """Update bias correction when actual metrology arrives."""
        residual = actual_value - predicted_value
        self.recent_residuals.append(residual)
        self.confidence_residuals.append(residual)

        # Update global bias
        if len(self.recent_residuals) >= 5:
            self.global_bias = np.mean(list(self.recent_residuals))
</code></pre>

<div class="key-concept">
  <h3>Key Concept: PM-Aware Adaptation</h3>
  <p>Smart VM systems detect PM events (from equipment logs or MES) and take special action: widen confidence intervals immediately after PM, increase physical metrology sampling to rebuild the bias estimate, and optionally switch to a "post-PM" model variant trained specifically on post-PM data.</p>
</div>
`,
        },
        {
          id: "confidence-estimation",
          title: "Confidence Estimation",
          content: `
<h2>Confidence Estimation</h2>
<p>A VM prediction without a confidence estimate is dangerous. The fab needs to know <em>when to trust</em> a VM prediction and <em>when to send the wafer for physical measurement</em>.</p>

<h3>Approaches to VM Confidence</h3>
<ul>
  <li><strong>Residual-based:</strong> Use the distribution of recent residuals to estimate prediction intervals. Simple and effective.</li>
  <li><strong>Novelty detection:</strong> Measure how "different" the current wafer's FDC data is from training data. High novelty → low confidence.</li>
  <li><strong>Ensemble disagreement:</strong> Train multiple models; large disagreement → low confidence.</li>
  <li><strong>Conformal prediction:</strong> A principled, distribution-free framework that guarantees coverage probability.</li>
</ul>

<pre><code class="language-python">from sklearn.ensemble import GradientBoostingRegressor
from sklearn.neighbors import LocalOutlierFactor
import numpy as np

class VMConfidenceEstimator:
    """Estimate VM prediction confidence using novelty + ensemble methods."""

    def __init__(self, n_models=5):
        self.models = [
            GradientBoostingRegressor(
                n_estimators=200, max_depth=4,
                subsample=0.8, random_state=i
            ) for i in range(n_models)
        ]
        self.novelty_detector = LocalOutlierFactor(
            n_neighbors=20, novelty=True
        )

    def fit(self, X_train, y_train):
        for model in self.models:
            # Bootstrap sampling for diversity
            idx = np.random.choice(len(X_train), len(X_train), replace=True)
            model.fit(X_train[idx], y_train[idx])
        self.novelty_detector.fit(X_train)

    def predict_with_confidence(self, X):
        predictions = np.array([m.predict(X) for m in self.models])
        mean_pred = predictions.mean(axis=0)
        std_pred = predictions.std(axis=0)  # Ensemble disagreement

        # Novelty score (negative = more outlier-like)
        novelty_scores = self.novelty_detector.decision_function(X)

        # Combined confidence: low std AND high novelty score = high confidence
        # Normalize to 0-1 range
        confidence = 1.0 / (1.0 + std_pred) * np.clip(
            (novelty_scores + 2) / 4, 0, 1
        )

        return mean_pred, confidence, std_pred
</code></pre>

<div class="did-you-know">
  <h3>Did You Know?</h3>
  <p>Some advanced fabs use a "smart sampling" strategy driven by VM confidence: if the VM model is confident about a wafer's metrology, skip physical measurement. If confidence is low, route the wafer to a metrology tool. This dynamically adjusts sampling rate — measuring more when it matters and less when the model is sure.</p>
</div>
`,
        },
      ],
      quiz: [
        {
          question:
            "What is the #1 cause of VM model degradation in production?",
          options: [
            "Software bugs in the data pipeline",
            "Preventive maintenance (PM) events that shift sensor baselines",
            "Running out of GPU memory",
            "Changes in wafer diameter",
          ],
          correctIndex: 1,
          explanation:
            "PM events — chamber cleaning, part replacement — cause abrupt shifts in sensor baselines overnight. A model trained on pre-PM data will produce biased predictions post-PM because the relationship between sensor readings and outcomes has shifted.",
        },
        {
          question:
            "What does 'novelty detection' measure in a VM confidence framework?",
          options: [
            "Whether the wafer is from a new product line",
            "How different the current wafer's FDC data is from the training distribution",
            "Whether the metrology tool has been recently calibrated",
            "How many new features were added to the model",
          ],
          correctIndex: 1,
          explanation:
            "Novelty detection measures how far the current wafer's equipment sensor data deviates from the distribution the model was trained on. If the FDC data looks very different from anything seen in training, the model's prediction is unreliable — confidence should be low.",
        },
        {
          question:
            "In 'smart sampling,' how is physical metrology allocated?",
          options: [
            "Every Nth wafer is measured regardless of VM output",
            "Only the first wafer of each lot is measured",
            "Wafers with low VM confidence are routed to physical metrology; high-confidence wafers skip it",
            "Metrology is performed only when the production line is idle",
          ],
          correctIndex: 2,
          explanation:
            "Smart sampling uses VM confidence to dynamically decide which wafers need physical measurement. High-confidence VM predictions can safely skip metrology, while low-confidence predictions trigger physical measurement — optimizing both coverage and metrology tool utilization.",
        },
      ],
    },

    // ==================== Chapter 4 ====================
    {
      id: "ml-r2r-control",
      title: "ML-Enhanced Run-to-Run Control",
      subtitle:
        "Augmenting traditional R2R control with machine learning for tighter process windows",
      sections: [
        {
          id: "r2r-basics",
          title: "Run-to-Run Control Fundamentals",
          content: `
<h2>Run-to-Run Control Fundamentals</h2>
<p><strong>Run-to-Run (R2R) control</strong> adjusts equipment recipe parameters between wafer runs (or lot runs) to compensate for drift and maintain target metrology values. It's the most common form of advanced process control (APC) in semiconductor fabs.</p>

<h3>The Classic R2R Framework</h3>
<p>Traditional R2R uses a simple linear model:</p>
<ul>
  <li><strong>Process model:</strong> y = a·x + b, where y is the metrology output and x is the controllable recipe parameter (e.g., etch time).</li>
  <li><strong>EWMA filter:</strong> Exponentially weighted moving average smooths noisy metrology signals to estimate the current process state.</li>
  <li><strong>Controller:</strong> Calculates the recipe adjustment needed to bring the next run's output back to target.</li>
</ul>

<div class="analogy">
  <h3>Analogy: The Thermostat</h3>
  <p>R2R control is like a thermostat for your etch process. The "temperature" is your etch depth, the "setpoint" is your target CD, and the "heater knob" is etch time. If the last wafer came out too deep, you reduce etch time for the next one. The EWMA filter prevents you from over-reacting to a single noisy measurement.</p>
</div>

<pre><code class="language-python">import numpy as np

class TraditionalR2RController:
    """Classic EWMA-based Run-to-Run controller."""

    def __init__(self, target, gain, ewma_lambda=0.3):
        self.target = target          # Target metrology value
        self.gain = gain              # Process model: dy/dx
        self.ewma_lambda = ewma_lambda
        self.ewma_state = target      # Initialize at target
        self.recipe_offset = 0.0      # Current recipe adjustment

    def update(self, metrology_value):
        """Update controller with new metrology measurement."""
        # EWMA filter
        self.ewma_state = (
            self.ewma_lambda * metrology_value +
            (1 - self.ewma_lambda) * self.ewma_state
        )

        # Calculate error
        error = self.target - self.ewma_state

        # Calculate recipe adjustment (dead-beat control)
        self.recipe_offset = error / self.gain

        return self.recipe_offset

# Example: controlling etch depth via etch time
controller = TraditionalR2RController(
    target=50.0,   # Target: 50 nm etch depth
    gain=1.1,      # 1.1 nm depth per second of etch time
    ewma_lambda=0.3
)

# Simulate
measurements = [50.5, 50.8, 51.0, 50.3, 49.8]
for m in measurements:
    adj = controller.update(m)
    print(f"Measured: {m:.1f} nm → Recipe adj: {adj:+.2f} sec")
</code></pre>
`,
        },
        {
          id: "ml-augmented-r2r",
          title: "ML-Augmented R2R Control",
          content: `
<h2>ML-Augmented R2R Control</h2>
<p>Traditional R2R has limitations: linear process models, single input/single output, no feed-forward capability. ML enhances R2R in several ways:</p>

<h3>1. Nonlinear Process Models</h3>
<p>Replace the linear y = a·x + b with a neural network or gradient boosting model that captures complex, nonlinear relationships between multiple recipe knobs and metrology outputs.</p>

<h3>2. Feed-Forward Compensation</h3>
<p>Use VM predictions of incoming wafer state (from upstream processes) to <em>proactively</em> adjust the recipe before processing — rather than waiting for post-process metrology to react.</p>

<h3>3. Multi-Input, Multi-Output (MIMO) Control</h3>
<p>ML models handle the coupling between multiple recipe parameters and multiple metrology targets that traditional R2R cannot.</p>

<pre><code class="language-python">import numpy as np
from sklearn.ensemble import GradientBoostingRegressor

class MLAugmentedR2RController:
    """R2R controller using ML process model and feed-forward."""

    def __init__(self, process_model, target_values, recipe_bounds):
        self.process_model = process_model  # Trained ML model
        self.targets = target_values        # Dict of target metrology values
        self.bounds = recipe_bounds         # Min/max for each recipe param
        self.feedback_bias = {}             # Learned bias corrections

    def compute_feedforward(self, upstream_vm_predictions):
        """
        Use upstream VM to proactively adjust recipe.
        e.g., if incoming film is thicker than nominal,
        increase etch time to compensate.
        """
        # The ML model predicts: metrology = f(recipe, incoming_state)
        # We invert this to find: recipe = f^-1(target, incoming_state)
        # Using simple grid search over recipe space
        best_recipe = None
        best_error = float('inf')

        recipe_grid = self._generate_recipe_grid()
        for recipe_candidate in recipe_grid:
            features = {**recipe_candidate, **upstream_vm_predictions}
            predicted_metrology = self.process_model.predict(
                [list(features.values())]
            )[0]

            error = abs(predicted_metrology - self.targets['etch_depth'])
            if error < best_error:
                best_error = error
                best_recipe = recipe_candidate

        # Apply feedback bias correction
        for param, bias in self.feedback_bias.items():
            if param in best_recipe:
                best_recipe[param] += bias

        return best_recipe

    def update_feedback(self, actual_metrology):
        """Update feedback bias from post-process measurement."""
        error = self.targets['etch_depth'] - actual_metrology
        # EWMA update of bias
        for param in self.feedback_bias:
            self.feedback_bias[param] = (
                0.3 * error / self._get_gain(param) +
                0.7 * self.feedback_bias[param]
            )

    def _generate_recipe_grid(self):
        # Simplified: in production, use Bayesian optimization
        return [{'etch_time': t, 'rf_power': p}
                for t in np.linspace(40, 60, 20)
                for p in np.linspace(200, 300, 20)]

    def _get_gain(self, param):
        return 1.0  # Simplified
</code></pre>

<div class="key-concept">
  <h3>Key Concept: Feed-Forward + Feedback</h3>
  <p>The most powerful R2R systems combine <strong>feed-forward</strong> (proactive adjustment based on incoming wafer state from VM) with <strong>feedback</strong> (reactive correction based on post-process metrology). Feed-forward handles known incoming variation; feedback handles unknown disturbances and model errors.</p>
</div>
`,
        },
        {
          id: "r2r-challenges",
          title: "Challenges and Best Practices",
          content: `
<h2>Challenges and Best Practices</h2>

<h3>Challenge: Controller Stability</h3>
<p>ML models can produce unstable control actions if the model is wrong in extrapolation regions. Traditional R2R controllers are inherently stable (EWMA is a low-pass filter). ML controllers need guardrails:</p>
<ul>
  <li><strong>Clamp recipe adjustments:</strong> Never allow adjustments larger than a predefined maximum per run.</li>
  <li><strong>Gradual transition:</strong> Blend ML recommendations with traditional R2R output using a trust factor that increases as the ML model proves itself.</li>
  <li><strong>Fallback logic:</strong> If the ML model's confidence drops below threshold, revert to traditional R2R.</li>
</ul>

<h3>Challenge: Delays and Missing Data</h3>
<p>Metrology results arrive 2–8 hours after processing. During that time, 50+ wafers may have already been processed. The controller must handle this "dead time" gracefully — typically by predicting the current state from the most recent VM + the oldest available metrology.</p>

<div class="did-you-know">
  <h3>Did You Know?</h3>
  <p>The combination of VM + ML-R2R can reduce process variation (Cpk) by 30–50% compared to traditional R2R alone. In advanced logic fabs, this translates directly to tighter CD distributions, fewer reworks, and higher die yield.</p>
</div>

<pre><code class="language-python"># Safety-wrapped ML controller
class SafeMLController:
    """ML controller with safety bounds and fallback."""

    def __init__(self, ml_controller, traditional_controller,
                 max_adjustment, trust_factor=0.5):
        self.ml = ml_controller
        self.traditional = traditional_controller
        self.max_adj = max_adjustment
        self.trust = trust_factor  # 0 = pure traditional, 1 = pure ML

    def compute_adjustment(self, metrology, vm_predictions, ml_confidence):
        # Get both recommendations
        ml_adj = self.ml.compute_feedforward(vm_predictions)
        trad_adj = self.traditional.update(metrology)

        # Blend based on trust and confidence
        effective_trust = self.trust * ml_confidence
        blended = {}
        for param in ml_adj:
            ml_val = ml_adj[param]
            trad_val = trad_adj if isinstance(trad_adj, float) else 0
            blended[param] = effective_trust * ml_val + (1 - effective_trust) * trad_val

            # Safety clamp
            blended[param] = np.clip(
                blended[param], -self.max_adj, self.max_adj
            )

        return blended
</code></pre>
`,
        },
      ],
      quiz: [
        {
          question:
            "What is the role of the EWMA filter in traditional R2R control?",
          options: [
            "To compress sensor data for storage",
            "To smooth noisy metrology signals and estimate the current process state",
            "To encrypt recipe parameters for security",
            "To convert between metric and imperial units",
          ],
          correctIndex: 1,
          explanation:
            "The Exponentially Weighted Moving Average (EWMA) filter smooths noisy metrology measurements to estimate the true current process state. Without it, the controller would over-react to measurement noise, causing the process to oscillate.",
        },
        {
          question:
            "How does feed-forward compensation improve R2R control?",
          options: [
            "By sending metrology data to the next fab",
            "By proactively adjusting the recipe based on incoming wafer state from upstream VM predictions",
            "By increasing the processing speed of wafers",
            "By reducing the number of recipe parameters",
          ],
          correctIndex: 1,
          explanation:
            "Feed-forward uses VM predictions of the incoming wafer state (from upstream processes) to adjust the recipe before processing begins. This proactive approach compensates for known incoming variation rather than waiting for post-process metrology to react — reducing the first-wafer-out-of-spec problem.",
        },
        {
          question:
            "Why do ML-augmented R2R controllers need safety clamps on recipe adjustments?",
          options: [
            "To comply with electrical safety regulations",
            "Because ML models can produce unstable or extreme control actions when extrapolating beyond training data",
            "To prevent operators from changing recipes manually",
            "Because recipe parameters must always be positive numbers",
          ],
          correctIndex: 1,
          explanation:
            "ML models may produce unreasonable recipe adjustments when encountering data outside their training distribution. Safety clamps limit the maximum per-run adjustment, preventing catastrophic over-correction. Combined with fallback to traditional R2R, this ensures stability even when the ML model is wrong.",
        },
      ],
    },

    // ==================== Chapter 5 ====================
    {
      id: "recipe-optimization",
      title: "Adaptive Recipe Optimization",
      subtitle:
        "Bayesian optimization, DoE + ML, and multi-objective tuning for semiconductor recipes",
      sections: [
        {
          id: "bayesian-optimization",
          title: "Bayesian Optimization for Recipes",
          content: `
<h2>Bayesian Optimization for Recipes</h2>
<p>Finding the optimal recipe for a semiconductor process is a classic <strong>expensive black-box optimization</strong> problem. Each experiment (running a wafer with a specific recipe) costs hundreds of dollars and takes hours. You need to find the best settings in as few experiments as possible.</p>

<h3>Why Bayesian Optimization?</h3>
<ul>
  <li><strong>Sample efficient:</strong> Finds optima in 20–50 experiments vs. 200+ for grid search.</li>
  <li><strong>Handles noise:</strong> Metrology measurements are noisy; BO naturally accounts for uncertainty.</li>
  <li><strong>Balances exploration vs. exploitation:</strong> The acquisition function decides whether to try a new region (explore) or refine a promising area (exploit).</li>
</ul>

<pre><code class="language-python">import numpy as np
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import Matern
from scipy.optimize import minimize
from scipy.stats import norm

class RecipeOptimizer:
    """Bayesian optimization for semiconductor recipe tuning."""

    def __init__(self, param_bounds, target_value, minimize_variance=True):
        self.bounds = param_bounds  # Dict: {param: (low, high)}
        self.target = target_value
        self.minimize_variance = minimize_variance
        self.gp = GaussianProcessRegressor(
            kernel=Matern(nu=2.5),
            alpha=0.1,  # Metrology noise
            n_restarts_optimizer=5
        )
        self.X_observed = []
        self.y_observed = []

    def suggest_next_recipe(self):
        """Suggest the next recipe to try using Expected Improvement."""
        if len(self.X_observed) < 5:
            # Initial Latin Hypercube sampling
            return self._random_sample()

        X = np.array(self.X_observed)
        y = np.array(self.y_observed)

        # Fit GP surrogate model
        self.gp.fit(X, y)

        # Optimize acquisition function
        best_y = np.min(np.abs(y - self.target))

        def neg_expected_improvement(x):
            x = x.reshape(1, -1)
            mu, sigma = self.gp.predict(x, return_std=True)
            error = np.abs(mu[0] - self.target)
            improvement = best_y - error
            z = improvement / (sigma[0] + 1e-8)
            ei = improvement * norm.cdf(z) + sigma[0] * norm.pdf(z)
            return -ei

        bounds_list = list(self.bounds.values())
        best_x = None
        best_ei = float('inf')
        for _ in range(20):  # Multi-start
            x0 = self._random_sample()
            result = minimize(neg_expected_improvement, x0,
                            bounds=bounds_list, method='L-BFGS-B')
            if result.fun < best_ei:
                best_ei = result.fun
                best_x = result.x

        return best_x

    def record_result(self, recipe_params, metrology_result):
        self.X_observed.append(recipe_params)
        self.y_observed.append(metrology_result)

    def _random_sample(self):
        return np.array([
            np.random.uniform(lo, hi)
            for lo, hi in self.bounds.values()
        ])

# Usage:
optimizer = RecipeOptimizer(
    param_bounds={
        'etch_time': (30, 60),      # seconds
        'rf_power': (200, 400),     # watts
        'pressure': (3, 8),         # mTorr
        'gas_ratio': (0.5, 2.0),    # Cl2/BCl3
    },
    target_value=50.0  # Target etch depth in nm
)
</code></pre>

<div class="key-concept">
  <h3>Key Concept: Acquisition Functions</h3>
  <p>The acquisition function is the "brain" of Bayesian optimization. <strong>Expected Improvement (EI)</strong> is the most common: it balances trying high-potential regions (where the GP mean is good) with uncertain regions (where the GP variance is high). For recipe optimization, custom acquisition functions can also incorporate process constraints (e.g., "etch selectivity must be > 10:1").</p>
</div>
`,
        },
        {
          id: "doe-plus-ml",
          title: "DoE + ML Hybrid Approaches",
          content: `
<h2>DoE + ML Hybrid Approaches</h2>
<p>Traditional Design of Experiments (DoE) and ML-based optimization are not competitors — they're complementary. The best recipe development workflows combine both.</p>

<h3>The Hybrid Workflow</h3>
<ol>
  <li><strong>Phase 1 — Screening DoE:</strong> Run a fractional factorial or Plackett-Burman design to identify which of the 10+ recipe parameters actually matter. This reduces the search space from 10D to 3–5D.</li>
  <li><strong>Phase 2 — Response Surface DoE:</strong> Run a central composite or Box-Behnken design on the important factors to build an initial response surface model.</li>
  <li><strong>Phase 3 — ML Refinement:</strong> Use the DoE data to seed a Bayesian optimization loop. The GP surrogate model starts with a good prior from the DoE, requiring fewer additional experiments to converge.</li>
</ol>

<pre><code class="language-python">import numpy as np
import pandas as pd
from itertools import product

def generate_ccd(factors, levels=5):
    """Generate Central Composite Design for response surface modeling."""
    n = len(factors)
    alpha = np.sqrt(n)  # Star point distance

    # Factorial points (2^n)
    factorial = np.array(list(product([-1, 1], repeat=n)))

    # Star points (2n)
    star = np.zeros((2 * n, n))
    for i in range(n):
        star[2*i, i] = -alpha
        star[2*i+1, i] = alpha

    # Center points (typically 3-5 replicates)
    center = np.zeros((5, n))

    design_coded = np.vstack([factorial, star, center])

    # Convert to real units
    design_real = pd.DataFrame()
    for i, (name, (low, high)) in enumerate(factors.items()):
        mid = (low + high) / 2
        half_range = (high - low) / 2
        design_real[name] = mid + design_coded[:, i] * half_range

    return design_real

# Screening factors for an etch recipe
factors = {
    'etch_time': (30, 60),
    'rf_power': (200, 400),
    'pressure': (3, 8),
}

ccd = generate_ccd(factors)
print(f"CCD requires {len(ccd)} experiments for {len(factors)} factors")
print(ccd.head(10))

# After running experiments, train ML model on DoE data
# Then switch to Bayesian optimization for fine-tuning
</code></pre>

<div class="analogy">
  <h3>Analogy: House Hunting</h3>
  <p>DoE is like surveying all neighborhoods in a city (broad coverage, structured). ML-based optimization is like deep-diving into the most promising neighborhoods (targeted, adaptive). The best strategy: survey first, then deep-dive where it matters.</p>
</div>
`,
        },
        {
          id: "multi-objective",
          title: "Multi-Objective Recipe Optimization",
          content: `
<h2>Multi-Objective Recipe Optimization</h2>
<p>Real recipe optimization is almost never single-objective. You're simultaneously trying to:</p>
<ul>
  <li>Hit target etch depth (minimize deviation from 50 nm)</li>
  <li>Maximize etch selectivity (etch target material, not mask)</li>
  <li>Minimize surface roughness</li>
  <li>Minimize within-wafer non-uniformity</li>
  <li>Maximize throughput (minimize etch time)</li>
</ul>
<p>These objectives often <strong>conflict</strong>. The solution is a <strong>Pareto front</strong>: the set of recipes where no objective can be improved without worsening another.</p>

<pre><code class="language-python">import numpy as np
from sklearn.gaussian_process import GaussianProcessRegressor

class MultiObjectiveRecipeOptimizer:
    """Multi-objective Bayesian optimization using EHVI."""

    def __init__(self, param_bounds, objective_names, ref_point):
        self.bounds = param_bounds
        self.objectives = objective_names
        self.ref_point = ref_point  # Worst acceptable values
        self.gps = {obj: GaussianProcessRegressor() for obj in objective_names}
        self.X_observed = []
        self.Y_observed = {obj: [] for obj in objective_names}

    def is_pareto_optimal(self, costs):
        """Find Pareto-optimal points (assuming minimization)."""
        is_efficient = np.ones(costs.shape[0], dtype=bool)
        for i, c in enumerate(costs):
            if is_efficient[i]:
                # A point is dominated if another point is <= in all objectives
                # and < in at least one
                is_efficient[is_efficient] = np.any(
                    costs[is_efficient] < c, axis=1
                ) | np.all(costs[is_efficient] == c, axis=1)
                is_efficient[i] = True
        return is_efficient

    def get_pareto_front(self):
        """Return current Pareto-optimal recipes."""
        if len(self.X_observed) == 0:
            return [], []

        Y_matrix = np.column_stack([
            self.Y_observed[obj] for obj in self.objectives
        ])
        pareto_mask = self.is_pareto_optimal(Y_matrix)

        pareto_X = np.array(self.X_observed)[pareto_mask]
        pareto_Y = Y_matrix[pareto_mask]
        return pareto_X, pareto_Y

# Example: etch recipe with competing objectives
optimizer = MultiObjectiveRecipeOptimizer(
    param_bounds={'etch_time': (30, 60), 'rf_power': (200, 400)},
    objective_names=['depth_error', 'roughness', 'nonuniformity'],
    ref_point=[5.0, 2.0, 10.0]  # Worst acceptable values
)

# The engineer picks from the Pareto front based on which
# trade-off is most acceptable for their specific application
</code></pre>

<div class="did-you-know">
  <h3>Did You Know?</h3>
  <p>Leading equipment companies like Applied Materials and Lam Research now embed ML-based recipe optimization directly into their equipment software. Instead of process engineers manually running DoEs over weeks, the equipment autonomously explores the recipe space and converges on optimal settings — reducing recipe development time from weeks to days.</p>
</div>
`,
        },
      ],
      quiz: [
        {
          question:
            "Why is Bayesian optimization well-suited for semiconductor recipe tuning?",
          options: [
            "It requires no training data at all",
            "It runs experiments in parallel on all wafers simultaneously",
            "It is sample-efficient, finding optima in 20–50 experiments rather than hundreds",
            "It only works with linear process models",
          ],
          correctIndex: 2,
          explanation:
            "Each recipe experiment costs hundreds of dollars and hours of time. Bayesian optimization's sample efficiency — finding optima in 20–50 experiments vs. 200+ for grid search — is crucial when experiments are expensive. It achieves this by building a GP surrogate model and using acquisition functions to choose the most informative experiments.",
        },
        {
          question:
            "In the DoE + ML hybrid workflow, what is the purpose of the screening DoE phase?",
          options: [
            "To generate training data for a deep neural network",
            "To identify which recipe parameters actually matter, reducing dimensionality before optimization",
            "To test the metrology equipment's accuracy",
            "To verify that the ML model is correctly installed",
          ],
          correctIndex: 1,
          explanation:
            "Screening DoE (e.g., fractional factorial) efficiently identifies which of the many recipe parameters have significant effects on the output. This reduces the optimization space from 10+ dimensions to 3–5, making subsequent ML-based optimization much more efficient.",
        },
        {
          question:
            "What is a Pareto front in multi-objective recipe optimization?",
          options: [
            "The fastest recipe that meets all specifications",
            "The set of recipes where no objective can be improved without worsening another",
            "The boundary between acceptable and unacceptable process windows",
            "The maximum throughput achievable for a given equipment set",
          ],
          correctIndex: 1,
          explanation:
            "The Pareto front is the set of non-dominated solutions — recipes where you cannot improve one objective (e.g., reduce roughness) without worsening another (e.g., increasing etch time). The engineer selects from this front based on which trade-offs are most acceptable for their application.",
        },
      ],
    },
  ],
};
