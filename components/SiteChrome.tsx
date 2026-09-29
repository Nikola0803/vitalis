import Link from "next/link";
import { BagIcon, SearchIcon } from "./Icons";

export function SiteHeader() {
  return (
    <>
      <div className="announcement">
        <p>Proudly Canadian</p>
        <p className="announcement-center">Independent batch testing · Clear documentation</p>
        <p>All prices in CAD</p>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Vitalis home"><b>Vitalis</b></Link>
        <nav aria-label="Primary navigation"><Link href="/shop">Shop</Link><Link href="/calculator">Calculator</Link><Link href="/coas">COAs</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></nav>
        <div className="header-actions"><button aria-label="Search"><SearchIcon /></button><Link className="header-shop" href="/shop"><BagIcon size={16} /> Shop all</Link></div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand"><div className="brand light"><b>Vitalis</b></div><p>Canadian research materials,<br />documented with care.</p></div>
      <div className="footer-links"><div><b>Explore</b><Link href="/shop">Catalogue</Link><Link href="/calculator">Calculator</Link><Link href="/coas">Certificates</Link></div><div><b>Learn</b><Link href="/resources">Resources</Link><Link href="/about">Our standard</Link><Link href="/about#contact">Contact</Link></div><div><b>Legal</b><Link href="/resources">Research use only</Link><Link href="/about">Privacy</Link><Link href="/about">Terms</Link></div></div>
      <div className="footer-bottom"><span>© 2026 Vitalis</span><span>Designed for Canada</span></div>
    </footer>
  );
}
