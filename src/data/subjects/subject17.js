

export const subject17 = {
  id: "defect-detection-classification",
  number: 17,
  title: "Defect Detection & Classification",
  description:
    "Use computer vision and deep learning to automatically detect, classify, and root-cause wafer defects — replacing manual review.",
  phase: 5,
  chapters: [
    {
      id: "defect-types",
      title: "Defect Types in Fabs",
      subtitle: "Particles, pattern defects, systematic vs random, and their impact on yield",
      sections: [
        {
          id: "defect-taxonomy",
          title: "A Taxonomy of Semiconductor Defects",
          content: `
<h2>A Taxonomy of Semiconductor Defects</h2>
<p>Defects in semiconductor manufacturing fall into several categories:</p>
<ul>
  <li><strong>Particles:</strong> Foreign material on the wafer — dust, metal flakes, resist residue. Source: chamber contamination, wafer handling, chemical impurities.</li>
  <li><strong>Pattern defects:</strong> Errors in the circuit pattern itself:
    <ul>
      <li><em>Bridging:</em> Two features that should be separate are connected</li>
      <li><em>Opens/breaks:</em> A feature is interrupted or missing</li>
      <li><em>CD variation:</em> Lines too wide or too narrow</li>
      <li><em>Missing patterns:</em> Entire features absent</li>
    </ul>
  </li>
  <li><strong>Scratches:</strong> Linear damage from CMP, wafer handling, or robotic arm contact</li>
  <li><strong>Film defects:</strong> Pinholes, voids, delamination, thickness non-uniformity</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Systematic vs Random Defects</h3>
  <p><strong>Random defects</strong> (particles, random opens) follow Poisson statistics and affect random locations. <strong>Systematic defects</strong> (pattern-dependent bridging, CMP dishing) affect specific design features reproducibly. Systematic defects are harder to find and fix but often have higher yield impact at advanced nodes.</p>
</div>`,
        },
        {
          id: "wafer-maps",
          title: "Wafer Defect Maps",
          content: `
<h2>Wafer Defect Maps</h2>
<p>A <strong>wafer map</strong> plots the spatial distribution of defects or die pass/fail results across the wafer. Spatial patterns are powerful diagnostic clues:</p>
<ul>
  <li><strong>Random scatter:</strong> Likely particles — check cleanroom, chemical purity, chamber cleanliness</li>
  <li><strong>Center-heavy:</strong> Often deposition or etch non-uniformity (center-to-edge variation)</li>
  <li><strong>Edge ring:</strong> Edge-related issues — spin coating, edge bead removal, focus at wafer edge</li>
  <li><strong>Radial lines:</strong> Possibly CMP slurry distribution or chuck issues</li>
  <li><strong>Cluster:</strong> Localized contamination event — often traceable to a specific chamber or handling step</li>
  <li><strong>Zone pattern:</strong> May indicate reticle defect (repeated at each exposure field)</li>
</ul>
<div class="analogy">
  <h3>Analogy: Medical Imaging</h3>
  <p>Wafer map analysis is like reading a medical scan. Just as a radiologist recognizes tumor shapes, spread patterns, and location significance, a defect engineer reads wafer map patterns to diagnose the root cause. ML automates this pattern recognition.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What does a ring-shaped pattern on a wafer defect map typically indicate?",
          options: [
            "Edge-related issues like spin coating or edge bead removal problems",
            "Reticle defects",
            "Random particle contamination",
            "A design error in the chip",
          ],
          correctIndex: 0,
          explanation:
            "An edge ring pattern on a wafer map typically points to edge-related process issues — common in spin coating, edge bead removal, or plasma processes where edge conditions differ from the wafer center.",
        },
        {
          question: "What distinguishes systematic defects from random defects?",
          options: [
            "Systematic defects affect specific design features reproducibly; random defects occur at random locations",
            "Systematic defects are always larger",
            "Random defects are never harmful",
            "Systematic defects only occur during testing",
          ],
          correctIndex: 0,
          explanation:
            "Systematic defects are pattern-dependent and reproducibly affect certain features (e.g., bridging at tight pitches), while random defects (particles) follow Poisson statistics and hit random locations.",
        },
      ],
    },
    {
      id: "image-based-detection",
      title: "Image-Based Detection",
      subtitle: "CNN architectures, SEM images, and wafer map classification",
      sections: [
        {
          id: "cnn-for-defects",
          title: "CNNs for Defect Detection",
          content: `
<h2>CNNs for Defect Detection</h2>
<p>Deep learning, particularly <strong>Convolutional Neural Networks (CNNs)</strong>, has transformed defect detection in semiconductor manufacturing:</p>
<ul>
  <li><strong>SEM image classification:</strong> After inspection tools locate potential defects, a Review SEM captures high-resolution images. CNNs classify these images into defect categories (particle, bridge, scratch, nuisance, etc.) with >95% accuracy, replacing manual human review.</li>
  <li><strong>Wafer map pattern recognition:</strong> CNNs classify wafer-level defect patterns (center, edge, ring, scratch, random) to identify root causes. Input: 2D defect density map as an image.</li>
  <li><strong>Object detection:</strong> Models like YOLO or Faster R-CNN can locate and classify multiple defects in a single large SEM or optical image.</li>
</ul>
<p>Common architectures in production:</p>
<ul>
  <li><strong>ResNet, EfficientNet:</strong> Standard backbone networks for classification</li>
  <li><strong>U-Net:</strong> For segmentation — pixel-level defect delineation</li>
  <li><strong>Vision Transformers (ViT):</strong> Emerging for their ability to capture global context</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Data Challenges</h3>
  <p>Semiconductor defect datasets are notoriously challenging: highly imbalanced (rare defect types), variable image quality, sensitive/proprietary (can't use public pretrained models easily), and expensive to label (requires expert annotators). Data augmentation, few-shot learning, and self-supervised pretraining are active research areas.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What accuracy level do CNNs typically achieve for SEM defect classification?",
          options: [
            ">95%",
            "~50%",
            "~70%",
            "~80%",
          ],
          correctIndex: 0,
          explanation:
            "Modern CNNs achieve >95% accuracy on SEM defect image classification, often matching or exceeding human expert performance while being much faster and more consistent.",
        },
      ],
    },
    {
      id: "classification-root-cause",
      title: "Classification & Root Cause",
      subtitle: "Multi-class classification, spatial signatures, and equipment fingerprinting",
      sections: [
        {
          id: "root-cause-analysis",
          title: "ML for Root Cause Analysis",
          content: `
<h2>ML for Root Cause Analysis</h2>
<p>Beyond detecting defects, ML helps identify <strong>what caused them</strong>:</p>
<ul>
  <li><strong>Equipment fingerprinting:</strong> Each process chamber leaves subtle "signatures" on wafers. ML models can identify which specific chamber processed a wafer based on defect patterns or metrology signatures — essential for isolating problematic equipment.</li>
  <li><strong>Correlation analysis:</strong> Linking defect occurrences to upstream process parameters. Random Forest feature importance or SHAP values reveal which equipment parameters most strongly predict defects.</li>
  <li><strong>Temporal analysis:</strong> Tracking defect rate trends after PM events, recipe changes, or chemical lot changes to identify root causes.</li>
  <li><strong>Spatial signature matching:</strong> Comparing wafer-level defect patterns against a library of known signatures. Each root cause (reticle defect, chuck contamination, edge ring wear) produces a characteristic spatial pattern.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Forensic Investigation</h3>
  <p>Defect root cause analysis is like crime scene investigation. Each piece of evidence (defect location, type, timing, equipment history) narrows the suspect list. ML automates the detective work, correlating thousands of variables to find the culprit faster than any human could.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is equipment fingerprinting in defect analysis?",
          options: [
            "Identifying which specific chamber processed a wafer based on its defect or metrology signatures",
            "Marking equipment with serial numbers",
            "Physical inspection of equipment surfaces",
            "Measuring equipment dimensions",
          ],
          correctIndex: 0,
          explanation:
            "Equipment fingerprinting uses ML to identify the specific process chamber that handled a wafer by analyzing subtle signatures in defect patterns or metrology data — critical for isolating problematic equipment.",
        },
      ],
    },
    {
      id: "defect-production-systems",
      title: "Production Systems",
      subtitle: "ADC systems, integration with inspection tools, and continuous learning",
      sections: [
        {
          id: "adc-systems",
          title: "Automatic Defect Classification (ADC)",
          content: `
<h2>Automatic Defect Classification (ADC)</h2>
<p><strong>ADC</strong> systems automatically classify defects in real-time as part of the production inspection flow:</p>
<ul>
  <li><strong>Inline ADC:</strong> Classification happens on the inspection/review tool itself, immediately after image capture. Low latency but limited compute.</li>
  <li><strong>Offline ADC:</strong> Images are transferred to a server for classification by more sophisticated models. Higher accuracy but adds delay.</li>
  <li><strong>Hybrid:</strong> Fast pre-classification inline, with uncertain cases sent to a more powerful offline system.</li>
</ul>
<p>Production ADC requirements:</p>
<ul>
  <li><strong>Speed:</strong> Classify 1,000+ defects per wafer in seconds</li>
  <li><strong>Accuracy:</strong> >95% agreement with expert human classification</li>
  <li><strong>Purity:</strong> Critical defect categories (e.g., "killer defect") must have very high precision — false negatives are costly</li>
  <li><strong>Adaptability:</strong> Models must handle new defect types as processes change</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Continuous Learning</h3>
  <p>Semiconductor processes constantly evolve — new recipes, new materials, new pattern densities. ADC models must be <strong>continuously updated</strong> with new training data. This requires a pipeline: flag uncertain classifications → expert review → relabel → retrain → redeploy. Active learning prioritizes the most informative samples for human review.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the key challenge for ADC systems in production?",
          options: [
            "Maintaining accuracy as processes evolve, requiring continuous model updates",
            "Getting enough compute power",
            "Convincing engineers to use the system",
            "Connecting to the internet",
          ],
          correctIndex: 0,
          explanation:
            "Semiconductor processes constantly change, introducing new defect types and patterns. ADC models must be continuously updated through active learning and retraining to maintain accuracy over time.",
        },
      ],
    },
  ],
};
