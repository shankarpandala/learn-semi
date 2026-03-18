

export const subject1 = {
  id: "what-is-a-semiconductor",
  number: 1,
  title: "What Is a Semiconductor?",
  description:
    "Understand what semiconductors are, why silicon is king, and how a tiny chip powers everything from smartphones to spacecraft.",
  phase: 1,
  chapters: [
    {
      id: "from-sand-to-silicon",
      title: "From Sand to Silicon",
      subtitle:
        "How silicon is extracted and purified, and why it's the material of choice",
      sections: [
        {
          id: "silicon-abundance",
          title: "Silicon: Earth's Second Most Abundant Element",
          content: `
<h2>Silicon: Earth's Second Most Abundant Element</h2>
<p>Silicon makes up roughly <strong>28% of Earth's crust by mass</strong>, second only to oxygen. It's everywhere — in sand, rocks, and clay. Yet the silicon used in chips must be extraordinarily pure: <strong>99.9999999% pure</strong> (nine nines), making it one of the purest materials humans produce.</p>
<p>The journey from ordinary beach sand (SiO₂) to a polished silicon wafer involves several key steps:</p>
<ul>
  <li><strong>Quartzite mining:</strong> High-purity quartz sand is mined and selected for low impurity content.</li>
  <li><strong>Reduction:</strong> SiO₂ is heated with carbon in an electric arc furnace at ~1800°C to produce metallurgical-grade silicon (98–99% pure).</li>
  <li><strong>Purification:</strong> The Siemens process converts silicon to trichlorosilane gas, then deposits ultra-pure polysilicon through chemical vapor deposition.</li>
  <li><strong>Crystal growth:</strong> The Czochralski (CZ) method melts polysilicon and slowly pulls a single crystal ingot — a perfect, defect-free cylinder.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Making Ultra-Pure Water</h3>
  <p>Imagine you need water so pure that there's only one contaminant molecule for every billion water molecules. That's the level of purity required for semiconductor-grade silicon. Regular tap water has millions of impurities per billion molecules.</p>
</div>`,
        },
        {
          id: "wafer-manufacturing",
          title: "From Ingot to Wafer",
          content: `
<h2>From Ingot to Wafer</h2>
<p>Once a silicon crystal ingot is grown (typically 300mm / 12 inches in diameter and over a meter long), it must be transformed into thin, flat wafers:</p>
<ul>
  <li><strong>Slicing:</strong> Diamond wire saws cut the ingot into wafers roughly 775 micrometers thick.</li>
  <li><strong>Lapping:</strong> Both sides are ground flat to remove saw damage.</li>
  <li><strong>Etching:</strong> Chemical etching removes sub-surface damage and contaminants.</li>
  <li><strong>Polishing:</strong> Chemical-mechanical polishing (CMP) creates a mirror-smooth surface with sub-nanometer roughness.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Wafer Flatness</h3>
  <p>A finished 300mm wafer must be flat to within a few micrometers across its entire surface. If scaled up to the size of a football field, the height variation would be less than the thickness of a sheet of paper.</p>
</div>
<p>Each wafer will eventually contain hundreds or thousands of individual chips (dies). The larger the wafer, the more dies per wafer, which is why the industry has progressively moved from 100mm to 150mm, 200mm, and now 300mm wafers.</p>`,
        },
        {
          id: "why-silicon",
          title: "Why Silicon Wins",
          content: `
<h2>Why Silicon Wins</h2>
<p>Other semiconductors exist — germanium, gallium arsenide, silicon carbide — so why does silicon dominate >95% of the chip market?</p>
<ul>
  <li><strong>Abundance:</strong> Silicon is cheap and plentiful. Gallium arsenide is 100× more expensive per wafer.</li>
  <li><strong>Native oxide:</strong> Silicon naturally forms SiO₂ (glass), an excellent insulator. This property is critical for building transistors — no other semiconductor has such a convenient native oxide.</li>
  <li><strong>Mature ecosystem:</strong> Decades of R&D, tooling, and manufacturing infrastructure are built around silicon.</li>
  <li><strong>Mechanical strength:</strong> Silicon wafers are strong enough to survive hundreds of processing steps without breaking.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The SiO₂ Advantage</h3>
  <p>The ability to grow a thin, stable, insulating oxide layer on silicon is perhaps <em>the</em> reason silicon won the semiconductor race. This oxide serves as the gate insulator in MOSFETs — the fundamental building block of all modern chips.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question:
            "What purity level is required for semiconductor-grade silicon?",
          options: [
            "99.9999999% (nine nines)",
            "99.99% (four nines)",
            "99.9% (three nines)",
            "95%",
          ],
          correctIndex: 0,
          explanation:
            "Semiconductor-grade silicon must be 99.9999999% pure (nine nines) — one of the purest materials humans produce.",
        },
        {
          question:
            "What is the primary advantage of silicon over other semiconductors?",
          options: [
            "Its natural oxide (SiO₂) is an excellent insulator",
            "It's the rarest element on Earth",
            "It conducts electricity better than copper",
            "It doesn't need to be purified",
          ],
          correctIndex: 0,
          explanation:
            "Silicon's native oxide SiO₂ is a stable, high-quality insulator — critical for building transistor gates. No other semiconductor has such a convenient native oxide.",
        },
        {
          question:
            "What method is commonly used to grow single-crystal silicon ingots?",
          options: [
            "The Czochralski (CZ) method",
            "The Bessemer process",
            "Electrolysis",
            "Fractional distillation",
          ],
          correctIndex: 0,
          explanation:
            "The Czochralski method melts ultra-pure polysilicon and slowly pulls a rotating seed crystal to grow a single-crystal ingot.",
        },
      ],
    },
    {
      id: "conductors-insulators-semiconductors",
      title: "Conductors, Insulators & Semiconductors",
      subtitle: "The spectrum of electrical conductivity and where semiconductors fit",
      sections: [
        {
          id: "conductivity-spectrum",
          title: "The Conductivity Spectrum",
          content: `
<h2>The Conductivity Spectrum</h2>
<p>All materials fall somewhere on a spectrum of electrical conductivity:</p>
<table>
  <thead>
    <tr><th>Category</th><th>Resistivity (Ω·cm)</th><th>Examples</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Conductors</strong></td><td>10⁻⁶ to 10⁻⁴</td><td>Copper, aluminum, gold</td></tr>
    <tr><td><strong>Semiconductors</strong></td><td>10⁻³ to 10⁶</td><td>Silicon, germanium, GaAs</td></tr>
    <tr><td><strong>Insulators</strong></td><td>10⁸ to 10¹⁸</td><td>Glass, rubber, SiO₂</td></tr>
  </tbody>
</table>
<p>The magic of semiconductors is that their conductivity can be <strong>precisely controlled</strong> — by adding impurities (doping), applying voltage, or changing temperature. This controllability is what makes transistors possible.</p>
<div class="analogy">
  <h3>Analogy: The Water Valve</h3>
  <p>Think of conductors as open pipes (water flows freely), insulators as sealed pipes (no flow), and semiconductors as pipes with adjustable valves. You can control exactly how much current flows — and that's the basis of all electronics.</p>
</div>`,
        },
        {
          id: "what-makes-semiconductor-special",
          title: "What Makes Semiconductors Special",
          content: `
<h2>What Makes Semiconductors Special</h2>
<p>Three properties make semiconductors uniquely useful for electronics:</p>
<ul>
  <li><strong>Tunable conductivity:</strong> By adding tiny amounts of impurities (dopants), we can change silicon's conductivity by a factor of a million or more.</li>
  <li><strong>Temperature sensitivity:</strong> Unlike metals (which conduct worse when hot), semiconductors conduct <em>better</em> at higher temperatures as more electrons gain enough energy to move.</li>
  <li><strong>Light sensitivity:</strong> Semiconductors can absorb and emit photons, enabling LEDs, solar cells, and image sensors.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Bandgap</h3>
  <p>The key difference between conductors, semiconductors, and insulators is the <strong>bandgap</strong> — the energy barrier electrons must overcome to conduct. Conductors have no bandgap, insulators have a huge one (>5 eV), and semiconductors have a small, useful one (silicon = 1.1 eV).</p>
</div>`,
        },
      ],
      quiz: [
        {
          question:
            "What distinguishes a semiconductor from a conductor?",
          options: [
            "Semiconductors have a small bandgap that allows controlled conductivity",
            "Semiconductors always conduct better than conductors",
            "Semiconductors are always made of silicon",
            "Semiconductors cannot conduct electricity",
          ],
          correctIndex: 0,
          explanation:
            "Semiconductors have a small bandgap (~1 eV for silicon) that allows their conductivity to be precisely controlled through doping, voltage, and temperature.",
        },
        {
          question:
            "How does temperature affect semiconductor conductivity?",
          options: [
            "Conductivity increases with temperature",
            "Conductivity decreases with temperature",
            "Temperature has no effect",
            "Conductivity first increases then decreases",
          ],
          correctIndex: 0,
          explanation:
            "Higher temperature gives more electrons enough energy to cross the bandgap, increasing conductivity. This is opposite to metals, where conductivity decreases with temperature.",
        },
      ],
    },
    {
      id: "inside-a-chip",
      title: "Inside a Chip",
      subtitle: "What's actually on a silicon die — layers, transistors, and basic structure",
      sections: [
        {
          id: "chip-layers",
          title: "Layers of a Modern Chip",
          content: `
<h2>Layers of a Modern Chip</h2>
<p>A modern processor isn't just a flat piece of silicon — it's a <strong>3D structure with dozens of layers</strong> built on top of each other. From bottom to top:</p>
<ul>
  <li><strong>Silicon substrate:</strong> The wafer itself — the foundation everything is built on.</li>
  <li><strong>Transistor layer (FEOL):</strong> Billions of transistors are formed in and on the silicon surface. This is the "front-end-of-line" (FEOL).</li>
  <li><strong>Contact layer:</strong> Tiny plugs connect transistors to the wiring above.</li>
  <li><strong>Metal interconnects (BEOL):</strong> 10-15 layers of copper wiring connect transistors to each other. Lower layers are thin and dense (local connections), upper layers are thick (power distribution and long-distance signals).</li>
  <li><strong>Passivation & pads:</strong> A protective top layer with exposed metal pads for bonding to the package.</li>
</ul>
<div class="analogy">
  <h3>Analogy: A Skyscraper</h3>
  <p>Think of a chip as a city skyscraper. The foundation (silicon) holds everything up. The ground floor has all the workers (transistors doing the computation). Above them are floors of hallways and corridors (metal layers) connecting offices. The higher floors have wider hallways for main traffic arteries.</p>
</div>`,
        },
        {
          id: "transistor-density",
          title: "Transistor Scale",
          content: `
<h2>Transistor Scale</h2>
<p>Modern chips contain a staggering number of transistors:</p>
<table>
  <thead>
    <tr><th>Chip</th><th>Year</th><th>Transistors</th><th>Process Node</th></tr>
  </thead>
  <tbody>
    <tr><td>Intel 4004</td><td>1971</td><td>2,300</td><td>10 µm</td></tr>
    <tr><td>Intel Pentium</td><td>1993</td><td>3.1 million</td><td>800 nm</td></tr>
    <tr><td>Apple M1</td><td>2020</td><td>16 billion</td><td>5 nm</td></tr>
    <tr><td>Apple M4 Ultra</td><td>2025</td><td>~100 billion</td><td>3 nm</td></tr>
  </tbody>
</table>
<p>Each transistor is incredibly small. At the 3nm node, transistor features are just a few nanometers wide — about <strong>20 silicon atoms across</strong>. A human hair is roughly 80,000 nm wide.</p>
<div class="key-concept">
  <h3>Key Concept: Die Size</h3>
  <p>A single chip (die) typically ranges from 50 mm² to 800 mm² in area. A 300mm wafer can yield hundreds of small dies or dozens of large ones. Larger dies = more transistors but lower yield and higher cost.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What does FEOL stand for in chip manufacturing?",
          options: [
            "Front-End-of-Line — where transistors are built",
            "Final Electronic Output Layer",
            "First Etching Operation Level",
            "Fabrication Equipment Operating Line",
          ],
          correctIndex: 0,
          explanation:
            "FEOL (Front-End-of-Line) refers to the initial fabrication steps where transistors are formed in the silicon substrate.",
        },
        {
          question: "How many metal interconnect layers does a modern chip typically have?",
          options: [
            "10-15 layers",
            "1-2 layers",
            "100+ layers",
            "3-4 layers",
          ],
          correctIndex: 0,
          explanation:
            "Modern chips typically have 10-15 layers of copper metal interconnects (BEOL) that wire billions of transistors together.",
        },
      ],
    },
    {
      id: "why-chips-matter",
      title: "Why Chips Matter",
      subtitle: "Economic impact, geopolitics, and modern dependence on semiconductors",
      sections: [
        {
          id: "economic-impact",
          title: "The $600 Billion Industry",
          content: `
<h2>The $600 Billion Industry</h2>
<p>The global semiconductor industry generates over <strong>$600 billion in annual revenue</strong> and enables trillions of dollars in downstream electronics products. Chips are in everything:</p>
<ul>
  <li><strong>Smartphones:</strong> ~15 chips per phone (processor, memory, modem, power management, sensors)</li>
  <li><strong>Cars:</strong> Modern vehicles contain 1,000–3,000 chips each</li>
  <li><strong>Data centers:</strong> AI training clusters use thousands of GPUs, each a marvel of semiconductor engineering</li>
  <li><strong>Medical devices:</strong> From pacemakers to MRI machines</li>
  <li><strong>Infrastructure:</strong> Power grids, telecom networks, satellites</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Multiplier Effect</h3>
  <p>Every $1 of semiconductor revenue enables roughly $10 of electronic systems revenue. Chips are the foundation of the entire digital economy.</p>
</div>`,
        },
        {
          id: "geopolitics",
          title: "Geopolitics of Chips",
          content: `
<h2>Geopolitics of Chips</h2>
<p>Semiconductors have become a <strong>strategic national security asset</strong>. The supply chain is remarkably concentrated:</p>
<ul>
  <li><strong>TSMC (Taiwan)</strong> manufactures ~90% of the world's most advanced chips</li>
  <li><strong>ASML (Netherlands)</strong> is the sole supplier of EUV lithography machines</li>
  <li><strong>U.S. companies</strong> dominate chip design (Apple, Nvidia, AMD, Qualcomm) and EDA tools</li>
  <li><strong>Japan & Germany</strong> supply critical chemicals and specialty equipment</li>
</ul>
<p>This concentration creates vulnerability. The 2020–2023 chip shortage disrupted auto manufacturing, consumer electronics, and even military systems. Governments responded with massive investment:</p>
<ul>
  <li><strong>U.S. CHIPS Act:</strong> $52 billion to boost domestic chip manufacturing</li>
  <li><strong>EU Chips Act:</strong> €43 billion investment target</li>
  <li><strong>China:</strong> Over $100 billion invested in semiconductor self-sufficiency</li>
</ul>
<div class="analogy">
  <h3>Analogy: The New Oil</h3>
  <p>Just as oil shaped 20th-century geopolitics, semiconductors are shaping 21st-century power dynamics. Control over chip manufacturing capability is now a matter of national security.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What percentage of advanced chips does TSMC manufacture?",
          options: [
            "~90%",
            "~50%",
            "~25%",
            "~10%",
          ],
          correctIndex: 0,
          explanation:
            "TSMC in Taiwan manufactures approximately 90% of the world's most advanced semiconductor chips, making it a critical node in the global supply chain.",
        },
        {
          question: "How many chips does a modern car typically contain?",
          options: [
            "1,000–3,000",
            "5–10",
            "50–100",
            "10,000+",
          ],
          correctIndex: 0,
          explanation:
            "Modern vehicles contain 1,000 to 3,000 semiconductor chips controlling everything from engine management to infotainment systems.",
        },
      ],
    },
  ],
};
