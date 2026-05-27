

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
        {
          id: "unet-segmentation-code",
          title: "Pixel-Level Defect Segmentation with U-Net",
          content: `
<h2>Pixel-Level Defect Segmentation with U-Net</h2>
<p>Classification answers "is there a defect?", but yield engineers also want the <strong>exact pixels</strong> of the defect — for area measurement, killer-defect screening, and overlap with design layers. <strong>U-Net</strong> is the standard semantic-segmentation architecture in this space: an encoder–decoder with skip connections that preserves spatial detail.</p>
<pre><code class="language-python">import torch
import torch.nn as nn
import torch.nn.functional as F

def double_conv(in_ch, out_ch):
    return nn.Sequential(
        nn.Conv2d(in_ch, out_ch, 3, padding=1, bias=False),
        nn.BatchNorm2d(out_ch),
        nn.ReLU(inplace=True),
        nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
        nn.BatchNorm2d(out_ch),
        nn.ReLU(inplace=True),
    )

class UNet(nn.Module):
    """Compact U-Net for binary SEM defect segmentation (defect / background)."""
    def __init__(self, in_channels=1, n_classes=2, base=32):
        super().__init__()
        self.enc1 = double_conv(in_channels, base)
        self.enc2 = double_conv(base, base * 2)
        self.enc3 = double_conv(base * 2, base * 4)
        self.enc4 = double_conv(base * 4, base * 8)
        self.bottleneck = double_conv(base * 8, base * 16)

        self.up4 = nn.ConvTranspose2d(base * 16, base * 8, 2, stride=2)
        self.dec4 = double_conv(base * 16, base * 8)
        self.up3 = nn.ConvTranspose2d(base * 8, base * 4, 2, stride=2)
        self.dec3 = double_conv(base * 8, base * 4)
        self.up2 = nn.ConvTranspose2d(base * 4, base * 2, 2, stride=2)
        self.dec2 = double_conv(base * 4, base * 2)
        self.up1 = nn.ConvTranspose2d(base * 2, base, 2, stride=2)
        self.dec1 = double_conv(base * 2, base)

        self.out = nn.Conv2d(base, n_classes, 1)

    def forward(self, x):
        e1 = self.enc1(x)
        e2 = self.enc2(F.max_pool2d(e1, 2))
        e3 = self.enc3(F.max_pool2d(e2, 2))
        e4 = self.enc4(F.max_pool2d(e3, 2))
        b  = self.bottleneck(F.max_pool2d(e4, 2))

        d4 = self.dec4(torch.cat([self.up4(b),  e4], dim=1))
        d3 = self.dec3(torch.cat([self.up3(d4), e3], dim=1))
        d2 = self.dec2(torch.cat([self.up2(d3), e2], dim=1))
        d1 = self.dec1(torch.cat([self.up1(d2), e1], dim=1))
        return self.out(d1)  # logits, shape: (B, n_classes, H, W)


# Dice loss handles severe class imbalance (defect pixels &lt;&lt; background pixels)
def dice_loss(logits, target, eps=1e-6):
    probs = F.softmax(logits, dim=1)[:, 1]            # P(defect)
    target = (target == 1).float()
    intersection = (probs * target).sum(dim=(1, 2))
    union = probs.sum(dim=(1, 2)) + target.sum(dim=(1, 2))
    return 1.0 - ((2 * intersection + eps) / (union + eps)).mean()


def train_step(model, image, mask, optimizer):
    logits = model(image)
    loss = 0.5 * F.cross_entropy(logits, mask) + 0.5 * dice_loss(logits, mask)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    return loss.item()
</code></pre>
<h3>Why these design choices matter</h3>
<ul>
  <li><strong>Skip connections</strong> carry fine-grained pixel locations from encoder to decoder — without them, defect boundaries blur</li>
  <li><strong>Dice loss</strong> directly maximises overlap of predicted and true defect pixels; pure cross-entropy collapses to "predict all background"</li>
  <li><strong>Small base channel count (32)</strong> keeps the model deployable on inline inspection-tool GPUs (latency budget ~50 ms/image)</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Killer-Defect Overlay</h3>
  <p>Once you have a defect mask, the next step is overlaying it on the design layout (GDS). A particle that sits over an active region is a <strong>killer defect</strong>; the same particle on field oxide is a nuisance. Combining U-Net masks with design-aware filtering cuts false-killer reports by 50–80%.</p>
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
        {
          question: "Why is Dice loss preferred over plain cross-entropy for U-Net defect segmentation?",
          options: [
            "Defect pixels are a tiny fraction of the image; Dice directly optimises overlap and avoids the all-background trivial solution",
            "It trains faster than cross-entropy",
            "It produces probabilities instead of logits",
            "It requires no labelled data",
          ],
          correctIndex: 0,
          explanation:
            "Defect masks are typically <1% of pixels. Cross-entropy can reach high accuracy by predicting everything as background. Dice loss is based on overlap (2|A∩B|/(|A|+|B|)), so it only rewards the model when predicted and true defect pixels actually coincide.",
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
        {
          id: "commonality-and-shap",
          title: "Commonality Analysis and SHAP-Based Diagnosis",
          content: `
<h2>Commonality Analysis and SHAP-Based Diagnosis</h2>
<p>The first question an FA engineer asks when yield drops is "<em>what do all the bad wafers have in common?</em>" — and the second is "<em>which sensor moved?</em>" Two ML-friendly techniques cover both.</p>
<h3>1. Commonality analysis</h3>
<p>For each candidate factor (chamber, recipe, photoresist lot, operator shift), compute the defect rate among wafers that touched that factor vs. those that didn't. A Fisher exact test or χ² ranks the most likely culprit:</p>
<pre><code class="language-python">import pandas as pd
from scipy.stats import fisher_exact

def commonality_rank(df: pd.DataFrame, defect_col="is_killer",
                     factor_cols=("etch_chamber", "litho_chamber", "resist_lot", "shift")):
    """Rank factors by association strength with defect occurrence (Fisher p-value)."""
    rows = []
    total_bad = df[defect_col].sum()
    total = len(df)
    for f in factor_cols:
        for value, group in df.groupby(f):
            a = group[defect_col].sum()
            b = len(group) - a
            c = total_bad - a
            d = (total - len(group)) - c
            _, p = fisher_exact([[a, b], [c, d]], alternative="greater")
            rows.append({"factor": f, "value": value, "p_value": p,
                         "bad": int(a), "total": len(group)})
    return pd.DataFrame(rows).sort_values("p_value").head(20)
</code></pre>
<h3>2. SHAP for parametric root cause</h3>
<p>When the suspect is a sensor (not a categorical factor), train a gradient-boosted classifier that predicts pass/fail from upstream FDC summary stats and inspect <strong>SHAP values</strong>:</p>
<pre><code class="language-python">import shap
from xgboost import XGBClassifier

model = XGBClassifier(n_estimators=300, max_depth=4, learning_rate=0.05)
model.fit(X_train, y_train)

# Per-wafer attribution: which features push prediction toward "fail"?
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Top global drivers across the lot
import numpy as np
mean_abs_shap = np.abs(shap_values).mean(axis=0)
top10 = np.argsort(mean_abs_shap)[-10:]
for i in reversed(top10):
    print(f"{X_test.columns[i]:30s}  |SHAP|={mean_abs_shap[i]:.4f}")
</code></pre>
<h3>Layering the two</h3>
<p>Commonality analysis narrows the search to a chamber or a lot; SHAP on that subset pinpoints which sensor signature is doing the damage. Together they cut root-cause-investigation time from days to hours.</p>
<div class="key-concept">
  <h3>Key Concept: Correlation ≠ Cause</h3>
  <p>SHAP says which features the model relies on, not what's physically causal. Always validate a candidate root cause with a designed change (recipe split, chamber swap, or fresh PM) before declaring victory — otherwise you'll spend a quarter chasing a confounder.</p>
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
        {
          question: "Why are SHAP results from a fail-prediction model not, by themselves, proof of root cause?",
          options: [
            "SHAP shows feature reliance, which can reflect correlation rather than physical causation",
            "SHAP values are random",
            "SHAP only works on linear models",
            "SHAP cannot rank features",
          ],
          correctIndex: 0,
          explanation:
            "SHAP attributes a prediction to features the model uses — that signal may be a confounder rather than the true cause. The standard discipline is to confirm with a deliberate change (recipe split, chamber swap) before fixing process.",
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
        {
          id: "adc-integration-pipeline",
          title: "Inline ADC Integration with KLA / AMAT Review Tools",
          content: `
<h2>Inline ADC Integration with KLA / AMAT Review Tools</h2>
<p>The path from "a CNN that classifies SEM images" to "an inline ADC engine serving 500 wafers/day" runs through three integration layers.</p>
<h3>1. Tool ↔ classifier interface</h3>
<ul>
  <li>KLA review tools (eDR-7100, eDR-7600) and AMAT SEMVision expose a <strong>SECS/GEM</strong> data link that streams each defect image plus metadata (coordinates, tool, recipe, lot, wafer)</li>
  <li>The classifier runs on a tool-side GPU appliance with a hard latency budget — typically ≤100 ms per image to keep up with the SEM acquisition rate</li>
  <li>Classifier returns: class label, confidence, top-2 alternatives, model version hash</li>
</ul>
<h3>2. Confidence-tiered routing</h3>
<pre><code class="language-python">def route_defect(prob_vec, threshold_high=0.92, threshold_low=0.55):
    """Return (label, action) given the per-class probability vector."""
    top_class = int(prob_vec.argmax())
    top_prob = float(prob_vec[top_class])

    if top_prob &gt;= threshold_high:
        return top_class, "auto_classify"        # high-confidence: keep label
    if top_prob &lt; threshold_low:
        return None, "manual_review"             # low confidence: human review
    return top_class, "queue_for_active_learning" # gray zone: label and retrain
</code></pre>
<h3>3. Active-learning loop</h3>
<ol>
  <li>Gray-zone images accumulate in a labeling queue</li>
  <li>Domain expert labels ~50 / week through a lightweight web UI</li>
  <li>Nightly job appends new labels to the training set and triggers fine-tuning</li>
  <li>New model is canary-deployed on 5% of traffic; shadow accuracy is compared to the live model for a week before full cutover</li>
</ol>
<table>
  <thead>
    <tr><th>Vendor</th><th>ADC offering</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>KLA</td><td>Cypre / iADC on eDR-7100</td><td>Tightly integrated with the review tool</td></tr>
    <tr><td>Applied Materials</td><td>ExtractAI on SEMVision G7</td><td>Deep-learning ADC, supports user-defined classes</td></tr>
    <tr><td>Hitachi High-Tech</td><td>NEXTAge-ADC on Hitachi CG / G6</td><td>Designed for high-throughput CD-SEM lines</td></tr>
    <tr><td>In-house</td><td>Custom PyTorch / TF stack</td><td>Most large fabs build their own to control model lineage and retraining cadence</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: Drift Is the Real Failure Mode</h3>
  <p>An ADC that ships at 96% accuracy will fall below 90% within 6 months without retraining. New defect modes, new tool generations, and recipe changes all shift the distribution. The active-learning loop is the difference between a one-off pilot and a system that quietly works for years.</p>
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
        {
          question: "What's the role of confidence-tiered routing in an inline ADC system?",
          options: [
            "It auto-accepts high-confidence labels, sends low-confidence cases to humans, and queues borderline cases for active learning",
            "It increases the GPU clock speed",
            "It selects which wafer to inspect next",
            "It picks the best loss function for the classifier",
          ],
          correctIndex: 0,
          explanation:
            "Splitting predictions into high / gray / low-confidence buckets is what keeps an ADC both fast and accurate. High-confidence cases skip humans entirely, low-confidence cases go to expert review, and the gray zone funnels into the active-learning queue that retrains the model.",
        },
      ],
    },
  ],
};
