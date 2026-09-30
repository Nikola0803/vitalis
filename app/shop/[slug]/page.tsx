import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckIcon, DocumentIcon, FlaskIcon, MapleMark, PackageIcon } from "@/components/Icons";
import ProductPurchase from "@/components/ProductPurchase";
import { catalogue } from "@/lib/catalog";

const researchByFocus: Record<string, string[]> = {
  Recovery: ["Tissue-repair signalling pathways", "Cellular migration and matrix interaction", "Inflammatory signalling models", "Structural recovery research"],
  Metabolic: ["Metabolic signalling pathways", "Energy-balance research models", "Glucose-response mechanisms", "Cellular nutrient sensing"],
  Cellular: ["Mitochondrial signalling models", "Cellular energy pathways", "Oxidative-stress research", "Adaptive response mechanisms"],
  Longevity: ["Cellular ageing pathways", "Extracellular matrix research", "Copper-peptide signalling", "Regenerative cell models"],
  Blends: ["Multi-pathway research models", "Compound interaction studies", "Recovery signalling", "Protocol standardization"],
  Neuro: ["Neural signalling pathways", "Neuropeptide response models", "Stress-response mechanisms", "Neuroendocrine signalling"],
};

const categories = [
  ["Blended compounds", "Paired research formats", "blends"],
  ["Cellular & anti-aging", "Cellular pathway materials", "cellular"],
  ["Tissue repair", "Recovery-focused research", "recovery"],
  ["Neuro health", "Neurological research", "neuro"],
  ["Metabolic health", "Metabolic pathway materials", "metabolic"],
] as const;

