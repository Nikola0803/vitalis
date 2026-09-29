"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "ALL PEPTIDES", href: "/collections/all-peptides" },
  { label: "BLENDS", href: "/collections/blends" },
  { label: "SUPPLIES", href: "/collections/supplies" },
  { label: "CALCULATOR", href: "/pages/peptide-calculator" },
  { label: "RESOURCES", href: "/pages/faqs" },
  { label: "CONTACT", href: "/pages/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header style={{ borderBottom: "1px solid #e5e7eb", background: "white", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 800, fontSize: 26, color: "#061406", letterSpacing: "-0.5px" }}>
              yourhealth
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#061406", letterSpacing: "3px", marginTop: -2 }}>
              SUPPLY
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 8, color: "#666", letterSpacing: "0.5px" }}>
              Quality Advanced Health Products
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: "#061406",
                textDecoration: "none",
                padding: "8px 14px",
                letterSpacing: "0.5px",
              }}
            >
              {link.label}
            </Link>
          ))}

        </nav>

        {/* Right Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Search */}
          <button
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#061406" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Account */}
          <button
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Account"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#061406" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Cart */}
          <Link href="/cart" style={{ position: "relative", padding: 4 }} aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#061406" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "#6d9fab",
                color: "white",
                borderRadius: "50%",
                width: 16,
                height: 16,
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "none" }}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#061406" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "white",
          borderTop: "1px solid #e5e7eb",
          padding: "16px 24px",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: 16,
                color: "#061406",
                textDecoration: "none",
                borderBottom: "1px solid #f3f4f6",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
