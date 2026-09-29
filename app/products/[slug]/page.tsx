"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, allProductsWithSupplies } from "@/lib/products";
import { notFound } from "next/navigation";
import ComparisonTable from "@/components/ComparisonTable";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatSize(size: string) {
  return size.replace(/^(\d+(?:\.\d+)?)(mg|g|ml|IU|mcg|mcg\/ml)$/i, "$1 $2");
}

function ProductPageContent({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [trustOpen, setTrustOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isOnSale = product.regularPrice && product.regularPrice > product.price;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const complimentaryProducts = allProductsWithSupplies.filter((p) => p.slug !== slug).slice(0, 5);

  const shopCategories = [
    { name: "Reconstitution Supplies", slug: "supplies", image: "https://yourhealthsupply.ca/cdn/shop/collections/light_cba1c998-1b31-4730-bd86-29be0fd67866.png?v=1786625073" },
    { name: "Blended Compounds", slug: "blends", image: "https://yourhealthsupply.ca/cdn/shop/collections/blend.png?v=1786625006" },
    { name: "Cellular & Anti-Aging", slug: "cosmetic", image: "https://yourhealthsupply.ca/cdn/shop/collections/Cosmetic.png?v=1786625196" },
    { name: "Tissue Repair", slug: "recovery", image: "https://yourhealthsupply.ca/cdn/shop/collections/Recovery.png?v=1786625144" },
    { name: "Neuro Health", slug: "neuro", image: "https://yourhealthsupply.ca/cdn/shop/collections/Neuro.png?v=1786625100" },
    { name: "Metabolic Health", slug: "weight-loss", image: "https://yourhealthsupply.ca/cdn/shop/collections/Weight_Loss_Metabolism_1ffe094b-c51d-49e6-963c-dab8a3ff5119.png?v=1786625283" },
  ];

  const DM = "'DM Sans', sans-serif";
  const PROMPT = "'Prompt', sans-serif";
  const DARK = "#061406";
  const TEAL = "#6d9fab";
  const GRAY = "#666666";

  return (
    <div>
      {/* ── Product Section ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Image column */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 480 }}>
            <Image src={product.image} alt={product.name} width={500} height={500} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: 480 }} unoptimized />
          </div>

          {/* Info column */}
          <div>
            {/* Title */}
            <h1 style={{ fontFamily: PROMPT, fontWeight: 400, fontSize: 56, lineHeight: "56px", color: DARK, margin: "0 0 8px" }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontFamily: DM, fontSize: 16, fontWeight: 500, color: DARK }}>
                ${product.price.toFixed(2)} CAD
              </span>
              {isOnSale && (
                <span style={{ fontFamily: DM, fontSize: 16, fontWeight: 400, color: DARK, textDecoration: "line-through" }}>
                  ${product.regularPrice!.toFixed(2)} CAD
                </span>
              )}
            </div>

            {/* Batch */}
            {product.batchNumber && (
              <p style={{ fontFamily: DM, fontSize: 12, color: DARK, margin: "0 0 20px", letterSpacing: "0.5px" }}>
                CURRENT BATCH: {product.batchNumber}
              </p>
            )}

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: DM, fontSize: 14, fontWeight: 400, color: DARK, margin: "0 0 8px" }}>Size</p>
                <div style={{ display: "flex" }}>
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        flex: 1,
                        height: 46,
                        border: "1px solid #000",
                        borderLeft: i === 0 ? "1px solid #000" : "none",
                        background: selectedSize === size ? "#000" : "#fff",
                        color: selectedSize === size ? "#fff" : DARK,
                        cursor: "pointer",
                        fontSize: 16,
                        fontFamily: DM,
                        fontWeight: 400,
                        borderRadius: 0,
                        transition: "background 0.15s, color 0.15s",
                      }}
                    >
                      {formatSize(size)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              {/* Qty */}
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 5, overflow: "hidden" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 44, height: 50, background: "none", border: "none", cursor: "pointer", fontSize: 20, fontFamily: DM, color: DARK, borderRadius: "5px 0 0 5px" }}>−</button>
                <span style={{ width: 44, textAlign: "center", fontSize: 16, fontFamily: DM, color: DARK }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: 44, height: 50, background: "none", border: "none", cursor: "pointer", fontSize: 20, fontFamily: DM, color: DARK, borderRadius: "0 5px 5px 0" }}>+</button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.soldOut}
                style={{
                  flex: 1,
                  background: product.soldOut ? "#9ca3af" : TEAL,
                  color: "#fff",
                  border: "none",
                  padding: "16px 32px",
                  borderRadius: 5,
                  fontSize: 16,
                  fontFamily: DM,
                  fontWeight: 400,
                  cursor: product.soldOut ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "opacity 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {product.soldOut ? "Sold Out" : addedToCart ? "Added ✓" : "Add to cart"}
              </button>
            </div>

            {/* Buy it now */}
            {!product.soldOut && (
              <button style={{ width: "100%", background: TEAL, color: "#fff", border: "none", padding: "16px 32px", borderRadius: 5, fontSize: 16, fontFamily: DM, fontWeight: 500, cursor: "pointer", marginBottom: 10, opacity: 0.85 }}>
                Buy it now
              </button>
            )}

            {/* Why Trust button */}
            <button
              onClick={() => setTrustOpen(!trustOpen)}
              style={{ width: "100%", background: "#c6c6c6", border: "none", padding: "12px 24px", borderRadius: 20, fontSize: 16, fontFamily: DM, fontWeight: 400, cursor: "pointer", color: "#000", marginBottom: 16 }}
            >
              Why Trust This Product?
            </button>

            {/* Why Trust expanded */}
            {trustOpen && (
              <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 4, padding: "20px 24px", marginBottom: 16 }}>
                <h2 style={{ fontFamily: PROMPT, fontWeight: 400, fontSize: 24, lineHeight: "24px", color: DARK, marginBottom: 12 }}>
                  Why trust this product?
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {[
                    "Manufactured in Canada 🇨🇦",
                    "Third-party tested",
                    "HPLC purity verified",
                    "LAL endotoxin tested",
                    "COA publicly available",
                    "Tamper-evident packaging",
                    "Climate-controlled storage",
                  ].map((item) => (
                    <li key={item} style={{ fontFamily: DM, fontSize: 14, padding: "4px 0", color: GRAY }}>✔ {item}</li>
                  ))}
                </ul>
                <p style={{ fontSize: 12, color: GRAY, fontFamily: DM, borderTop: "1px solid #e5e7eb", paddingTop: 12, margin: 0 }}>
                  This product meets The Vitalis Verification Standard™
                </p>
              </div>
            )}

            {/* Description */}
            <p style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", color: GRAY, marginBottom: 12 }}>
              {product.description}
            </p>

            {/* For lab research only */}
            <p style={{ fontFamily: DM, fontSize: 18, fontWeight: 700, fontStyle: "italic", color: DARK, margin: 0 }}>
              For laboratory research use only.
            </p>
          </div>
        </div>
      </div>

      {/* ── COA Batch Verification ── */}
      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: PROMPT, fontWeight: 400, fontSize: 32, color: DARK, margin: "0 0 4px" }}>
            Certificate of Analysis Batch Verification
          </h2>
          <p style={{ fontFamily: DM, fontSize: 14, color: GRAY, margin: "0 0 40px" }}>
            The YHS Verification Standard™
          </p>

          {/* 4 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }} className="coa-cards">
            {[
              { icon: "🔬", title: "Third Party Tested", desc: "Independently verified for quality and purity" },
              { icon: "⚗️", title: "HPLC Purity", desc: "High-performance liquid chromatography verified" },
              { icon: "🧫", title: "LAL Endotoxin", desc: "Tested for bacterial endotoxins" },
              { icon: "📋", title: "Certificate of Analysis", desc: "Batch-specific documentation available" },
            ].map((item) => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 8, padding: "20px 16px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontFamily: DM, fontWeight: 600, fontSize: 16, color: "#000", margin: "0 0 6px" }}>{item.title}</h3>
                <p style={{ fontFamily: DM, fontSize: 13, color: GRAY, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* COA report card */}
          {product.batchNumber && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
              <div style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: DM, fontWeight: 600, fontSize: 14, color: DARK }}>Report Overview</span>
                <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, fontFamily: DM }}>Complete</span>
              </div>
              <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
                {[
                  { label: "Report Number", value: product.batchNumber },
                  { label: "Test Date", value: "Apr 6, 2026" },
                  { label: "Peptide Name", value: product.name },
                  { label: "Method", value: "HPLC-UV 214nm" },
                  { label: "Appearance", value: "White lyophilized powder" },
                  { label: "Date Reported", value: "Apr 11, 2026" },
                  { label: "Purity", value: product.purity || "≥99% (HPLC)" },
                  { label: "Client", value: "Vitalis" },
                  { label: "Format", value: "Lyophilized powder" },
                  { label: "Endotoxin", value: "< 0.125 EU/mL" },
                ].map((row) => (
                  <div key={row.label}>
                    <p style={{ fontFamily: DM, fontSize: 10, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.6px" }}>{row.label}</p>
                    <p style={{ fontFamily: DM, fontSize: 13, color: DARK, fontWeight: 500, margin: 0 }}>{row.value}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 20px", display: "flex", gap: 16 }}>
                {["HPLC", "Endotoxin"].map((test) => (
                  <div key={test} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: DM, fontSize: 13, color: DARK }}>{test}</span>
                    <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 10, fontWeight: 600, padding: "1px 8px", borderRadius: 20, fontFamily: DM }}>Complete</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            {product.batchNumber && (
              <p style={{ fontFamily: DM, fontSize: 12, color: DARK, margin: 0, letterSpacing: "0.5px" }}>
                CURRENT BATCH: {product.batchNumber}
              </p>
            )}
            <button style={{ background: TEAL, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 5, fontSize: 14, fontFamily: DM, fontWeight: 500, cursor: "pointer" }}>
              Verify Certificate of Analysis at Testides
            </button>
          </div>
        </div>
      </section>

      {/* ── Researched For ── */}
      {(product.researchInfo || product.researchBullets) && (
        <section style={{ padding: "72px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="research-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: PROMPT, fontWeight: 400, fontSize: 56, lineHeight: "56px", color: "#000", margin: "0 0 16px" }}>
                  Researched For...
                </h2>
                {product.researchBullets ? (
                  <>
                    <p style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", color: GRAY, marginBottom: 12 }}>
                      <strong style={{ color: DARK }}>{product.name}</strong> is utilized in <strong style={{ color: DARK }}>preclinical and experimental research settings</strong> investigating:
                    </p>
                    <ul style={{ paddingLeft: 20, margin: "0 0 16px", color: GRAY }}>
                      {product.researchBullets.map((bullet) => (
                        <li key={bullet} style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", marginBottom: 4 }}>{bullet}</li>
                      ))}
                    </ul>
                    {product.researchInfo && (
                      <p style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", color: GRAY, margin: 0 }}>
                        {product.researchInfo}
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", color: GRAY }}>{product.researchInfo}</p>
                )}
              </div>
              <div style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden" }}>
                <Image src="https://yourhealthsupply.ca/cdn/shop/files/blue.png?v=1785781506" alt="" fill style={{ objectFit: "cover" }} unoptimized />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Technical Classification + Handling & Storage ── */}
      <section style={{ background: "#8cbcd1", padding: "64px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 48 }}>
            <div>
              <h3 style={{ fontFamily: DM, fontWeight: 400, fontSize: 32, lineHeight: "36.8px", color: "#fff", margin: "0 0 32px" }}>
                Technical Classification
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Peptide Type", value: product.peptideType || "Synthetic peptide" },
                  ...(product.aminoAcidLength ? [{ label: "Amino Acid Length", value: product.aminoAcidLength }] : []),
                  ...(product.peptideOrigin ? [{ label: "Peptide Origin", value: product.peptideOrigin }] : []),
                  { label: "Source", value: "Synthetic (laboratory-produced)" },
                  { label: "Physical Form", value: product.format || "Lyophilized powder" },
                  { label: "Purity", value: product.purity || "≥99% (HPLC)" },
                  ...(product.formula ? [{ label: "Molecular Formula", value: product.formula }] : []),
                  ...(product.molecularWeight ? [{ label: "Molecular Weight", value: product.molecularWeight }] : []),
                ].map((row) => (
                  <li key={row.label} style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", color: "#fff", marginBottom: 8, display: "flex", gap: 8 }}>
                    <strong style={{ minWidth: 140, color: "#fff" }}>{row.label}:</strong>
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: DM, fontWeight: 400, fontSize: 32, lineHeight: "36.8px", color: "#fff", margin: "0 0 32px" }}>
                Handling &amp; Storage
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Storage Conditions", value: "2–8 °C, protected from light" },
                  { label: "Stability", value: "Lyophilized format supports extended stability when stored under recommended conditions" },
                  { label: "Reconstitution", value: "For laboratory research protocols only, using appropriate sterile laboratory techniques" },
                ].map((row) => (
                  <li key={row.label} style={{ fontFamily: DM, fontSize: 14, lineHeight: "21px", marginBottom: 20 }}>
                    <strong style={{ display: "block", color: "#fff", marginBottom: 2 }}>{row.label}:</strong>
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 cards */}
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "❄️", title: "Storage: 2–8°C, protected from light", desc: "Store as directed to help preserve product quality and research integrity." },
              { icon: "🔬", title: `Peptide Purity: ${product.purity || "≥99% (HPLC)"}`, desc: "HPLC testing confirms peptide purity by separating and measuring individual compounds within each sample." },
              { icon: "🧪", title: "Format: Lyophilized Powder", desc: "Freeze-dried for stability. Reconstitution is required before use." },
            ].map((card) => (
              <div key={card.title} style={{ background: "#fff", borderRadius: 8, padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{card.icon}</div>
                <h3 style={{ fontFamily: DM, fontWeight: 600, fontSize: 14, color: DARK, margin: "0 0 8px" }}>{card.title}</h3>
                <p style={{ fontFamily: DM, fontSize: 13, color: GRAY, margin: 0, lineHeight: "19px" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ComparisonTable />
        </div>
      </section>

      {/* ── Complimentary Products ── */}
      <section style={{ padding: "0 24px 56px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h3 style={{ fontFamily: DM, fontWeight: 400, fontSize: 32, color: "#000", margin: "0 0 28px" }}>
            Complimentary Products
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 24 }}>
            {complimentaryProducts.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ cursor: "pointer" }}>
                  <div style={{ aspectRatio: "1", position: "relative", marginBottom: 10 }}>
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }} unoptimized />
                  </div>
                  <p style={{ fontFamily: DM, fontSize: 13, fontWeight: 500, color: DARK, margin: "0 0 3px" }}>{p.name}</p>
                  <p style={{ fontFamily: DM, fontSize: 13, color: GRAY, margin: 0 }}>${p.price.toFixed(2)} CAD</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop By Category ── */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h3 style={{ fontFamily: DM, fontWeight: 400, fontSize: 32, color: "#000", margin: "0 0 28px" }}>
            Shop By Category
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 16 }}>
            {shopCategories.map((cat) => (
              <Link key={cat.slug} href={`/collections/${cat.slug}`} style={{ textDecoration: "none" }}>
                <div>
                  <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1", position: "relative", background: "#f3f4f6", marginBottom: 10 }}>
                    <Image src={cat.image} alt={cat.name} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <p style={{ fontFamily: DM, fontSize: 13, fontWeight: 500, color: DARK, margin: "0 0 6px" }}>{cat.name}</p>
                  <button style={{ border: "1px solid #d1d5db", background: "#fff", padding: "5px 14px", fontSize: 12, borderRadius: 3, cursor: "pointer", fontFamily: DM, color: DARK }}>
                    Buy Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .research-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .specs-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .coa-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  return <ProductPageContent slug={slug} />;
}
