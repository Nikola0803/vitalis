import ShopCatalogue from "@/components/ShopCatalogue";
import { MapleMark } from "@/components/Icons";

export default function ShopPage() {
  return <main className="inner-page shop-page">
    <section className="page-hero shop-hero"><div><p className="eyebrow">Research catalogue</p><h1>Compounds with<br />the paperwork.</h1><p>Every listed material follows the same documentation-first standard, with Canadian support when you need it.</p></div><div className="hero-data-card"><MapleMark size={34} /><span>Catalogue standard</span><b>One vial. Clear batch identity.</b><small>For laboratory research use only</small></div></section>
    <section className="inner-section"><ShopCatalogue /></section>
  </main>;
}
