import { Subject } from "../curriculum";

export const subject4: Subject = {
  id: "atomic-structure-crystal-lattices",
  number: 4,
  title: "Atomic Structure & Crystal Lattices",
  description:
    "Explore silicon at the atomic level — crystal structures, lattice defects, and why material purity matters for chip performance.",
  phase: 2,
  chapters: [
    {
      id: "atoms-electrons",
      title: "Atoms & Electrons",
      subtitle: "Atomic structure, electron shells, and valence electrons in semiconductors",
      sections: [
        {
          id: "atomic-basics",
          title: "Atomic Structure Basics",
          content: `
<h2>Atomic Structure Basics</h2>
<p>Every atom consists of a <strong>nucleus</strong> (protons + neutrons) surrounded by <strong>electrons</strong> in discrete energy levels (shells). For semiconductor physics, the electrons are what matter most:</p>
<ul>
  <li><strong>Core electrons:</strong> Tightly bound to the nucleus, don't participate in bonding or conduction.</li>
  <li><strong>Valence electrons:</strong> The outermost electrons that determine chemical and electrical behavior.</li>
</ul>
<p>Silicon (element 14) has the electron configuration: 1s² 2s² 2p⁶ 3s² 3p². This gives it <strong>4 valence electrons</strong> in its outer shell — the key to its semiconductor behavior.</p>
<div class="key-concept">
  <h3>Key Concept: The Rule of Four</h3>
  <p>Silicon's 4 valence electrons allow it to form exactly 4 covalent bonds with neighboring atoms, creating a stable tetrahedral structure. This is the same bonding pattern as carbon in diamond — which is why silicon's crystal structure is called "diamond cubic."</p>
</div>`,
        },
        {
          id: "covalent-bonding",
          title: "Covalent Bonding in Silicon",
          content: `
<h2>Covalent Bonding in Silicon</h2>
<p>In pure crystalline silicon, each atom shares its 4 valence electrons with 4 neighboring silicon atoms, forming <strong>covalent bonds</strong>. At absolute zero (0 K), all electrons are locked in bonds and silicon acts as an insulator.</p>
<p>At room temperature (~300 K), thermal energy breaks some bonds, freeing electrons to conduct. This is why semiconductor conductivity <strong>increases with temperature</strong> — more thermal energy = more broken bonds = more free carriers.</p>
<div class="analogy">
  <h3>Analogy: The Dance Floor</h3>
  <p>Imagine dancers (electrons) holding hands in pairs (bonds). At low temperature, everyone is paired up and standing still. As the music gets louder (temperature rises), some pairs break apart and individual dancers start moving around the floor (conducting electricity).</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "How many valence electrons does silicon have?",
          options: ["4", "2", "8", "14"],
          correctIndex: 0,
          explanation:
            "Silicon has 4 valence electrons (3s² 3p²), which allow it to form 4 covalent bonds in its crystal structure.",
        },
        {
          question: "Why does silicon conduct better at higher temperatures?",
          options: [
            "Thermal energy breaks covalent bonds, freeing electrons to conduct",
            "Heat makes silicon atoms vibrate faster",
            "Silicon melts at high temperatures",
            "Higher temperature reduces resistance in all materials",
          ],
          correctIndex: 0,
          explanation:
            "At higher temperatures, thermal energy breaks covalent bonds in silicon, creating free electrons (and holes) that can carry current.",
        },
      ],
    },
    {
      id: "crystal-structures",
      title: "Crystal Structures",
      subtitle: "Unit cells, the diamond cubic structure, and how atoms arrange themselves",
      sections: [
        {
          id: "crystal-basics",
          title: "What Is a Crystal?",
          content: `
<h2>What Is a Crystal?</h2>
<p>A <strong>crystal</strong> is a solid where atoms are arranged in a highly ordered, repeating 3D pattern. This periodic arrangement extends across the entire material — in a silicon wafer, trillions of atoms are arranged in perfect order.</p>
<p>The smallest repeating unit of a crystal is called the <strong>unit cell</strong>. Common crystal structures include:</p>
<ul>
  <li><strong>Simple cubic (SC):</strong> Atoms at cube corners only — rare in nature</li>
  <li><strong>Body-centered cubic (BCC):</strong> Atoms at corners + one in the center — iron, tungsten</li>
  <li><strong>Face-centered cubic (FCC):</strong> Atoms at corners + center of each face — copper, aluminum, gold</li>
  <li><strong>Diamond cubic:</strong> FCC with 4 additional atoms inside — silicon, germanium, diamond</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Silicon's Diamond Cubic Structure</h3>
  <p>Silicon crystallizes in the diamond cubic structure — an FCC lattice with 4 additional atoms placed inside the cube. Each atom is bonded to exactly 4 neighbors in a tetrahedral arrangement. The lattice constant (cube edge length) is <strong>5.43 Å</strong> (0.543 nm).</p>
</div>`,
        },
        {
          id: "single-crystal-importance",
          title: "Why Single Crystals Matter",
          content: `
<h2>Why Single Crystals Matter</h2>
<p>For semiconductor devices, the silicon must be a <strong>single crystal</strong> — one continuous crystal lattice across the entire wafer with no grain boundaries.</p>
<p>Why does this matter?</p>
<ul>
  <li><strong>Uniform electrical properties:</strong> Grain boundaries scatter electrons and create unpredictable behavior. A single crystal ensures every transistor on the wafer sees the same material.</li>
  <li><strong>Predictable doping:</strong> Dopant atoms substitute into specific lattice sites. In a polycrystalline material, dopants would segregate at grain boundaries.</li>
  <li><strong>Smooth surfaces:</strong> Single crystals can be polished to atomic smoothness for lithography.</li>
</ul>
<p>This is why the <strong>Czochralski crystal growth</strong> process is so important — it produces large, defect-free single crystals.</p>
<div class="analogy">
  <h3>Analogy: A Brick Wall</h3>
  <p>Imagine building a wall. A single crystal is like a wall made from one perfectly smooth, continuous brick — no cracks or gaps. Polycrystalline material is like a wall of randomly oriented bricks with gaps (grain boundaries) between them. Water (electrons) leaks through the gaps unpredictably.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What crystal structure does silicon have?",
          options: [
            "Diamond cubic",
            "Body-centered cubic",
            "Simple cubic",
            "Hexagonal close-packed",
          ],
          correctIndex: 0,
          explanation:
            "Silicon crystallizes in the diamond cubic structure — an FCC lattice with additional atoms inside, where each silicon atom bonds to 4 neighbors tetrahedrally.",
        },
        {
          question: "Why must semiconductor wafers be single crystals?",
          options: [
            "Grain boundaries scatter electrons and create unpredictable electrical behavior",
            "Single crystals are cheaper to produce",
            "Polycrystalline silicon doesn't conduct electricity",
            "Single crystals are stronger mechanically",
          ],
          correctIndex: 0,
          explanation:
            "Single crystals provide uniform electrical properties, predictable doping, and smooth surfaces — all essential for building reliable transistors.",
        },
      ],
    },
    {
      id: "doping-impurities",
      title: "Doping & Impurities",
      subtitle: "How adding tiny amounts of impurities transforms silicon's electrical properties",
      sections: [
        {
          id: "n-type-p-type",
          title: "N-Type and P-Type Silicon",
          content: `
<h2>N-Type and P-Type Silicon</h2>
<p><strong>Doping</strong> is the process of intentionally adding impurity atoms to pure silicon to control its conductivity. The two types:</p>
<ul>
  <li><strong>N-type (negative):</strong> Add atoms with 5 valence electrons (phosphorus, arsenic). The extra electron is free to conduct. These dopants are called <strong>donors</strong>.</li>
  <li><strong>P-type (positive):</strong> Add atoms with 3 valence electrons (boron, gallium). The missing electron creates a <strong>hole</strong> — a positive charge carrier. These dopants are called <strong>acceptors</strong>.</li>
</ul>
<p>Doping concentrations are remarkably small: typically <strong>1 dopant atom per million silicon atoms</strong> (10¹⁶ cm⁻³) to 1 per thousand (10¹⁹ cm⁻³), yet they change conductivity by factors of 10,000 or more.</p>
<div class="analogy">
  <h3>Analogy: Stadium Seating</h3>
  <p>Imagine a stadium where every seat (bond) is occupied. N-type doping adds people with an extra friend who has to stand (free electron). P-type doping removes some people, creating empty seats (holes) that others can move into.</p>
</div>`,
        },
        {
          id: "doping-methods",
          title: "How Doping Is Done",
          content: `
<h2>How Doping Is Done</h2>
<p>In modern fabs, doping is primarily done by two methods:</p>
<ul>
  <li><strong>Ion implantation:</strong> Dopant atoms are ionized and accelerated as a beam into the silicon at precise energies and doses. This allows exact control of depth and concentration. Most common method for advanced chips.</li>
  <li><strong>Diffusion:</strong> Wafers are heated in a gas containing dopant atoms, which diffuse into the silicon from the surface. Older technique, still used for some steps.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Junction Formation</h3>
  <p>The boundary where N-type and P-type regions meet is called a <strong>PN junction</strong>. This junction is the fundamental building block of diodes and transistors — it's where the magic of semiconductor devices happens.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What type of dopant creates N-type silicon?",
          options: [
            "An element with 5 valence electrons like phosphorus",
            "An element with 3 valence electrons like boron",
            "An element with 4 valence electrons like carbon",
            "Any metal like copper or gold",
          ],
          correctIndex: 0,
          explanation:
            "N-type doping uses donor atoms with 5 valence electrons (phosphorus, arsenic). The 5th electron doesn't fit into silicon's 4-bond structure and becomes a free carrier.",
        },
        {
          question: "What is a 'hole' in semiconductor physics?",
          options: [
            "A missing electron that acts as a positive charge carrier",
            "A physical hole in the silicon wafer",
            "A defect in the crystal structure",
            "An excess electron",
          ],
          correctIndex: 0,
          explanation:
            "A hole is a missing electron in the crystal lattice that behaves as a positive charge carrier. When an electron fills a hole, it leaves behind a new hole — so holes appear to move through the material.",
        },
      ],
    },
    {
      id: "defects-material-quality",
      title: "Defects & Material Quality",
      subtitle: "Crystal defects, contamination, and why material purity drives chip performance",
      sections: [
        {
          id: "crystal-defects",
          title: "Types of Crystal Defects",
          content: `
<h2>Types of Crystal Defects</h2>
<p>Even in carefully grown single crystals, defects exist. Understanding and controlling them is critical:</p>
<ul>
  <li><strong>Point defects:</strong> Single-atom level — vacancies (missing atoms), interstitials (extra atoms between lattice sites), and substitutional impurities (wrong atoms in lattice sites).</li>
  <li><strong>Line defects (dislocations):</strong> Lines of disrupted atoms that propagate through the crystal. They degrade electrical performance and must be minimized.</li>
  <li><strong>Planar defects:</strong> Stacking faults and grain boundaries — planes where the crystal order is disrupted.</li>
  <li><strong>Bulk defects:</strong> Voids, precipitates, and inclusions — larger regions of disruption.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Defect Density</h3>
  <p>Modern silicon wafers achieve dislocation densities below <strong>100 per cm²</strong>, and prime wafers aim for zero dislocations. Each defect can potentially cause a transistor to fail, so for a chip with billions of transistors, even tiny defect densities matter.</p>
</div>`,
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          content: `
<h2>Contamination Control</h2>
<p>Metallic contamination at parts-per-billion levels can devastate chip performance:</p>
<ul>
  <li><strong>Iron, copper, nickel:</strong> Create deep-level traps that capture carriers and increase leakage current</li>
  <li><strong>Sodium, potassium:</strong> Mobile ions that drift in gate oxide under electric field, causing threshold voltage shifts</li>
  <li><strong>Particles:</strong> Any particle larger than half the feature size can cause a defect and kill a die</li>
</ul>
<p>This is why fabs invest enormously in:</p>
<ul>
  <li>Ultra-pure water (18.2 MΩ·cm resistivity)</li>
  <li>Electronic-grade chemicals (parts-per-trillion purity)</li>
  <li>Advanced cleaning sequences (100+ cleans per wafer)</li>
  <li>Cleanroom environment control</li>
</ul>`,
        },
      ],
      quiz: [
        {
          question: "What is a dislocation in a silicon crystal?",
          options: [
            "A line of disrupted atoms that propagates through the crystal",
            "A missing silicon atom",
            "A dopant atom in the wrong position",
            "A crack in the wafer surface",
          ],
          correctIndex: 0,
          explanation:
            "Dislocations are line defects — continuous lines of disrupted atomic arrangement that thread through the crystal. They degrade electrical properties and must be minimized in wafers.",
        },
        {
          question: "Why is metallic contamination harmful in chips?",
          options: [
            "Metal atoms create traps that capture charge carriers and increase leakage",
            "Metals make silicon brittle",
            "Metals increase silicon's melting point",
            "Metals change the crystal structure to BCC",
          ],
          correctIndex: 0,
          explanation:
            "Metal contaminants like iron, copper, and nickel create deep-level traps in silicon's bandgap that capture charge carriers, increase leakage current, and degrade device performance.",
        },
      ],
    },
  ],
};
