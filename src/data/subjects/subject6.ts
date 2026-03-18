import { Subject } from "../curriculum";

export const subject6: Subject = {
  id: "pn-junctions-transistors",
  number: 6,
  title: "PN Junctions & Transistors",
  description:
    "Learn how PN junctions create diodes, how transistors switch and amplify, and how billions of them form a modern processor.",
  phase: 2,
  chapters: [
    {
      id: "pn-junction",
      title: "The PN Junction",
      subtitle: "Depletion region, built-in potential, and forward/reverse bias",
      sections: [
        {
          id: "junction-formation",
          title: "How a PN Junction Forms",
          content: `
<h2>How a PN Junction Forms</h2>
<p>When P-type and N-type silicon are brought together, something remarkable happens at the boundary:</p>
<ul>
  <li>Electrons from the N-side diffuse into the P-side (where there are fewer electrons)</li>
  <li>Holes from the P-side diffuse into the N-side</li>
  <li>This creates a region depleted of free carriers — the <strong>depletion region</strong></li>
  <li>Exposed dopant ions create an electric field that opposes further diffusion</li>
  <li>Equilibrium is reached with a <strong>built-in potential</strong> (~0.7V for silicon)</li>
</ul>
<div class="analogy">
  <h3>Analogy: Two Rooms with Different Temperatures</h3>
  <p>Imagine two rooms separated by an open door — one hot, one cold. Heat (carriers) flows from hot to cold until both sides of the doorway reach a balance. The "doorway zone" is like the depletion region, and the temperature difference is like the built-in potential.</p>
</div>
<div class="key-concept">
  <h3>Key Concept: The Depletion Region</h3>
  <p>The depletion region is typically <strong>0.1–1 µm wide</strong> and contains no free carriers — only fixed, ionized dopant atoms. It acts as a natural insulating barrier that can be modulated by applying voltage.</p>
</div>`,
        },
        {
          id: "forward-reverse-bias",
          title: "Forward and Reverse Bias",
          content: `
<h2>Forward and Reverse Bias</h2>
<p>Applying voltage to a PN junction dramatically changes its behavior:</p>
<ul>
  <li><strong>Forward bias</strong> (positive voltage to P-side): Shrinks the depletion region, reduces the barrier, and allows current to flow. Current increases exponentially with voltage.</li>
  <li><strong>Reverse bias</strong> (positive voltage to N-side): Widens the depletion region, increases the barrier, and blocks current. Only a tiny leakage current flows.</li>
</ul>
<p>This asymmetric behavior — conducting in one direction but blocking in the other — is <strong>rectification</strong>, and it's what makes a diode.</p>
<div class="key-concept">
  <h3>Key Concept: The Diode Equation</h3>
  <p>Current through a PN junction follows: I = I₀(e^(V/Vt) - 1), where Vt ≈ 26mV at room temperature. This exponential relationship means a small voltage change produces a large current change — the basis for amplification.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the built-in potential of a silicon PN junction?",
          options: ["~0.7V", "~5V", "~0.1V", "~12V"],
          correctIndex: 0,
          explanation:
            "Silicon PN junctions have a built-in potential of approximately 0.7V, created by the balance between carrier diffusion and the electric field of exposed dopant ions.",
        },
        {
          question: "What happens when a PN junction is forward-biased?",
          options: [
            "The depletion region shrinks and current flows",
            "The depletion region widens and current is blocked",
            "The junction breaks down",
            "No change occurs",
          ],
          correctIndex: 0,
          explanation:
            "Forward bias (positive to P-side) reduces the built-in barrier, shrinks the depletion region, and allows exponentially increasing current to flow.",
        },
      ],
    },
    {
      id: "diodes-in-action",
      title: "Diodes in Action",
      subtitle: "Rectification, LEDs, and other practical applications of PN junctions",
      sections: [
        {
          id: "rectification",
          title: "Rectification and Power Conversion",
          content: `
<h2>Rectification and Power Conversion</h2>
<p>The most fundamental diode application is <strong>rectification</strong> — converting AC (alternating current) to DC (direct current). Every power adapter you own uses diodes for this purpose.</p>
<ul>
  <li><strong>Half-wave rectifier:</strong> One diode passes only the positive half of the AC cycle</li>
  <li><strong>Full-wave bridge rectifier:</strong> Four diodes arranged so both halves of the AC cycle produce positive output</li>
</ul>
<p>Other critical diode applications:</p>
<ul>
  <li><strong>Protection diodes:</strong> Prevent reverse voltage from damaging circuits</li>
  <li><strong>Voltage regulation:</strong> Zener diodes maintain a constant voltage (breakdown voltage)</li>
  <li><strong>Signal clamping:</strong> Limit voltage swings in signal processing circuits</li>
</ul>`,
        },
        {
          id: "leds-photodiodes",
          title: "LEDs and Photodiodes",
          content: `
<h2>LEDs and Photodiodes</h2>
<p><strong>LEDs (Light-Emitting Diodes)</strong> are forward-biased PN junctions made from direct-bandgap materials. When electrons and holes recombine, they emit photons with energy equal to the bandgap:</p>
<ul>
  <li><strong>Red LEDs:</strong> GaAs/AlGaAs (bandgap ~1.8 eV, wavelength ~650 nm)</li>
  <li><strong>Blue/Green LEDs:</strong> InGaN (bandgap ~2.5–3.0 eV)</li>
  <li><strong>White LEDs:</strong> Blue LED + yellow phosphor coating</li>
</ul>
<p><strong>Photodiodes</strong> are the reverse — a reverse-biased junction where incoming photons generate electron-hole pairs in the depletion region, producing current proportional to light intensity. Your phone's camera sensor contains millions of photodiodes.</p>
<div class="key-concept">
  <h3>Key Concept: Bandgap = Color</h3>
  <p>The bandgap determines the color of light an LED emits. Larger bandgap = higher energy photon = shorter wavelength = bluer light. This is why GaN (3.4 eV) produces blue light while GaAs (1.42 eV) produces infrared.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What determines the color of light emitted by an LED?",
          options: [
            "The bandgap of the semiconductor material",
            "The size of the LED",
            "The amount of current flowing through it",
            "The temperature of the LED",
          ],
          correctIndex: 0,
          explanation:
            "The bandgap determines photon energy and thus wavelength/color. Larger bandgap materials emit shorter wavelength (bluer) light. GaN (3.4 eV) emits blue, GaAs (1.42 eV) emits infrared.",
        },
        {
          question: "How does a photodiode work?",
          options: [
            "Incoming photons create electron-hole pairs in a reverse-biased junction",
            "Electric current is converted to light",
            "Sound waves generate voltage across the junction",
            "Heat is converted to electrical current",
          ],
          correctIndex: 0,
          explanation:
            "In a photodiode, photons absorbed in the depletion region create electron-hole pairs that are swept apart by the junction's electric field, producing a current proportional to light intensity.",
        },
      ],
    },
    {
      id: "the-mosfet",
      title: "The MOSFET",
      subtitle: "Gate, source, drain — how field-effect switching works",
      sections: [
        {
          id: "mosfet-structure",
          title: "MOSFET Structure",
          content: `
<h2>MOSFET Structure</h2>
<p>The <strong>MOSFET</strong> (Metal-Oxide-Semiconductor Field-Effect Transistor) is the building block of all modern digital chips. It has four terminals:</p>
<ul>
  <li><strong>Gate:</strong> Controls whether current flows (the switch handle)</li>
  <li><strong>Source:</strong> Where current enters the channel</li>
  <li><strong>Drain:</strong> Where current exits the channel</li>
  <li><strong>Body/Substrate:</strong> The silicon bulk (usually connected to source)</li>
</ul>
<p>The key structure is a <strong>gate stack</strong>: a metal (or polysilicon) gate electrode separated from the silicon channel by a thin gate oxide insulator (originally SiO₂, now high-k dielectrics like HfO₂).</p>
<div class="key-concept">
  <h3>Key Concept: How Switching Works</h3>
  <p>In an NMOS transistor: when gate voltage is LOW, no channel exists between source and drain — the switch is OFF. When gate voltage exceeds the <strong>threshold voltage (Vt)</strong>, the electric field inverts the P-type silicon surface to create an N-type channel — the switch is ON, and current flows.</p>
</div>`,
        },
        {
          id: "nmos-pmos",
          title: "NMOS and PMOS",
          content: `
<h2>NMOS and PMOS</h2>
<p>MOSFETs come in two complementary types:</p>
<table>
  <thead>
    <tr><th>Property</th><th>NMOS</th><th>PMOS</th></tr>
  </thead>
  <tbody>
    <tr><td>Substrate</td><td>P-type</td><td>N-type</td></tr>
    <tr><td>Source/Drain</td><td>N-type</td><td>P-type</td></tr>
    <tr><td>Carrier</td><td>Electrons</td><td>Holes</td></tr>
    <tr><td>Turns ON when</td><td>Gate = HIGH</td><td>Gate = LOW</td></tr>
    <tr><td>Speed</td><td>Faster (higher mobility)</td><td>Slower (~3× lower mobility)</td></tr>
  </tbody>
</table>
<p>NMOS is faster because electrons have higher mobility than holes in silicon. However, both types are used together in <strong>CMOS</strong> (Complementary MOS) logic because the combination offers extremely low static power consumption.</p>`,
        },
        {
          id: "modern-transistors",
          title: "Modern Transistor Evolution",
          content: `
<h2>Modern Transistor Evolution</h2>
<p>As transistors have shrunk, their structure has evolved dramatically:</p>
<ul>
  <li><strong>Planar MOSFET (until ~28nm):</strong> The classic flat transistor on the silicon surface</li>
  <li><strong>FinFET (14nm–3nm):</strong> The channel rises up as a thin "fin," with the gate wrapping around three sides for better control. Invented by UC Berkeley professor Chenming Hu.</li>
  <li><strong>Gate-All-Around (GAA) / Nanosheet (2nm and beyond):</strong> Horizontal nanosheets or nanowires with the gate completely surrounding the channel from all four sides.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Gripping a Hose</h3>
  <p>Controlling current through a transistor is like squeezing a water hose. A planar MOSFET squeezes from one side (weak control). A FinFET squeezes from three sides (better). GAA squeezes from all sides (best control) — like wrapping your whole hand around the hose.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What does the gate do in a MOSFET?",
          options: [
            "Controls whether current flows between source and drain",
            "Provides the main current path",
            "Stores charge like a battery",
            "Connects the transistor to the power supply",
          ],
          correctIndex: 0,
          explanation:
            "The gate voltage creates an electric field that either forms or removes a conductive channel between source and drain, acting as an electronic switch.",
        },
        {
          question: "What is a FinFET?",
          options: [
            "A transistor with a raised fin-shaped channel and gate wrapping three sides",
            "A transistor with fins for cooling",
            "A flat planar transistor used at 28nm",
            "A type of memory cell",
          ],
          correctIndex: 0,
          explanation:
            "A FinFET has a thin vertical fin of silicon with the gate electrode wrapping around three sides, providing much better electrostatic control than a planar transistor.",
        },
      ],
    },
    {
      id: "transistor-to-logic",
      title: "From Transistor to Logic",
      subtitle: "CMOS logic, basic gates, and how billions of transistors make a processor",
      sections: [
        {
          id: "cmos-logic",
          title: "CMOS: The Foundation of Digital Logic",
          content: `
<h2>CMOS: The Foundation of Digital Logic</h2>
<p><strong>CMOS (Complementary Metal-Oxide-Semiconductor)</strong> pairs NMOS and PMOS transistors to create logic gates that consume almost zero power when not switching:</p>
<ul>
  <li><strong>PMOS pull-up network:</strong> Connects output to VDD (high) when input conditions are met</li>
  <li><strong>NMOS pull-down network:</strong> Connects output to ground (low) when input conditions are met</li>
  <li>At any time, either pull-up OR pull-down is active — never both simultaneously (ideally)</li>
</ul>
<p>The simplest CMOS gate is the <strong>inverter</strong> (NOT gate): 1 PMOS + 1 NMOS transistor. Input HIGH → NMOS on, output LOW. Input LOW → PMOS on, output HIGH.</p>
<div class="key-concept">
  <h3>Key Concept: Why CMOS Dominates</h3>
  <p>CMOS draws significant current only during switching transitions. In static states (output stable at 0 or 1), current flow is nearly zero. This is why CMOS replaced earlier NMOS-only logic — it enabled the low power consumption that makes battery-powered devices possible.</p>
</div>`,
        },
        {
          id: "logic-gates",
          title: "Basic Logic Gates",
          content: `
<h2>Basic Logic Gates</h2>
<p>All digital computation is built from combinations of a few basic gates:</p>
<table>
  <thead>
    <tr><th>Gate</th><th>Transistors</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>NOT (Inverter)</strong></td><td>2</td><td>Output = opposite of input</td></tr>
    <tr><td><strong>NAND</strong></td><td>4</td><td>Output LOW only when ALL inputs HIGH</td></tr>
    <tr><td><strong>NOR</strong></td><td>4</td><td>Output HIGH only when ALL inputs LOW</td></tr>
    <tr><td><strong>AND</strong></td><td>6</td><td>NAND + inverter</td></tr>
    <tr><td><strong>OR</strong></td><td>6</td><td>NOR + inverter</td></tr>
  </tbody>
</table>
<p>A remarkable result from computer science: <strong>any computation can be built using only NAND gates</strong> (or only NOR gates). In practice, synthesis tools choose the optimal combination of standard cells from a library containing hundreds of pre-designed gate variations.</p>
<div class="analogy">
  <h3>Analogy: LEGO Bricks</h3>
  <p>Logic gates are the LEGO bricks of computing. Just as you can build anything from a few basic LEGO shapes, you can build any computer from basic logic gates. A modern CPU is simply billions of these gates connected in precisely the right pattern.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why does CMOS logic consume very little static power?",
          options: [
            "Either pull-up or pull-down network is active, never both — so no DC current path exists",
            "CMOS uses special low-power materials",
            "CMOS transistors are always turned off",
            "CMOS runs at very low voltage",
          ],
          correctIndex: 0,
          explanation:
            "In CMOS logic, the PMOS pull-up and NMOS pull-down networks are complementary — when one is on, the other is off. This means no direct path from VDD to ground in static states, resulting in near-zero static power consumption.",
        },
        {
          question: "How many transistors are needed for a CMOS NAND gate?",
          options: ["4", "2", "6", "8"],
          correctIndex: 0,
          explanation:
            "A 2-input CMOS NAND gate uses 4 transistors: 2 PMOS in parallel (pull-up) and 2 NMOS in series (pull-down).",
        },
      ],
    },
  ],
};