export function generateStaticParams() { return catalogue.map((item) => ({ slug: item.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = catalogue.find((item) => item.slug === slug);
  if (!product) notFound();
  const sizes = product.size.split("/").map((item) => item.trim());
  const externalReportId = product.coaUrl?.split("/").filter(Boolean).at(-1);
  const hasReport = Boolean(product.coa || product.coaUrl);
  const batch = product.coa?.lot ?? externalReportId ?? product.variants[0].sku;
  const reportHref = product.coaUrl ?? (product.coa ? `/coas/${encodeURIComponent(product.coa.file)}` : "/coas");
  const related = [...catalogue.filter((item) => item.slug !== product.slug && item.focus === product.focus), ...catalogue.filter((item) => item.slug !== product.slug && item.focus !== product.focus)].slice(0, 4);
  const research = researchByFocus[product.focus] ?? researchByFocus.Cellular;

  return <main className="pdp-page">
    <div className="pdp-breadcrumb"><Link href="/shop">All compounds</Link><span>/</span><b>{product.name}</b></div>
    <section className="pdp-top">
      <div className="pdp-gallery">
        <div className="pdp-gallery-meta"><span>VITALIS SPECIMEN</span><span>{product.focus.toUpperCase()} / {sizes[0].toUpperCase()}</span></div>
        <div className="pdp-orbit" />
        <Image priority src={product.image} alt={`${product.name} Vitalis vial and carton`} width={1254} height={1254} />
        <div className="pdp-image-foot"><span><CheckIcon size={14}/> Same universal vial standard</span><span>Image for presentation</span></div>
      </div>
      <div className="pdp-summary">
        <div className="verified-label"><CheckIcon size={15}/> {hasReport ? "Third-party report available" : "Documentation pending"}</div>
        <h1>{product.name}</h1>
        <div className="pdp-price"><strong>${product.price.toFixed(2)} CAD</strong><span>{product.coa ? `Purity ${product.purity}` : product.coaUrl ? "Verified report available" : "Report pending"}</span></div>
        <div className="batch-line"><span>{hasReport ? "Current report" : "Product code"}</span><b>#{batch}</b><a href={reportHref} target={hasReport ? "_blank" : undefined} rel={hasReport ? "noreferrer" : undefined}>{hasReport ? "Verify COA ↗" : "COA library ↗"}</a></div>
        <ProductPurchase sizes={sizes} />
        <details className="trust-disclosure"><summary>Why trust this product?<span>+</span></summary><div><p>Batch-specific identity and purity documentation is available before purchase.</p><p>Canadian support can connect the physical lot to its analytical record.</p></div></details>
        <p className="pdp-description">{product.name} is supplied as a high-purity lyophilized research compound with consistent presentation, traceable batch identity, and supporting analytical documentation.</p>
        <strong className="pdp-ruo">For laboratory research use only.</strong>
      </div>
    </section>

    <section className="pdp-verification">
      <div className="pdp-section-intro"><p>Certificate of analysis</p><h2>Batch verification, made visible.</h2><span>{hasReport ? "Independent analytical documentation is connected to this product record." : "The certificate will be connected here when its report is published."}</span></div>
      <div className="pdp-verification-grid">
        <div className="pdp-proof-list">
          <article><FlaskIcon/><div><b>Third-party laboratory</b><span>Independent analytical review</span></div></article>
          <article><DocumentIcon/><div><b>{hasReport ? "Batch-specific certificate" : "Certificate pending"}</b><span>{hasReport ? batch : "No supplied report is currently attached"}</span></div></article>
          <article><PackageIcon/><div><b>Controlled presentation</b><span>Lyophilized research material</span></div></article>
          <article><MapleMark/><div><b>Canadian support</b><span>Help locating product documentation</span></div></article>
        </div>
        <div className="pdp-report-sheet">
          <header><span>VITALIS / REPORT OVERVIEW</span><b>{hasReport ? "COMPLETE" : "PENDING"}</b></header>
          <h3>{product.name}</h3>
          <dl><div><dt>Report / lot</dt><dd>{batch}</dd></div><div><dt>Method</dt><dd>{product.coa?.method ?? "Pending"}</dd></div><div><dt>Purity</dt><dd>{product.coa?.purity ?? "Pending"}</dd></div><div><dt>Analyzed</dt><dd>{product.coa?.date ?? "Pending"}</dd></div></dl>
          <div className="pdp-report-line"><span /><span /><span /><span /><span /></div>
          {hasReport ? <a href={reportHref} target="_blank" rel="noreferrer">{product.coaUrl ? "Verify certificate at Testides" : "Open original lab report"} <ArrowUpRight size={15}/></a> : <Link href="/coas">Browse published reports <ArrowUpRight size={15}/></Link>}
        </div>
      </div>
    </section>

    <section className="pdp-research-band">
      <div className="pdp-research-copy"><p>Research profile</p><h2>Researched for…</h2><span>{product.name} is used in preclinical and experimental settings investigating:</span><ul>{research.map((item) => <li key={item}><CheckIcon size={15}/>{item}</li>)}</ul><small>Research applications focus on mechanistic exploration and biological pathway analysis, not therapeutic use.</small></div>
      <div className="pdp-research-visual" aria-label={`${product.name} laboratory presentation`}><span className="science-orbit orbit-one"/><span className="science-orbit orbit-two"/><Image src={product.image} alt={`${product.name} Vitalis vial and carton`} width={1254} height={1254}/><b>LAB / 01</b></div>
    </section>

    <section className="pdp-spec-band">
      <div className="pdp-spec-columns">
        <div><p>Technical classification</p><dl><div><dt>Material class</dt><dd>Research peptide</dd></div><div><dt>Source</dt><dd>Synthetic · laboratory produced</dd></div><div><dt>Physical form</dt><dd>Lyophilized powder</dd></div><div><dt>Available formats</dt><dd>{product.size}</dd></div><div><dt>Product code</dt><dd>{product.variants[0].sku}</dd></div></dl></div>
        <div><p>Handling & storage</p><dl><div><dt>Storage conditions</dt><dd>2–8°C, protected from light</dd></div><div><dt>Recordkeeping</dt><dd>Keep lot identity attached</dd></div><div><dt>Preparation</dt><dd>Qualified laboratory protocols</dd></div><div><dt>Documentation</dt><dd>{hasReport ? "Report available" : "Report pending"}</dd></div></dl></div>
      </div>
      <div className="pdp-proof-cards"><article><PackageIcon/><b>Cold storage</b><span>2–8°C and protected from light</span></article><article><FlaskIcon/><b>{product.coa ? `${product.purity} reported purity` : product.coaUrl ? "Verified Testides record" : "Report pending"}</b><span>{hasReport ? "Independent analytical documentation" : "No purity value shown without a report"}</span></article><article><DocumentIcon/><b>Lyophilized format</b><span>Consistent research presentation</span></article></div>
    </section>

    <section className="pdp-compare">
      <div className="pdp-section-intro light"><p>The Vitalis standard</p><h2>Why choose documented research materials?</h2><span>A cleaner comparison built around the details researchers can actually verify.</span></div>
      <div className="pdp-compare-table"><div className="compare-head"><span>What matters</span><span>Typical listing</span><span>Vitalis</span></div>{[["Batch-linked record","Often unclear","Connected by lot"],["Original lab report","May be unavailable",hasReport ? "Available" : "Pending"],["Purity claims","Marketing-led","Report-led"],["Product identification","Inconsistent","SKU + lot record"],["Support path","Varies","Canadian support"]].map((row) => <div className="compare-line" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><strong><CheckIcon size={14}/>{row[2]}</strong></div>)}</div>
    </section>

    <section className="pdp-related"><div className="inner-heading"><div><small>Continue exploring</small><h2>Complementary products</h2></div><Link href="/shop">View full catalogue <ArrowUpRight size={16}/></Link></div><div className="related-grid">{related.map((item) => <Link href={`/shop/${item.slug}`} key={item.slug}><div><Image src={item.image} alt={`${item.name} Vitalis vial and carton`} width={1254} height={1254}/></div><small>{item.focus}</small><h3>{item.name}</h3><span>${item.price.toFixed(2)} CAD</span></Link>)}</div></section>
    <section className="pdp-categories"><div className="inner-heading"><div><small>Explore the catalogue</small><h2>Shop by research focus</h2></div></div><div>{categories.map(([title, label, focus]) => <Link href={`/shop?q=${focus}`} key={title}><span>{label}</span><h3>{title}</h3><ArrowUpRight size={16}/></Link>)}</div></section>
  </main>;
}
