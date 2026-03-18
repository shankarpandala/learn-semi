

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
<p>The classic <strong>Poisson yield model</strong>: Y = e^(-D₀ × A), where D₀ is defect density (defects/cm²) and A is die area (cm²). Key insight: larger dies have exponentially lower yield.</p>
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
    <tr><th>Category</th><th>Description</th><th>Typical Contribution</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Random defects</strong></td><td>Particles and random pattern defects</td><td>30–50% of yield loss</td></tr>
    <tr><td><strong>Systematic defects</strong></td><td>Design-process interaction failures</td><td>20–40%</td></tr>
    <tr><td><strong>Parametric failures</strong></td><td>Devices out of spec (speed, leakage)</td><td>10–30%</td></tr>
    <tr><td><strong>Edge/peripheral</strong></td><td>Dies near wafer edge with poor process control</td><td>5–15%</td></tr>
    <tr><td><strong>Test/packaging</strong></td><td>Failures during probe test or packaging</td><td>2–5%</td></tr>
  </tbody>
</table>
<p>Understanding which category dominates helps focus improvement efforts. ML models can decompose yield loss by correlating failures with upstream process data, defect inspection results, and design features.</p>`,
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
      ],
    },
    {
      id: "yield-prediction-models",
      title: "Yield Prediction Models",
      subtitle: "Regression, ensemble methods, spatial models, and handling limited data",
      sections: [
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
