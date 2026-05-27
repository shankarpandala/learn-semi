

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
        {
          question: "Why must overlay tolerance be < 1/3 of the critical dimension?",
          options: [
            "Overlay error directly eats the alignment budget between successive layers; >1/3 CD causes shorts and opens",
            "Because masks are 4× larger than the wafer image",
            "Because OCD cannot resolve smaller offsets",
            "Because resist swells by 1/3 of CD",
          ],
          correctIndex: 0,
          explanation:
            "Successive layers must land on top of each other within a fraction of the CD. A common rule of thumb is overlay error ≤ ~20–30% of the minimum feature size; beyond that, vias miss landing pads, gates miss source/drain, and yield collapses.",
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
        {
          id: "afm-tem-xrd",
          title: "AFM, TEM, and XRD — When You Need More Than a Spectrum",
          content: `
<h2>AFM, TEM, and XRD — When You Need More Than a Spectrum</h2>
<p>Spectroscopic techniques give you film thickness and composition averaged over a spot. For the hardest characterisation questions — atom-scale geometry, lattice strain, true surface topography — three workhorse techniques take over:</p>
<table>
  <thead>
    <tr><th>Technique</th><th>What it measures</th><th>Resolution</th><th>Throughput</th><th>Typical vendor</th></tr>
  </thead>
  <tbody>
    <tr><td>AFM (Atomic Force Microscopy)</td><td>3D surface topography, roughness</td><td>~0.1 nm Z, ~1 nm XY</td><td>Slow (offline)</td><td>Bruker, Park Systems</td></tr>
    <tr><td>TEM (Transmission Electron Microscopy)</td><td>Cross-section structure, atomic columns</td><td>&lt;0.1 nm</td><td>Destructive, lab tool</td><td>JEOL, Thermo Fisher (Titan)</td></tr>
    <tr><td>XRD (X-Ray Diffraction)</td><td>Lattice spacing, strain, crystallinity, texture</td><td>Lattice constants to ~10⁻⁴</td><td>Inline-friendly</td><td>Bruker, Rigaku, Jordan Valley</td></tr>
    <tr><td>XRR (X-Ray Reflectivity)</td><td>Film thickness (0.1–200 nm), density, roughness</td><td>~Å thickness</td><td>Inline-friendly</td><td>Bruker, Rigaku</td></tr>
  </tbody>
</table>
<h3>Where each is used in a modern fab flow</h3>
<ul>
  <li><strong>AFM</strong> — CMP step-height verification, line-edge roughness (LER) for FinFET fins, post-etch sidewall profile checks</li>
  <li><strong>TEM</strong> — failure analysis and process development. Focused-ion-beam (FIB) lift-out preps a ~50 nm cross-section that a TEM images at single-atom resolution. Indispensable for the first lots at a new node.</li>
  <li><strong>XRD</strong> — measure Ge fraction in SiGe (from peak shift) or strain in epitaxial layers; high-resolution XRD (HRXRD) is the inline tool for epi alloy composition</li>
  <li><strong>XRR</strong> — ultra-thin (1–5 nm) film thickness and density; complements ellipsometry where film optical properties are unknown</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Why TEM Hasn't Gone Inline</h3>
  <p>TEM needs an electron-transparent sample, which means a destructive FIB lift-out. Sample prep alone takes hours per site. That's why TEM lives in failure-analysis labs while ellipsometry / OCD / XRR do the inline work on every wafer.</p>
</div>`,
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
        {
          question: "Why is high-resolution XRD used to characterise SiGe epi layers?",
          options: [
            "The angular shift of the SiGe peak relative to Si directly gives the Ge fraction and lattice strain",
            "It is the only tool that can resolve Si and Ge optically",
            "It heats the film during measurement",
            "It is faster than ellipsometry for thick films",
          ],
          correctIndex: 0,
          explanation:
            "Ge atoms are larger than Si, so adding Ge expands the lattice. HRXRD measures the precise lattice constant from Bragg peak position; the difference from pure Si tells you both composition (%Ge) and strain state — the two numbers epi engineers care about most.",
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
        {
          id: "kla-and-hitachi-tools",
          title: "Inspection Vendors and Tool Lineup",
          content: `
<h2>Inspection Vendors and Tool Lineup</h2>
<p>Defect inspection is a more concentrated market than litho or etch. Three vendors dominate, each with a clear specialty:</p>
<table>
  <thead>
    <tr><th>Vendor</th><th>Notable tools</th><th>Strength</th></tr>
  </thead>
  <tbody>
    <tr><td>KLA</td><td>2900-series broadband plasma (BBP), Voyager DUV brightfield, eDR-7100 e-beam review</td><td>Pattern wafer inspection, broad coverage from logic to memory</td></tr>
    <tr><td>Applied Materials</td><td>UVision (DUV optical), VeritySEM (CD-SEM), SEMVision (e-beam review)</td><td>Strong in CD-SEM and e-beam review</td></tr>
    <tr><td>Hitachi High-Tech</td><td>CG6300/CG5000 CD-SEM, GT2000 inspection</td><td>Reference CD-SEM platforms</td></tr>
  </tbody>
</table>
<h3>How inspection tools work together</h3>
<ol>
  <li><strong>Inspection</strong> (KLA 2900 / AMAT UVision) scans the wafer for defects → outputs a defect coordinate file</li>
  <li><strong>Review SEM</strong> (Hitachi CG, AMAT SEMVision) revisits each coordinate at 1–5 nm resolution and captures a SEM image</li>
  <li><strong>Automatic Defect Classification (ADC)</strong> labels each image (particle, scratch, missing pattern, bridge…) — modern fabs use CNN-based classifiers</li>
  <li><strong>Yield management system</strong> (KLA Klarity, PDF Solutions, in-house) correlates defects to test wafer maps and assigns root-cause to tools, recipes, or lots</li>
</ol>
<div class="key-concept">
  <h3>Key Concept: Wafer Inspection Cost</h3>
  <p>A single advanced BBP inspection tool costs <strong>$30–60 million</strong> and a fab may need 10+ of them. Inspection equipment alone runs into the hundreds of millions of dollars — but at $10–20 k per wafer of finished value, even a 1% yield rescue pays it back fast.</p>
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
        {
          question: "In a modern defect workflow, what role does Automatic Defect Classification (ADC) play?",
          options: [
            "It labels review-SEM images into defect categories so the yield team can attribute root cause",
            "It physically removes defects from the wafer",
            "It replaces the inspection tool",
            "It controls the e-beam voltage",
          ],
          correctIndex: 0,
          explanation:
            "ADC consumes the high-resolution review images and assigns each defect a class (particle, scratch, missing pattern, bridge…). Those labels are what let the yield engineer correlate defects with tools, recipes, and process steps.",
        },
      ],
    },
  ],
};
