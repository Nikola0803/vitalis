import ShopCatalogue from "@/components/ShopCatalogue";
import Image from "next/image";

export default function ShopPage() {
  return <main className="inner-page shop-page">
    <section className="page-hero shop-hero"><div><p className="eyebrow">Research catalogue</p><h1>Compounds with<br />the paperwork.</h1><p>Every listed material follows the same documentation-first standard, with Canadian support when you need it.</p></div><div className="shop-hero-product"><Image priority src="/images/products/retatrutide.png" alt="Retatrutide Vitalis vial and carton" width={1254} height={1254}/><span>28 MATERIALS · 23 PUBLISHED REPORTS</span></div></section>
    <section className="inner-section"><ShopCatalogue /></section>
  </main>;
}
