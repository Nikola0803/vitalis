import Link from "next/link";
import { BagIcon } from "./Icons";
import VitalisLogo from "./VitalisLogo";
import HeaderSearch from "./HeaderSearch";

export function SiteHeader() {
  return (
    <>
      <div className="announcement">
        <p>Proudly Canadian</p>
        <p className="announcement-center">Independent batch testing · Clear documentation</p>
        <p>All prices in CAD</p>
      </div>
      <header className="site-header">
        <Link className="brand brand-logo" href="/" aria-label="Vitalis home"><VitalisLogo /></Link>
        <nav aria-label="Primary navigation"><Link href="/shop">Shop</Link><Link href="/coas">COAs</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></nav>
        <div className="header-actions">
          <HeaderSearch />
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><span /><span /></summary>
            <nav aria-label="Mobile navigation"><Link href="/shop">Shop</Link><Link href="/coas">COAs</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></nav>
          </details>
          <Link className="header-shop" href="/shop"><BagIcon size={16} /> Shop all</Link>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <Link className="footer-wordmark" href="/" aria-label="Vitalis home"><VitalisLogo tone="light" /></Link>
            <p>Premium research materials backed by transparent, batch-level documentation.</p>
            <a href="mailto:support@vitalisbiosciences.ca">support@vitalisbiosciences.ca</a>
            <div className="footer-standard"><b>CA</b><span><strong>Canadian support</strong><small>Clear records · Local fulfilment</small></span></div>
          </div>

          <div className="site-footer-column"><p>Shop</p><Link href="/shop">All products</Link><Link href="/shop?focus=blends">Blended compounds</Link><Link href="/coas">COA library</Link></div>
          <div className="site-footer-column"><p>Support</p><Link href="/resources">Research resources</Link><Link href="/about#contact">Contact</Link><Link href="/about">Our standard</Link><Link href="/about#shipping">Shipping</Link></div>
          <div className="site-footer-column"><p>Company</p><Link href="/about">About Vitalis</Link><Link href="/about#quality">Quality standard</Link><Link href="/about#faq">FAQ</Link><Link href="/coas">Documentation</Link></div>

          <div className="site-footer-newsletter">
            <p>Research updates</p>
            <h3>Stay connected to the record.</h3>
            <span>New materials, published reports, and practical laboratory resources.</span>
            <form><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Email address" /><button type="submit" aria-label="Subscribe">↗</button></form>
          </div>
        </div>

        <div className="site-footer-meta">
          <div><strong>Checkout options</strong><span>Credit card</span><span>Interac e-Transfer</span><span>Prices in CAD</span></div>
          <nav aria-label="Legal"><Link href="/about#research-use">Research use only</Link><Link href="/about#terms">Terms</Link><Link href="/about#privacy">Privacy</Link></nav>
        </div>

        <details className="site-footer-disclaimer">
          <summary>Research-use disclaimer <span>+</span></summary>
          <div><p>All products shown on this website are intended strictly for laboratory and analytical research. They are not intended for human or veterinary use.</p><p>Product information is provided for material identification and documentation. It is not medical advice and is not intended to diagnose, treat, cure, or prevent disease.</p><p>Researchers are responsible for qualified handling, storage, recordkeeping, and compliance with applicable Canadian requirements.</p></div>
        </details>

        <div className="site-footer-bottom"><span>© 2026 Vitalis. All rights reserved.</span><span>Strictly for laboratory and analytical research.</span></div>
      </div>
    </footer>
  );
}
