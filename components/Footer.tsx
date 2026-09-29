import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", color: "white", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16, color: "white" }}>
          Sitemap
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {[
            { label: "All Peptides", href: "/collections/all-peptides" },
            { label: "Blends", href: "/collections/blends" },
            { label: "Supplies", href: "/collections/supplies" },
            { label: "FAQs", href: "/pages/faqs" },
            { label: "Affiliates", href: "/pages/access-request" },
            { label: "Contact", href: "/pages/contact" },
          ].map((link, i, arr) => (
            <span key={link.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link
                href={link.href}
                style={{
                  color: "#9ca3af",
                  textDecoration: "underline",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {link.label}
              </Link>
              {i < arr.length - 1 && (
                <span style={{ color: "#4b5563" }}>•</span>
              )}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #1f2937", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "#6b7280", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 Your Health Supply
          </p>
          <Link
            href="/pages/terms"
            style={{ color: "#6b7280", fontSize: 12, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}
          >
            Terms and Policies
          </Link>
        </div>
      </div>
    </footer>
  );
}
