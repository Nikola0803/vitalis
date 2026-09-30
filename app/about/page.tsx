import Link from "next/link";
import { ArrowUpRight, CheckIcon, DocumentIcon, FlaskIcon, MapleMark, PackageIcon } from "@/components/Icons";

const steps = [
  ["01", "Source", "Qualify the material and create a documented receiving record."],
  ["02", "Verify", "Connect independent analytical results to the applicable product lot."],
  ["03", "Document", "Keep identity, method, and report details accessible in one place."],
  ["04", "Support", "Provide a clear Canadian path for order and documentation questions."],
];

const principles = [
  ["Records over rhetoric", "We would rather show the report, lot, and method than ask researchers to rely on a broad quality claim.", DocumentIcon],
  ["Consistency by design", "One product system keeps presentation, identification, and supporting information familiar across the catalogue.", PackageIcon],
  ["Research boundaries", "Products are presented for laboratory and analytical research without implying clinical outcomes or personal use.", FlaskIcon],
] as const;

export default function AboutPage() {
  return <main className="about-page">
    <section className="about-premium-hero">
      <div className="about-hero-copy"><p className="eyebrow">Built for Canadian research</p><h1>Less noise.<br/><em>More evidence.</em></h1><p>Vitalis brings research materials, batch documentation, and Canadian support into one clear system—so the record is as considered as the product.</p><div><Link className="button button-light" href="/shop">Explore the catalogue <ArrowUpRight size={16}/></Link><Link href="/coas">Browse reports ↗</Link></div></div>
      <div className="about-hero-system" aria-label="Vitalis documentation system"><span className="about-hero-index">VITALIS / STANDARD 01</span><div className="about-record-card"><header><MapleMark size={30}/><span>CANADIAN OPERATED</span></header><strong>One standard.<br/>Every handoff.</strong><dl><div><dt>Material</dt><dd>Identified</dd></div><div><dt>Record</dt><dd>Connected</dd></div><div><dt>Support</dt><dd>Canadian</dd></div></dl></div><div className="about-floating-note"><CheckIcon size={15}/><span><b>Documentation first</b><small>Designed into the experience</small></span></div></div>
    </section>

    <section className="about-intro"><div><p>Why Vitalis</p><h2>Research supply should be easier to understand.</h2></div><div><p>Too much of this category asks the buyer to work backwards—finding a product first, then chasing the evidence later. Vitalis is being built around the opposite idea: present the material and its documentation as one connected record.</p><div className="about-stats"><span><b>28</b><small>Research materials</small></span><span><b>23</b><small>Published reports</small></span><span><b>01</b><small>Consistent standard</small></span></div></div></section>

    <section className="about-process" id="quality"><div className="about-process-head"><div><p>Our operating standard</p><h2>From source<br/>to record.</h2></div><p>Four connected checkpoints keep product identity and supporting information from becoming separate experiences.</p></div><div className="about-process-grid">{steps.map(([no,title,copy]) => <article key={no}><span>{no}</span><i><CheckIcon size={15}/></i><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="about-principles"><div className="about-principles-head"><p>What guides the work</p><h2>Clarity at every handoff.</h2><span>Premium does not mean ornamental. Here, it means the important information is visible, consistent, and easy to verify.</span></div><div className="about-principle-grid">{principles.map(([title,copy,Icon], index) => <article key={title}><div><span>0{index + 1}</span><Icon size={25}/></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="about-canada" id="contact"><div className="about-canada-mark"><MapleMark size={48}/><span>CANADIAN SUPPORT</span></div><div><p>Questions should have a clear destination.</p><h2>Talk to the team behind the record.</h2></div><div><p>For order, product, or documentation questions, contact Vitalis directly. We keep the path short and the answer connected to the relevant product record.</p><a href="mailto:support@vitalisbiosciences.ca">support@vitalisbiosciences.ca <ArrowUpRight size={15}/></a></div></section>

    <section className="about-policies" aria-label="Policies"><div className="about-policies-head"><p>Research responsibility</p><h2>The important boundaries,<br/>plainly stated.</h2></div><div className="about-policy-list"><article id="research-use"><span>01</span><div><h3>Research use only</h3><p>Vitalis materials are offered strictly for laboratory and analytical research. They are not medicines, foods, cosmetics, or products for human or veterinary use.</p></div></article><article id="privacy"><span>02</span><div><h3>Privacy</h3><p>Order and contact information is used to provide service, fulfil requests, and maintain required business records. It is not sold as a marketing list.</p></div></article><article id="terms"><span>03</span><div><h3>Purchaser responsibility</h3><p>Purchasers are responsible for lawful handling, qualified use, and compliance with institutional and local requirements.</p></div></article></div></section>
  </main>;
}
