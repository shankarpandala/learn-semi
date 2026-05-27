

export const subject13 = {
  id: "etch-clean-equipment",
  number: 13,
  title: "Etch & Clean Equipment",
  description:
    "Discover the equipment that precisely removes materials — plasma etch chambers, wet benches, and post-etch cleaning systems.",
  phase: 4,
  chapters: [
    {
      id: "plasma-etch-chambers",
      title: "Plasma Etch Chambers",
      subtitle: "CCP vs ICP, RF power delivery, and gas distribution",
      sections: [
        {
          id: "etch-chamber-types",
          title: "Etch Chamber Configurations",
          content: `
<h2>Etch Chamber Configurations</h2>
<p>Plasma etch chambers come in two main configurations, each suited to different applications:</p>
<ul>
  <li><strong>CCP (Capacitively Coupled Plasma):</strong> Two parallel plate electrodes create the plasma. The wafer sits on the bottom electrode (cathode). RF power applied to the electrodes both generates the plasma and accelerates ions toward the wafer. CCP systems offer moderate plasma density and good ion energy control. Used for dielectric etching.</li>
  <li><strong>ICP (Inductively Coupled Plasma):</strong> A coil (usually on top of the chamber) generates a high-density plasma via inductive coupling. A separate RF bias on the wafer chuck controls ion energy independently. ICP provides 10–100× higher plasma density than CCP, enabling faster etch rates and better profile control. Used for conductor and high-aspect-ratio etching.</li>
</ul>
<p>Modern etch tools often combine both: <strong>TCP (Transformer Coupled Plasma)</strong> configurations use a planar coil above the chamber with independent source and bias power for maximum flexibility.</p>
<div class="key-concept">
  <h3>Key Concept: Independent Source/Bias Control</h3>
  <p>Decoupling plasma generation (source power → ion density) from ion acceleration (bias power → ion energy) is critical. It allows engineers to independently tune the chemical and physical components of the etch — more chemical for selectivity, more physical for anisotropy.</p>
</div>`,
        },
        {
          id: "etch-vendors-and-tools",
          title: "Major Etch Tools and Vendors",
          content: `
<h2>Major Etch Tools and Vendors</h2>
<p>Three vendors share the etch market for advanced logic and memory:</p>
<table>
  <thead>
    <tr><th>Vendor</th><th>Platform</th><th>Configuration</th><th>Sweet spot</th></tr>
  </thead>
  <tbody>
    <tr><td>Lam Research</td><td>Kiyo (conductor), Flex (dielectric), Sense.i</td><td>TCP / ICP + dual-frequency bias</td><td>Conductor etch, 3D NAND HARC</td></tr>
    <tr><td>Applied Materials</td><td>Centura Sym3 / Producer</td><td>CCP w/ dual-frequency &amp; multi-zone</td><td>Dielectric etch, advanced logic</td></tr>
    <tr><td>Tokyo Electron</td><td>Tactras (CCP), Telius (ICP)</td><td>CCP and ICP variants</td><td>DRAM, logic, broad coverage</td></tr>
  </tbody>
</table>
<h3>Pulsed plasma — a recent step change</h3>
<p>Modern tools modulate source and/or bias RF on a kHz timescale. Pulsing gives:</p>
<ul>
  <li><strong>Lower electron temperature on average</strong> — less charging damage on thin dielectrics</li>
  <li><strong>Better ion energy control</strong> — narrower ion-energy distributions, key for atomic-scale etch</li>
  <li><strong>Atomic Layer Etch (ALE)</strong> — alternating self-limiting chemistry and low-energy ion bombardment to remove one atomic layer per cycle, mirroring ALD</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: HARC Etch</h3>
  <p>3D NAND stacks 100+ layers and requires <strong>High Aspect Ratio Contact (HARC)</strong> etches with aspect ratios above 60:1. The CCP/ICP balance, sidewall passivation chemistry, and stage temperature (often cryogenic, ~−80 °C) are all pushed to extremes to keep the hole straight and the bottom open.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What advantage does ICP have over CCP for plasma etching?",
          options: [
            "Higher plasma density and independent control of ion energy",
            "Lower cost per chamber",
            "Simpler design with fewer components",
            "Better for wet etching applications",
          ],
          correctIndex: 0,
          explanation:
            "ICP generates 10–100× higher plasma density than CCP, and the separate bias RF allows independent control of ion energy. This enables faster etch rates and better process flexibility.",
        },
        {
          question: "What is Atomic Layer Etch (ALE)?",
          options: [
            "Alternating self-limiting surface modification and low-energy ion removal, one atomic layer per cycle",
            "A continuous etch performed at near-zero pressure",
            "Wet etch with single-atom precision",
            "Etching that uses only neutral atoms, not ions",
          ],
          correctIndex: 0,
          explanation:
            "ALE pairs a self-limiting chemical adsorption step with a separate low-energy ion bombardment step, removing roughly one atomic layer per cycle. It mirrors ALD on the etch side and is critical for sub-3 nm device fabrication.",
        },
      ],
    },
    {
      id: "etch-process-control",
      title: "Etch Process Control",
      subtitle: "Endpoint detection, OES, and maintaining uniformity",
      sections: [
        {
          id: "endpoint-detection",
          title: "Endpoint Detection",
          content: `
<h2>Endpoint Detection</h2>
<p><strong>Endpoint detection</strong> determines exactly when to stop etching — critical for removing the target film without over-etching into the layer below.</p>
<p>Common endpoint methods:</p>
<ul>
  <li><strong>Optical Emission Spectroscopy (OES):</strong> Monitors the light emitted by plasma species. When the target film is fully etched through, the chemical composition of the plasma changes, altering emission wavelengths. For example, when SiO₂ is cleared, CO emission drops and Si emission appears.</li>
  <li><strong>Interferometry:</strong> A laser beam reflects off the film being etched. As thickness decreases, interference fringes are observed. Counting fringes gives real-time thickness information.</li>
  <li><strong>Mass spectrometry:</strong> Monitors volatile etch byproducts in the exhaust. Composition changes signal endpoint.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Over-etch</h3>
  <p>After endpoint is detected, a controlled <strong>over-etch</strong> (typically 20–50% additional time) is applied to ensure complete clearing across the entire wafer, accounting for uniformity variations. The stop layer must withstand this over-etch — that's why selectivity matters.</p>
</div>`,
        },
        {
          id: "etch-uniformity",
          title: "Uniformity and Process Monitoring",
          content: `
<h2>Uniformity and Process Monitoring</h2>
<p>Etch uniformity — consistent etch rate across the wafer — is managed through:</p>
<ul>
  <li><strong>Multi-zone gas distribution:</strong> Center and edge gas injection ratios are tuned to compensate for radial flow patterns.</li>
  <li><strong>Multi-zone RF bias:</strong> Different RF power to inner and outer zones of the electrostatic chuck.</li>
  <li><strong>Temperature control:</strong> Multi-zone ESC (Electrostatic Chuck) with independent heating zones for center, middle, and edge.</li>
  <li><strong>Process kit design:</strong> Focus rings, edge rings, and confinement rings shape the plasma to improve uniformity.</li>
</ul>
<p>Etch tools generate rich FDC (Fault Detection and Classification) data: chamber pressure, RF parameters, temperatures, gas flows, and OES spectra — all sampled at high rates during each etch step.</p>`,
        },
      ],
      quiz: [
        {
          question: "How does OES (Optical Emission Spectroscopy) detect etch endpoint?",
          options: [
            "By monitoring changes in plasma emission wavelengths when the target film is fully removed",
            "By measuring the wafer temperature",
            "By weighing the wafer before and after etching",
            "By counting the number of RF pulses",
          ],
          correctIndex: 0,
          explanation:
            "OES monitors light emitted by plasma species. When the film being etched is completely removed, the plasma chemistry changes (different reactive species), causing detectable shifts in emission spectra.",
        },
        {
          question: "Why is across-wafer etch uniformity critical for 300 mm wafers?",
          options: [
            "Non-uniform etch produces CD variation across the wafer, lowering die yield at the edge or center",
            "Non-uniform etch heats the chamber walls",
            "It is needed to keep the pump pressure stable",
            "It changes the wavelength of the OES sensor",
          ],
          correctIndex: 0,
          explanation:
            "A 300 mm wafer carries hundreds of dies. If etch rate differs from center to edge, critical dimensions vary across the wafer and edge or center dies fall outside spec — a direct yield loss.",
        },
      ],
    },
    {
      id: "wet-clean-systems",
      title: "Wet Clean Systems",
      subtitle: "Chemical cleaning sequences, megasonic cleaning, and single-wafer tools",
      sections: [
        {
          id: "wet-clean-chemistry",
          title: "Wet Clean Chemistry",
          content: `
<h2>Wet Clean Chemistry</h2>
<p>Wet cleaning removes particles, metals, and organic contaminants between process steps. A wafer is cleaned <strong>100+ times</strong> during fabrication. Standard cleaning sequences:</p>
<ul>
  <li><strong>SC-1 (APM):</strong> NH₄OH:H₂O₂:H₂O — removes particles and organic contamination by etching a thin oxide layer and lifting particles off. The workhorse clean.</li>
  <li><strong>SC-2 (HPM):</strong> HCl:H₂O₂:H₂O — removes metallic contamination (Fe, Al, Mg) by dissolving metals as soluble chloride complexes.</li>
  <li><strong>HF dip:</strong> Dilute HF (0.5–1%) — removes native oxide and some embedded metals. Also used for oxide etch.</li>
  <li><strong>SPM (Piranha):</strong> H₂SO₄:H₂O₂ — aggressive organic removal for heavy contamination (e.g., post-implant resist stripping).</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: From Batch to Single-Wafer</h3>
  <p>The industry is shifting from batch wet benches (25 wafers immersed together) to <strong>single-wafer spin clean tools</strong>. Single-wafer tools offer better uniformity, lower chemical consumption, reduced cross-contamination risk, and compatibility with advanced process control.</p>
</div>`,
        },
        {
          id: "megasonic-and-cmp-clean",
          title: "Megasonic and Post-CMP Cleans",
          content: `
<h2>Megasonic and Post-CMP Cleans</h2>
<p>Two specialised wet processes deserve their own attention because they protect yield in very different ways.</p>
<h3>Megasonic cleaning</h3>
<ul>
  <li>Acoustic transducers excite the cleaning chemistry at ~0.8–2 MHz (well above the 20–60 kHz of legacy ultrasonics)</li>
  <li>Acoustic streaming and microbubble cavitation lift sub-100 nm particles off the wafer surface</li>
  <li>The shorter wavelength is gentle enough to spare 10–20 nm features — ultrasonics would shatter them</li>
</ul>
<h3>Post-CMP clean (PCMP)</h3>
<p>After Cu CMP the wafer carries slurry residue, polishing-pad debris, and dissolved copper. A typical PCMP sequence on a single-wafer tool:</p>
<ol>
  <li><strong>Brush scrub</strong> with PVA brushes in alkaline (NH₄OH) chemistry — bulk slurry removal</li>
  <li><strong>Dilute organic complexer</strong> (e.g., citric acid, BTA) — chelates and lifts Cu residue without etching the lines</li>
  <li><strong>Megasonic rinse</strong> in DI water — removes sub-100 nm particles</li>
  <li><strong>IPA / Marangoni dry</strong> — leaves a defect-free, watermark-free surface</li>
</ol>
<div class="key-concept">
  <h3>Key Concept: BTA — the Copper Inhibitor</h3>
  <p>Benzotriazole (BTA) chemisorbs onto exposed Cu and forms a passivating Cu–BTA complex. Add ~ppm levels to a PCMP rinse and Cu lines stop dissolving while everything else still rinses clean — a classic example of selective protection chemistry.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What does the SC-1 (APM) clean remove?",
          options: [
            "Particles and organic contamination",
            "Native oxide only",
            "Copper diffusion barriers",
            "Photoresist patterns",
          ],
          correctIndex: 0,
          explanation:
            "SC-1 (NH₄OH:H₂O₂:H₂O) removes particles and organic contamination by slightly etching the surface oxide layer and lifting particles. It's the most widely used clean in semiconductor manufacturing.",
        },
        {
          question: "Why is BTA added to post-CMP rinse chemistry?",
          options: [
            "It chemisorbs onto Cu lines and passivates them so they stop dissolving during the clean",
            "It increases CMP polishing rate",
            "It removes the TaN barrier",
            "It is needed to ionise the rinse water",
          ],
          correctIndex: 0,
          explanation:
            "Benzotriazole forms a Cu–BTA complex on exposed copper surfaces, blocking further Cu dissolution. That lets the rinse keep stripping residue everywhere else without etching the newly polished interconnects.",
        },
      ],
    },
    {
      id: "dry-clean-strip",
      title: "Dry Clean & Strip",
      subtitle: "Plasma ashing, downstream plasma, and resist removal",
      sections: [
        {
          id: "ashing-stripping",
          title: "Photoresist Stripping",
          content: `
<h2>Photoresist Stripping</h2>
<p>After lithography and etch, the photoresist must be completely removed (<strong>stripped</strong>) before proceeding. Methods:</p>
<ul>
  <li><strong>Oxygen plasma ashing:</strong> O₂ plasma converts organic resist into volatile CO₂ and H₂O. Fast and clean, but the plasma can damage sensitive underlying materials.</li>
  <li><strong>Downstream plasma:</strong> The plasma is generated remotely, and only the reactive neutral species (O radicals) reach the wafer — no ion bombardment damage. Preferred for damage-sensitive applications.</li>
  <li><strong>Wet strip:</strong> Solvent-based strippers or SPM (sulfuric-peroxide mix) for resist that plasma can't fully remove (e.g., heavily implanted, cross-linked resist).</li>
</ul>
<p>Post-etch, post-implant, and post-CMP cleans often combine dry and wet steps in sequence to address different contamination types.</p>
<div class="key-concept">
  <h3>Key Concept: Implant-Hardened Resist</h3>
  <p>High-dose ion implantation creates a <strong>carbonized crust</strong> on the resist surface that resists oxygen ashing. This requires multi-step strip processes: first cracking the crust at low temperature, then stripping the bulk resist. This is one of the most challenging cleans in the fab.</p>
</div>`,
        },
        {
          id: "dry-clean-chemistries",
          title: "SiCoNi and Other Dry Cleans",
          content: `
<h2>SiCoNi and Other Dry Cleans</h2>
<p>Beyond resist stripping, dry chemistries handle the most damage-sensitive surface preparations in the fab — places where even dilute HF would attack adjacent low-k or metal.</p>
<table>
  <thead>
    <tr><th>Process</th><th>Chemistry</th><th>Targets</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>SiCoNi (Applied Materials)</td><td>NH₃ + NF₃ → (NH₄)₂SiF₆</td><td>Native SiO₂ on Si</td><td>Forms a sublimating salt; gentle, no liquids</td></tr>
    <tr><td>Certas (Tokyo Electron)</td><td>HF gas + NH₃ vapor</td><td>SiO₂ at via bottoms</td><td>Selective to nitride and metal</td></tr>
    <tr><td>COR (Sony / TEL)</td><td>HF + NH₃ at low T</td><td>Oxide / nitride bumps</td><td>Self-limiting reactant layer + sublimation</td></tr>
    <tr><td>Plasma H₂ / Ar</td><td>H₂ or Ar plasma</td><td>Native CuO, organic residue</td><td>Pre-clean for PVD/CVD on Cu</td></tr>
  </tbody>
</table>
<p>The common theme: a reactive gas forms a thin solid salt or layer on the target film at low temperature, the wafer is then warmed (often just to ~100–150 °C), and the salt sublimes away. No liquid means no surface tension, no watermarks, and no damage to fragile 3D structures.</p>
<div class="key-concept">
  <h3>Key Concept: Why Dry Cleans Matter for 3D Devices</h3>
  <p>FinFETs and nanosheets have nearly vertical sidewalls and re-entrant geometries. A wet clean's surface tension can collapse adjacent fins (<em>pattern collapse</em>). Dry cleans avoid that risk entirely — increasingly the only viable option below 5 nm.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Why is downstream plasma preferred over direct plasma for resist stripping?",
          options: [
            "It delivers reactive radicals without ion bombardment damage to the underlying surface",
            "It's faster than direct plasma",
            "It uses less power",
            "It works at higher temperatures",
          ],
          correctIndex: 0,
          explanation:
            "Downstream plasma generates reactive species remotely — only neutral radicals reach the wafer, not energetic ions. This removes resist effectively without damaging sensitive underlying materials like low-k dielectrics.",
        },
        {
          question: "Why are dry SiCoNi-type cleans preferred over dilute HF below 5 nm?",
          options: [
            "They avoid liquid surface tension, which would otherwise collapse adjacent fins or nanosheets",
            "They etch faster than HF",
            "They produce a thicker oxide before metal deposition",
            "They are required by ISO cleanroom standards",
          ],
          correctIndex: 0,
          explanation:
            "FinFET and nanosheet structures are tall and skinny. Liquid HF clean dries through a meniscus whose surface tension can pull adjacent features together (pattern collapse). Dry chemistries form a solid that sublimes, so no liquid ever sees the device — eliminating the failure mode.",
        },
      ],
    },
  ],
};
