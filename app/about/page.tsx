import { CheckIcon, MapleMark } from "@/components/Icons";

const steps = [
  ["01", "Source", "Qualified inputs and documented receiving records."],
  ["02", "Verify", "Independent identity and purity testing by batch."],
  ["03", "Document", "Clear lot codes connect each specimen to its report."],
  ["04", "Support", "Canadian help for orders, paperwork, and logistics."],
];

export default function AboutPage() {
  return <main className="inner-page">
    <section className="page-hero about-hero"><div><p className="eyebrow">Built in Canada</p><h1>Scientific supply<br />without the fog.</h1><p>Vitalis exists to make research purchasing easier to audit: one visual system, one documentation standard, and clear support from a Canadian team.</p></div><div className="canada-seal"><MapleMark size={86} /><span>CANADIAN OPERATED</span><b>Vitalis</b><small>DOCUMENTATION · QUALITY · SUPPORT</small></div></section>
    <section className="inner-section"><div className="inner-heading"><div><small>Our operating standard</small><h2>Four steps. No theatre.</h2></div><p>Every visual here explains a real checkpoint in the way materials move through the system.</p></div><div className="process-line">{steps.map(([no,title,copy]) => <article key={no}><span>{no}</span><i><CheckIcon size={17} /></i><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="about-values" id="contact"><div><small>What we optimize for</small><h2>Clarity at every handoff.</h2></div><div><p>We do not use packaging or design to imply clinical outcomes. Vitalis materials are presented for qualified laboratory research, supported by batch documents and practical service.</p><a href="mailto:support@vitalis.example">support@vitalis.example</a></div></section>
  </main>;
}
