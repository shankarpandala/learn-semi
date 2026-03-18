import { Subject } from "../curriculum";

export const subject9: Subject = {
  id: "etching-ion-implantation",
  number: 9,
  title: "Etching & Ion Implantation",
  description:
    "Learn how material is selectively removed through etching and how dopant atoms are precisely placed via ion implantation.",
  phase: 3,
  chapters: [
    {
      id: "wet-vs-dry-etching",
      title: "Wet vs Dry Etching",
      subtitle: "Chemical wet etch, isotropic vs anisotropic, and selectivity",
      sections: [
        {
          id: "etching-overview",
          title: "Etching Fundamentals",
          content: `
<h2>Etching Fundamentals</h2>
<p><strong>Etching</strong> selectively removes material from the wafer surface using the photoresist or hardmask pattern as a template. Two main approaches:</p>
<ul>
  <li><strong>Wet etching:</strong> Immerse wafers in liquid chemicals that dissolve the target material. Simple, cheap, but usually <strong>isotropic</strong> (etches equally in all directions).</li>
  <li><strong>Dry etching:</strong> Use plasma/reactive gases to remove material. Can be highly <strong>anisotropic</strong> (etches preferentially downward), enabling vertical sidewalls.</li>
</ul>
<p>Three critical etch parameters:</p>
<ul>
  <li><strong>Selectivity:</strong> How much faster the target material etches vs. the mask or underlying layer. Higher is better (e.g., 50:1 means 50× faster etch of target).</li>
  <li><strong>Anisotropy:</strong> The ratio of vertical to lateral etch rate. 1.0 = perfectly directional.</li>
  <li><strong>Uniformity:</strong> Consistent etch rate across the entire wafer.</li>
</ul>
<div class="analogy">
  <h3>Analogy: Carving a Sculpture</h3>
  <p>Wet etching is like dissolving material with acid — it removes material in all directions equally (isotropic). Dry etching is like using a chisel pointing straight down — you can carve vertical walls without undercutting (anisotropic).</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What does 'selectivity' mean in etching?",
          options: [
            "How much faster the target material etches compared to the mask or stop layer",
            "The ability to etch only one wafer at a time",
            "Choosing which wafers to etch",
            "The chemical purity of the etchant",
          ],
          correctIndex: 0,
          explanation:
            "Etch selectivity is the ratio of etch rates between the target material and the mask/stop layer. High selectivity (e.g., 50:1) means you can completely remove the target while barely touching the mask.",
        },
      ],
    },
    {
      id: "plasma-etching",
      title: "Plasma Etching",
      subtitle: "RIE, ICP, etch chemistry, and profile control",
      sections: [
        {
          id: "plasma-etch-mechanisms",
          title: "Plasma Etch Mechanisms",
          content: `
<h2>Plasma Etch Mechanisms</h2>
<p>Plasma etching combines <strong>chemical</strong> and <strong>physical</strong> mechanisms:</p>
<ul>
  <li><strong>Chemical etching:</strong> Reactive species from the plasma (F, Cl, Br radicals) react with the surface to form volatile products that pump away. High selectivity but isotropic.</li>
  <li><strong>Ion bombardment:</strong> Energetic ions (Ar+, CF₃+) physically knock atoms off the surface. Anisotropic (directional) but poor selectivity.</li>
  <li><strong>Ion-enhanced etching:</strong> The combination — ions damage the surface, making it more reactive to chemical species. This gives both anisotropy AND good selectivity.</li>
</ul>
<p>Key plasma etch configurations:</p>
<ul>
  <li><strong>RIE (Reactive Ion Etching):</strong> Capacitively coupled plasma (CCP). Lower density, good for dielectric etch.</li>
  <li><strong>ICP (Inductively Coupled Plasma):</strong> Higher plasma density, independent control of ion energy and density. Preferred for high-aspect-ratio features.</li>
</ul>`,
        },
        {
          id: "etch-chemistry",
          title: "Etch Chemistry by Material",
          content: `
<h2>Etch Chemistry by Material</h2>
<p>Different materials require different etch chemistries:</p>
<table>
  <thead>
    <tr><th>Material</th><th>Etch Gases</th><th>Volatile Product</th></tr>
  </thead>
  <tbody>
    <tr><td>Silicon</td><td>SF₆, Cl₂, HBr</td><td>SiF₄, SiCl₄, SiBr₄</td></tr>
    <tr><td>SiO₂</td><td>CF₄, C₄F₈, CHF₃</td><td>SiF₄, CO, CO₂</td></tr>
    <tr><td>Si₃N₄</td><td>CF₄/O₂, CHF₃</td><td>SiF₄, N₂</td></tr>
    <tr><td>Tungsten</td><td>SF₆, CF₄</td><td>WF₆</td></tr>
    <tr><td>Photoresist</td><td>O₂</td><td>CO₂, H₂O</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: Sidewall Passivation</h3>
  <p>To achieve vertical sidewalls, fluorocarbon gases (C₄F₈) deposit a thin polymer on sidewalls during etching. Ion bombardment removes this polymer from the bottom but not the sidewalls, so etching proceeds only downward. This <strong>passivation</strong> mechanism is key to anisotropic etching.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What type of plasma source provides independent control of ion energy and density?",
          options: ["ICP (Inductively Coupled Plasma)", "CCP (Capacitively Coupled Plasma)", "Microwave plasma", "DC plasma"],
          correctIndex: 0,
          explanation:
            "ICP uses separate RF sources for plasma generation (coil) and ion acceleration (bias), allowing independent control of plasma density and ion energy — critical for process optimization.",
        },
        {
          question: "How do fluorocarbon gases help achieve vertical etch profiles?",
          options: [
            "They deposit protective polymer on sidewalls that prevents lateral etching",
            "They increase the etch rate in all directions",
            "They cool the wafer during etching",
            "They dissolve the photoresist mask",
          ],
          correctIndex: 0,
          explanation:
            "Fluorocarbon gases form a thin polymer layer on sidewalls (passivation). Ion bombardment removes this polymer from horizontal surfaces but not vertical ones, enabling anisotropic etching.",
        },
      ],
    },
    {
      id: "ion-implantation",
      title: "Ion Implantation",
      subtitle: "How dopant atoms are precisely placed into silicon",
      sections: [
        {
          id: "implant-process",
          title: "The Ion Implantation Process",
          content: `
<h2>The Ion Implantation Process</h2>
<p><strong>Ion implantation</strong> shoots dopant atoms into silicon at controlled energies and doses to precisely define doped regions. The process:</p>
<ul>
  <li><strong>Ion source:</strong> A gas (BF₃ for boron, PH₃ for phosphorus, AsH₃ for arsenic) is ionized to create a beam of dopant ions.</li>
  <li><strong>Mass analyzer:</strong> A magnet separates ions by mass-to-charge ratio, selecting only the desired species (like a mass spectrometer).</li>
  <li><strong>Accelerator:</strong> Electric fields accelerate ions to precise energies (1 keV to 3 MeV), determining how deep they penetrate.</li>
  <li><strong>Scanning:</strong> The beam is scanned across the wafer (or the wafer is scanned through the beam) for uniform coverage.</li>
</ul>
<p>Key control parameters:</p>
<ul>
  <li><strong>Dose:</strong> Number of ions per cm² (typically 10¹¹ to 10¹⁶ cm⁻²). Controls peak concentration.</li>
  <li><strong>Energy:</strong> Determines implant depth. Higher energy = deeper penetration.</li>
  <li><strong>Tilt/twist angle:</strong> Controls implant direction to avoid channeling along crystal planes.</li>
</ul>`,
        },
        {
          id: "channeling-damage",
          title: "Channeling and Crystal Damage",
          content: `
<h2>Channeling and Crystal Damage</h2>
<p>Two important effects during implantation:</p>
<ul>
  <li><strong>Channeling:</strong> If ions enter along a crystal axis, they can travel much deeper than intended by "channeling" between rows of atoms. Prevented by tilting the wafer 7° off-axis and/or implanting through a thin screen oxide.</li>
  <li><strong>Crystal damage:</strong> Energetic ions displace silicon atoms, creating point defects and even amorphizing the silicon at high doses. This damage must be repaired by annealing.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Implant vs. Diffusion</h3>
  <p>Ion implantation offers far better control than older diffusion doping: precise depth control via energy, exact dose control via beam current integration, and ability to implant through masks for selective doping. It's the standard doping method in modern fabs.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What determines the depth of ion implantation?",
          options: [
            "The acceleration energy of the ions",
            "The implant dose",
            "The type of photoresist used",
            "The wafer temperature",
          ],
          correctIndex: 0,
          explanation:
            "Ion energy determines penetration depth — higher energy ions travel deeper into the silicon. Energy is typically 1 keV (shallow) to several MeV (deep well implants).",
        },
        {
          question: "What is channeling in ion implantation?",
          options: [
            "Ions traveling deeper than intended by following crystal axis channels",
            "The process of directing the ion beam",
            "A type of crystal defect",
            "The movement of ions through the vacuum system",
          ],
          correctIndex: 0,
          explanation:
            "Channeling occurs when ions enter along a crystal axis and travel between rows of atoms with minimal scattering, penetrating much deeper than intended. It's prevented by tilting the wafer off-axis.",
        },
      ],
    },
    {
      id: "annealing-activation",
      title: "Annealing & Activation",
      subtitle: "Repairing implant damage and activating dopants",
      sections: [
        {
          id: "annealing-purpose",
          title: "Why Annealing Is Needed",
          content: `
<h2>Why Annealing Is Needed</h2>
<p>After ion implantation, two problems must be fixed through <strong>thermal annealing</strong>:</p>
<ul>
  <li><strong>Crystal damage repair:</strong> The silicon lattice was disrupted by bombarding ions. Heating allows atoms to return to their proper lattice positions (recrystallization).</li>
  <li><strong>Dopant activation:</strong> Implanted dopant atoms sit in random interstitial positions. Annealing moves them into substitutional lattice sites where they become electrically active (donors or acceptors).</li>
</ul>
<p>The challenge: annealing requires high temperature to activate dopants, but too much heat causes <strong>dopant diffusion</strong> — spreading the carefully implanted profile. Modern solutions:</p>
<ul>
  <li><strong>Rapid Thermal Anneal (RTA):</strong> Heat to 1000–1100°C for 1–10 seconds using halogen lamps</li>
  <li><strong>Spike anneal:</strong> Ramp to ~1050°C with zero hold time at peak temperature</li>
  <li><strong>Laser anneal (millisecond/nanosecond):</strong> Heat only the surface to ~1300°C for microseconds — maximum activation with minimal diffusion</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Anneal Trade-off</h3>
  <p>Higher temperature and longer time = better activation but more diffusion. The industry has progressively moved to shorter, hotter anneals to maximize the activation/diffusion ratio. Laser annealing represents the extreme — near-melting temperatures for mere nanoseconds.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What are the two main purposes of post-implant annealing?",
          options: [
            "Repair crystal damage and activate dopants into substitutional sites",
            "Remove photoresist and clean the wafer",
            "Grow oxide and deposit metal",
            "Etch unwanted material and smooth the surface",
          ],
          correctIndex: 0,
          explanation:
            "Annealing repairs the crystal lattice damaged by ion bombardment and moves dopant atoms from random interstitial positions into substitutional lattice sites where they become electrically active.",
        },
        {
          question: "Why has the industry moved toward shorter annealing times?",
          options: [
            "To minimize unwanted dopant diffusion while still achieving activation",
            "To save energy costs",
            "Shorter anneals produce purer silicon",
            "Modern furnaces can't sustain high temperatures for long",
          ],
          correctIndex: 0,
          explanation:
            "Shorter annealing times (spike, millisecond, nanosecond) achieve high dopant activation while minimizing diffusion, keeping the implanted dopant profiles sharp and well-defined.",
        },
      ],
    },
  ],
};
