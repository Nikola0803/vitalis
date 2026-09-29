import DilutionCalculator from "@/components/DilutionCalculator";

const tips = [
  ["01", "Record before mixing", "Log the vial lot, starting mass, solvent volume, date, and operator before beginning."],
  ["02", "Add solvent slowly", "Introduce laboratory-grade diluent gently against the vial wall to limit foaming."],
  ["03", "Swirl, never shake", "Use slow circular movement and allow the material time to dissolve completely."],
  ["04", "Label the working vial", "Record the final concentration and preparation date directly in your research log."],
];

export default function CalculatorPage() {
  return <main className="inner-page calculator-page">
    <section className="calculator-intro"><p className="eyebrow dark">Laboratory utility</p><h1>Peptide Calculator</h1><p>For research purposes only. Enter the original vial values and use the syringe visualization to verify the calculated draw position.</p></section>
    <section className="calculator-original-wrap"><DilutionCalculator /></section>
    <section className="calc-tips"><div className="inner-heading"><div><small>Research handling</small><h2>Reconstitution notes</h2></div><p>Concise handling reminders designed for repeatable laboratory records.</p></div><div>{tips.map(([no,title,copy]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <div className="calculator-disclaimer"><b>Research and educational use only.</b> This calculator performs mathematical conversions and is not medical advice. Verify calculations independently and follow your institution’s laboratory SOP.</div>
  </main>;
}
