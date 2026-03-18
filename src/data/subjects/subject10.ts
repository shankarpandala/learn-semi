import { Subject } from "../curriculum";

export const subject10: Subject = {
  id: "metallization-interconnects",
  number: 10,
  title: "Metallization & Interconnects",
  description:
    "Understand how billions of transistors are wired together — copper interconnects, barrier layers, and the back-end-of-line process.",
  phase: 3,
  chapters: [
    {
      id: "why-interconnects",
      title: "Why Interconnects Matter",
      subtitle: "RC delay, signal speed, and power distribution challenges",
      sections: [
        {
          id: "interconnect-challenge",
          title: "The Interconnect Challenge",
          content: `
<h2>The Interconnect Challenge</h2>
<p>As transistors have shrunk, interconnects have become the performance bottleneck. While transistor switching speeds improve with scaling, <strong>interconnect delays increase</strong> because:</p>
<ul>
  <li><strong>Higher resistance (R):</strong> Thinner, narrower wires have more resistance</li>
  <li><strong>Higher capacitance (C):</strong> Wires packed closer together have more parasitic capacitance</li>
  <li><strong>RC delay:</strong> Signal propagation delay = R × C, which increases as features shrink</li>
</ul>
<p>At the 90nm node, interconnect delay surpassed transistor delay as the dominant factor. Today, interconnect optimization is as critical as transistor engineering.</p>
<div class="analogy">
  <h3>Analogy: Highway Traffic</h3>
  <p>Imagine making cars (transistors) faster, but also making roads (interconnects) narrower and more crowded. Eventually, traffic congestion on the roads — not the cars' top speed — determines how fast you can get anywhere. That's the interconnect problem.</p>
</div>`,
        },
        {
          id: "interconnect-hierarchy",
          title: "The Metal Layer Hierarchy",
          content: `
<h2>The Metal Layer Hierarchy</h2>
<p>Modern chips use <strong>10–15+ metal layers</strong>, organized in a hierarchy:</p>
<ul>
  <li><strong>Local interconnects (M1–M3):</strong> Very thin and narrow. Connect nearby transistors and gates. Tightest pitch (~20–28 nm at advanced nodes).</li>
  <li><strong>Intermediate layers (M4–M8):</strong> Moderate dimensions. Route signals between functional blocks.</li>
  <li><strong>Global/semi-global (M9+):</strong> Thick, wide wires for power distribution (VDD/VSS) and long-distance clock/signal routes.</li>
</ul>
<p>The total length of metal wiring in a single chip can exceed <strong>100 kilometers</strong> — packed into a die smaller than your fingernail.</p>`,
        },
      ],
      quiz: [
        {
          question: "At which technology node did interconnect delay surpass transistor delay?",
          options: ["~90 nm", "~3 nm", "~500 nm", "~14 nm"],
          correctIndex: 0,
          explanation:
            "Around the 90nm node, RC delay from interconnects became the dominant performance limiter, surpassing the intrinsic switching delay of the transistors themselves.",
        },
        {
          question: "What causes RC delay to increase as features shrink?",
          options: [
            "Thinner wires have higher resistance and closer spacing increases capacitance",
            "Smaller transistors switch more slowly",
            "The silicon substrate becomes more resistive",
            "Manufacturing defects increase at smaller nodes",
          ],
          correctIndex: 0,
          explanation:
            "As wires shrink, their cross-section decreases (higher R) while their spacing decreases (higher C). The product R×C increases, making signal propagation slower.",
        },
      ],
    },
    {
      id: "copper-damascene",
      title: "Copper Damascene Process",
      subtitle: "Dual damascene, electroplating, and CMP — how copper wires are made",
      sections: [
        {
          id: "damascene-process",
          title: "The Damascene Process",
          content: `
<h2>The Damascene Process</h2>
<p>Copper can't be plasma-etched like aluminum (copper halides aren't volatile). Instead, the industry uses the <strong>damascene process</strong> — named after the ancient art of inlaying metal into grooves:</p>
<ul>
  <li><strong>1. Dielectric deposition:</strong> Deposit and planarize the insulating layer (low-k SiOCH or SiO₂)</li>
  <li><strong>2. Pattern & etch trenches:</strong> Lithography and etch to create trenches (for wires) and vias (for vertical connections)</li>
  <li><strong>3. Barrier/liner deposition:</strong> PVD TaN/Ta to prevent copper diffusion into the dielectric</li>
  <li><strong>4. Copper seed layer:</strong> PVD thin copper film as the electrode for electroplating</li>
  <li><strong>5. Copper electroplating:</strong> Fill trenches and vias with copper from a plating bath</li>
  <li><strong>6. CMP:</strong> Chemical-mechanical polishing removes excess copper, leaving copper only in the trenches</li>
</ul>
<p>In <strong>dual damascene</strong>, the trench and via are etched and filled simultaneously, reducing the number of process steps.</p>
<div class="key-concept">
  <h3>Key Concept: Why Copper Replaced Aluminum</h3>
  <p>Copper has 40% lower resistivity than aluminum (1.7 vs 2.8 µΩ·cm), enabling faster signal propagation and lower power consumption. The switch from Al to Cu at the 130nm node was a major industry milestone.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why is the damascene process used for copper instead of etching?",
          options: [
            "Copper halides aren't volatile, so copper can't be plasma-etched effectively",
            "Damascene is cheaper than etching",
            "Copper is too hard to etch",
            "Etching would damage the transistors",
          ],
          correctIndex: 0,
          explanation:
            "Unlike aluminum, copper doesn't form volatile compounds during plasma etching — the etch products would redeposit on the surface. The damascene process avoids this by filling pre-etched trenches instead.",
        },
      ],
    },
    {
      id: "barrier-liner",
      title: "Barrier & Liner Layers",
      subtitle: "Preventing copper diffusion and ensuring adhesion",
      sections: [
        {
          id: "barrier-importance",
          title: "Why Barriers Are Critical",
          content: `
<h2>Why Barriers Are Critical</h2>
<p>Copper is a <strong>fast diffuser</strong> in silicon and SiO₂. Without barriers, copper atoms would migrate into the dielectric and silicon, causing:</p>
<ul>
  <li><strong>Dielectric leakage:</strong> Copper in the insulator creates conductive paths between wires (shorts)</li>
  <li><strong>Transistor degradation:</strong> Copper in silicon creates deep-level traps that destroy device performance</li>
  <li><strong>Reliability failures:</strong> Copper migration under voltage stress causes time-dependent failures</li>
</ul>
<p>The standard barrier stack is <strong>TaN/Ta</strong>:</p>
<ul>
  <li><strong>TaN (tantalum nitride):</strong> Amorphous barrier that blocks copper diffusion. Deposited by PVD or ALD.</li>
  <li><strong>Ta (tantalum):</strong> Promotes adhesion between the barrier and copper. Its BCC crystal structure helps copper nucleate in the preferred (111) orientation for better reliability.</li>
</ul>
<p>As wires shrink, the barrier takes up a larger fraction of the trench width, reducing the effective copper area and increasing resistance. This is the <strong>"barrier scaling challenge"</strong> — a major driver of research into alternative materials.</p>`,
        },
      ],
      quiz: [
        {
          question: "Why are barrier layers needed around copper interconnects?",
          options: [
            "Copper diffuses rapidly into silicon and dielectrics, causing shorts and device degradation",
            "Barriers make copper wires stronger",
            "Barriers improve copper conductivity",
            "Copper reacts with air without barriers",
          ],
          correctIndex: 0,
          explanation:
            "Copper is a fast diffuser that would migrate into surrounding dielectric and silicon, creating electrical shorts and destroying transistor performance. TaN/Ta barriers block this diffusion.",
        },
      ],
    },
    {
      id: "advanced-interconnects",
      title: "Advanced Interconnects",
      subtitle: "Low-k dielectrics, air gaps, and future materials",
      sections: [
        {
          id: "low-k-dielectrics",
          title: "Low-k Dielectrics",
          content: `
<h2>Low-k Dielectrics</h2>
<p>To reduce capacitance between wires, the dielectric constant (k) of the insulator between wires must be lowered:</p>
<table>
  <thead>
    <tr><th>Material</th><th>Dielectric Constant (k)</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>SiO₂</td><td>4.0</td><td>Traditional</td></tr>
    <tr><td>Fluorinated SiO₂ (FSG)</td><td>3.5</td><td>130–90 nm</td></tr>
    <tr><td>SiOCH (CDO)</td><td>2.5–3.0</td><td>65–14 nm</td></tr>
    <tr><td>Porous SiOCH</td><td>2.0–2.5</td><td>10 nm and below</td></tr>
    <tr><td>Air gaps</td><td>~1.0</td><td>Emerging at tight pitches</td></tr>
  </tbody>
</table>
<p>Lower k = lower capacitance = faster signals and less power. But low-k materials are mechanically weak and thermally poor, creating integration challenges.</p>`,
        },
        {
          id: "future-interconnects",
          title: "Future Interconnect Materials",
          content: `
<h2>Future Interconnect Materials</h2>
<p>As copper wires shrink below ~15 nm width, their resistivity increases dramatically due to <strong>electron scattering</strong> from surfaces and grain boundaries. Potential alternatives being researched:</p>
<ul>
  <li><strong>Ruthenium (Ru):</strong> Doesn't need a barrier layer (saves space), lower resistivity than Cu at very small dimensions. Being adopted for via fills.</li>
  <li><strong>Cobalt (Co):</strong> Already used for M0/M1 contact layers at some foundries. Good gap-fill properties.</li>
  <li><strong>Molybdenum (Mo):</strong> Being explored for local interconnects at 2nm and beyond.</li>
  <li><strong>Graphene/carbon nanotubes:</strong> Theoretical promise but manufacturing challenges remain significant.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Resistivity Wall</h3>
  <p>At dimensions below ~15nm, copper's bulk resistivity (1.7 µΩ·cm) is no longer achievable — surface and grain boundary scattering can triple the effective resistivity. This is forcing the industry to explore new conductor materials for the tightest layers, even though copper will remain for upper layers.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why are low-k dielectrics used between metal wires?",
          options: [
            "To reduce parasitic capacitance, enabling faster signal speeds and lower power",
            "To increase wire strength",
            "To improve copper adhesion",
            "To make the chip lighter",
          ],
          correctIndex: 0,
          explanation:
            "Lower dielectric constant (k) means lower capacitance between adjacent wires. This reduces RC delay (faster signals) and dynamic power consumption.",
        },
        {
          question: "Why does copper's effective resistivity increase dramatically at very small dimensions?",
          options: [
            "Electron scattering from surfaces and grain boundaries becomes dominant",
            "Copper oxidizes more easily in small wires",
            "The barrier takes up all the space",
            "Quantum effects eliminate conductivity",
          ],
          correctIndex: 0,
          explanation:
            "When wire dimensions approach the electron mean free path (~40 nm for Cu), scattering from surfaces and grain boundaries dramatically increases effective resistivity beyond copper's bulk value.",
        },
      ],
    },
  ],
};
