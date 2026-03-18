import { Subject } from "../curriculum";

export const subject12: Subject = {
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
<p>ArF immersion scanners from ASML (TWINSCAN NXT:2000) achieve <strong>295 wafers/hour</strong> and cost approximately <strong>$80–100 million</strong>.</p>`,
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
<p>ASML's EUV scanners are the most complex and expensive machines in the world:</p>
<ul>
  <li><strong>Source:</strong> A 25 kW CO₂ laser fires 50,000 pulses/second at 30 µm tin droplets traveling at 70 m/s. Each droplet is hit twice — a pre-pulse flattens it, then the main pulse creates a 13.5 nm-emitting plasma. Source power: 250–500W.</li>
  <li><strong>Collector mirror:</strong> A huge ellipsoidal mirror (with Mo/Si multilayer coating) captures 5 sr of the emitted EUV light and focuses it to the intermediate focus.</li>
  <li><strong>Illuminator & projection optics:</strong> 11 total mirrors, each with >65% reflectivity. Combined optical efficiency is ~2%, so the 250W source delivers only ~5W at the wafer.</li>
  <li><strong>Vacuum system:</strong> The entire optical path is in ultra-high vacuum. Hydrogen gas flows over mirrors to remove tin debris.</li>
  <li><strong>Reticle handling:</strong> EUV masks are reflective and must be stored and transported in special protective pods (no pellicle was available initially).</li>
</ul>
<p>An EUV scanner contains <strong>100,000+ parts</strong>, weighs 180 tons, requires 3 cargo planes to ship, and costs <strong>$350+ million</strong>.</p>
<div class="key-concept">
  <h3>Key Concept: High-NA EUV</h3>
  <p>ASML's next-generation <strong>High-NA EUV</strong> (0.55 NA vs 0.33 NA) will use anamorphic optics (different magnification in X and Y) and a larger mirror set. It enables single-exposure patterning at ~8 nm half-pitch. Cost: $380+ million per tool.</p>
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
