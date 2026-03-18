

export const subject8 = {
  id: "photolithography",
  number: 8,
  title: "Photolithography",
  description:
    "Discover how patterns are transferred onto wafers using light — from UV lithography to cutting-edge EUV technology.",
  phase: 3,
  chapters: [
    {
      id: "lithography-basics",
      title: "Lithography Basics",
      subtitle: "Photoresists, masks, exposure, and development — the fundamentals",
      sections: [
        {
          id: "lithography-overview",
          title: "The Lithography Process",
          content: `
<h2>The Lithography Process</h2>
<p><strong>Photolithography</strong> is how circuit patterns are transferred onto wafers. It's the most critical and repeated step in chip manufacturing — performed 50–100+ times per chip. The basic sequence:</p>
<ul>
  <li><strong>Coat:</strong> Spin a thin layer of photoresist (light-sensitive polymer) onto the wafer</li>
  <li><strong>Soft bake:</strong> Drive off solvents from the resist</li>
  <li><strong>Align & Expose:</strong> Project the circuit pattern through a mask (reticle) onto the resist using UV light</li>
  <li><strong>Post-exposure bake (PEB):</strong> Complete chemical reactions triggered by exposure</li>
  <li><strong>Develop:</strong> Dissolve away the exposed (positive tone) or unexposed (negative tone) resist</li>
  <li><strong>Hard bake:</strong> Harden the remaining resist pattern</li>
  <li><strong>Etch or implant:</strong> Use the resist pattern as a mask for the actual process step</li>
  <li><strong>Strip:</strong> Remove the resist after it's served its purpose</li>
</ul>
<div class="analogy">
  <h3>Analogy: Stencil Printing</h3>
  <p>Lithography is like using a stencil to spray-paint a pattern — but with light instead of paint, and at the nanometer scale. The mask is the stencil, the light is the "spray," and the photoresist is the surface that records the pattern.</p>
</div>`,
        },
        {
          id: "photoresist-chemistry",
          title: "Photoresist Chemistry",
          content: `
<h2>Photoresist Chemistry</h2>
<p>Photoresists are engineered polymers that change solubility when exposed to light:</p>
<ul>
  <li><strong>Positive resist:</strong> Exposed areas become MORE soluble and are dissolved away during development. Used for most advanced patterning.</li>
  <li><strong>Negative resist:</strong> Exposed areas become LESS soluble (crosslink). Unexposed areas are dissolved away. Used for some specialized applications.</li>
</ul>
<p>Modern <strong>chemically amplified resists (CAR)</strong> use a photoacid generator (PAG). One photon generates an acid molecule that catalyzes many chemical reactions during PEB — amplifying the effect of each photon. This is essential for EUV lithography where photon counts are limited.</p>
<div class="key-concept">
  <h3>Key Concept: Resolution</h3>
  <p>The minimum feature size (resolution) is governed by the Rayleigh equation: <strong>R = k₁ × λ / NA</strong>, where λ is wavelength, NA is numerical aperture, and k₁ is a process factor. Smaller wavelength and larger NA give better resolution.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "In positive photoresist, what happens to exposed areas?",
          options: [
            "They become more soluble and are dissolved away",
            "They become less soluble and remain",
            "They change color but don't dissolve",
            "They immediately evaporate",
          ],
          correctIndex: 0,
          explanation:
            "In positive resist, light exposure breaks chemical bonds, making exposed areas more soluble in the developer solution. The exposed resist is dissolved, leaving the pattern behind.",
        },
        {
          question: "What is the Rayleigh equation for lithographic resolution?",
          options: [
            "R = k₁ × λ / NA",
            "R = k₁ × NA / λ",
            "R = λ² / NA",
            "R = NA / (k₁ × λ)",
          ],
          correctIndex: 0,
          explanation:
            "The Rayleigh equation R = k₁ × λ / NA defines the minimum resolution. Smaller wavelength (λ) and larger numerical aperture (NA) enable finer features.",
        },
      ],
    },
    {
      id: "optical-lithography",
      title: "Optical Lithography",
      subtitle: "Resolution limits, wavelength progression, and immersion lithography",
      sections: [
        {
          id: "wavelength-progression",
          title: "The Wavelength Progression",
          content: `
<h2>The Wavelength Progression</h2>
<p>Lithography has continuously moved to shorter wavelengths to print smaller features:</p>
<table>
  <thead>
    <tr><th>Generation</th><th>Wavelength</th><th>Light Source</th><th>Min Feature</th></tr>
  </thead>
  <tbody>
    <tr><td>g-line</td><td>436 nm</td><td>Mercury lamp</td><td>~350 nm</td></tr>
    <tr><td>i-line</td><td>365 nm</td><td>Mercury lamp</td><td>~250 nm</td></tr>
    <tr><td>KrF</td><td>248 nm</td><td>Excimer laser</td><td>~130 nm</td></tr>
    <tr><td>ArF</td><td>193 nm</td><td>Excimer laser</td><td>~65 nm</td></tr>
    <tr><td>ArF immersion</td><td>193 nm</td><td>Excimer laser + water</td><td>~38 nm</td></tr>
    <tr><td>EUV</td><td>13.5 nm</td><td>Tin plasma</td><td>~8 nm</td></tr>
  </tbody>
</table>`,
        },
        {
          id: "immersion-lithography",
          title: "Immersion Lithography",
          content: `
<h2>Immersion Lithography</h2>
<p>A breakthrough innovation: placing <strong>ultra-pure water</strong> between the final lens and the wafer. Since water has a refractive index of 1.44, this increases the effective NA from ~0.93 to <strong>1.35</strong>, improving resolution by ~45%.</p>
<p>ArF immersion lithography (ArFi) has been the workhorse technology for nodes from 45nm to 7nm (with multi-patterning). Key challenges:</p>
<ul>
  <li>Maintaining a stable water puddle on a fast-moving wafer (500 mm/s scan speed)</li>
  <li>Preventing bubbles and contamination in the water</li>
  <li>Controlling defects from water droplets left behind</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Multi-Patterning</h3>
  <p>When features became smaller than ArFi's single-exposure resolution limit (~38nm pitch), the industry developed <strong>multi-patterning</strong> — exposing multiple times with shifted patterns to achieve tighter pitches. SADP (Self-Aligned Double Patterning) effectively doubles pattern density.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is the wavelength used in ArF immersion lithography?",
          options: ["193 nm", "13.5 nm", "248 nm", "365 nm"],
          correctIndex: 0,
          explanation:
            "ArF immersion lithography uses 193nm ArF excimer laser light with ultra-pure water between the lens and wafer to increase resolution.",
        },
        {
          question: "How does immersion lithography improve resolution?",
          options: [
            "Water between lens and wafer increases the effective numerical aperture",
            "Water cools the wafer for better resist performance",
            "Water cleans contaminants during exposure",
            "Water reduces the wavelength of light",
          ],
          correctIndex: 0,
          explanation:
            "Water (refractive index 1.44) between the final lens and wafer increases the effective numerical aperture from ~0.93 to 1.35, enabling ~45% better resolution than dry lithography.",
        },
      ],
    },
    {
      id: "euv-lithography",
      title: "EUV Lithography",
      subtitle: "Why EUV was needed, 13.5nm wavelength, and the engineering marvel behind it",
      sections: [
        {
          id: "why-euv",
          title: "Why EUV Was Needed",
          content: `
<h2>Why EUV Was Needed</h2>
<p>By the 7nm node, ArF immersion with multi-patterning required <strong>4–5 exposures</strong> for a single critical layer, making it extremely expensive and complex. EUV lithography replaces these multiple exposures with a <strong>single exposure</strong> at 13.5 nm wavelength.</p>
<p>The jump from 193 nm to 13.5 nm — a <strong>14× reduction in wavelength</strong> — was one of the most challenging engineering feats in history. It took over 20 years and $10+ billion in R&D.</p>
<div class="key-concept">
  <h3>Key Concept: Everything Changes at EUV</h3>
  <p>At 13.5 nm, <em>everything</em> absorbs EUV light — including air, glass lenses, and most materials. This means EUV systems must operate in a <strong>near-perfect vacuum</strong>, use <strong>reflective mirrors</strong> instead of lenses, and generate light from a <strong>tin plasma</strong> source.</p>
</div>`,
        },
        {
          id: "euv-technology",
          title: "How EUV Works",
          content: `
<h2>How EUV Works</h2>
<p>An EUV scanner is arguably the most complex machine ever built:</p>
<ul>
  <li><strong>Light source:</strong> A high-power CO₂ laser hits tiny tin droplets (50,000 per second) at 50 km/s. Each droplet explodes into plasma that emits 13.5 nm EUV light. Conversion efficiency is only ~5%.</li>
  <li><strong>Optics:</strong> 11 multilayer mirrors (alternating Mo/Si layers, ~40 pairs) collect and focus the light. Each mirror reflects only ~70% of incident EUV, so total optical efficiency is ~2%.</li>
  <li><strong>Mask:</strong> Reflective mask (not transmissive) with absorber patterns on a Mo/Si multilayer substrate.</li>
  <li><strong>Vacuum:</strong> The entire optical path operates in ultra-high vacuum (hydrogen environment for debris mitigation).</li>
</ul>
<p>Despite all these losses, modern High-NA EUV scanners achieve <strong>200+ wafers per hour</strong> throughput — a testament to the extraordinary source power (>500W at intermediate focus).</p>`,
        },
      ],
      quiz: [
        {
          question: "Why must EUV systems operate in a vacuum?",
          options: [
            "Air absorbs EUV light at 13.5 nm wavelength",
            "Vacuum makes the machine faster",
            "Vacuum prevents wafer contamination",
            "EUV light is created in space",
          ],
          correctIndex: 0,
          explanation:
            "At 13.5 nm wavelength, virtually all materials including air absorb EUV light. The entire optical path must be in near-perfect vacuum to allow the light to reach the wafer.",
        },
        {
          question: "What material is used to generate EUV light?",
          options: ["Tin (Sn)", "Silicon (Si)", "Argon (Ar)", "Krypton (Kr)"],
          correctIndex: 0,
          explanation:
            "EUV light is generated by hitting tin (Sn) droplets with a powerful CO₂ laser. The resulting tin plasma emits radiation at the desired 13.5 nm wavelength.",
        },
      ],
    },
    {
      id: "advanced-patterning",
      title: "Advanced Patterning",
      subtitle: "Multi-patterning, SADP, SAQP, and pushing beyond resolution limits",
      sections: [
        {
          id: "multi-patterning-techniques",
          title: "Multi-Patterning Techniques",
          content: `
<h2>Multi-Patterning Techniques</h2>
<p>When single-exposure resolution isn't sufficient, <strong>multi-patterning</strong> divides the pattern into multiple simpler exposures:</p>
<ul>
  <li><strong>LELE (Litho-Etch-Litho-Etch):</strong> Two separate lithography and etch steps with different masks. Simple concept, but alignment between exposures is challenging.</li>
  <li><strong>SADP (Self-Aligned Double Patterning):</strong> Deposits a spacer on the sidewalls of a sacrificial mandrel, then removes the mandrel. The spacers define features at half the original pitch — no alignment needed.</li>
  <li><strong>SAQP (Self-Aligned Quadruple Patterning):</strong> Applies SADP twice to achieve 4× density. Used for the tightest metal pitches at 7nm and 5nm nodes with 193i lithography.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Painting Between Lines</h3>
  <p>SADP is like drawing lines, attaching tape to both edges of each line, then peeling off the original lines. The tape strips remain, giving you twice as many lines at half the spacing — and they're perfectly self-aligned.</p>
</div>`,
        },
        {
          id: "euv-patterning",
          title: "EUV and Beyond",
          content: `
<h2>EUV and Beyond</h2>
<p>EUV lithography simplifies patterning by replacing multi-patterning with single exposure for critical layers. But even EUV has limits:</p>
<ul>
  <li><strong>Current EUV (0.33 NA):</strong> Single exposure down to ~26 nm pitch</li>
  <li><strong>High-NA EUV (0.55 NA):</strong> ASML's next-generation tool (EXE:5000 series), enabling single exposure at ~16 nm pitch. First tools delivered in 2024.</li>
  <li><strong>EUV with multi-patterning:</strong> Even tighter pitches still require combining EUV with double patterning</li>
</ul>
<p>The future may bring even more exotic patterning techniques like <strong>directed self-assembly (DSA)</strong> using block copolymers, or <strong>multi-beam e-beam lithography</strong> for mask making.</p>`,
        },
      ],
      quiz: [
        {
          question: "What does SADP stand for?",
          options: [
            "Self-Aligned Double Patterning",
            "Sequential Advanced Double Processing",
            "Silicon-Assisted Deposition Process",
            "Selective Area Direct Patterning",
          ],
          correctIndex: 0,
          explanation:
            "SADP (Self-Aligned Double Patterning) uses spacers deposited on mandrel sidewalls to create features at half the lithographic pitch — doubling pattern density without alignment issues.",
        },
        {
          question: "What is the numerical aperture (NA) of the next-generation High-NA EUV?",
          options: ["0.55", "0.33", "1.35", "0.93"],
          correctIndex: 0,
          explanation:
            "ASML's High-NA EUV scanners have a numerical aperture of 0.55 (up from 0.33 in current EUV), enabling finer resolution for 2nm and beyond.",
        },
      ],
    },
  ],
};
