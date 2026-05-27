

export const subject18 = {
  id: "yield-prediction-optimization",
  number: 18,
  title: "Yield Prediction & Optimization",
  description:
    "Build ML models that predict and optimize semiconductor yield — the ultimate metric that determines fab profitability.",
  phase: 5,
  chapters: [
    {
      id: "understanding-yield",
      title: "Understanding Yield",
      subtitle: "Yield definitions, loss categories, and the economics of yield improvement",
      sections: [
        {
          id: "yield-fundamentals",
          title: "Yield Fundamentals",
          content: `
<h2>Yield Fundamentals</h2>
<p><strong>Yield</strong> is the fraction of manufactured dies that work correctly. It's the single most important metric in semiconductor manufacturing:</p>
<ul>
  <li><strong>Die yield:</strong> (Good dies / Total dies per wafer) × 100%. This is the headline number.</li>
  <li><strong>Wafer yield:</strong> Fraction of wafers that complete the fab process without being scrapped.</li>
  <li><strong>Parametric yield:</strong> Fraction of dies that meet performance specifications (speed, power, leakage).</li>
  <li><strong>Bin yield:</strong> Fraction of dies in each speed/power bin (premium vs. budget grades).</li>
</ul>
<p>The classic <strong>Poisson yield model</strong>: Y = e^(-D₀ × A), where D₀ is defect density (defects/cm²) and A is die area (cm²). Key insight: larger dies have exponentially lower yield. (Several refinements — Murphy's, Seeds', and the negative-binomial model — are covered in the dedicated section in chapter 3.)</p>
<div class="key-concept">
  <h3>Key Concept: The Yield Learning Curve</h3>
  <p>New process technologies start at low yield (30–50%) and improve over months through <strong>yield learning</strong> — systematically identifying and eliminating defect sources. Mature processes achieve 90–99% yield. Accelerating yield learning by even a few weeks translates to hundreds of millions in additional revenue.</p>
</div>`,
        },
        {
          id: "yield-loss-categories",
          title: "Categories of Yield Loss",
          content: `
<h2>Categories of Yield Loss</h2>
<p>Yield loss can be decomposed into several categories:</p>
<table>
  <thead>
    <tr><th>Category</th><th>Description</th><th>Typical share of <em>total</em> yield loss</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Random defects</strong></td><td>Particles and random pattern defects</td><td>30–50%</td></tr>
    <tr><td><strong>Systematic defects</strong></td><td>Design-process interaction failures</td><td>20–40%</td></tr>
    <tr><td><strong>Parametric failures</strong></td><td>Devices out of spec (speed, leakage)</td><td>10–25%</td></tr>
    <tr><td><strong>Edge/peripheral</strong></td><td>Dies near wafer edge with poor process control</td><td>5–10%</td></tr>
    <tr><td><strong>Test/packaging</strong></td><td>Failures during probe test or packaging</td><td>2–5%</td></tr>
  </tbody>
</table>
<p>Ranges are <em>typical fractions of total yield loss</em> seen across fabs and mixes — for any single product the categories partition 100%, but each individual range overlaps because the dominant contributor varies by node and design. ML models decompose this loss by correlating failures with upstream process data, defect inspection results, and design features.</p>`,
        },
      ],
      quiz: [
        {
          question: "According to the Poisson model, what happens to yield when die area doubles?",
          options: [
            "Yield decreases exponentially (much more than 2×)",
            "Yield decreases by exactly half",
            "Yield stays the same",
            "Yield increases because larger dies are stronger",
          ],
          correctIndex: 0,
          explanation:
            "The Poisson model Y = e^(-D₀×A) shows that yield drops exponentially with area. Doubling die area more than doubles the exponent, causing yield to drop much more than 2× — this is why large dies are so much more expensive.",
        },
        {
          question: "What is the largest contributor to yield loss in most fabs?",
          options: [
            "Random defects (particles and random pattern defects)",
            "Test equipment failures",
            "Power supply issues",
            "Design errors",
          ],
          correctIndex: 0,
          explanation:
            "Random defects (particles, random opens/shorts) typically account for 30–50% of yield loss, making them the largest single contributor and a primary target for improvement efforts.",
        },
      ],
    },
    {
      id: "data-sources-yield",
      title: "Data Sources for Yield",
      subtitle: "Inline metrology, WAT data, FDC, and merging heterogeneous data",
      sections: [
        {
          id: "yield-data-landscape",
          title: "The Yield Data Landscape",
          content: `
<h2>The Yield Data Landscape</h2>
<p>Yield prediction requires integrating multiple data sources across the entire manufacturing flow:</p>
<ul>
  <li><strong>Inline metrology:</strong> CD, overlay, film thickness, and other measurements taken during fabrication. Sparse sampling (5–20 sites per wafer, 5–10% of wafers).</li>
  <li><strong>FDC (equipment sensor data):</strong> Process conditions for every wafer on every tool. Complete coverage but indirect — must be correlated to yield outcomes.</li>
  <li><strong>Defect inspection:</strong> Defect counts, maps, and classifications from optical and e-beam inspection.</li>
  <li><strong>WAT (Wafer Acceptance Test):</strong> Electrical measurements on test structures after fab completion — transistor parameters (Vt, Idsat, Ioff), resistances, capacitances.</li>
  <li><strong>Sort/probe data:</strong> Die-level pass/fail and bin results from electrical testing.</li>
  <li><strong>Design data:</strong> Die layout features — pattern density, metal coverage, critical design rules.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Data Integration Challenge</h3>
  <p>Each data source has different granularity (wafer-level, die-level, site-level), different sampling rates, and different schemas. Merging them into a unified dataset is often <strong>80% of the ML project effort</strong>. Wafer ID and lot ID are the typical join keys, but handling missing data and mismatched sampling is non-trivial.</p>
</div>`,
        },
        {
          id: "wafer-die-feature-table",
          title: "Building the Wafer × Die Feature Table",
          content: `
<h2>Building the Wafer × Die Feature Table</h2>
<p>Every yield model in production starts from one canonical artifact: a flat <strong>(wafer, die) feature table</strong>. Building it cleanly determines whether the model works.</p>
<h3>Standard schema</h3>
<table>
  <thead>
    <tr><th>Column</th><th>Source</th><th>Granularity</th></tr>
  </thead>
  <tbody>
    <tr><td>lot_id, wafer_id, die_x, die_y</td><td>MES</td><td>die</td></tr>
    <tr><td>route step IDs (etch_chamber, litho_chamber, …)</td><td>MES history</td><td>wafer × step</td></tr>
    <tr><td>FDC summary stats per step (mean, std, slope)</td><td>FDC database</td><td>wafer × step</td></tr>
    <tr><td>Inline metrology (CD, overlay, thickness)</td><td>Metrology DB</td><td>site (interpolated to die)</td></tr>
    <tr><td>Defect counts in 0.5 mm neighborhood</td><td>Inspection DB</td><td>die</td></tr>
    <tr><td>WAT params (Vt, Idsat, Ioff) at nearest test site</td><td>Test DB</td><td>site (interpolated)</td></tr>
    <tr><td>Sort bin (label)</td><td>Probe DB</td><td>die</td></tr>
  </tbody>
</table>
<h3>Sketch of the build pipeline</h3>
<pre><code class="language-python">import pandas as pd

def build_die_feature_table(lot_ids):
    """Join MES + FDC + metrology + defects + WAT + sort into a die-level table."""
    mes      = load_mes_history(lot_ids)              # wafer × step
    fdc      = load_fdc_summaries(lot_ids)            # wafer × step
    metro    = load_inline_metrology(lot_ids)         # site
    defects  = load_defect_records(lot_ids)           # die
    wat      = load_wat(lot_ids)                      # site
    sort     = load_sort_bins(lot_ids)                # die

    # 1. Wafer-level: route + FDC summaries
    wafer_df = mes.merge(fdc, on=["lot_id", "wafer_id", "step"])
    wafer_df = wafer_df.pivot_table(
        index=["lot_id", "wafer_id"],
        columns="step",
        values=[c for c in wafer_df.columns if c.startswith("fdc_")],
    )
    wafer_df.columns = ["__".join(c) for c in wafer_df.columns]
    wafer_df = wafer_df.reset_index()

    # 2. Site-level → die-level by nearest-neighbor on (x, y)
    metro_die  = interpolate_to_dies(metro,  key=("die_x", "die_y"))
    wat_die    = interpolate_to_dies(wat,    key=("die_x", "die_y"))

    # 3. Defect counts per die (0.5 mm radius)
    defect_die = count_defects_per_die(defects, radius_mm=0.5)

    # 4. Final outer join
    die_df = sort.merge(wafer_df,  on=["lot_id", "wafer_id"], how="left")
    die_df = die_df.merge(metro_die, on=["lot_id", "wafer_id", "die_x", "die_y"], how="left")
    die_df = die_df.merge(wat_die,   on=["lot_id", "wafer_id", "die_x", "die_y"], how="left")
    die_df = die_df.merge(defect_die,on=["lot_id", "wafer_id", "die_x", "die_y"], how="left")
    return die_df
</code></pre>
<h3>Three things that go wrong</h3>
<ul>
  <li><strong>Step-name drift</strong> — recipes get renamed; you suddenly have two columns for the same physical step</li>
  <li><strong>Coordinate misalignment</strong> — inline metrology sites and probe dies use different coordinate systems; mis-mapping invents fake correlations</li>
  <li><strong>Look-ahead leakage</strong> — joining WAT (taken after the fab) into a feature for predicting yield is fine; joining it as a <em>process input</em> is data leakage</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Treat the Feature Table as a Product</h3>
  <p>The feature table is the central artifact for every downstream model — yield, defect, virtual metrology. Version it, test it, and document each column. Without a stable schema, every new model project re-builds it from scratch and gets a slightly different answer.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What fraction of the ML project effort is typically spent on data integration for yield prediction?",
          options: [
            "~80%",
            "~10%",
            "~50%",
            "~5%",
          ],
          correctIndex: 0,
          explanation:
            "Data integration typically consumes about 80% of the effort in yield prediction projects. Merging heterogeneous data sources with different granularity, sampling rates, and schemas is the primary challenge.",
        },
        {
          question: "Why is the die-level feature table treated as a versioned product, not a one-off script output?",
          options: [
            "Every downstream model (yield, defect, VM) depends on it; without a stable schema results stop being comparable",
            "It is required by ISO 14644",
            "Pandas needs versioning to run",
            "Versioning increases compression ratio",
          ],
          correctIndex: 0,
          explanation:
            "Yield, defect, and VM models all share the same feature substrate. Versioning the table — schema, definitions, join logic — is what lets two engineers run the same query a month apart and trust they're comparing apples to apples.",
        },
      ],
    },
    {
      id: "yield-prediction-models",
      title: "Yield Prediction Models",
      subtitle: "Analytical yield models, regression, ensemble methods, spatial models, and handling limited data",
      sections: [
        {
          id: "analytical-yield-models",
          title: "Analytical Yield Models: Poisson, Murphy, and Negative Binomial",
          content: `
<h2>Analytical Yield Models: Poisson, Murphy, and Negative Binomial</h2>
<p>Before ML, the industry built a small family of closed-form yield models that still anchor every modern analysis. They all start from one observation: yield falls roughly exponentially with the product of defect density (D₀) and critical area (A).</p>
<h3>1. Poisson</h3>
<p style="text-align:center;font-family:serif"><em>Y<sub>Poisson</sub> = exp(−D₀·A)</em></p>
<p>Assumes defects are spatially random and independent. Works for small dies and low defect counts, but <strong>underestimates yield for large dies</strong> because it ignores defect clustering.</p>
<h3>2. Murphy's model</h3>
<p>Murphy (1964) argued that D₀ itself varies across the wafer (some dies have more particles than others). Averaging Poisson yield over a triangular distribution of D₀ gives:</p>
<p style="text-align:center;font-family:serif"><em>Y<sub>Murphy</sub> = [(1 − exp(−D₀·A)) / (D₀·A)]<sup>2</sup></em></p>
<p>This is the most-cited closed-form correction — it predicts noticeably higher yields than pure Poisson for large dies.</p>
<h3>3. Seeds' model</h3>
<p>Seeds substituted an exponential D₀ distribution instead of triangular:</p>
<p style="text-align:center;font-family:serif"><em>Y<sub>Seeds</sub> = 1 / (1 + D₀·A)</em></p>
<h3>4. Negative binomial — the modern default</h3>
<p>The most-used analytical model in production today. It explicitly parameterises clustering via a <strong>cluster parameter α</strong> (smaller α = more clustering):</p>
<p style="text-align:center;font-family:serif"><em>Y<sub>NB</sub> = (1 + D₀·A / α)<sup>−α</sup></em></p>
<p>It smoothly recovers the previous models: α → ∞ gives Poisson, α = 1 gives Seeds, and finite α &lt; 1 captures the typical clustering seen on real wafers.</p>
<h3>Putting the models in code</h3>
<pre><code class="language-python">import numpy as np

def yield_poisson(D0, A):
    return np.exp(-D0 * A)

def yield_murphy(D0, A):
    x = D0 * A
    return ((1 - np.exp(-x)) / x) ** 2

def yield_seeds(D0, A):
    return 1.0 / (1.0 + D0 * A)

def yield_negative_binomial(D0, A, alpha):
    return (1.0 + D0 * A / alpha) ** (-alpha)

# A 600 mm² die at D0 = 0.5 defects/cm² ⇒ D0·A = 3
for name, fn, args in [
    ("Poisson",    yield_poisson,    ()),
    ("Murphy",     yield_murphy,     ()),
    ("Seeds",      yield_seeds,      ()),
    ("NB (α=2)",   yield_negative_binomial, (2.0,)),
    ("NB (α=0.5)", yield_negative_binomial, (0.5,)),
]:
    Y = fn(0.5, 6.0, *args)
    print(f"{name:12s}  Y = {Y*100:.1f}%")
</code></pre>
<table>
  <thead>
    <tr><th>D₀·A</th><th>Poisson</th><th>Murphy</th><th>Seeds</th><th>NB (α=0.5)</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>37%</td><td>40%</td><td>50%</td><td>58%</td></tr>
    <tr><td>3</td><td>5%</td><td>11%</td><td>25%</td><td>38%</td></tr>
    <tr><td>6</td><td>0.25%</td><td>2.8%</td><td>14%</td><td>27%</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: Why ML Doesn't Replace These Models</h3>
  <p>ML models predict yield wafer-by-wafer from features; analytical models predict yield from <em>defect density</em>. Fabs use them together: the analytical model decomposes yield into D₀ for each defect type (random, edge, systematic), and the ML model predicts how each D₀ will respond to process changes.</p>
</div>`,
        },
        {
          id: "modeling-approaches",
          title: "Modeling Approaches for Yield Prediction",
          content: `
<h2>Modeling Approaches for Yield Prediction</h2>
<p>Different modeling strategies serve different yield prediction needs:</p>
<ul>
  <li><strong>Wafer-level regression:</strong> Predict overall wafer yield from process parameters using XGBoost, Random Forest, or neural networks. Best for identifying process factors that drive yield variation.</li>
  <li><strong>Die-level prediction:</strong> Predict pass/fail or bin for individual dies. Much more data points but requires die-level features (design, spatial position, nearby metrology). Logistic regression, gradient boosting.</li>
  <li><strong>Spatial models:</strong> Account for across-wafer variation patterns. Gaussian Process models capture spatial correlations. CNN-based models treat the wafer map as an image.</li>
  <li><strong>Virtual WAT:</strong> Predict WAT electrical parameters from inline metrology and FDC data — faster than waiting for actual WAT measurements.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Feature Importance for Yield</h3>
  <p>The most valuable output of yield models is often not the prediction itself but the <strong>feature importance ranking</strong>. Knowing which process parameters most strongly influence yield directs engineering attention to the highest-impact improvements. SHAP values provide interpretable per-wafer explanations.</p>
</div>`,
        },
        {
          id: "small-data-strategies",
          title: "Handling Small Datasets",
          content: `
<h2>Handling Small Datasets</h2>
<p>Semiconductor yield data has unique challenges:</p>
<ul>
  <li><strong>Small n, large p:</strong> Hundreds of process parameters (features) but often only hundreds or thousands of wafers with yield data. Regularization is essential.</li>
  <li><strong>Non-stationary:</strong> Process conditions change over time (maintenance, recipe updates, material lot changes), so historical data may not represent current conditions.</li>
  <li><strong>Censored data:</strong> Wafers scrapped mid-process never get final yield data.</li>
</ul>
<p>Strategies for small datasets:</p>
<ul>
  <li>Strong regularization (Lasso, Ridge, ElasticNet) to prevent overfitting</li>
  <li>Bayesian methods that incorporate prior knowledge</li>
  <li>Transfer learning from similar products or process nodes</li>
  <li>Physics-informed features that encode domain knowledge</li>
  <li>Cross-validation with time-aware splits (no data leakage from future)</li>
</ul>`,
        },
      ],
      quiz: [
        {
          question: "Why does the negative binomial model usually fit large-die yield better than the pure Poisson model?",
          options: [
            "It accounts for defect clustering via the α parameter, whereas Poisson assumes purely random defects",
            "It uses a larger D₀",
            "It only counts killer defects",
            "It assumes zero defect density",
          ],
          correctIndex: 0,
          explanation:
            "Real wafers show defect clustering — some regions concentrate particles. The negative-binomial form (1 + D₀A/α)^(−α) parameterises that clustering and recovers Poisson only as α → ∞. For large dies, this yields noticeably higher (and more accurate) yield predictions.",
        },
        {
          question: "What is often the most valuable output of yield prediction models?",
          options: [
            "Feature importance rankings that show which process parameters most impact yield",
            "The exact yield prediction number",
            "A visualization of the model architecture",
            "The training time of the model",
          ],
          correctIndex: 0,
          explanation:
            "While predictions are useful, the feature importance rankings (e.g., via SHAP values) are often more valuable — they direct engineers to the specific process parameters that most strongly influence yield, enabling targeted improvements.",
        },
        {
          question: "Why is time-aware cross-validation important for yield models?",
          options: [
            "To prevent data leakage from using future process conditions to predict past yield",
            "To make training faster",
            "To reduce the dataset size",
            "To improve visualization",
          ],
          correctIndex: 0,
          explanation:
            "Time-aware splits ensure the model is evaluated on future data, not past. Using random splits risks leaking information from later process conditions into training data, giving misleadingly optimistic performance estimates.",
        },
      ],
    },
    {
      id: "yield-optimization",
      title: "Yield Optimization",
      subtitle: "Process window optimization, DOE, Bayesian optimization, and digital twins",
      sections: [
        {
          id: "optimization-approaches",
          title: "From Prediction to Optimization",
          content: `
<h2>From Prediction to Optimization</h2>
<p>Once you can predict yield, the next step is <strong>optimizing</strong> it — finding the process parameter settings that maximize yield:</p>
<ul>
  <li><strong>Process window optimization:</strong> Find the range of each parameter that produces acceptable yield. The overlap of all parameter windows is the "process window." Wider windows = more robust processes.</li>
  <li><strong>DOE (Design of Experiments):</strong> Systematically vary parameters to map the response surface. ML-guided DOE selects the most informative experiments, reducing the number of expensive wafer runs needed.</li>
  <li><strong>Bayesian optimization:</strong> Efficiently search the parameter space for optimal settings using a surrogate model (typically Gaussian Process). Each experiment informs the next, converging on the optimum with minimal experiments.</li>
  <li><strong>Multi-objective optimization:</strong> Simultaneously optimize yield, throughput, and cost — often with competing trade-offs. Pareto front analysis identifies the best compromises.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Digital Twins</h3>
  <p>A <strong>digital twin</strong> is a ML model of the entire process that can simulate yield outcomes for any combination of parameters. Engineers can run thousands of "what-if" scenarios virtually before committing to expensive physical experiments. This accelerates process development by 5–10×.</p>
</div>`,
        },
        {
          id: "real-world-impact",
          title: "Real-World Impact",
          content: `
<h2>Real-World Impact</h2>
<p>ML-driven yield optimization delivers measurable business impact:</p>
<ul>
  <li><strong>Faster yield ramp:</strong> New technology nodes achieve target yield weeks faster, generating hundreds of millions in additional revenue.</li>
  <li><strong>Higher mature yield:</strong> Even 0.1% yield improvement at a mature node translates to significant revenue for high-volume products.</li>
  <li><strong>Reduced excursions:</strong> Early detection of yield-limiting conditions prevents large-scale production losses.</li>
  <li><strong>Better process windows:</strong> ML-optimized recipes are more robust to incoming material and equipment variations.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Tuning a Race Car</h3>
  <p>Yield optimization is like tuning a race car for maximum performance. There are dozens of adjustable parameters (tire pressure, suspension, gear ratios, aero), each interacting with the others. Traditional approaches test one thing at a time. ML-guided optimization understands the interactions and finds the sweet spot exponentially faster.</p>
</div>
<p>This is where data science skills directly translate to <strong>fab-level impact</strong>. A data scientist who understands both the ML techniques and the semiconductor domain can drive improvements worth millions of dollars annually.</p>`,
        },
      ],
      quiz: [
        {
          question: "What is Bayesian optimization's key advantage for process optimization?",
          options: [
            "It efficiently finds optimal settings with minimal experiments by using each result to guide the next",
            "It doesn't require any data",
            "It always finds the global optimum on the first try",
            "It only works for simple linear systems",
          ],
          correctIndex: 0,
          explanation:
            "Bayesian optimization uses a surrogate model (typically Gaussian Process) to predict promising parameter regions and selects the most informative next experiment. This converges on optimal settings with far fewer experiments than grid search or random search.",
        },
        {
          question: "What is a digital twin in semiconductor manufacturing?",
          options: [
            "An ML model that simulates process outcomes, allowing virtual experimentation",
            "A physical copy of the fab",
            "A backup wafer for each production wafer",
            "A mirror image of the chip design",
          ],
          correctIndex: 0,
          explanation:
            "A digital twin is an ML model of the manufacturing process that can simulate yield and quality outcomes for any parameter combination, enabling thousands of virtual experiments before committing to costly physical wafer runs.",
        },
      ],
    },
  ],
};
