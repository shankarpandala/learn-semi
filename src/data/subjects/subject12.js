

export const subject12 = {
  id: "lithography-equipment",
  number: 12,
  title: "Lithography Equipment",
  description:
    "Understand the most complex machines ever built — from DUV steppers to ASML's EUV scanners and their $350M price tags.",
  phase: 4,
  chapters: [
    {
      id: "stepper-scanner-basics",
      title: "Stepper & Scanner Basics",
      subtitle: "How exposure tools work — step-and-repeat vs step-and-scan",
      sections: [
        {
          id: "exposure-tool-basics",
          title: "How Lithography Tools Work",
          content: `
<h2>How Lithography Tools Work</h2>
<p>Lithography exposure tools project a circuit pattern from a <strong>reticle (mask)</strong> onto the wafer through a precision optical system:</p>
<ul>
  <li><strong>Stepper (step-and-repeat):</strong> Exposes one die field at a time, then steps to the next position. Older technology, simpler but lower throughput.</li>
  <li><strong>Scanner (step-and-scan):</strong> Both the reticle and wafer move simultaneously during exposure — the reticle scans through a narrow slit of illumination. This allows a larger exposure field while keeping the optics compact. All modern tools are scanners.</li>
</ul>
<p>Key performance metrics:</p>
<ul>
  <li><strong>Resolution:</strong> Minimum feature size (determined by wavelength and NA)</li>
  <li><strong>Overlay:</strong> Alignment accuracy between successive layers (< 2 nm for advanced nodes)</li>
  <li><strong>Throughput:</strong> Wafers per hour (150–300+ WPH depending on tool and process)</li>
  <li><strong>Focus uniformity:</strong> Depth of focus across the exposure field (critical for yield)</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Wafer Stage</h3>
  <p>The wafer stage positions the wafer with <strong>sub-nanometer precision</strong> while moving at speeds up to 500 mm/s. It uses laser interferometry for position measurement and magnetic levitation for vibration isolation. This is one of the most precise mechanical systems ever built.</p>
</div>`,
        },
        {
          id: "scanner-throughput-budget",
          title: "Throughput, Focus, and Overlay Budgets",
          content: `
<h2>Throughput, Focus, and Overlay Budgets</h2>
<p>A modern scanner is a balance between three competing budgets — every nanosecond, nanometer, and milliwatt is fought over.</p>
<h3>1. Throughput (WPH)</h3>
<p>Time per wafer breaks down roughly as:</p>
<ul>
  <li><strong>Load / unload / align:</strong> 2–4 s, hidden by dual-stage TWINSCAN architecture (one wafer exposes while the next aligns)</li>
  <li><strong>Exposure scan:</strong> dose × (field area) / source power — the dominant term at EUV</li>
  <li><strong>Stage step-and-settle:</strong> ~150 ms per field for 96 fields = ~15 s</li>
</ul>
<p>An NXT:2050i DUV scanner reaches ~295 wafers/hour; an EUV NXE:3800E targets ~220 WPH.</p>
<h3>2. Focus (CD uniformity)</h3>
<p>Depth of focus (DOF ≈ k₂ · λ / NA²) is only ~80 nm at 193 nm immersion. The scanner measures wafer height at every die with multiple optical sensors, then tilts and translates the chuck within tens of nanometers in Z to keep each field in focus.</p>
<h3>3. Overlay</h3>
<p>Overlay error is the misalignment between the current exposure and previous layers. Budget components:</p>
<ul>
  <li>Scanner contribution: 1–2 nm (stage, lens distortion, reticle alignment)</li>
  <li>Wafer/process contribution: 1–3 nm (CMP-induced topography, thermal warping)</li>
  <li>Reticle contribution: ~0.5 nm</li>
</ul>
<p>Total tool-to-tool overlay must stay under ~2 nm for 3 nm-class logic.</p>
<div class="key-concept">
  <h3>Key Concept: Mix-and-Match Overlay</h3>
  <p>Different layers may be patterned on different tool types (EUV for critical layers, DUV for relaxed layers). Modern scanners share alignment-mark fingerprints in a global model so that an EUV exposure can still land within 2 nm of a DUV layer below — the "mix-and-match overlay" challenge.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the key difference between a stepper and a scanner?",
          options: [
            "A scanner moves both reticle and wafer during exposure; a stepper exposes one full field at a time",
            "A stepper is faster than a scanner",
            "Scanners use EUV light, steppers use DUV",
            "Steppers can print smaller features",
          ],
          correctIndex: 0,
          explanation:
            "Scanners expose through a narrow slit while both reticle and wafer move in synchrony, allowing larger field sizes with smaller optics. Steppers expose the entire field at once and then step to the next position.",
        },
        {
          question: "Why does ASML use a dual-stage TWINSCAN architecture?",
          options: [
            "It hides wafer load/align time by exposing one wafer while the next is being aligned, boosting throughput",
            "It allows the scanner to use two different wavelengths",
            "It improves resolution by interfering two beams",
            "It eliminates the need for OPC",
          ],
          correctIndex: 0,
          explanation:
            "TWINSCAN uses two wafer chucks: one is being exposed under the projection optics while the other is being loaded, aligned and metrology-mapped. Overlapping these tasks roughly doubles tool throughput compared with a single-stage design.",
        },
      ],
    },
    {
      id: "duv-systems",
      title: "DUV Systems",
      subtitle: "ArF excimer lasers, immersion lenses, and pellicles",
      sections: [
        {
          id: "duv-components",
          title: "DUV System Components",
          content: `
<h2>DUV System Components</h2>
<p>A DUV (Deep Ultraviolet) immersion scanner consists of several major subsystems:</p>
<ul>
  <li><strong>ArF excimer laser:</strong> Generates 193 nm light by exciting argon fluoride gas. Modern lasers produce 90W+ at 6 kHz repetition rate with extremely narrow bandwidth (<0.35 pm).</li>
  <li><strong>Illuminator:</strong> Shapes the laser beam into the desired angular distribution (conventional, annular, dipole, quadrupole) to optimize imaging for different pattern types.</li>
  <li><strong>Projection optics:</strong> 30+ fused silica and CaF₂ lens elements, polished to sub-atomic surface roughness. Total weight: several tons. The last lens element sits just above the water puddle.</li>
  <li><strong>Immersion system:</strong> Delivers and recovers ultra-pure water between the final lens and wafer, maintaining a stable meniscus at high scan speeds.</li>
  <li><strong>Alignment system:</strong> Multiple sensors measure wafer position, tilt, and height at each die location before exposure.</li>
</ul>
<p>ArF immersion scanners from ASML achieve high throughput at advanced nodes: the <strong>TWINSCAN NXT:2000i</strong> is rated at ~275 wafers/hour and the newer <strong>NXT:2050i</strong> reaches ~295 wafers/hour. List price is approximately <strong>$80–100 million</strong> per tool.</p>`,
        },
        {
          id: "immersion-and-pellicles",
          title: "Immersion Fluid and Pellicles",
          content: `
<h2>Immersion Fluid and Pellicles</h2>
<p>193 nm ArF dry scanners topped out at NA ≈ 0.93. The jump to NA ≈ 1.35 required filling the gap between the final lens element and the wafer with <strong>ultra-pure water</strong> (n = 1.44 at 193 nm). The maximum NA equals roughly <em>n × sin θ</em>, so a higher index lets sharper rays pass through.</p>
<h3>What the immersion module does</h3>
<ul>
  <li>Delivers a stable water meniscus between the lens and wafer</li>
  <li>Maintains water resistivity &gt;18 MΩ·cm and degasses dissolved O₂/N₂ to suppress micro-bubbles</li>
  <li>Recovers and recycles ~99% of the water without leaving stains on the wafer</li>
  <li>Tracks the meniscus during fast stage scans (up to 500 mm/s) — no air entrainment allowed</li>
</ul>
<h3>Pellicles</h3>
<p>A <strong>pellicle</strong> is a thin transparent membrane stretched a few millimeters above the reticle pattern. Particles that land on the pellicle are far out of focus and don't print on the wafer.</p>
<ul>
  <li>DUV pellicles: organic polymer, ~0.8 µm thick, &gt;99% transmission at 193 nm — standard for decades</li>
  <li>EUV pellicles: free-standing polysilicon or carbon nanotube membranes 30–80 nm thick, ~90% transmission at 13.5 nm — only recently shipping in production</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Defect Cost of Going Pellicle-less</h3>
  <p>A single sub-resolution particle on a bare reticle prints in every exposure, killing one die per shot — at 96 dies/wafer and 100 wafers/lot that's nearly 10,000 dead dies per particle. Pellicles are cheap insurance.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the approximate cost of a modern ArF immersion scanner?",
          options: [
            "$80–100 million",
            "$1–5 million",
            "$350 million",
            "$10–20 million",
          ],
          correctIndex: 0,
          explanation:
            "A state-of-the-art ArF immersion scanner costs approximately $80–100 million. EUV scanners are even more expensive at $350+ million.",
        },
        {
          question: "Why does 193 nm immersion lithography enable an NA above 1.0?",
          options: [
            "Water (n ≈ 1.44) replaces the air gap, so NA = n·sinθ can exceed 1",
            "It uses two superimposed light sources",
            "Water shifts the wavelength to a smaller value",
            "Immersion eliminates the need for a lens",
          ],
          correctIndex: 0,
          explanation:
            "Numerical aperture equals n·sinθ. In air n=1 caps NA below 1; replacing air with water (n=1.44 at 193 nm) lifts the ceiling, letting modern immersion scanners hit NA ≈ 1.35.",
        },
      ],
    },
    {
      id: "euv-systems",
      title: "EUV Systems",
      subtitle: "Tin plasma source, multilayer mirrors, and vacuum operation",
      sections: [
        {
          id: "euv-scanner-architecture",
          title: "EUV Scanner Architecture",
          content: `
<h2>EUV Scanner Architecture</h2>
<p>ASML's EUV scanners are the most complex and expensive machines in the world. The product line evolves rapidly:</p>
<table>
  <thead>
    <tr><th>Platform</th><th>NA</th><th>Source power</th><th>Throughput</th><th>Year</th></tr>
  </thead>
  <tbody>
    <tr><td>NXE:3400B/C</td><td>0.33</td><td>~250 W</td><td>~125 WPH</td><td>2017–2019</td></tr>
    <tr><td>NXE:3600D</td><td>0.33</td><td>~350 W</td><td>~160 WPH</td><td>2021</td></tr>
    <tr><td>NXE:3800E</td><td>0.33</td><td>~500 W</td><td>~220 WPH</td><td>2024</td></tr>
    <tr><td>EXE:5000/5200 (High-NA)</td><td>0.55</td><td>~500 W</td><td>~185 WPH (target)</td><td>2024 →</td></tr>
  </tbody>
</table>
<ul>
  <li><strong>Source:</strong> A 25 kW CO₂ laser fires 50,000 pulses/second at 30 µm tin droplets traveling at 70 m/s. Each droplet is hit twice — a pre-pulse flattens it, then the main pulse creates a 13.5 nm-emitting plasma. Source power: 250–500W.</li>
  <li><strong>Collector mirror:</strong> A huge ellipsoidal mirror with Mo/Si multilayer coating captures roughly 5 sr of solid angle (~40% of the 4π emission) and focuses it to the intermediate focus.</li>
  <li><strong>Illuminator & projection optics:</strong> ~10 mirrors total (4 illuminator + 6 projection), each with ~65–70% reflectivity. Combined optical efficiency is ~2%, so the 250 W source delivers only ~5 W at the wafer.</li>
  <li><strong>Vacuum system:</strong> The entire optical path is in ultra-high vacuum. Hydrogen gas flows over mirrors to remove tin debris.</li>
  <li><strong>Reticle handling:</strong> EUV masks are reflective and must be stored and transported in special protective pods (no pellicle was available initially).</li>
</ul>
<p>An EUV scanner contains <strong>100,000+ parts</strong>, weighs 180 tons, requires 3 cargo planes to ship, and costs <strong>$350+ million</strong>.</p>
<div class="key-concept">
  <h3>Key Concept: High-NA EUV</h3>
  <p>ASML's next-generation <strong>High-NA EUV</strong> (0.55 NA vs 0.33 NA) will use anamorphic optics (different magnification in X and Y) and a larger mirror set. It enables single-exposure patterning at ~8 nm half-pitch. Cost: $380+ million per tool.</p>
</div>`,
        },
        {
          id: "euv-source-operations",
          title: "Living with an EUV Source: LPP, Debris, and Uptime",
          content: `
<h2>Living with an EUV Source: LPP, Debris, and Uptime</h2>
<p>The hardest engineering problem in EUV is keeping the source running. The laser-produced plasma (LPP) module fires <strong>50,000 times per second, every second, for months</strong>:</p>
<ul>
  <li><strong>Droplet generator:</strong> 30 µm Sn droplets at ~50 kHz; alignment to the laser focus is closed-loop within microns</li>
  <li><strong>Pre-pulse + main pulse:</strong> A short pre-pulse from a Nd:YAG laser flattens the droplet into a pancake; a 25 kW CO₂ main pulse vaporises it into a 200,000 K plasma that radiates at 13.5 nm</li>
  <li><strong>Collector mirror:</strong> A ~700 mm ellipsoidal Mo/Si mirror sits in line-of-sight to the plasma — it accumulates tin debris and must be cleaned or swapped every ~1–3 months</li>
  <li><strong>H₂ flow:</strong> Hydrogen gas (1–10 Pa partial pressure) sweeps tin debris away from the mirrors and re-volatilises deposited Sn as SnH₄</li>
</ul>
<h3>Reliability and uptime</h3>
<table>
  <thead>
    <tr><th>Metric</th><th>NXE:3400B (2017)</th><th>NXE:3600D (2021)</th><th>NXE:3800E (2024)</th></tr>
  </thead>
  <tbody>
    <tr><td>Source power</td><td>~250 W</td><td>~350 W</td><td>~500 W</td></tr>
    <tr><td>Tool availability</td><td>~70%</td><td>~85%</td><td>~92%</td></tr>
    <tr><td>Throughput</td><td>~125 WPH</td><td>~160 WPH</td><td>~220 WPH</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: Why Uptime Is the KPI</h3>
  <p>An EUV scanner depreciates at roughly $50,000 per hour. Every percentage point of availability is worth tens of millions of dollars per tool per year — which is why fabs run dedicated EUV reliability teams whose only job is keeping the source healthy.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "How many parts does an EUV scanner contain?",
          options: [
            "100,000+",
            "~1,000",
            "~10,000",
            "~1 million",
          ],
          correctIndex: 0,
          explanation:
            "An ASML EUV scanner contains over 100,000 components, weighs 180 tons, and requires 3 cargo planes to transport. It's considered the most complex machine ever built.",
        },
        {
          question: "What is the purpose of the hydrogen flow inside an EUV source vessel?",
          options: [
            "It sweeps tin debris away from the mirrors and re-volatilises deposited Sn as SnH₄",
            "It boosts the plasma temperature",
            "It increases the EUV wavelength",
            "It provides cooling for the wafer chuck",
          ],
          correctIndex: 0,
          explanation:
            "Tin plasma debris would otherwise plate onto the collector and projection mirrors and destroy reflectivity. A low-pressure H₂ environment etches tin (Sn + 2 H₂ → SnH₄ gas) and is pumped away, dramatically extending mirror life.",
        },
      ],
    },
    {
      id: "mask-reticle-tech",
      title: "Mask & Reticle Technology",
      subtitle: "Mask making, OPC, phase-shift masks, and EUV masks",
      sections: [
        {
          id: "mask-technology",
          title: "Photomask Technology",
          content: `
<h2>Photomask Technology</h2>
<p>A <strong>photomask (reticle)</strong> is the master pattern that is projected onto the wafer. Mask quality directly limits chip quality.</p>
<ul>
  <li><strong>DUV masks:</strong> Chrome absorber patterns on quartz glass (transmissive). The pattern is typically 4× larger than the wafer image (the projection optics demagnify by 4×).</li>
  <li><strong>EUV masks:</strong> Absorber patterns on Mo/Si multilayer reflective substrates. Must have near-zero defects on the multilayer — even buried defects cause printable errors.</li>
</ul>
<p>A single advanced mask set (all layers for one chip design) costs <strong>$10–30 million</strong> and takes 2–4 months to produce.</p>
<div class="key-concept">
  <h3>Key Concept: OPC (Optical Proximity Correction)</h3>
  <p>At sub-wavelength dimensions, the pattern printed on the wafer doesn't look like the mask pattern — optical diffraction distorts it. <strong>OPC</strong> pre-distorts the mask pattern using computational models so that the printed result matches the intended design. This is a massive compute problem — OPC for one layer can take thousands of CPU-hours.</p>
</div>`,
        },
        {
          id: "mask-defects",
          title: "Mask Defect Management",
          content: `
<h2>Mask Defect Management</h2>
<p>A single defect on a mask gets printed on every wafer, every exposure — potentially killing millions of dies. Mask quality control includes:</p>
<ul>
  <li><strong>Mask inspection:</strong> Electron-beam and optical inspection tools scan every pixel of the mask for defects.</li>
  <li><strong>Mask repair:</strong> Focused ion beam (FIB) or nanomachining tools can remove or add absorber material to fix defects.</li>
  <li><strong>Pellicles:</strong> A thin membrane stretched over the mask surface keeps particles at a distance where they're out of focus and don't print. DUV pellicles are standard; EUV pellicles are only recently becoming available.</li>
</ul>
<p>Mask shops (Photronics, Toppan, DNP) and captive mask shops at large fabs are critical infrastructure for the industry.</p>`,
        },
      ],
      quiz: [
        {
          question: "What is OPC (Optical Proximity Correction)?",
          options: [
            "Pre-distorting the mask pattern so the printed wafer result matches the intended design",
            "Aligning the mask to the wafer precisely",
            "Correcting the laser wavelength during exposure",
            "Adjusting focus for different wafer heights",
          ],
          correctIndex: 0,
          explanation:
            "OPC computationally pre-distorts the mask pattern to compensate for optical diffraction effects, ensuring that the pattern printed on the wafer matches the designer's intended layout.",
        },
        {
          question: "How much does an advanced mask set cost?",
          options: [
            "$10–30 million",
            "$100–500 thousand",
            "$1–5 million",
            "$100+ million",
          ],
          correctIndex: 0,
          explanation:
            "A complete mask set for an advanced chip (all layers) costs $10–30 million and takes 2–4 months to produce. This high NRE cost is one reason why only high-volume chips justify leading-edge nodes.",
        },
      ],
    },
  ],
};
