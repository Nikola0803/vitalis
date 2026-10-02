import { CheckIcon } from "@/components/Icons";

const resources = [
  { no: "01", title: "Reading a Certificate of Analysis", copy: "A field guide to identity, purity, methods, and batch references.", type: "Documentation" },
  { no: "02", title: "Research dilution fundamentals", copy: "Understand concentration math before opening the interactive planner.", type: "Laboratory basics" },
  { no: "03", title: "Cold-chain handling notes", copy: "A practical overview of receiving, recording, and storing research materials.", type: "Handling" },
  { no: "04", title: "Why batch identity matters", copy: "How traceable lots support repeatability and better research records.", type: "Quality systems" },
];

export default function ResourcesPage() {
  return <main className="inner-page">
    <section className="page-hero resources-hero"><div><p className="eyebrow">Research library</p><h1>Better records start<br />with better context.</h1><p>Practical explainers for evaluating documents, planning laboratory work, and keeping every batch traceable.</p></div><div className="resource-index-visual"><span>VITALIS / INDEX</span>{["DOCUMENT", "MEASURE", "RECORD", "VERIFY"].map((item, i) => <div key={item}><b>0{i + 1}</b><p>{item}</p><CheckIcon size={14} /></div>)}</div></section>
    <section className="inner-section"><div className="inner-heading"><div><small>Essential reading</small><h2>Start with the standard</h2></div><p>Short, operational resources—not generic wellness content.</p></div><div className="resource-grid">{resources.map((item) => <article key={item.no}><span>{item.no} / {item.type}</span><h2>{item.title}</h2><p>{item.copy}</p><div className="resource-status"><CheckIcon size={14} /> Practical reference</div></article>)}</div></section>
  </main>;
}
