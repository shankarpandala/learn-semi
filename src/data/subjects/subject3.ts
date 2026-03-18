import { Subject } from "../curriculum";

export const subject3: Subject = {
  id: "semiconductor-ecosystem",
  number: 3,
  title: "The Semiconductor Ecosystem",
  description:
    "Meet the key players — from foundries like TSMC to equipment makers like ASML — and understand the global supply chain.",
  phase: 1,
  chapters: [
    {
      id: "industry-structure",
      title: "Industry Structure",
      subtitle: "IDMs, fabless companies, and foundries — the three business models",
      sections: [
        {
          id: "business-models",
          title: "Three Business Models",
          content: `
<h2>Three Business Models</h2>
<p>The semiconductor industry has evolved from vertically integrated companies to a specialized ecosystem with three main business models:</p>
<ul>
  <li><strong>IDM (Integrated Device Manufacturer):</strong> Companies that design AND manufacture their own chips. Examples: Intel, Samsung, Texas Instruments. They own their own fabs.</li>
  <li><strong>Fabless:</strong> Companies that design chips but outsource manufacturing to foundries. Examples: Apple, Nvidia, AMD, Qualcomm, Broadcom. They focus purely on design innovation.</li>
  <li><strong>Foundry:</strong> Companies that manufacture chips designed by others. Examples: TSMC, GlobalFoundries, UMC. They invest billions in cutting-edge fabs and process technology.</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: The Fabless Revolution</h3>
  <p>The fabless model was pioneered in the 1990s when building a fab became prohibitively expensive ($1B+). Today a leading-edge fab costs <strong>$20–30 billion</strong>. The fabless model lets companies like Nvidia innovate in design without the enormous capital expense of fab ownership.</p>
</div>
<p>There are also <strong>OSAT companies</strong> (Outsourced Semiconductor Assembly & Test) like ASE and Amkor that specialize in packaging and testing — another specialized segment of the ecosystem.</p>`,
        },
        {
          id: "foundry-model",
          title: "The Foundry Model",
          content: `
<h2>The Foundry Model</h2>
<p>TSMC (Taiwan Semiconductor Manufacturing Company), founded in 1987 by Morris Chang, pioneered the pure-play foundry model — manufacturing chips for other companies without competing against them with its own products.</p>
<p>The foundry model creates a virtuous cycle:</p>
<ul>
  <li>More customers → more revenue → more R&D investment → better process technology → more customers</li>
</ul>
<p>TSMC's dominance is extraordinary: it holds <strong>~60% global foundry market share</strong> and manufactures chips for Apple, Nvidia, AMD, Qualcomm, and hundreds of other companies.</p>
<div class="analogy">
  <h3>Analogy: The Restaurant Kitchen</h3>
  <p>Think of foundries as professional shared kitchens (commissary kitchens). Multiple restaurant brands (fabless companies) use the same kitchen facilities. Each brand provides their own recipes (chip designs), and the kitchen handles all the cooking (fabrication). This is more efficient than every restaurant building its own kitchen.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "What is a 'fabless' semiconductor company?",
          options: [
            "A company that designs chips but outsources manufacturing",
            "A company that has no factories of any kind",
            "A company that only tests chips",
            "A company that manufactures but doesn't design chips",
          ],
          correctIndex: 0,
          explanation:
            "Fabless companies focus on chip design and IP, outsourcing the actual manufacturing to foundries like TSMC. Examples include Nvidia, AMD, Apple, and Qualcomm.",
        },
        {
          question: "How much does a leading-edge semiconductor fab cost to build?",
          options: [
            "$20–30 billion",
            "$100–500 million",
            "$1–5 billion",
            "$100+ billion",
          ],
          correctIndex: 0,
          explanation:
            "A cutting-edge semiconductor fab now costs $20–30 billion to build, which is why most companies have moved to the fabless model and outsource to foundries.",
        },
      ],
    },
    {
      id: "key-companies",
      title: "Key Companies",
      subtitle: "The major players in design, manufacturing, equipment, and materials",
      sections: [
        {
          id: "chip-designers",
          title: "Chip Designers",
          content: `
<h2>Chip Designers</h2>
<p>The companies that design the world's most important chips:</p>
<table>
  <thead>
    <tr><th>Company</th><th>Focus</th><th>Key Products</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Apple</strong></td><td>Mobile/desktop processors</td><td>A-series (iPhone), M-series (Mac)</td></tr>
    <tr><td><strong>Nvidia</strong></td><td>GPUs, AI accelerators</td><td>GeForce, A100/H100/B200 (AI training)</td></tr>
    <tr><td><strong>AMD</strong></td><td>CPUs, GPUs</td><td>Ryzen, EPYC, Radeon</td></tr>
    <tr><td><strong>Qualcomm</strong></td><td>Mobile SoCs, modems</td><td>Snapdragon</td></tr>
    <tr><td><strong>Broadcom</strong></td><td>Networking, custom ASICs</td><td>Switch chips, TPU for Google</td></tr>
    <tr><td><strong>ARM</strong></td><td>CPU architecture licensing</td><td>Cortex cores (in 99% of smartphones)</td></tr>
  </tbody>
</table>`,
        },
        {
          id: "equipment-makers",
          title: "Equipment Makers",
          content: `
<h2>Equipment Makers</h2>
<p>The companies that build the machines that build chips — often called the "picks and shovels" of the semiconductor gold rush:</p>
<table>
  <thead>
    <tr><th>Company</th><th>Country</th><th>Specialty</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>ASML</strong></td><td>Netherlands</td><td>Lithography (sole EUV supplier)</td></tr>
    <tr><td><strong>Applied Materials</strong></td><td>U.S.</td><td>Deposition, etch, CMP</td></tr>
    <tr><td><strong>Lam Research</strong></td><td>U.S.</td><td>Etch and deposition</td></tr>
    <tr><td><strong>Tokyo Electron (TEL)</strong></td><td>Japan</td><td>Coater/developer, etch, deposition</td></tr>
    <tr><td><strong>KLA</strong></td><td>U.S.</td><td>Inspection and metrology</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: ASML's Monopoly</h3>
  <p>ASML's EUV lithography machines cost <strong>$350+ million each</strong>, weigh 180 tons, and are the most complex machines ever built. ASML is the world's <em>only</em> supplier of these machines — giving it extraordinary strategic importance.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "Which company is the sole supplier of EUV lithography machines?",
          options: [
            "ASML",
            "Applied Materials",
            "TSMC",
            "Intel",
          ],
          correctIndex: 0,
          explanation:
            "ASML (Netherlands) is the world's only manufacturer of EUV lithography machines, which are essential for producing the most advanced chips at 7nm and below.",
        },
        {
          question: "Which company licenses CPU architecture used in 99% of smartphones?",
          options: [
            "ARM",
            "Intel",
            "AMD",
            "Qualcomm",
          ],
          correctIndex: 0,
          explanation:
            "ARM designs and licenses the CPU architecture (Cortex cores) found in virtually all smartphones, as well as an increasing number of laptops and servers.",
        },
      ],
    },
    {
      id: "global-supply-chain",
      title: "The Global Supply Chain",
      subtitle: "Geography of chip-making, geopolitics, and government interventions",
      sections: [
        {
          id: "geographic-concentration",
          title: "Geographic Concentration",
          content: `
<h2>Geographic Concentration</h2>
<p>The semiconductor supply chain is remarkably concentrated geographically, creating both efficiency and vulnerability:</p>
<ul>
  <li><strong>Design:</strong> U.S. (Silicon Valley, Austin), Israel, UK — where the engineering talent concentrates</li>
  <li><strong>Leading-edge fabrication:</strong> Taiwan (TSMC), South Korea (Samsung) — 80%+ of advanced logic chips</li>
  <li><strong>Memory fabrication:</strong> South Korea (Samsung, SK Hynix), Japan (Kioxia/Western Digital)</li>
  <li><strong>Equipment:</strong> U.S. (Applied Materials, Lam, KLA), Netherlands (ASML), Japan (TEL, Advantest)</li>
  <li><strong>Materials:</strong> Japan (photoresists, gases), Germany (wafers — Siltronic), U.S. (specialty chemicals)</li>
  <li><strong>Assembly & test:</strong> China, Malaysia, Philippines, Vietnam — lower-cost regions</li>
</ul>
<div class="key-concept">
  <h3>Key Concept: Single Points of Failure</h3>
  <p>A natural disaster in Taiwan, an earthquake in Japan, or export restrictions from the Netherlands could disrupt the entire global electronics supply chain. This concentration risk drives government policies like the CHIPS Act.</p>
</div>`,
        },
        {
          id: "government-action",
          title: "Government Interventions",
          content: `
<h2>Government Interventions</h2>
<p>Semiconductors have become a <strong>national security priority</strong> worldwide. Major government actions include:</p>
<ul>
  <li><strong>U.S. CHIPS and Science Act (2022):</strong> $52B in subsidies for domestic fab construction, plus restrictions on selling advanced chips and equipment to China.</li>
  <li><strong>EU Chips Act (2023):</strong> €43B target to double EU's global share from 10% to 20% by 2030.</li>
  <li><strong>China's "Big Fund":</strong> Multiple rounds totaling $100B+ to build domestic capability, accelerated by U.S. export controls.</li>
  <li><strong>Japan:</strong> Subsidies for TSMC fab in Kumamoto and new Rapidus initiative for 2nm chips.</li>
  <li><strong>India:</strong> $10B+ incentive program to attract fab investment (Tata partnership with PSMC).</li>
</ul>
<p>The result is a massive global buildout of new fabs — the largest semiconductor investment wave in history.</p>`,
        },
      ],
      quiz: [
        {
          question: "What percentage of advanced logic chips are fabricated in Taiwan and South Korea combined?",
          options: [
            "80%+",
            "50%",
            "30%",
            "95%+",
          ],
          correctIndex: 0,
          explanation:
            "Taiwan (TSMC) and South Korea (Samsung) together produce over 80% of the world's advanced logic chips, creating significant geographic concentration risk.",
        },
        {
          question: "How much did the U.S. CHIPS Act allocate for domestic semiconductor manufacturing?",
          options: [
            "$52 billion",
            "$10 billion",
            "$100 billion",
            "$5 billion",
          ],
          correctIndex: 0,
          explanation:
            "The U.S. CHIPS and Science Act (2022) allocated $52 billion in subsidies to boost domestic chip manufacturing and reduce reliance on Asian production.",
        },
      ],
    },
    {
      id: "semiconductor-economics",
      title: "Semiconductor Economics",
      subtitle: "Cost structures, Moore's Law economics, and market dynamics",
      sections: [
        {
          id: "cost-structure",
          title: "The Cost Structure of a Chip",
          content: `
<h2>The Cost Structure of a Chip</h2>
<p>Understanding chip economics requires understanding where the money goes:</p>
<table>
  <thead>
    <tr><th>Cost Component</th><th>Percentage</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Wafer fabrication</td><td>30–40%</td><td>Equipment depreciation, materials, labor, utilities</td></tr>
    <tr><td>Design (R&D)</td><td>20–30%</td><td>Amortized over units sold; higher for low-volume chips</td></tr>
    <tr><td>Packaging & test</td><td>10–20%</td><td>Rising due to advanced packaging</td></tr>
    <tr><td>IP licensing</td><td>5–15%</td><td>ARM royalties, other licensed IP blocks</td></tr>
    <tr><td>Sales & marketing</td><td>5–10%</td><td>Distribution, customer support</td></tr>
  </tbody>
</table>
<div class="key-concept">
  <h3>Key Concept: The NRE Wall</h3>
  <p><strong>Non-Recurring Engineering (NRE)</strong> costs — the one-time design costs — have skyrocketed. Designing a chip at the 3nm node costs <strong>$500M–$1B+</strong>. This means only very high-volume chips (smartphones, GPUs) can justify leading-edge nodes.</p>
</div>`,
        },
        {
          id: "moores-law-economics",
          title: "Moore's Law Economics",
          content: `
<h2>Moore's Law Economics</h2>
<p><strong>Moore's Law</strong> (1965) observed that the number of transistors on a chip doubles roughly every two years. The economic consequence was that the <em>cost per transistor</em> dropped with each new generation — making electronics progressively cheaper.</p>
<p>However, this economic scaling has slowed:</p>
<ul>
  <li>Moving from 7nm to 5nm to 3nm provides fewer transistors-per-dollar improvements</li>
  <li>EUV lithography and multi-patterning dramatically increase fab costs</li>
  <li>Advanced packaging adds cost but enables new system architectures</li>
</ul>
<p>The industry response has been:</p>
<ul>
  <li><strong>Chiplets:</strong> Use older, cheaper nodes for less critical functions</li>
  <li><strong>Heterogeneous integration:</strong> Combine different technologies in one package</li>
  <li><strong>Domain-specific accelerators:</strong> Custom chips (like AI accelerators) that deliver more performance per transistor</li>
</ul>
<div class="analogy">
  <h3>Analogy: The Skyscraper Problem</h3>
  <p>Building a 10-story building costs less per floor than building a 100-story building. Similarly, each new semiconductor node delivers diminishing cost-per-transistor improvements while requiring exponentially more investment. The solution? Build several specialized medium-rise buildings (chiplets) instead of one mega-tower.</p>
</div>`,
        },
      ],
      quiz: [
        {
          question: "How much does it cost to design a chip at the 3nm node?",
          options: [
            "$500M–$1B+",
            "$1–10 million",
            "$50–100 million",
            "$10–50 billion",
          ],
          correctIndex: 0,
          explanation:
            "Non-Recurring Engineering (NRE) costs for a 3nm chip design are $500 million to over $1 billion, which is why only very high-volume products justify leading-edge nodes.",
        },
        {
          question: "What is Moore's Law?",
          options: [
            "Transistor count on a chip doubles roughly every two years",
            "Chip prices double every year",
            "The speed of light limits chip performance",
            "Every semiconductor company must double its revenue annually",
          ],
          correctIndex: 0,
          explanation:
            "Moore's Law, formulated by Intel co-founder Gordon Moore in 1965, observed that the number of transistors on integrated circuits doubles approximately every two years.",
        },
      ],
    },
  ],
};
