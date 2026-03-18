import { Subject } from "../curriculum";

export const subject7: Subject = {
  id: "thin-film-deposition",
  number: 7,
  title: "Thin Film Deposition",
  description:
    "Master the techniques for depositing thin films — CVD, PVD, ALD, and epitaxy — the foundation of building chip layers.",
  phase: 3,
  chapters: [
    {
      id: "why-thin-films",
      title: "Why Thin Films?",
      subtitle: "The role of thin films in chip fabrication and the types of films deposited",
      sections: [
        {
          id: "thin-film-role",
          title: "The Role of Thin Films",
          content: `
<h2>The Role of Thin Films</h2>
<p>Modern chips are built layer by layer, and <strong>thin film deposition</strong> is how those layers are created. A single chip may require 50+ different deposited films, each with precise thickness, composition, and properties:</p>
<ul>
  <li><strong>Gate dielectrics:</strong> Ultra-thin (1–5 nm) insulating layers like HfO₂ between the gate and channel</li>
  <li><strong>Spacers:</strong> Silicon nitride films that define transistor dimensions</li>
  <li><strong>Interlayer dielectrics (ILD):</strong> SiO₂ and low-k films that insulate metal layers from each other</li>
  <li><strong>Barrier/liner layers:</strong> TaN/Ta films that prevent copper diffusion</li>
  <li><strong>Hard masks:</strong> Films used as etch masks for pattern transfer</li>
  <li><strong>Metal films:</strong> Tungsten plugs, copper seed layers, aluminum bond pads</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Film Thickness Control</h3>
  <p>Film thickness must be controlled to within <strong>1–2% uniformity</strong> across the entire 300mm wafer. For a 2nm gate oxide, that means thickness variation of less than 0.04 nm — about 1/5 the diameter of a single atom.</p>
</div>`,
        },
        {
          id: "deposition-methods-overview",
          title: "Overview of Deposition Methods",
          content: `
<h2>Overview of Deposition Methods</h2>
<p>The four main deposition techniques, each suited to different applications:</p>
<table>
  <thead>
    <tr><th>Method</th><th>Mechanism</th><th>Typical Use</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>CVD</strong></td><td>Chemical reactions of gas precursors</td><td>Dielectrics, nitrides, polysilicon</td></tr>
    <tr><td><strong>PVD</strong></td><td>Physical transfer from solid target</td><td>Metal films, barrier layers</td></tr>
    <tr><td><strong>ALD</strong></td><td>Self-limiting surface reactions</td><td>Ultra-thin conformal films</td></tr>
    <tr><td><strong>Epitaxy</strong></td><td>Crystal growth matching substrate</td><td>SiGe channels, raised S/D</td></tr>
  </tbody>
</table>
<p>Choosing the right method depends on the film material, required thickness, conformality (step coverage), temperature budget, and throughput needs.</p>`,
        },
      ],
      quiz: [
        {
          question: "How precisely must film thickness be controlled across a 300mm wafer?",
          options: [
            "Within 1–2% uniformity",
            "Within 20% uniformity",
            "Exact thickness doesn't matter",
            "Within 50% uniformity",
          ],
          correctIndex: 0,
          explanation:
            "Film thickness must be controlled to within 1–2% uniformity across the entire wafer. For critical films like gate oxides, this means sub-angstrom precision.",
        },
        {
          question: "Which deposition method uses self-limiting surface reactions?",
          options: ["ALD", "CVD", "PVD", "Epitaxy"],
          correctIndex: 0,
          explanation:
            "Atomic Layer Deposition (ALD) uses self-limiting surface reactions — each cycle deposits exactly one atomic layer, providing unmatched thickness control and conformality.",
        },
      ],
    },
    {
      id: "cvd",
      title: "Chemical Vapor Deposition (CVD)",
      subtitle: "LPCVD, PECVD, and the chemistry of depositing films from gases",
      sections: [
        {
          id: "cvd-basics",
          title: "CVD Fundamentals",
          content: `
<h2>CVD Fundamentals</h2>
<p>In <strong>Chemical Vapor Deposition</strong>, gaseous precursors react on or near the wafer surface to form a solid film. The basic steps:</p>
<ul>
  <li>Gas precursors are delivered to the chamber</li>
  <li>Precursors transport to the wafer surface (diffusion through a boundary layer)</li>
  <li>Precursors adsorb onto the surface</li>
  <li>Chemical reactions occur, forming the desired film</li>
  <li>Byproducts desorb and are pumped away</li>
</ul>
<p>Key CVD variants:</p>
<ul>
  <li><strong>LPCVD (Low Pressure):</strong> 0.1–1 Torr, 600–900°C. Excellent uniformity and step coverage. Used for silicon nitride, polysilicon.</li>
  <li><strong>PECVD (Plasma Enhanced):</strong> Uses plasma to enable reactions at lower temperatures (200–400°C). Critical for back-end processing where metals are already on the wafer.</li>
  <li><strong>MOCVD (Metal-Organic):</strong> Uses metal-organic precursors. Key for III-V semiconductors (GaN, GaAs) in LEDs and power devices.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Spray Painting</h3>
  <p>CVD is like spray painting, but at the molecular level. Instead of paint droplets, gas molecules arrive at the surface and chemically bond to it, building up a uniform coating layer by layer.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why is PECVD preferred over LPCVD for back-end-of-line processing?",
          options: [
            "PECVD operates at lower temperatures (200–400°C), protecting existing metal layers",
            "PECVD is faster than LPCVD",
            "PECVD produces purer films",
            "PECVD doesn't require a vacuum",
          ],
          correctIndex: 0,
          explanation:
            "PECVD uses plasma energy to drive reactions at 200–400°C, much lower than LPCVD's 600–900°C. This is essential for BEOL processing where copper interconnects (melting point 1085°C) are already present.",
        },
      ],
    },
    {
      id: "pvd",
      title: "Physical Vapor Deposition (PVD)",
      subtitle: "Sputtering, evaporation, and depositing metal films",
      sections: [
        {
          id: "sputtering",
          title: "Sputtering",
          content: `
<h2>Sputtering</h2>
<p><strong>Sputtering</strong> is the dominant PVD technique in semiconductor manufacturing. It physically ejects atoms from a solid target material using energetic ion bombardment:</p>
<ul>
  <li>A plasma is created from an inert gas (usually argon)</li>
  <li>Argon ions are accelerated toward the <strong>target</strong> (a disk of the desired material)</li>
  <li>Ions knock atoms off the target surface (like billiard balls)</li>
  <li>Ejected atoms travel across the vacuum chamber and deposit on the wafer</li>
</ul>
<p>Common sputtered films in semiconductor fabs:</p>
<ul>
  <li><strong>TaN/Ta:</strong> Barrier/liner for copper interconnects</li>
  <li><strong>Copper seed:</strong> Thin copper layer for electroplating</li>
  <li><strong>Titanium/TiN:</strong> Contact barriers and hard masks</li>
  <li><strong>Aluminum:</strong> Bond pads and some interconnect layers</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Magnetron Sputtering</h3>
  <p>Modern PVD tools use <strong>magnetron sputtering</strong> — magnets behind the target confine the plasma close to the target surface, dramatically increasing deposition rate and efficiency. Ionized PVD (iPVD) goes further, ionizing the sputtered atoms for better directionality.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What gas is typically used to create plasma in sputtering?",
          options: ["Argon", "Oxygen", "Nitrogen", "Hydrogen"],
          correctIndex: 0,
          explanation:
            "Argon is the standard sputtering gas because it's inert (won't react with the target or film), heavy enough to efficiently eject target atoms, and relatively inexpensive.",
        },
      ],
    },
    {
      id: "ald-epitaxy",
      title: "ALD & Epitaxy",
      subtitle: "Atomic-precision deposition and single-crystal film growth",
      sections: [
        {
          id: "ald-process",
          title: "Atomic Layer Deposition (ALD)",
          content: `
<h2>Atomic Layer Deposition (ALD)</h2>
<p>ALD deposits films one atomic layer at a time through <strong>self-limiting</strong> sequential reactions:</p>
<ul>
  <li><strong>Pulse A:</strong> First precursor enters and reacts with the surface until all available sites are occupied — then the reaction stops (self-limiting)</li>
  <li><strong>Purge:</strong> Excess precursor and byproducts are removed</li>
  <li><strong>Pulse B:</strong> Second precursor enters and reacts with the surface created by Pulse A — again self-limiting</li>
  <li><strong>Purge:</strong> Remove excess and byproducts</li>
  <li>Repeat: Each cycle deposits ~0.5–1 Å (about half an atomic layer)</li>
</ul>
<p>ALD advantages:</p>
<ul>
  <li><strong>Angstrom-level thickness control:</strong> Thickness = number of cycles × growth per cycle</li>
  <li><strong>Perfect conformality:</strong> Coats the inside of deep trenches uniformly (100% step coverage)</li>
  <li><strong>Pinhole-free films:</strong> Self-limiting nature prevents gaps</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: High-k Gate Dielectrics</h3>
  <p>ALD's precision made it indispensable for depositing <strong>high-k gate dielectrics</strong> (HfO₂) that replaced SiO₂ at the 45nm node. A 1–2nm HfO₂ film deposited by ALD provides the same capacitance as a much thicker SiO₂ film, while reducing leakage current.</p>
</div>`,
        },
        {
          id: "epitaxy-basics",
          title: "Epitaxial Growth",
          content: `
<h2>Epitaxial Growth</h2>
<p><strong>Epitaxy</strong> grows a crystalline film that matches the crystal structure of the substrate — essentially extending the single crystal. This is critical for advanced transistors:</p>
<ul>
  <li><strong>Silicon epitaxy:</strong> Growing pure Si layers with precise doping profiles</li>
  <li><strong>SiGe epitaxy:</strong> Growing silicon-germanium alloys to create strain in the channel, boosting carrier mobility by 50–100%</li>
  <li><strong>Selective epitaxy:</strong> Growing crystalline material only on exposed silicon, not on oxide — used for raised source/drain in FinFETs</li>
</ul>
<div class="analogy">
  <h3>Analogy: Growing a Crystal</h3>
  <p>Epitaxy is like adding more rows of bricks to a perfectly aligned wall. Each new atom aligns itself with the existing crystal pattern below, continuing the single-crystal structure. If the new atoms are slightly larger (Ge in SiGe), they strain the lattice — and that strain actually improves transistor performance.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What makes ALD 'self-limiting'?",
          options: [
            "Each precursor reacts only with available surface sites, then stops automatically",
            "A timer stops the deposition after a set time",
            "The chamber pressure limits the film thickness",
            "The wafer temperature limits growth",
          ],
          correctIndex: 0,
          explanation:
            "In ALD, each precursor pulse reacts only with available surface sites. Once all sites are occupied, the reaction stops naturally — this self-limiting behavior gives ALD its atomic-level control.",
        },
        {
          question: "Why is SiGe epitaxy used in modern transistors?",
          options: [
            "It creates strain in the channel that boosts carrier mobility",
            "It's cheaper than pure silicon",
            "It improves the gate oxide quality",
            "It makes transistors smaller",
          ],
          correctIndex: 0,
          explanation:
            "SiGe epitaxy introduces compressive strain in the silicon channel, which increases hole mobility by 50–100%. This strain engineering is essential for boosting PMOS transistor performance.",
        },
      ],
    },
  ],
};
