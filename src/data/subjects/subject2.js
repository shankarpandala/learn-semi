

export const subject2 = {
  id: "chip-making-journey",
  number: 2,
  title: "The Chip-Making Journey",
  description:
    "Follow a chip from design to finished product — an end-to-end overview of the semiconductor manufacturing process.",
  phase: 1,
  chapters: [
    {
      id: "design-architecture",
      title: "Design & Architecture",
      subtitle: "How chips are designed using EDA tools, from specification to layout",
      sections: [
        {
          id: "design-flow",
          title: "The Chip Design Flow",
          content: `
<h2>The Chip Design Flow</h2>
<p>Designing a modern chip is one of the most complex engineering tasks in the world. It typically takes <strong>2–4 years</strong> and teams of hundreds or thousands of engineers. The design flow follows these major stages:</p>
<ul>
  <li><strong>Specification:</strong> Define what the chip must do — performance targets, power budget, area constraints.</li>
  <li><strong>Architecture:</strong> High-level design of functional blocks — CPU cores, memory controllers, I/O interfaces.</li>
  <li><strong>RTL Design:</strong> Engineers write the logic in Hardware Description Languages (HDL) like Verilog or VHDL, describing the chip's behavior at the register-transfer level.</li>
  <li><strong>Synthesis:</strong> EDA tools convert RTL into a netlist of logic gates (AND, OR, NOT, flip-flops).</li>
  <li><strong>Place & Route:</strong> Software places millions of gates on the chip area and routes wires between them.</li>
  <li><strong>Verification:</strong> Exhaustive simulation and formal verification ensure the design works correctly.</li>
  <li><strong>Tapeout:</strong> The final design database is sent to the foundry for manufacturing.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Building a City</h3>
  <p>Chip design is like designing an entire city. You need architects (specification), urban planners (architecture), builders (synthesis), road networks (place & route), and inspectors (verification) — all working in concert.</p>
</div>`,
        },
        {
          id: "eda-tools",
          title: "EDA: The Software Behind the Hardware",
          content: `
<h2>EDA: The Software Behind the Hardware</h2>
<p><strong>Electronic Design Automation (EDA)</strong> tools are the specialized software that makes chip design possible. No human could manually place and route billions of transistors — EDA tools use sophisticated algorithms to automate this process.</p>
<p>The EDA market is dominated by three companies:</p>
<ul>
  <li><strong>Synopsys</strong> — market leader in synthesis, simulation, and verification</li>
  <li><strong>Cadence</strong> — strong in custom/analog design and place-and-route</li>
  <li><strong>Siemens EDA</strong> (formerly Mentor) — DFM and PCB design</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: IP Blocks</h3>
  <p>Modern chips aren't designed from scratch. They integrate pre-designed, pre-verified <strong>IP blocks</strong> — reusable components like USB controllers, memory interfaces, or CPU cores (e.g., ARM Cortex). Companies like ARM and Imagination license IP that appears in billions of chips.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What does RTL stand for in chip design?",
          options: [
            "Register-Transfer Level",
            "Real-Time Logic",
            "Reduced Transistor Layout",
            "Routing and Timing Language",
          ],
          correctIndex: 0,
          explanation:
            "RTL (Register-Transfer Level) is the abstraction level where digital circuits are described in terms of data flow between registers and the combinational logic operations performed on signals.",
        },
        {
          question: "Which of these is NOT a major EDA company?",
          options: [
            "TSMC",
            "Synopsys",
            "Cadence",
            "Siemens EDA",
          ],
          correctIndex: 0,
          explanation:
            "TSMC is a foundry (chip manufacturer), not an EDA company. Synopsys, Cadence, and Siemens EDA are the three dominant EDA tool providers.",
        },
      ],
    },
    {
      id: "wafer-fabrication-overview",
      title: "Wafer Fabrication Overview",
      subtitle: "Front-end processing: the fab, cleanrooms, and key process steps",
      sections: [
        {
          id: "cleanroom",
          title: "The Cleanroom Environment",
          content: `
<h2>The Cleanroom Environment</h2>
<p>Semiconductor fabrication takes place in <strong>cleanrooms</strong> — environments where airborne particles are strictly controlled. A single dust particle can ruin a chip with features just a few nanometers wide.</p>
<p>Cleanroom classifications:</p>
<table>
  <thead>
    <tr><th>Class</th><th>Particles per m³ (≥0.5µm)</th><th>Usage</th></tr>
  </thead>
  <tbody>
    <tr><td>ISO 1 (Class 1)</td><td>10</td><td>Advanced lithography areas</td></tr>
    <tr><td>ISO 3 (Class 1)</td><td>1,000</td><td>General wafer processing</td></tr>
    <tr><td>ISO 5 (Class 100)</td><td>100,000</td><td>Assembly areas</td></tr>
  </tbody>
</table>
<p>For comparison, typical outdoor air contains about <strong>35 million particles per m³</strong>. Cleanroom workers wear full "bunny suits" to prevent shedding skin cells and hair.</p>
<div class="analogy">
  <h3>Analogy: Operating Room × 1000</h3>
  <p>A hospital operating room is ISO Class 7 (~350,000 particles/m³). A semiconductor cleanroom is 10,000–100,000× cleaner than an operating room.</p>
</div>`,
        },
        {
          id: "fab-process-steps",
          title: "The Core Process Steps",
          content: `
<h2>The Core Process Steps</h2>
<p>Building a chip involves repeating a handful of core process steps hundreds of times in precise sequence:</p>
<ul>
  <li><strong>Deposition:</strong> Adding thin layers of material (silicon dioxide, silicon nitride, metals) onto the wafer surface using techniques like CVD, PVD, and ALD.</li>
  <li><strong>Lithography:</strong> Transferring circuit patterns from a mask onto the wafer using light-sensitive photoresist. This defines where features will be created.</li>
  <li><strong>Etching:</strong> Selectively removing material where the photoresist was developed away, creating the actual structures.</li>
  <li><strong>Ion Implantation:</strong> Shooting dopant atoms (boron, phosphorus, arsenic) into the silicon to create regions with different electrical properties.</li>
  <li><strong>CMP (Polishing):</strong> Flattening each layer before building the next one on top.</li>
  <li><strong>Cleaning:</strong> Removing contaminants between steps — a wafer is cleaned 100+ times during fabrication.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Process Integration</h3>
  <p>A modern chip requires <strong>500–1,000+ individual process steps</strong> performed over 2–3 months. The sequence, timing, and parameters of each step are the fab's closely guarded trade secrets — this is <strong>process integration</strong>.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "How many individual process steps does a modern chip require?",
          options: [
            "500–1,000+",
            "10–20",
            "50–100",
            "5,000–10,000",
          ],
          correctIndex: 0,
          explanation:
            "Modern chips require 500 to over 1,000 individual process steps performed over 2–3 months in a cleanroom environment.",
        },
        {
          question: "What is the purpose of CMP in fabrication?",
          options: [
            "Flattening each layer to create a smooth surface",
            "Adding metal interconnects",
            "Testing the chip for defects",
            "Cutting the wafer into individual dies",
          ],
          correctIndex: 0,
          explanation:
            "Chemical-Mechanical Polishing (CMP) planarizes (flattens) each layer so subsequent layers can be built on a smooth, even surface.",
        },
      ],
    },
    {
      id: "packaging-testing",
      title: "Packaging & Testing",
      subtitle: "Back-end processing: dicing, bonding, packaging, and final test",
      sections: [
        {
          id: "wafer-to-package",
          title: "From Wafer to Package",
          content: `
<h2>From Wafer to Package</h2>
<p>After front-end fabrication is complete, each wafer contains hundreds of individual dies. The <strong>back-end process</strong> transforms these bare dies into functional, packaged chips:</p>
<ul>
  <li><strong>Wafer probe/sort:</strong> Each die is electrically tested while still on the wafer. Failed dies are marked with ink dots.</li>
  <li><strong>Dicing:</strong> A diamond saw or laser cuts the wafer into individual dies along the scribe lines.</li>
  <li><strong>Die attach:</strong> Good dies are picked and bonded to a substrate or lead frame using adhesive or solder.</li>
  <li><strong>Wire bonding or flip-chip:</strong> Electrical connections are made between the die's bond pads and the package pins using gold/copper wires or solder bumps.</li>
  <li><strong>Encapsulation:</strong> The die is sealed in a protective package (plastic molding, ceramic, or organic substrate).</li>
  <li><strong>Final test:</strong> Packaged chips undergo comprehensive electrical testing at various temperatures and speeds.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Speed Binning</h3>
  <p>During final test, chips are sorted by maximum operating speed. Faster chips are sold at premium prices, while slower ones are sold as lower-tier products. This is why the same chip design appears at different clock speeds and price points.</p>
</div>`,
        },
        {
          id: "advanced-packaging",
          title: "Advanced Packaging",
          content: `
<h2>Advanced Packaging</h2>
<p>As transistor scaling slows, <strong>advanced packaging</strong> has become a critical way to improve performance:</p>
<ul>
  <li><strong>Chiplets:</strong> Instead of one monolithic die, multiple smaller dies (chiplets) are connected in a single package. AMD's Ryzen and Apple's M-series Ultra chips use this approach.</li>
  <li><strong>2.5D packaging:</strong> Chiplets are placed side-by-side on a silicon interposer that provides high-bandwidth connections between them (e.g., HBM memory stacks next to GPUs).</li>
  <li><strong>3D stacking:</strong> Dies are stacked vertically and connected using Through-Silicon Vias (TSVs) — essentially tiny copper pillars through the silicon.</li>
  <li><strong>Fan-out wafer-level packaging (FOWLP):</strong> Redistributes die connections over a larger area, enabling thinner packages for mobile devices.</li>
</ul>
<div class="analogy">
  <h3>Analogy: LEGO Blocks</h3>
  <p>Advanced packaging is like building with LEGO blocks instead of carving from a single block of wood. You can mix and match chiplets — different functions, different process nodes, different manufacturers — and snap them together into a high-performance system.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is 'speed binning' in chip manufacturing?",
          options: [
            "Sorting chips by their maximum operating speed after testing",
            "The speed of the fabrication line",
            "How fast chips are packaged",
            "The rate at which defective chips are discarded",
          ],
          correctIndex: 0,
          explanation:
            "Speed binning sorts finished chips by their maximum validated operating frequency. Faster chips command premium prices while slower ones are sold as lower-tier products.",
        },
        {
          question: "What are TSVs used for in 3D packaging?",
          options: [
            "Vertical electrical connections through silicon between stacked dies",
            "Testing semiconductor voltage stability",
            "Thermal management in chip packages",
            "Transferring data from design to fabrication",
          ],
          correctIndex: 0,
          explanation:
            "Through-Silicon Vias (TSVs) are tiny copper-filled holes that pass vertically through silicon dies, enabling electrical connections between vertically stacked chips in 3D packages.",
        },
      ],
    },
    {
      id: "fab-to-phone",
      title: "From Fab to Phone",
      subtitle: "Supply chain, logistics, and how chips end up in devices",
      sections: [
        {
          id: "supply-chain-overview",
          title: "The Semiconductor Supply Chain",
          content: `
<h2>The Semiconductor Supply Chain</h2>
<p>A chip's journey from design to your phone spans <strong>multiple countries and 6+ months</strong>:</p>
<ul>
  <li><strong>Design:</strong> Typically in the U.S., Israel, or UK (Apple in Cupertino, ARM in Cambridge)</li>
  <li><strong>Wafer fabrication:</strong> Primarily in Taiwan (TSMC), South Korea (Samsung), or the U.S. (Intel)</li>
  <li><strong>Materials & chemicals:</strong> Japan, Germany, U.S. supply photoresists, gases, and specialty chemicals</li>
  <li><strong>Equipment:</strong> Netherlands (ASML), U.S. (Applied Materials, Lam Research), Japan (Tokyo Electron)</li>
  <li><strong>Assembly & test (OSAT):</strong> Often in Malaysia, China, Vietnam, or the Philippines</li>
  <li><strong>System integration:</strong> China (Foxconn, Pegatron) assembles final products like iPhones</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Cycle Time</h3>
  <p>From start of wafer fabrication to a chip inside your phone takes roughly <strong>4–6 months</strong>: 2–3 months in the fab, 2–4 weeks for packaging/test, and weeks for logistics and system assembly. Design time adds another 2–4 years before that.</p>
</div>`,
        },
        {
          id: "yield-and-cost",
          title: "Yield and Cost",
          content: `
<h2>Yield and Cost</h2>
<p><strong>Yield</strong> — the percentage of working dies per wafer — is the critical metric that determines chip economics:</p>
<ul>
  <li>A 300mm wafer costs <strong>$5,000–$20,000+</strong> to process at an advanced node</li>
  <li>At 95% yield on a small die, almost every chip works — great economics</li>
  <li>At 50% yield on a large die, half the chips are scrapped — very expensive</li>
</ul>
<p>This is why yield engineering is so critical, and why <strong>ML/data science skills are in high demand</strong> in semiconductor fabs. Predicting and improving yield directly translates to millions of dollars saved.</p>
<div class="analogy">
  <h3>Analogy: The Cookie Cutter</h3>
  <p>Imagine baking a giant cookie sheet (the wafer) and cutting out individual cookies (dies). Any burned spots or dough imperfections ruin those cookies. The bigger each cookie, the more likely it overlaps a flaw. Smaller cookies = higher yield, but you need more cookies for a full meal (chiplets!).</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "How long does it typically take from wafer fabrication start to a chip in a device?",
          options: [
            "4–6 months",
            "1–2 weeks",
            "1–2 days",
            "2–3 years",
          ],
          correctIndex: 0,
          explanation:
            "The journey from wafer fab start to chip-in-device takes approximately 4–6 months: 2–3 months in the fab, 2–4 weeks for packaging and testing, plus logistics and assembly time.",
        },
        {
          question: "Why is yield so important in semiconductor manufacturing?",
          options: [
            "It determines how many working chips each wafer produces, directly affecting cost",
            "It measures how fast chips can be designed",
            "It indicates the cleanroom air quality",
            "It refers to the speed of the manufacturing line",
          ],
          correctIndex: 0,
          explanation:
            "Yield (percentage of working dies per wafer) directly determines chip economics. Low yield means many expensive chips are wasted, dramatically increasing per-chip cost.",
        },
      ],
    },
  ],
};
