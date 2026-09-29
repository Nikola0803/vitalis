"use client";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ComparisonTable from "@/components/ComparisonTable";
import { popularProducts, categoryCards, collectionCards } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #daeef3 0%, #eaf5f8 40%, #f0f9fc 70%, #e8f4f7 100%)",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
        minHeight: 600,
        display: "flex",
        alignItems: "center",
      }}>
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="https://yourhealthsupply.ca/cdn/shop/videos/c/vp/05871c3d28a54bc5ba0325e7c43db680/05871c3d28a54bc5ba0325e7c43db680.HD-1080p-4.8Mbps-90530476.mp4?v=0" type="video/mp4" />
        </video>
        {/* White gradient overlay matching original: rgba(255,255,255,0.91) → transparent */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(rgba(255,255,255,0.91), rgba(255,255,255,0))",
          zIndex: 1,
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <h1 style={{
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 400,
              fontSize: 56,
              color: "#061406",
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              Research Peptides &amp;<br />Professional Standards.
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#374151",
              marginBottom: 36,
              lineHeight: 1.6,
            }}>
              All Peptides 3rd party tested and verified<br />
              for identity, purity, and consistency.
            </p>

            {/* Search */}
            <div style={{
              display: "flex",
              background: "white",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              overflow: "hidden",
              margin: "0 auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <input
                type="text"
                placeholder="Search products..."
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#061406",
                }}
              />
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0 18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Prompt', sans-serif",
            fontWeight: 700,
            fontSize: 32,
            textAlign: "center",
            marginBottom: 40,
            color: "#061406",
          }}>
            Popular Products
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 24,
          }}>
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/collections/all-peptides" className="btn-primary" style={{
              background: "#6d9fab",
              color: "white",
              padding: "14px 32px",
              borderRadius: 4,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              display: "inline-block",
            }}>
              Browse Full Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by category */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 32,
            textAlign: "center",
            marginBottom: 40,
            color: "#061406",
            letterSpacing: "-0.96px",
          }}>
            Explore by category
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div style={{ cursor: "pointer" }}>
                  <div style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "1/1",
                    marginBottom: 12,
                  }}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Prompt', sans-serif",
                    fontWeight: 400,
                    fontSize: 18,
                    color: "#000",
                    margin: "0 0 10px",
                  }}>
                    {cat.name}
                  </p>
                  <span style={{
                    display: "inline-block",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "white",
                    background: "rgb(109, 159, 171)",
                    padding: "8px 24px",
                    borderRadius: 5,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    View All
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 32,
            textAlign: "center",
            marginBottom: 40,
            color: "#000",
            letterSpacing: "-0.96px",
          }}>
            Collections
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {collectionCards.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div style={{ cursor: "pointer" }}>
                  <div style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "1/1",
                    marginBottom: 12,
                  }}>
                    <Image
                      src={col.image}
                      alt={col.name}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Prompt', sans-serif",
                    fontWeight: 400,
                    fontSize: 18,
                    color: "#000",
                    margin: "0 0 10px",
                  }}>
                    {col.name}
                  </p>
                  <span style={{
                    display: "inline-block",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "white",
                    background: "rgb(109, 159, 171)",
                    padding: "8px 24px",
                    borderRadius: 5,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    View All
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COA Banner */}
      <section style={{
        background: "#1f2937",
        padding: "80px 24px",
        textAlign: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="https://yourhealthsupply.ca/cdn/shop/videos/c/vp/84f656fbbe7d4022b357d268b363d0e4/84f656fbbe7d4022b357d268b363d0e4.HD-720p-2.1Mbps-91519724.mp4?v=0" type="video/mp4" />
        </video>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.45)",
          zIndex: 1,
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{
            fontFamily: "'Prompt', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            marginBottom: 24,
          }}>
            Certificates of Assurance (COA&apos;s) with Every Peptide
          </h2>
          <Link
            href="/collections/all-peptides"
            style={{
              background: "#6d9fab",
              color: "white",
              padding: "14px 36px",
              borderRadius: 4,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              display: "inline-block",
            }}
          >
            View Peptide Catalogue
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ComparisonTable />
        </div>
      </section>
    </>
  );
}
