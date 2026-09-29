import Image from "next/image";
import Link from "next/link";
import ProductExplorer from "@/components/ProductExplorer";
import { ArrowUpRight, CheckIcon, MapleMark, ResearchGlyph } from "@/components/Icons";

const categories = [
  { number: "01", title: "Cellular & Anti-Aging", copy: "Research materials organized around cellular pathways.", kind: "cellular" as const },
  { number: "02", title: "Tissue Repair", copy: "Compounds studied across repair and resilience protocols.", kind: "tissue" as const },
  { number: "03", title: "Neuro Health", copy: "A focused collection for neurological research.", kind: "neuro" as const },
  { number: "04", title: "Metabolic Health", copy: "Materials organized around metabolic research.", kind: "metabolic" as const },
];

const comparisonRows = [
  ["Canadian GMP manufactured", false, true],
  ["Canadian raw ingredients", false, true],
  ["Canadian-certified lab testing", false, true],
  ["Accessible original lab results", false, true],
  ["Third-party purity testing", false, true],
  ["Payment methods", "Limited", "Credit card & e-transfer"],
  ["Live support", "Often unavailable", "Canadian email support"],
  ["Shipping speed", "7–14 days", "1–3 business days"],
] as const;

const tickerItems = [
  { image: "/images/ticker/third-party-testing.png", title: "Third-party", copy: "tested" },
  { image: "/images/ticker/batch-documentation.png", title: "Batch-level", copy: "documentation" },
  { image: "/images/ticker/canadian-support.png", title: "Canadian", copy: "support" },
  { image: "/images/ticker/discreet-fulfilment.png", title: "Discreet", copy: "fulfilment" },
  { image: "/images/ticker/coa-quality.png", title: "COA-backed", copy: "quality" },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Canadian research supply, refined.</p>
          <h1>Precision compounds.<br /><em>Canadian standard.</em></h1>
          <p className="hero-lede">A cleaner approach to research materials—documented batches, third-party testing, and dependable Canadian fulfilment.</p>
          <div className="hero-actions"><Link className="button button-light" href="/shop">Explore catalogue <ArrowUpRight /></Link><a className="text-link" href="#quality">See our standard <span>↘</span></a></div>
          <div className="hero-proof"><div><CheckIcon size={15} /><span>99%+ tested purity</span></div><div><CheckIcon size={15} /><span>Batch-level COAs</span></div><div><CheckIcon size={15} /><span>Research use only</span></div></div>
        </div>
        <div className="hero-visual" aria-label="Vitalis blank specimen vial">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="visual-note note-top"><span>01</span> Universal specimen</div>
          <Image priority src="/images/vitalis-blank-vial.png" alt="Blank specimen vial with teal cap" width={1024} height={1536} className="hero-vial" />
          <div className="visual-note note-bottom"><span className="status-light" /> Batch identity verified</div>
          <p className="visual-caption">THE VITALIS STANDARD / 2026</p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Vitalis quality commitments">
        <div className="trust-track">
          {[0, 1].map((group) => <div className="trust-group" key={group} aria-hidden={group === 1 ? "true" : undefined}>
            {tickerItems.map((item) => <p key={item.title}>
              <Image src={item.image} alt="" width={96} height={96} />
              <span><b>{item.title}</b> {item.copy}</span>
            </p>)}
          </div>)}
        </div>
      </section>
      <section className="categories section" id="categories">
        <div className="section-kicker"><span>Explore by focus</span><span>Four research areas</span></div>
        <div className="category-intro"><h2>Built for curious<br />minds, not clutter.</h2><p>Find the right research materials by focus, with consistent documentation across every category.</p></div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a className={`category-card category-${index + 1}`} href="#catalogue" key={category.title}>
              <span className="category-number">{category.number}</span>
              <div className="research-glyph"><ResearchGlyph kind={category.kind} /></div>
              <div><h3>{category.title}</h3><p>{category.copy}</p></div><ArrowUpRight />
            </a>
          ))}
        </div>
      </section>

      <ProductExplorer />

      <section className="collections section">
        <div className="section-kicker"><span>Collections</span><span>Browse by format</span></div>
        <div className="collection-grid">
          <Link href="/shop" className="collection-card blend-collection"><span>01</span><div><small>Paired research</small><h3>Blended<br />Compounds</h3></div><ArrowUpRight /></Link>
          <Link href="/shop" className="collection-card full-collection"><span>02</span><div><small>Complete index</small><h3>Full Peptide<br />Collection</h3></div><ArrowUpRight /></Link>
          <Link href="/shop" className="collection-card popular-collection"><span>03</span><div><small>Frequently requested</small><h3>Popular<br />Materials</h3></div><ArrowUpRight /></Link>
          <Link href="/resources" className="collection-card supply-collection"><span>04</span><div><small>Laboratory handling</small><h3>Research<br />Supplies</h3></div><ArrowUpRight /></Link>
        </div>
      </section>

      <section className="quality section" id="quality">
        <div className="quality-copy"><p className="eyebrow">The Vitalis standard</p><h2>Proof belongs<br />with the product.</h2><p>Every listed compound is paired with batch-level documentation. No scavenger hunts, no vague assurances—just the information your research deserves.</p><a className="button button-dark" href="#catalogue">Browse certificates <ArrowUpRight /></a></div>
        <div className="quality-card">
          <div className="document-top"><span>VITALIS / COA</span><span>CA—26—0418</span></div>
          <div className="document-title"><MapleMark size={38} /><div><span>Certificate of analysis</span><strong>Batch verification</strong></div></div>
          <div className="document-grid"><div><small>Identity</small><strong>Confirmed</strong></div><div><small>Purity</small><strong>99.4%</strong></div><div><small>Method</small><strong>HPLC / MS</strong></div><div><small>Status</small><strong className="verified"><CheckIcon size={16} /> Verified</strong></div></div>
          <div className="chromatogram" aria-hidden="true"><svg viewBox="0 0 520 130" preserveAspectRatio="none"><path d="M0 112h65l12-3 10-78 13 81h57l7-12 7 12h56l9-25 11 25h62l6-6 8 6h187" fill="none" stroke="currentColor" strokeWidth="2" /></svg></div>
          <div className="document-foot"><span>Third-party laboratory</span><span>VIEW ORIGINAL ↗</span></div>
        </div>
      </section>

      <section className="comparison section" id="about">
        <div className="comparison-heading"><p className="eyebrow dark">Why Vitalis</p><h2>Clarity is a<br />competitive edge.</h2><p>See how a documentation-first Canadian standard compares with the typical research-materials experience.</p></div>
        <div className="comparison-table">
          <div className="table-head"><span>What matters</span><span>Most suppliers</span><strong>Vitalis</strong></div>
          {comparisonRows.map((row) => <div className="table-row" key={row[0]}><span>{row[0]}</span><span>{typeof row[1] === "boolean" ? <i className="compare-no">×</i> : row[1]}</span><strong>{typeof row[2] === "boolean" ? <i className="compare-yes"><CheckIcon size={17} /></i> : row[2]}</strong></div>)}
        </div>
      </section>

      <section className="final-cta section"><div><p className="eyebrow">For research use only</p><h2>Ready to research?</h2><p className="cta-copy">Explore independently tested research compounds with batch-level transparency.</p><Link className="button button-light" href="/shop">Explore materials <ArrowUpRight /></Link></div><Image src="/images/vitalis-blank-vial.png" alt="Blank Vitalis vial" width={1024} height={1536} className="cta-vial" /></section>

    </main>
  );
}
