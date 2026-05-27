

export const subject11 = {
  id: "deposition-equipment",
  number: 11,
  title: "Deposition Equipment",
  description:
    "Explore the machines behind thin film deposition — CVD chambers, PVD systems, and ALD reactors and how they achieve atomic-level precision.",
  phase: 4,
  chapters: [
    {
      id: "cvd-equipment",
      title: "CVD Equipment",
      subtitle: "Chamber design, gas delivery, plasma sources, and temperature control",
      sections: [
        {
          id: "cvd-chamber-design",
          title: "CVD Chamber Architecture",
          content: `
<h2>CVD Chamber Architecture</h2>
<p>A modern CVD chamber is a precisely engineered reaction vessel:</p>
<ul>
  <li><strong>Showerhead:</strong> A perforated plate that distributes process gases uniformly over the wafer. Hole pattern and size are engineered for flow uniformity.</li>
  <li><strong>Heated chuck (susceptor):</strong> Holds the wafer and heats it to 200–900°C depending on the process. Temperature uniformity of ±1°C across 300mm is critical.</li>
  <li><strong>Plasma source (PECVD):</strong> RF electrodes generate plasma to enable low-temperature deposition. Can be direct (between showerhead and wafer) or remote.</li>
  <li><strong>Exhaust/pump:</strong> Turbo and dry pumps maintain 0.1–10 Torr pressure with precise throttle valve control.</li>
  <li><strong>Gas delivery system:</strong> Mass flow controllers (MFCs) meter process gases with <1% accuracy. Multiple gas lines for precursors, carriers, and purge gases.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Cluster Tool Architecture</h3>
  <p>Modern deposition systems use a <strong>cluster tool</strong> design — multiple process chambers arranged around a central vacuum transfer module. A robot arm moves wafers between chambers without breaking vacuum, enabling multi-step processes (e.g., pre-clean → barrier → seed) in a single tool.</p>
</div>`,
        },
        {
          id: "cvd-sensor-data",
          title: "Sensors and Process Data",
          content: `
<h2>Sensors and Process Data</h2>
<p>CVD tools generate enormous amounts of sensor data — exactly the kind of data ML engineers work with:</p>
<ul>
  <li><strong>Temperature:</strong> Multi-zone heater readings, pyrometer data (10+ sensors per chamber)</li>
  <li><strong>Pressure:</strong> Chamber pressure, foreline pressure, individual gas line pressures</li>
  <li><strong>Gas flow:</strong> MFC setpoints and actual flows for each gas line</li>
  <li><strong>RF power:</strong> Forward/reflected power, voltage, current, impedance (for PECVD)</li>
  <li><strong>Optical emission:</strong> Plasma emission spectra for process monitoring</li>
  <li><strong>Thickness:</strong> In-situ ellipsometry or reflectometry for real-time film measurement</li>
</ul>
<p>A single deposition run generates <strong>thousands of data points per second</strong> across 50–100+ parameters. This is the raw material for virtual metrology and predictive maintenance models.</p>`,
        },
      ],
      quiz: [
        {
          question: "What is a cluster tool in semiconductor equipment?",
          options: [
            "Multiple process chambers around a central vacuum transfer module",
            "A tool that processes multiple wafers simultaneously",
            "A group of separate tools linked by conveyor",
            "A single chamber with multiple functions",
          ],
          correctIndex: 0,
          explanation:
            "A cluster tool has multiple process chambers (e.g., 4–6) arranged around a central vacuum transfer module with a robot arm, enabling multi-step processing without breaking vacuum.",
        },
        {
          question: "How many sensor data points might a CVD tool generate per second?",
          options: [
            "Thousands across 50–100+ parameters",
            "1–2 data points",
            "About 10 per minute",
            "Millions per parameter",
          ],
          correctIndex: 0,
          explanation:
            "Modern CVD tools continuously sample 50–100+ parameters (temperatures, pressures, flows, RF metrics) at high rates, generating thousands of data points per second — rich data for ML applications.",
        },
      ],
    },
    {
      id: "pvd-systems",
      title: "PVD Systems",
      subtitle: "Magnetron sputtering, target design, and ionized PVD",
      sections: [
        {
          id: "pvd-system-design",
          title: "PVD System Design",
          content: `
<h2>PVD System Design</h2>
<p>A PVD sputtering system consists of:</p>
<ul>
  <li><strong>Target assembly:</strong> A disk of source material (TaN, Ta, Cu, Ti, etc.) backed by a magnetron assembly with permanent magnets. The target is water-cooled to prevent melting.</li>
  <li><strong>Magnetron:</strong> Magnets behind the target create a magnetic field that confines the plasma near the target surface, increasing ionization efficiency and sputter rate.</li>
  <li><strong>Process kit:</strong> Shields and collimators that contain the sputtered material and prevent chamber contamination.</li>
  <li><strong>Wafer chuck:</strong> May include RF bias to accelerate ions toward the wafer for better step coverage.</li>
</ul>
<p>Advanced PVD techniques:</p>
<ul>
  <li><strong>Ionized PVD (iPVD):</strong> An additional RF coil ionizes the sputtered atoms after they leave the target. Ionized atoms can be directed by wafer bias for excellent bottom coverage in high-aspect-ratio features.</li>
  <li><strong>Long-throw PVD:</strong> Increased target-to-wafer distance improves directionality through collimation.</li>
</ul>`,
        },
        {
          id: "pvd-vendors-and-tools",
          title: "Major PVD Tools and Vendors",
          content: `
<h2>Major PVD Tools and Vendors</h2>
<p>Most production PVD in modern fabs runs on three platforms:</p>
<table>
  <thead>
    <tr><th>Vendor</th><th>Platform</th><th>Typical applications</th></tr>
  </thead>
  <tbody>
    <tr><td>Applied Materials</td><td>Endura / Endura 2</td><td>Cu seed, TaN/Ta barrier, Ti/TiN contacts, Co liner</td></tr>
    <tr><td>Lam Research</td><td>ALTUS / Hydra</td><td>W-replacement metallization, Mo/Co stacks</td></tr>
    <tr><td>ULVAC / Evatec</td><td>Various</td><td>Compound semiconductor PVD, MEMS metallization</td></tr>
  </tbody>
</table>
<p>An Endura mainframe is a classic example of cluster integration: a single vacuum-coupled platform hosts a degas chamber, a pre-clean, and 4–6 PVD process modules. A typical Cu damascene sequence runs:</p>
<ol>
  <li>Degas (200–400 °C) to drive off moisture</li>
  <li>Ar+ pre-clean to remove native oxide from via bottoms</li>
  <li>PVD TaN barrier (~1–2 nm)</li>
  <li>PVD Ta liner (~1 nm)</li>
  <li>PVD Cu seed (~10–20 nm) — moves to ECD tool for fill</li>
</ol>
<div class="key-concept">
  <h3>Key Concept: Target Lifetime</h3>
  <p>A PVD target costs $20k–$200k and lasts roughly <strong>2000–10000 wafers</strong> depending on material and recipe. Erosion is non-uniform (deeper under the magnet race-track), so swapping the target is a major scheduled-PM event tracked by every fab's PM scheduler — a textbook input for predictive maintenance models.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the purpose of the magnetron in a PVD sputtering system?",
          options: [
            "To confine plasma near the target surface, increasing sputter efficiency",
            "To heat the wafer during deposition",
            "To transport wafers between chambers",
            "To measure film thickness",
          ],
          correctIndex: 0,
          explanation:
            "The magnetron's magnetic field traps electrons near the target surface, creating a dense plasma that efficiently sputters target atoms — dramatically improving deposition rate and uniformity.",
        },
        {
          question: "Why is an Ar+ pre-clean module included on a Cu damascene PVD cluster?",
          options: [
            "It removes native oxide and contamination at via bottoms before barrier deposition",
            "It heats the wafer for epitaxial growth",
            "It deposits a final cap layer",
            "It electroplates copper",
          ],
          correctIndex: 0,
          explanation:
            "Native CuO/Cu₂O on the previous metal layer raises via contact resistance and ruins reliability. An Ar+ sputter pre-clean strips that oxide in situ, immediately before the barrier is deposited, all without breaking vacuum.",
        },
      ],
    },
    {
      id: "ald-reactors",
      title: "ALD Reactors",
      subtitle: "Pulse-purge systems, spatial ALD, and batch vs single-wafer designs",
      sections: [
        {
          id: "ald-reactor-types",
          title: "ALD Reactor Designs",
          content: `
<h2>ALD Reactor Designs</h2>
<p>ALD reactors must efficiently deliver, react, and purge precursors in rapid cycles:</p>
<ul>
  <li><strong>Temporal (pulse-purge) ALD:</strong> The standard approach. Precursor A is pulsed, then purged with inert gas, then precursor B is pulsed and purged. One cycle = one atomic layer. Cycle time: 1–10 seconds.</li>
  <li><strong>Spatial ALD:</strong> Instead of time-sequenced pulses, the wafer physically moves between different gas zones separated by inert gas curtains. Much faster — cycle times under 0.1 seconds. Used for high-throughput applications.</li>
  <li><strong>Batch ALD:</strong> Process 100+ wafers simultaneously in a vertical furnace. Lower throughput per cycle but high total throughput. Used for films where absolute thickness control is less critical.</li>
  <li><strong>Plasma-enhanced ALD (PEALD):</strong> Uses plasma in the second half-cycle for better reactivity at lower temperatures. Critical for BEOL applications.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: ALD Throughput Challenge</h3>
  <p>ALD's main weakness is speed — depositing 10 nm at 0.1 nm/cycle requires 100 cycles. At ~5 seconds/cycle, that's over 8 minutes per wafer for a single film. Equipment makers address this with multi-station designs (4 wafers simultaneously) and faster purge systems.</p>
</div>`,
        },
        {
          id: "ald-precursors",
          title: "ALD Precursors and Common Film Chemistries",
          content: `
<h2>ALD Precursors and Common Film Chemistries</h2>
<p>Each ALD recipe is a paired metal-precursor + co-reactant chemistry. A few that dominate production:</p>
<table>
  <thead>
    <tr><th>Film</th><th>Metal precursor</th><th>Co-reactant</th><th>Application</th></tr>
  </thead>
  <tbody>
    <tr><td>HfO₂</td><td>HfCl₄, TEMA-Hf, TDMA-Hf</td><td>H₂O or O₃</td><td>High-k gate dielectric (45 nm and below)</td></tr>
    <tr><td>Al₂O₃</td><td>TMA (trimethylaluminum)</td><td>H₂O</td><td>Capacitor dielectric, encapsulation, blocking oxide</td></tr>
    <tr><td>TiN</td><td>TiCl₄ or TDMAT</td><td>NH₃ or H₂ plasma</td><td>Barrier, metal gate work-function layer</td></tr>
    <tr><td>TaN</td><td>PDMAT / TBTDET</td><td>NH₃ plasma</td><td>Cu barrier in advanced damascene</td></tr>
    <tr><td>W</td><td>WF₆</td><td>SiH₄ (nucleation), then H₂</td><td>Plug fill, gap-fill metal</td></tr>
    <tr><td>Ru</td><td>Ru carbonyls, RuO₄</td><td>O₂ or H₂</td><td>Barrierless via fill, capacitor electrodes</td></tr>
  </tbody>
</table>
<p>Two practical knobs the engineer tunes per recipe:</p>
<ul>
  <li><strong>Saturation dose</strong> — pulse the precursor long enough that the surface is fully covered, but no longer (extra time wastes precursor and throughput).</li>
  <li><strong>Purge time</strong> — must be long enough to remove all precursor and byproducts; otherwise A and B meet in the gas phase and you fall back to CVD-like growth with worse conformality.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Why ALD Pricing Hurts</h3>
  <p>Many ALD precursors are exotic organometallics costing <strong>$10k–$50k per kilogram</strong>. With single-digit-percent utilization per cycle, ALD precursor cost can dominate cost-of-ownership for thin high-k and barrier films.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is spatial ALD?",
          options: [
            "The wafer moves between separate precursor zones instead of time-sequenced pulses",
            "ALD performed in outer space",
            "ALD on multiple wafers stacked vertically",
            "ALD with variable chamber pressure",
          ],
          correctIndex: 0,
          explanation:
            "In spatial ALD, the wafer moves through physically separated precursor zones (separated by inert gas curtains), dramatically increasing throughput compared to temporal pulse-purge ALD.",
        },
        {
          question: "Why is HfO₂ deposited by ALD rather than CVD for the high-k gate dielectric?",
          options: [
            "ALD gives angstrom-level thickness control and pinhole-free 1–2 nm films required at the gate",
            "ALD is faster than CVD",
            "CVD cannot grow HfO₂ at any temperature",
            "ALD is cheaper than CVD for thick films",
          ],
          correctIndex: 0,
          explanation:
            "The gate dielectric is only 1–2 nm thick and must be defect-free across 300 mm. ALD's self-limiting cycle deposits ~1 Å at a time with perfect conformality — exactly the control that thin, leakage-sensitive HfO₂ gate stacks need.",
        },
      ],
    },
    {
      id: "epitaxy-systems",
      title: "Epitaxy Systems",
      subtitle: "Si and SiGe epi reactors, design, and in-situ monitoring",
      sections: [
        {
          id: "epi-reactor-design",
          title: "Epitaxy Reactor Design",
          content: `
<h2>Epitaxy Reactor Design</h2>
<p>Epitaxy requires the highest cleanliness and temperature control of any deposition process:</p>
<ul>
  <li><strong>Single-wafer reactors:</strong> Dominant for advanced logic. The wafer sits on a rotating susceptor in a cold-wall chamber. Lamp heating provides rapid temperature ramping (50°C/s) to process temperatures of 500–1100°C.</li>
  <li><strong>Gas system:</strong> Ultra-pure precursors (SiH₄, SiH₂Cl₂, GeH₄) with ppb-level purity requirements. Mass flow controllers provide precise gas composition control for SiGe alloy composition.</li>
  <li><strong>In-situ monitoring:</strong> Real-time measurements during growth:
    <ul>
      <li>Pyrometry for wafer temperature</li>
      <li>Reflectometry for film thickness and growth rate</li>
      <li>Residual gas analyzers for chamber cleanliness</li>
    </ul>
  </li>
  <li><strong>Selective epi:</strong> HCl is added to the gas mix to etch deposited material on non-silicon surfaces while allowing growth on exposed silicon only.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Pre-epi Clean</h3>
  <p>Even a single monolayer of oxide or carbon on the silicon surface will prevent epitaxial growth. Reactors include an in-situ hydrogen bake (800–1100°C) to remove native oxide before growth. This clean step is as critical as the deposition itself.</p>
</div>`,
        },
        {
          id: "selective-epi-applications",
          title: "Selective Epitaxy in Modern Transistors",
          content: `
<h2>Selective Epitaxy in Modern Transistors</h2>
<p>Selective epitaxial growth (SEG) is one of the highest-leverage modules in advanced CMOS. The trick is to add a small amount of HCl to the SiH₂Cl₂/GeH₄ chemistry so that any Si or SiGe that nucleates on SiO₂ or SiN is immediately etched, while growth on exposed Si surfaces proceeds.</p>
<h3>Where SEG appears in the FinFET / nanosheet flow:</h3>
<ul>
  <li><strong>Raised source/drain (RSD):</strong> Faceted SiGe:B (PMOS) or Si:P/Si:As (NMOS) is grown above the fin to add silicon volume — lowers spreading resistance and provides strain.</li>
  <li><strong>Embedded SiGe (eSiGe) for PMOS:</strong> Source/drain pockets are recessed and refilled with SiGe ~25–35% Ge. The larger Ge lattice puts the channel under uniaxial compression, boosting hole mobility 50–100%.</li>
  <li><strong>Embedded Si:C for NMOS:</strong> Substitutional carbon (~1%) puts the channel under tension, boosting electron mobility ~10–15%.</li>
  <li><strong>Nanosheet inner-spacer step:</strong> The sacrificial SiGe between Si nanosheets is selectively etched; epi later refills the cavity with replacement Si.</li>
</ul>
<table>
  <thead>
    <tr><th>Vendor</th><th>Epi platform</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Applied Materials</td><td>Centura RP Epi</td><td>Industry workhorse for Si/SiGe epi at 7nm and below</td></tr>
    <tr><td>ASM International</td><td>Intrepid XP / Epsilon</td><td>Strong in selective epi and SiGe alloy uniformity</td></tr>
    <tr><td>Tokyo Electron</td><td>Triase+ Epi</td><td>Logic and DRAM epi</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: Loading Effect</h3>
  <p>Selective epi growth rate depends on the local ratio of exposed Si to dielectric — a phenomenon called the <strong>loading effect</strong>. Dense arrays of small openings grow slower than isolated openings. Process engineers manage this with HCl flow tuning and lithography dummy-fill rules.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why is an in-situ hydrogen bake performed before epitaxial growth?",
          options: [
            "To remove native oxide from the silicon surface so crystal growth can proceed",
            "To heat the wafer to the correct temperature",
            "To calibrate the temperature sensors",
            "To purge the chamber of previous process gases",
          ],
          correctIndex: 0,
          explanation:
            "A hydrogen bake at 800–1100°C reduces and removes the thin native oxide on the silicon surface. Even a monolayer of oxide would disrupt the crystal template needed for epitaxial growth.",
        },
        {
          question: "What role does HCl play in selective epitaxial growth?",
          options: [
            "It etches any Si/SiGe that nucleates on dielectric surfaces while letting growth proceed on exposed Si",
            "It is the silicon precursor",
            "It cools the wafer between cycles",
            "It generates the plasma used for nucleation",
          ],
          correctIndex: 0,
          explanation:
            "Adding HCl to the SiH₂Cl₂/GeH₄ chemistry sets up a tight balance: deposition is faster than etch on exposed Si, but slower than etch on SiO₂/SiN. Net result — epi grows only where you want it, enabling raised S/D and embedded SiGe pockets.",
        },
      ],
    },
  ],
};
