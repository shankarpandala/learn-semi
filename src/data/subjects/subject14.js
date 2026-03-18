

export const subject14 = {
  id: "metrology-inspection-equipment",
  number: 14,
  title: "Metrology & Inspection Equipment",
  description:
    "Learn about the measurement and inspection tools that ensure every layer meets spec — from CD-SEM to optical inspection.",
  phase: 4,
  chapters: [
    {
      id: "why-metrology-matters",
      title: "Why Metrology Matters",
      subtitle: "Process control loops, sampling strategies, and tolerances",
      sections: [
        {
          id: "metrology-role",
          title: "The Role of Metrology in Fab Control",
          content: `
<h2>The Role of Metrology in Fab Control</h2>
<p><strong>Metrology</strong> — the science of measurement — is the eyes of the fab. Without it, you're manufacturing blind. Metrology enables:</p>
<ul>
  <li><strong>Process control:</strong> Measuring film thickness, CD (critical dimension), overlay, and other parameters to keep processes centered on target.</li>
  <li><strong>SPC (Statistical Process Control):</strong> Tracking measurements over time to detect drift before it causes yield loss.</li>
  <li><strong>Feedback/feedforward loops:</strong> Adjusting process recipes based on upstream measurements to compensate for variations.</li>
  <li><strong>Disposition:</strong> Deciding whether wafers pass quality gates and can proceed to the next step.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Sampling Problem</h3>
  <p>Physical metrology is slow and expensive, so typically only <strong>5–10% of wafers</strong> are measured, at only 5–20 sites per wafer. This sparse sampling means problems on unmeasured wafers go undetected — which is exactly why <strong>virtual metrology</strong> (ML-predicted measurements from equipment sensor data) is so valuable.</p>
</div>`,
        },
        {
          id: "specs-and-tolerances",
          title: "Specs and Tolerances",
          content: `
<h2>Specs and Tolerances</h2>
<p>Every metrology measurement has specifications:</p>
<table>
  <thead>
    <tr><th>Parameter</th><th>Typical Spec</th><th>Measurement Tool</th></tr>
  </thead>
  <tbody>
    <tr><td>Gate CD</td><td>Target ± 1 nm</td><td>CD-SEM, OCD</td></tr>
    <tr><td>Overlay</td><td>< 2 nm</td><td>Optical overlay tool</td></tr>
    <tr><td>Film thickness</td><td>Target ± 1–2%</td><td>Ellipsometer, XRR</td></tr>
    <tr><td>Defect density</td><td>< 0.1 defects/cm²</td><td>Inspection tool</td></tr>
    <tr><td>Surface roughness</td><td>< 0.2 nm RMS</td><td>AFM</td></tr>
  </tbody>
</table>
<p>At the 3nm node, we're controlling dimensions with <strong>single-atom precision</strong>. The metrology tools must be even more precise than the processes they're measuring.</p>`,
        },
      ],
      quiz: [
        {
          question: "What percentage of wafers are typically measured with physical metrology?",
          options: [
            "5–10%",
            "100%",
            "50%",
            "1%",
          ],
          correctIndex: 0,
          explanation:
            "Physical metrology tools can only measure 5–10% of wafers due to throughput constraints. This sampling gap is a key driver for virtual metrology using ML models.",
        },
        {
          question: "What overlay tolerance is required at advanced nodes?",
          options: [
            "< 2 nm",
            "< 100 nm",
            "< 1 µm",
            "< 50 nm",
          ],
          correctIndex: 0,
          explanation:
            "Advanced nodes require overlay (alignment between successive lithography layers) of less than 2 nm — roughly 10 atoms. This drives the extreme precision requirements for lithography and metrology tools.",
        },
      ],
    },
    {
      id: "cd-overlay-measurement",
      title: "CD & Overlay Measurement",
      subtitle: "CD-SEM, scatterometry, and overlay measurement tools",
      sections: [
        {
          id: "cd-measurement",
          title: "Critical Dimension Measurement",
          content: `
<h2>Critical Dimension Measurement</h2>
<p><strong>Critical Dimension (CD)</strong> — the width of the smallest features — is the most important dimensional measurement in the fab. Two main approaches:</p>
<ul>
  <li><strong>CD-SEM:</strong> A scanning electron microscope optimized for measuring feature widths. Produces top-down images with ~1 nm measurement precision. Advantages: direct imaging, intuitive results. Limitations: slow (~10 wafers/hour for production measurements), can only measure top-down profiles.</li>
  <li><strong>OCD (Optical CD / Scatterometry):</strong> Measures how light scatters from periodic structures (gratings). By fitting the measured spectrum to a physical model, it extracts CD, height, sidewall angle, and profile shape simultaneously. Advantages: fast (~100+ wafers/hour), non-destructive, provides 3D profile info. Limitations: requires periodic targets, model-based (not direct imaging).</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: OCD Model Libraries</h3>
  <p>OCD compares measured optical signatures against a pre-computed library of signatures for different feature dimensions. This is essentially a <strong>regression/lookup problem</strong> — and ML-based approaches are increasingly replacing physics-based models for faster, more accurate fitting.</p>
</div>`,
        },
        {
          id: "overlay-measurement",
          title: "Overlay Measurement",
          content: `
<h2>Overlay Measurement</h2>
<p><strong>Overlay</strong> measures the alignment between the current lithography layer and the previous one. Even small misalignment (>2 nm) can cause shorts or opens between layers.</p>
<p>Overlay tools measure specially designed target structures printed on each layer:</p>
<ul>
  <li><strong>Image-based overlay (IBO):</strong> Optical microscope images box-in-box or frame-in-frame targets. The displacement between inner and outer boxes = overlay error.</li>
  <li><strong>Diffraction-based overlay (DBO):</strong> Measures the difference in diffraction intensity from gratings that are intentionally offset by known amounts. More precise than IBO.</li>
</ul>
<p>Overlay measurements feed directly into the lithography scanner's alignment corrections for subsequent wafers — a classic feedback control loop.</p>`,
        },
      ],
      quiz: [
        {
          question: "What advantage does OCD have over CD-SEM for production measurements?",
          options: [
            "Much higher throughput (100+ vs ~10 wafers/hour) and 3D profile information",
            "Higher resolution images",
            "Lower cost per tool",
            "Ability to measure non-periodic structures",
          ],
          correctIndex: 0,
          explanation:
            "OCD (scatterometry) measures ~100+ wafers/hour vs ~10 for CD-SEM, and simultaneously extracts CD, height, sidewall angle, and profile shape — making it the workhorse for production CD measurement.",
        },
      ],
    },
    {
      id: "film-composition-metrology",
      title: "Film & Composition Metrology",
      subtitle: "Ellipsometry, XRF, XPS, and SIMS for film characterization",
      sections: [
        {
          id: "film-measurement",
          title: "Film Thickness and Composition",
          content: `
<h2>Film Thickness and Composition</h2>
<p>Key techniques for characterizing deposited films:</p>
<ul>
  <li><strong>Spectroscopic Ellipsometry (SE):</strong> Measures how polarized light changes upon reflection from a film stack. Extracts thickness and optical constants for multiple layers simultaneously. The primary production tool for film thickness (1–10,000 nm range).</li>
  <li><strong>X-Ray Fluorescence (XRF):</strong> X-rays excite atoms in the film, which emit characteristic fluorescence. Provides composition and thickness for metal films. Non-destructive and fast.</li>
  <li><strong>X-Ray Photoelectron Spectroscopy (XPS):</strong> Measures the binding energies of photoelectrons to determine chemical composition and bonding states of surface layers. Critical for understanding gate stack chemistry.</li>
  <li><strong>SIMS (Secondary Ion Mass Spectrometry):</strong> Sputters the surface with an ion beam and analyzes ejected atoms with a mass spectrometer. Gives depth profiles of composition with ppb sensitivity. Destructive but uniquely powerful for dopant profiling.</li>
</ul>`,
        },
      ],
      quiz: [
        {
          question: "Which technique provides non-destructive film thickness measurement for production monitoring?",
          options: [
            "Spectroscopic Ellipsometry",
            "SIMS",
            "Cross-sectional TEM",
            "Destructive chemical analysis",
          ],
          correctIndex: 0,
          explanation:
            "Spectroscopic Ellipsometry measures how polarized light reflects from film stacks to extract thickness and optical properties. It's fast, non-destructive, and the primary production tool for film thickness monitoring.",
        },
      ],
    },
    {
      id: "defect-inspection",
      title: "Defect Inspection",
      subtitle: "Brightfield, darkfield, and e-beam inspection for finding killer defects",
      sections: [
        {
          id: "optical-inspection",
          title: "Optical Inspection",
          content: `
<h2>Optical Inspection</h2>
<p>Defect inspection finds particles, pattern defects, and process anomalies that could kill dies:</p>
<ul>
  <li><strong>Brightfield inspection:</strong> Illuminates the wafer and compares the image of each die to its neighbors (die-to-die comparison). Differences = potential defects. High throughput but limited by optical resolution (~30 nm sensitivity).</li>
  <li><strong>Darkfield inspection:</strong> Detects light scattered by defects against a dark background. Higher sensitivity to small particles than brightfield. Used for unpatterned and patterned wafer inspection.</li>
  <li><strong>E-beam inspection:</strong> Scans with a focused electron beam for ultimate resolution (<10 nm). Can detect electrical defects (voltage contrast) invisible to optical tools. Very slow — used for development and focused areas, not full-wafer production inspection.</li>
</ul>
<p>After inspection finds defect locations, a <strong>Review SEM</strong> takes high-resolution images of individual defects for classification — determining what type of defect it is and its root cause.</p>
<div class="key-concept">
  <h3>Key Concept: ML for Defect Classification</h3>
  <p>Automatically classifying defects from SEM review images is a major ML application in fabs. CNNs can classify defects into dozens of categories (particle, scratch, bridging, missing pattern, etc.) faster and more consistently than human operators.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the advantage of e-beam inspection over optical inspection?",
          options: [
            "Higher resolution and ability to detect electrical defects via voltage contrast",
            "Faster throughput",
            "Lower cost",
            "Ability to inspect without vacuum",
          ],
          correctIndex: 0,
          explanation:
            "E-beam inspection offers sub-10nm resolution (much better than optical) and can detect electrical defects through voltage contrast imaging. However, it's much slower than optical inspection.",
        },
      ],
    },
  ],
};
