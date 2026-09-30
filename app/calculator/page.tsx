import DilutionCalculator from "@/components/DilutionCalculator";

const tips = [
  ["01", "Record before mixing", "Log the vial lot, starting mass, solvent volume, date, and operator before beginning."],
  ["02", "Add solvent slowly", "Introduce laboratory-grade diluent gently against the vial wall to limit foaming."],
  ["03", "Swirl, never shake", "Use slow circular movement and allow the material time to dissolve completely."],
  ["04", "Label the working vial", "Record the final concentration and preparation date directly in your research log."],
];

export default function CalculatorPage() {
  return <main className="inner-page calculator-page">
    <section className="page-hero calculator-hero">
      <div className="calculator-hero-copy"><p className="eyebrow">Laboratory utility</p><h1>Peptide<br />Calculator</h1><p>Enter the vial values, calculate concentration, and verify the resulting draw against a graduated syringe.</p><div className="calculator-hero-proof"><span>01 · Enter</span><span>02 · Calculate</span><span>03 · Verify</span></div></div>
      <div className="calculator-hero-visual" aria-label="Concentration calculation and syringe measurement preview">
        <div className="calc-hero-reading"><small>Calculated concentration</small><strong>2.50 <span>mg/mL</span></strong></div>
        <svg viewBox="0 0 720 210" role="img" aria-label="Syringe filled to ten international units">
          <defs><linearGradient id="heroSyringeFill" x1="0" x2="1"><stop offset="0" stopColor="#dff1ea"/><stop offset="1" stopColor="#63A693"/></linearGradient></defs>
          <path d="M48 90H18L5 100l13 10h30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect x="54" y="62" width="570" height="76" rx="8" fill="rgba(255,255,255,.9)" stroke="currentColor" strokeWidth="3"/>
          <rect x="57" y="65" width="57" height="70" rx="5" fill="url(#heroSyringeFill)"/>
          <rect x="42" y="77" width="16" height="46" rx="4" fill="#eef4f1" stroke="currentColor" strokeWidth="2"/>
          <rect x="624" y="54" width="18" height="92" rx="4" fill="#eef4f1" stroke="currentColor" strokeWidth="2"/>
          <path d="M642 83h42v34h-42" fill="rgba(255,255,255,.72)" stroke="currentColor" strokeWidth="2"/><rect x="684" y="76" width="22" height="48" rx="4" fill="#dce8e3"/>
          {Array.from({length:21},(_,index)=><line key={index} x1={54+index*28.5} y1="138" x2={54+index*28.5} y2={index%5===0?92:108} stroke="currentColor" strokeWidth={index%5===0?2.5:1}/>) }
          <line x1="111" y1="42" x2="111" y2="139" stroke="#173f3a" strokeWidth="3" strokeDasharray="5 5"/><path d="M104 44h14l-7 10Z" fill="#173f3a"/>
          <text x="111" y="28" textAnchor="middle">10 IU</text><text x="339" y="180" textAnchor="middle">1 mL · 100 IU graduated syringe</text>
        </svg>
        <div className="calc-hero-equation"><span>Dose ÷ concentration</span><b>0.25 mg ÷ 2.50</b><strong>0.100 mL</strong></div>
      </div>
    </section>
    <section className="calculator-original-wrap"><DilutionCalculator /></section>
    <section className="calc-tips"><div className="inner-heading"><div><small>Research handling</small><h2>Reconstitution notes</h2></div><p>Concise handling reminders designed for repeatable laboratory records.</p></div><div>{tips.map(([no,title,copy]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <div className="calculator-disclaimer"><b>Research and educational use only.</b> This calculator performs mathematical conversions and is not medical advice. Verify calculations independently and follow your institution’s laboratory SOP.</div>
  </main>;
}
