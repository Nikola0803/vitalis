import { CheckIcon, MapleMark, SearchIcon } from "@/components/Icons";
import { coaRows } from "@/lib/catalog";

export default function CoasPage() {
  return <main className="inner-page">
    <section className="page-hero coa-hero"><div><p className="eyebrow">Batch transparency</p><h1>Trace the lot.<br />Read the proof.</h1><p>Find identity and purity documentation using the batch code printed on your specimen packaging.</p><label className="coa-search"><SearchIcon /><input placeholder="Enter batch code — e.g. VTL-260418" /><button>Find report</button></label></div><div className="coa-graph-card"><div><MapleMark size={28} /><span>ANALYTICAL PROFILE</span><b>VTL-260418</b></div><svg viewBox="0 0 560 210" preserveAspectRatio="none" aria-label="Example chromatogram"><path d="M0 184h72l10-3 12-145 14 148h86l7-18 8 18h68l9-50 11 50h76l8-9 9 9h170" fill="none" stroke="currentColor" strokeWidth="3" /></svg><footer><span>0 min</span><span>Retention time</span><span>12 min</span></footer></div></section>
    <section className="inner-section"><div className="inner-heading"><div><small>Certificate library</small><h2>Recent verified batches</h2></div><p>Each record connects a physical lot to its independent analytical report.</p></div><div className="coa-table"><div className="coa-table-head"><span>Batch</span><span>Material</span><span>Method</span><span>Purity</span><span>Test date</span><span>Status</span></div>{coaRows.map((row) => <div className="coa-row" key={row.lot}><b>{row.lot}</b><span>{row.product}</span><span>{row.method}</span><span>{row.purity}</span><span>{row.date}</span><strong><CheckIcon size={14} /> Verified</strong></div>)}</div></section>
  </main>;
}
