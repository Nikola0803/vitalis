"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, allProductsWithSupplies, collectionCards, categoryCards } from "@/lib/products";
import { notFound } from "next/navigation";
import ComparisonTable from "@/components/ComparisonTable";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatSize(size: string) {
  return size.replace(/^(\d+(?:\.\d+)?)(mg|g|ml|IU|mcg|mcg\/ml)$/i, '$1 $2');
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

  const complimentaryProducts = allProductsWithSupplies.filter(p => p.slug !== slug).slice(0, 5);

  const shopCategories = [
    { name: "Reconstitution Supplies", slug: "supplies", image: "https://yourhealthsupply.ca/cdn/shop/collections/light_cba1c998-1b31-4730-bd86-29be0fd67866.png?v=1786625073" },
    { name: "Blended Compounds", slug: "blends", image: "https://yourhealthsupply.ca/cdn/shop/collections/blend.png?v=1786625006" },
    { name: "Cellular & Anti-Aging", slug: "cosmetic", image: "https://yourhealthsupply.ca/cdn/shop/collections/Cosmetic.png?v=1786625196" },
    { name: "Tissue Repair", slug: "recovery", image: "https://yourhealthsupply.ca/cdn/shop/collections/Recovery.png?v=1786625144" },
    { name: "Neuro Health", slug: "neuro", image: "https://yourhealthsupply.ca/cdn/shop/collections/Neuro.png?v=1786625100" },
    { name: "Metabolic Health", slug: "weight-loss", image: "https://yourhealthsupply.ca/cdn/shop/collections/Weight_Loss_Metabolism_1ffe094b-c51d-49e6-963c-dab8a3ff5119.png?v=1786625283" },
  ];

  return (
    <div>
      {/* Product Section */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }} className="product-grid">
          {/* Image */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "1",
          }}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
              unoptimized
            />
          </div>

          {/* Info */}
          <div>
            <h1 style={{
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 700,
              fontSize: 40,
              color: "#061406",
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {isOnSale ? (
                <>
                  <span style={{ fontSize: 18, color: "#061406", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                    ${product.price.toFixed(2)} CAD
                  </span>
                  <span style={{ fontSize: 15, color: "#9ca3af", textDecoration: "line-through", fontFamily: "'DM Sans', sans-serif" }}>
                    ${product.regularPrice!.toFixed(2)} CAD
                  </span>
                </>
              ) : (
                <span style={{ fontSize: 20, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "#061406" }}>
                  ${product.price.toFixed(2)} CAD
                </span>
              )}
            </div>

            {/* Batch */}
            {product.batchNumber && (
              <p style={{ fontSize: 12, letterSpacing: "1px", fontFamily: "'DM Sans', sans-serif", color: "#6b7280", marginBottom: 24 }}>
                <strong>CURRENT BATCH:</strong> {product.batchNumber}
              </p>
            )}

            {/* Size Selector */}
            {product.sizes.length > 1 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, fontFamily: "'DM Sans', sans-serif", color: "#374151" }}>
                  Size
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "10px 20px",
                        border: "1px solid",
                        borderColor: selectedSize === size ? "#061406" : "#d1d5db",
                        background: selectedSize === size ? "#061406" : "white",
                        color: selectedSize === size ? "white" : "#061406",
                        cursor: "pointer",
                        fontSize: 13,
                        borderRadius: 3,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: selectedSize === size ? 600 : 400,
                        transition: "all 0.15s",
                      }}
                    >
                      {formatSize(size)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
              {/* Quantity */}
              <div style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #d1d5db",
                borderRadius: 3,
                overflow: "hidden",
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: 40, height: 44, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#061406" }}
                >
                  −
                </button>
                <span style={{ width: 40, textAlign: "center", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#061406" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: 40, height: 44, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#061406" }}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.soldOut}
                style={{
                  flex: 1,
                  background: product.soldOut ? "#9ca3af" : "#6d9fab",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 3,
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  cursor: product.soldOut ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minWidth: 160,
                  transition: "background 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {product.soldOut ? "Sold Out" : addedToCart ? "Added ✓" : "Add to cart"}
              </button>
            </div>

            {/* Buy it now */}
            {!product.soldOut && (
              <button style={{
                width: "100%",
                background: "#6d9fab",
                color: "white",
                border: "none",
                padding: "13px",
                borderRadius: 3,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 16,
                opacity: 0.85,
              }}>
                Buy it now
              </button>
            )}

            {/* Why Trust */}
            <button
              onClick={() => setTrustOpen(!trustOpen)}
              style={{
                width: "100%",
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                padding: "13px",
                borderRadius: 3,
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                color: "#374151",
                marginBottom: 16,
              }}
            >
              Why Trust This Product?
            </button>

            {trustOpen && (
              <div style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                padding: "20px 24px",
                marginBottom: 20,
              }}>
                <h3 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                  Why Trust This {product.name}?
                </h3>
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
                    <li key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: "4px 0", color: "#374151" }}>
                      ✔ {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans', sans-serif", borderTop: "1px solid #e5e7eb", paddingTop: 12, margin: 0 }}>
                  ━━━ This product meets The Vitalis Verification Standard™
                </p>
              </div>
            )}

            {/* Description */}
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>
              {product.description}
            </p>

            <p style={{ fontSize: 13, color: "#374151", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, fontStyle: "italic" }}>
              <strong>For laboratory research use only.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* COA Verification Section */}
      <section style={{ background: "#f9fafb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
            Certificate of Analysis Batch Verification
          </h2>
          <p style={{ color: "#6b7280", fontFamily: "'DM Sans', sans-serif", marginBottom: 32 }}>
            The YHS Verification Standard™
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 24,
            marginBottom: 32,
          }}>
            {[
              { icon: "🔬", title: "Third Party Tested", desc: "Independently verified for quality and purity" },
              { icon: "⚗️", title: "HPLC Purity", desc: "High-performance liquid chromatography verified" },
              { icon: "🧫", title: "LAL Endotoxin", desc: "Tested for bacterial endotoxins" },
              { icon: "📋", title: "Certificate of Analysis", desc: "Batch-specific documentation available" },
            ].map((item) => (
              <div key={item.title} style={{
                background: "white",
                borderRadius: 8,
                padding: "20px",
                border: "1px solid #e5e7eb",
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#061406" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Embedded COA Document */}
          {product.batchNumber && (
            <div style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 24,
            }}>
              <div style={{
                background: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#374151" }}>
                  Report Overview
                </span>
                <span style={{
                  background: "#dcfce7",
                  color: "#16a34a",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 10px",
                  borderRadius: 20,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Complete
                </span>
              </div>
              <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
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
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {row.label}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#061406", fontWeight: 500, margin: 0 }}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 20px", display: "flex", gap: 16 }}>
                {["HPLC", "Endotoxin"].map((test) => (
                  <div key={test} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#374151" }}>{test}</span>
                    <span style={{
                      background: "#dcfce7",
                      color: "#16a34a",
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "1px 8px",
                      borderRadius: 20,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      Complete
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            {product.batchNumber && (
              <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                CURRENT BATCH: {product.batchNumber}
              </p>
            )}
            <button style={{
              background: "#6d9fab",
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: 4,
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
            }}>
              Verify Certificate of Analysis at Testides
            </button>
          </div>
        </div>
      </section>

      {/* Researched For */}
      {product.researchInfo && (
        <section style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }} className="research-grid">
              <div>
                <h2 style={{
                  fontFamily: "'Prompt', sans-serif",
                  fontWeight: 700,
                  fontSize: 42,
                  color: "#061406",
                  marginBottom: 20,
                  lineHeight: 1.1,
                }}>
                  Researched For...
                </h2>
                {product.researchBullets ? (
                  <>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
                      <strong>{product.name}</strong> is utilized in <strong>preclinical and experimental research settings</strong> investigating:
                    </p>
                    <ul style={{ paddingLeft: 20, margin: "0 0 16px", color: "#374151" }}>
                      {product.researchBullets.map((bullet) => (
                        <li key={bullet} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 6, lineHeight: 1.5 }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {product.researchInfo && (
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>
                        {product.researchInfo}
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>
                    {product.researchInfo}
                  </p>
                )}
              </div>
              <div style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden" }}>
                <Image
                  src="https://yourhealthsupply.ca/cdn/shop/files/blue.png?v=1785781506"
                  alt="Research"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Classification + Handling & Storage */}
      <section style={{ background: "#c5dfe8", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginBottom: 40,
          }} className="specs-grid">
            <div>
              <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 20, color: "#061406" }}>
                Technical Classification
              </h2>
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
                  <li key={row.label} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                    <strong style={{ color: "#061406", minWidth: 140 }}>{row.label}:</strong>
                    <span style={{ color: "#374151" }}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 20, color: "#061406" }}>
                Handling &amp; Storage
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Storage Conditions", value: "2–8 °C, protected from light" },
                  { label: "Stability", value: "Lyophilized format supports extended stability when stored under recommended conditions" },
                  { label: "Reconstitution", value: "For laboratory research protocols only, using appropriate sterile laboratory techniques" },
                ].map((row) => (
                  <li key={row.label} style={{ marginBottom: 16, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                    <strong style={{ color: "#061406", display: "block", marginBottom: 2 }}>{row.label}:</strong>
                    <span style={{ color: "#374151" }}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-grid">
            {[
              {
                icon: "❄️",
                title: "Storage: 2–8°C, protected from light",
                desc: "Store as directed to help preserve product quality and research integrity.",
              },
              {
                icon: "🔬",
                title: `Peptide Purity: ${product.purity || "≥99% (HPLC)"}`,
                desc: "HPLC testing confirms peptide purity by separating and measuring individual compounds within each sample.",
              },
              {
                icon: "🧪",
                title: "Format: Lyophilized Powder",
                desc: "Freeze-dried for stability. Reconstitution is required before use.",
              },
            ].map((card) => (
              <div key={card.title} style={{
                background: "white",
                borderRadius: 8,
                padding: "24px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#061406" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ComparisonTable />
        </div>
      </section>

      {/* Complimentary Products */}
      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 26, marginBottom: 24, color: "#061406" }}>
            Complimentary Products
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 20,
          }}>
            {complimentaryProducts.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ cursor: "pointer" }}>
                  <div style={{ aspectRatio: "1", position: "relative", marginBottom: 8 }}>
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }} unoptimized />
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#061406", margin: "0 0 4px" }}>
                    {p.name}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6b7280", margin: 0 }}>
                    ${p.price.toFixed(2)} CAD
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 26, marginBottom: 24, color: "#061406" }}>
            Shop By Category
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 16,
          }}>
            {shopCategories.map((cat) => (
              <Link key={cat.slug} href={`/collections/${cat.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ cursor: "pointer" }}>
                  <div style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    aspectRatio: "1",
                    position: "relative",
                    background: "#f3f4f6",
                    marginBottom: 10,
                  }}>
                    <Image src={cat.image} alt={cat.name} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#061406", margin: "0 0 6px" }}>
                    {cat.name}
                  </p>
                  <button style={{
                    border: "1px solid #d1d5db",
                    background: "white",
                    padding: "4px 14px",
                    fontSize: 11,
                    borderRadius: 2,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#061406",
                  }}>
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
        }
      `}</style>
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  return <ProductPageContent slug={slug} />;
}
