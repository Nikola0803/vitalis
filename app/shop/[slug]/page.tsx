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
};

export function generateStaticParams() { return catalogue.map((item) => ({ slug: item.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = catalogue.find((item) => item.slug === slug);
  if (!product) notFound();
  const sizes = product.size.split("/").map((item) => item.trim());
  const batch = `VTL-${product.slug.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase()}-2604`;
  const related = catalogue.filter((item) => item.slug !== product.slug).slice(0, 4);
  const research = researchByFocus[product.focus] ?? researchByFocus.Cellular;

  return <main className="pdp-page">
    <div className="pdp-breadcrumb"><Link href="/shop">All compounds</Link><span>/</span><b>{product.name}</b></div>
    <section className="pdp-top">
      <div className="pdp-gallery">
        <div className="pdp-gallery-meta"><span>VITALIS SPECIMEN</span><span>{product.focus.toUpperCase()} / {sizes[0].toUpperCase()}</span></div>
        <div className="pdp-orbit" />
        <Image priority src="/images/vitalis-blank-vial.png" alt={`Blank specimen vial representing ${product.name}`} width={1024} height={1536} />
        <div className="pdp-image-foot"><span><CheckIcon size={14}/> Same universal vial standard</span><span>Image for presentation</span></div>
      </div>
      <div className="pdp-summary">
        <div className="verified-label"><CheckIcon size={15}/> Third-party tested</div>
        <h1>{product.name}</h1>
        <div className="pdp-price"><strong>${product.price.toFixed(2)} CAD</strong><span>Purity {product.purity}</span></div>
        <div className="batch-line"><span>Current batch</span><b>#{batch}</b><Link href="/coas">View COA ↗</Link></div>
        <ProductPurchase sizes={sizes} />
        <details className="trust-disclosure"><summary>Why trust this product?<span>+</span></summary><div><p>Batch-specific identity and purity documentation is available before purchase.</p><p>Canadian support can connect the physical lot to its analytical record.</p></div></details>
        <p className="pdp-description">{product.name} is supplied as a high-purity lyophilized research compound with consistent presentation, traceable batch identity, and supporting analytical documentation.</p>
        <strong className="pdp-ruo">For laboratory research use only.</strong>
      </div>
    </section>

    <section className="pdp-coa">
      <div className="pdp-coa-copy"><p className="eyebrow">Certificate of analysis</p><h2>Batch verification,<br />attached to the lot.</h2><p>The current batch is documented for identity, purity, appearance, and analytical method.</p><div className="pdp-trust-grid"><span><FlaskIcon/><b>Third-party tested</b><small>Independent analytical review</small></span><span><DocumentIcon/><b>Batch-specific COA</b><small>Traceable report record</small></span><span><MapleMark/><b>Canadian support</b><small>Help locating documents</small></span><span><PackageIcon/><b>Controlled format</b><small>Lyophilized presentation</small></span></div></div>
      <div className="pdp-report"><header><span>VITALIS / ANALYTICAL REPORT</span><b>#{batch}</b></header><div className="report-title"><MapleMark size={34}/><div><small>Peptide name</small><strong>{product.name}</strong></div><em>Complete</em></div><div className="report-grid"><div><small>Method</small><b>HPLC / MS</b></div><div><small>Purity</small><b>{product.purity}</b></div><div><small>Appearance</small><b>White lyophilized powder</b></div><div><small>Status</small><b className="report-verified"><CheckIcon size={14}/> Verified</b></div></div><svg viewBox="0 0 520 120" preserveAspectRatio="none"><path d="M0 102h70l10-3 12-76 13 79h58l8-11 8 11h65l8-28 10 28h70l7-7 8 7h163" fill="none" stroke="currentColor" strokeWidth="2" /></svg><footer><span>Report overview</span><Link href="/coas">Open certificate library ↗</Link></footer></div>
    </section>

    <section className="pdp-details">
      <div><p className="eyebrow dark">Research profile</p><h2>Researched for…</h2><p>{product.name} is used in preclinical and experimental settings investigating:</p><ul>{research.map((item) => <li key={item}><CheckIcon size={15}/>{item}</li>)}</ul></div>
      <div className="technical-card"><span>Technical classification</span><dl><div><dt>Material class</dt><dd>Research peptide</dd></div><div><dt>Source</dt><dd>Synthetic · laboratory produced</dd></div><div><dt>Physical form</dt><dd>Lyophilized powder</dd></div><div><dt>Purity</dt><dd>{product.purity} HPLC</dd></div><div><dt>Batch</dt><dd>{batch}</dd></div></dl></div>
    </section>

    <section className="handling-section"><div className="inner-heading"><div><small>Handling & storage</small><h2>Protect the material.<br/>Protect the record.</h2></div><p>Follow the product documentation and your laboratory’s approved standard operating procedures.</p></div><div className="handling-grid"><article><span>01</span><h3>Store cold</h3><p>Store lyophilized material at 2–8°C and protect it from direct light.</p></article><article><span>02</span><h3>Record the lot</h3><p>Keep the batch code attached to every derivative sample and working record.</p></article><article><span>03</span><h3>Use approved technique</h3><p>Prepare only within qualified laboratory protocols using suitable materials.</p></article></div></section>

    <section className="pdp-related"><div className="inner-heading"><div><small>Continue exploring</small><h2>Complementary products</h2></div><Link href="/shop">View full catalogue <ArrowUpRight size={16}/></Link></div><div className="related-grid">{related.map((item) => <Link href={`/shop/${item.slug}`} key={item.slug}><div><Image src="/images/vitalis-blank-vial.png" alt="" width={1024} height={1536}/></div><small>{item.focus}</small><h3>{item.name}</h3><span>${item.price.toFixed(2)} CAD</span></Link>)}</div></section>
  </main>;
}
