"use client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/products";
import { collectionCards } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

interface CollectionPageProps {
  title: string;
  products: Product[];
  description?: string;
}

export default function CollectionPage({ title, products, description }: CollectionPageProps) {
  return (
    <div>
      {/* Header */}
      <div style={{ padding: "48px 24px 32px", textAlign: "center" }}>
        <h1 style={{
          fontFamily: "'Prompt', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 48px)",
          color: "#061406",
          marginBottom: description ? 12 : 0,
        }}>
          {title}
        </h1>
        {description && (
          <p style={{ color: "#6b7280", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>
            {description}
          </p>
        )}
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 64px" }}>
        {/* Filter bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["Availability", "Price", "Category"].map((filter) => (
              <button key={filter} style={{
                border: "1px solid #d1d5db",
                background: "white",
                padding: "8px 16px",
                borderRadius: 4,
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#061406",
              }}>
                {filter}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
              {products.length} items
            </span>
            <button style={{
              border: "1px solid #d1d5db",
              background: "white",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#061406",
            }}>
              Sort
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 28,
          marginBottom: 64,
        }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Categories Section */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 48 }}>
          <h2 style={{
            fontFamily: "'Prompt', sans-serif",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: 24,
            color: "#061406",
          }}>
            Categories
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}>
            {collectionCards.map((col) => (
              <Link key={col.slug} href={`/collections/${col.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#f3f4f6",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"}>
                  <div style={{ aspectRatio: "1", position: "relative" }}>
                    <Image src={col.image} alt={col.name} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "#061406" }}>
                      {col.name}
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
