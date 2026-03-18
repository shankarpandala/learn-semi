import { Subject } from "../curriculum";

export const subject5: Subject = {
  id: "band-theory-electrical-properties",
  number: 5,
  title: "Band Theory & Electrical Properties",
  description:
    "Understand energy bands, bandgaps, and how they determine whether a material conducts, insulates, or acts as a semiconductor.",
  phase: 2,
  chapters: [
    {
      id: "energy-bands",
      title: "Energy Bands Explained",
      subtitle: "From discrete atomic energy levels to continuous energy bands in solids",
      sections: [
        {
          id: "from-atoms-to-bands",
          title: "From Atoms to Bands",
          content: `
<h2>From Atoms to Bands</h2>
<p>A single silicon atom has discrete electron energy levels. When atoms come together in a crystal, these levels split and broaden into continuous <strong>energy bands</strong>:</p>
<ul>
  <li><strong>2 atoms:</strong> Each level splits into 2 closely spaced levels</li>
  <li><strong>N atoms:</strong> Each level splits into N levels, so close together they form a continuous band</li>
  <li><strong>10²² atoms (a crystal):</strong> Bands are truly continuous</li>
</ul>
<p>The two most important bands are:</p>
<ul>
  <li><strong>Valence band:</strong> The highest energy band that is fully occupied at 0 K. Electrons here are bound in covalent bonds.</li>
  <li><strong>Conduction band:</strong> The next higher band, empty at 0 K. Electrons here are free to move and conduct electricity.</li>
</ul>
<div class="analogy">
  <h3>Analogy: The Parking Garage</h3>
  <p>Think of the valence band as a full parking garage (all spots taken — no car can move). The conduction band is the open road above. Electrons need enough energy to jump from the garage to the road. Once on the road, they're free to drive (conduct).</p>
</div>`,
        },
        {
          id: "the-bandgap",
          title: "The Bandgap",
          content: `
<h2>The Bandgap</h2>
<p>The <strong>bandgap (Eg)</strong> is the energy gap between the top of the valence band and the bottom of the conduction band. It determines a material's electrical behavior:</p>
<table>
  <thead>
    <tr><th>Material Type</th><th>Bandgap</th><th>Examples</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Conductor</strong></td><td>0 eV (bands overlap)</td><td>Copper, gold, aluminum</td></tr>
    <tr><td><strong>Semiconductor</strong></td><td>0.1–4 eV</td><td>Si (1.12 eV), GaAs (1.42 eV), GaN (3.4 eV)</td></tr>
    <tr><td><strong>Insulator</strong></td><td>>4 eV</td><td>SiO₂ (9 eV), diamond (5.5 eV)</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: Silicon's Bandgap = 1.12 eV</h3>
  <p>Silicon's bandgap of 1.12 eV is "just right" — small enough that useful numbers of electrons can be thermally excited at room temperature, but large enough that the material isn't overwhelmed with carriers (which would make controlled switching impossible).</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the bandgap of silicon at room temperature?",
          options: ["1.12 eV", "0 eV", "5.5 eV", "9.0 eV"],
          correctIndex: 0,
          explanation:
            "Silicon has a bandgap of 1.12 eV at room temperature — the energy an electron needs to jump from the valence band to the conduction band.",
        },
        {
          question: "What happens to atomic energy levels when atoms form a crystal?",
          options: [
            "They broaden into continuous energy bands",
            "They become more discrete and separated",
            "They disappear entirely",
            "They all merge into a single level",
          ],
          correctIndex: 0,
          explanation:
            "When N atoms come together, each discrete energy level splits into N closely spaced levels, forming continuous energy bands in a crystal.",
        },
      ],
    },
    {
      id: "the-bandgap",
      title: "The Bandgap",
      subtitle: "Direct vs indirect bandgaps, temperature effects, and bandgap engineering",
      sections: [
        {
          id: "direct-vs-indirect",
          title: "Direct vs Indirect Bandgaps",
          content: `
<h2>Direct vs Indirect Bandgaps</h2>
<p>Bandgaps come in two varieties based on the crystal's momentum-energy relationship:</p>
<ul>
  <li><strong>Direct bandgap:</strong> An electron can transition between bands by absorbing/emitting a photon directly. Materials: GaAs, GaN, InP. These are excellent for <strong>LEDs and lasers</strong>.</li>
  <li><strong>Indirect bandgap:</strong> The transition requires both a photon and a phonon (lattice vibration) to conserve momentum. Materials: Si, Ge. This makes silicon a <strong>poor light emitter</strong> but fine for electronics.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Why Silicon LEDs Don't Work</h3>
  <p>Silicon's indirect bandgap means it can't efficiently convert electrical energy to light. This is why LEDs use direct-bandgap materials like GaN (blue/white) and GaAs/InGaP (red). However, silicon's indirect bandgap is perfectly fine for transistors and logic circuits.</p>
</div>`,
        },
        {
          id: "temperature-effects",
          title: "Temperature Effects on Bandgap",
          content: `
<h2>Temperature Effects on Bandgap</h2>
<p>The bandgap <strong>decreases</strong> with increasing temperature. For silicon:</p>
<ul>
  <li>At 0 K: Eg = 1.17 eV</li>
  <li>At 300 K (room temp): Eg = 1.12 eV</li>
  <li>At 400 K: Eg = 1.09 eV</li>
</ul>
<p>This happens because thermal expansion weakens atomic bonds and lattice vibrations perturb the periodic potential.</p>
<p>The practical consequence: at higher temperatures, more electrons are thermally excited across the bandgap, increasing <strong>leakage current</strong>. This is why hot chips leak more power and why cooling is critical in modern processors.</p>
<div class="analogy">
  <h3>Analogy: A Lower Fence</h3>
  <p>As temperature rises, the bandgap "fence" between the valence and conduction bands gets shorter. More electrons can jump over a shorter fence, leading to more leakage — electrons going where you don't want them.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why can't silicon be used efficiently in LEDs?",
          options: [
            "Silicon has an indirect bandgap, making light emission inefficient",
            "Silicon is too expensive for LED applications",
            "Silicon's bandgap is too large for visible light",
            "Silicon is transparent to all light",
          ],
          correctIndex: 0,
          explanation:
            "Silicon has an indirect bandgap, meaning electron transitions require both a photon and a phonon. This makes radiative recombination (light emission) very inefficient compared to direct-bandgap materials like GaN.",
        },
        {
          question: "How does temperature affect silicon's bandgap?",
          options: [
            "The bandgap decreases with increasing temperature",
            "The bandgap increases with increasing temperature",
            "Temperature has no effect on the bandgap",
            "The bandgap oscillates with temperature",
          ],
          correctIndex: 0,
          explanation:
            "Silicon's bandgap decreases from 1.17 eV at 0 K to 1.12 eV at room temperature. Higher temperatures weaken bonds and increase lattice vibrations, reducing the energy gap.",
        },
      ],
    },
    {
      id: "carriers-mobility",
      title: "Carriers & Mobility",
      subtitle: "Electrons, holes, drift, diffusion, and how fast carriers move",
      sections: [
        {
          id: "carrier-types",
          title: "Electrons and Holes",
          content: `
<h2>Electrons and Holes</h2>
<p>Current in semiconductors is carried by two types of charge carriers:</p>
<ul>
  <li><strong>Electrons:</strong> Negatively charged, move in the conduction band. Dominant carriers in N-type silicon.</li>
  <li><strong>Holes:</strong> Positively charged "absences of electrons" in the valence band. Dominant carriers in P-type silicon.</li>
</ul>
<p>In <strong>intrinsic (undoped) silicon</strong> at room temperature, the carrier concentration is about <strong>1.5 × 10¹⁰ cm⁻³</strong>. This sounds large, but silicon has 5 × 10²² atoms/cm³, so only about 1 in every 10¹² atoms has a thermally generated free carrier.</p>
<div class="key-concept">
  <h3>Key Concept: Mass Action Law</h3>
  <p>In thermal equilibrium, the product of electron and hole concentrations is constant: <strong>n × p = nᵢ²</strong>. If you increase electrons (N-type doping), the hole concentration automatically decreases, and vice versa. This is the mass action law.</p>
</div>`,
        },
        {
          id: "mobility-concept",
          title: "Carrier Mobility",
          content: `
<h2>Carrier Mobility</h2>
<p><strong>Mobility (μ)</strong> measures how easily carriers move through the crystal in response to an electric field. Higher mobility = faster devices.</p>
<p>At room temperature in silicon:</p>
<ul>
  <li><strong>Electron mobility:</strong> ~1400 cm²/(V·s)</li>
  <li><strong>Hole mobility:</strong> ~450 cm²/(V·s)</li>
</ul>
<p>Electrons move about 3× faster than holes in silicon. This is why <strong>NMOS transistors</strong> (which use electron current) are faster than PMOS transistors (which use hole current).</p>
<p>Mobility depends on:</p>
<ul>
  <li><strong>Temperature:</strong> Higher temperature → more lattice scattering → lower mobility</li>
  <li><strong>Doping:</strong> Higher doping → more impurity scattering → lower mobility</li>
  <li><strong>Electric field:</strong> At very high fields, carriers reach a maximum velocity (~10⁷ cm/s in Si)</li>
</ul>`,
        },
      ],
      quiz: [
        {
          question: "Which carrier has higher mobility in silicon?",
          options: [
            "Electrons (~1400 cm²/V·s vs ~450 for holes)",
            "Holes (~1400 cm²/V·s vs ~450 for electrons)",
            "Both have the same mobility",
            "Neither moves in silicon",
          ],
          correctIndex: 0,
          explanation:
            "Electrons have about 3× higher mobility than holes in silicon (1400 vs 450 cm²/V·s), which is why NMOS transistors are inherently faster than PMOS.",
        },
        {
          question: "What does the mass action law state?",
          options: [
            "n × p = nᵢ² (the product of electron and hole concentrations is constant)",
            "Carrier velocity equals mobility times field",
            "Current equals voltage divided by resistance",
            "Doping always increases conductivity",
          ],
          correctIndex: 0,
          explanation:
            "The mass action law states that in thermal equilibrium, the product of electron (n) and hole (p) concentrations equals the square of the intrinsic carrier concentration (nᵢ²).",
        },
      ],
    },
    {
      id: "optical-thermal-properties",
      title: "Optical & Thermal Properties",
      subtitle: "How bandgap affects light absorption, emission, and thermal behavior",
      sections: [
        {
          id: "optical-properties",
          title: "Light and Semiconductors",
          content: `
<h2>Light and Semiconductors</h2>
<p>The bandgap determines how a semiconductor interacts with light:</p>
<ul>
  <li><strong>Absorption:</strong> Photons with energy ≥ Eg can excite electrons across the bandgap. Silicon absorbs visible light (which is why silicon wafers are opaque and dark-colored).</li>
  <li><strong>Transparency:</strong> Photons with energy < Eg pass through. Silicon is transparent to infrared light with wavelength > 1.1 µm.</li>
  <li><strong>Emission:</strong> When electrons fall from conduction to valence band, they can emit photons. Efficient in direct bandgap materials (LEDs), inefficient in silicon.</li>
</ul>
<p>Applications based on light-semiconductor interactions:</p>
<ul>
  <li><strong>Solar cells:</strong> Silicon absorbs sunlight and generates electron-hole pairs → electricity</li>
  <li><strong>Image sensors:</strong> Each pixel is a photodiode that converts light to charge (your phone camera)</li>
  <li><strong>LEDs:</strong> GaN and GaAs emit light when carriers recombine across the direct bandgap</li>
</ul>`,
        },
        {
          id: "thermal-properties",
          title: "Thermal Properties",
          content: `
<h2>Thermal Properties</h2>
<p>Heat management is critical in semiconductor devices:</p>
<ul>
  <li><strong>Thermal conductivity:</strong> Silicon conducts heat reasonably well (150 W/m·K) — better than most semiconductors but worse than metals like copper (400 W/m·K). SiC (490 W/m·K) and diamond (2000 W/m·K) are much better.</li>
  <li><strong>Thermal runaway:</strong> As temperature rises, leakage current increases, generating more heat, which increases temperature further. This positive feedback can destroy a chip if not managed.</li>
  <li><strong>Self-heating:</strong> Transistors generate heat during switching. At billions of transistors switching billions of times per second, total heat dissipation can reach 100–300W in high-performance processors.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Power Density</h3>
  <p>Modern chips dissipate power at <strong>100+ W/cm²</strong> — comparable to a nuclear reactor's fuel rod surface. This is why cooling solutions (heatsinks, fans, liquid cooling) are essential, and why power efficiency is as important as raw performance.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why is silicon opaque to visible light but transparent to infrared?",
          options: [
            "Visible light photons have enough energy to excite electrons across silicon's 1.12 eV bandgap, but infrared photons don't",
            "Silicon reflects all visible light",
            "Infrared light is absorbed by the crystal lattice",
            "Silicon has a special coating that blocks visible light",
          ],
          correctIndex: 0,
          explanation:
            "Visible light photons (1.8–3.1 eV) exceed silicon's 1.12 eV bandgap and are absorbed. Infrared photons below 1.12 eV don't have enough energy to excite electrons and pass through.",
        },
        {
          question: "What is thermal runaway in chips?",
          options: [
            "A positive feedback loop where heat increases leakage, which generates more heat",
            "When a chip physically melts",
            "Rapid thermal annealing during fabrication",
            "The normal heating during chip startup",
          ],
          correctIndex: 0,
          explanation:
            "Thermal runaway is a dangerous positive feedback: higher temperature increases leakage current, which dissipates more power as heat, raising temperature further — potentially destroying the chip.",
        },
      ],
    },
  ],
};
