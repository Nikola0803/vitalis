"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.regularPrice && product.regularPrice > product.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 8,
          overflow: "hidden",
          transition: "box-shadow 0.2s",
          cursor: "pointer",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Badge */}
        {isOnSale && !product.soldOut && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}>
            <span className="sale-badge">Sale</span>
          </div>
        )}
        {product.soldOut && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}>
            <span className="sold-out-badge">Sold out</span>
          </div>
        )}

        {/* Image */}
        <div style={{
          aspectRatio: "1",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            style={{ objectFit: "contain", width: "80%", height: "80%" }}
            unoptimized
          />
        </div>

        {/* Info */}
        <div style={{ padding: "14px 4px 8px" }}>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#061406",
            margin: 0,
            marginBottom: 4,
          }}>
            {product.name}
          </h3>

          {product.sizes.length > 0 && (
            <p style={{
              fontSize: 12,
              color: "#6b7280",
              margin: 0,
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {product.sizes.join(", ")}
            </p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 14,
              fontWeight: 600,
              color: isOnSale ? "#dc2626" : "#061406",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              ${product.price.toFixed(2)} CAD
            </span>
            {isOnSale && (
              <span style={{
                fontSize: 12,
                color: "#9ca3af",
                textDecoration: "line-through",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                ${product.regularPrice!.toFixed(2)} CAD
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
