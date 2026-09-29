"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, SearchIcon } from "./Icons";

const products = [
  { slug: "bpc-157", name: "BPC-157", size: "5 mg / 10 mg", tag: "Repair", price: "$49.99" },
  { slug: "glp-3", name: "GLP-3", size: "10 mg / 20 mg", tag: "Metabolic", price: "$69.99" },
  { slug: "tb-500", name: "TB-500", size: "5 mg / 10 mg", tag: "Recovery", price: "$99.99" },
  { slug: "mots-c", name: "MOTS-C", size: "10 mg / 40 mg", tag: "Cellular", price: "$59.99" },
  { slug: "ghk-cu", name: "GHK-Cu", size: "50 mg / 100 mg", tag: "Longevity", price: "$49.99" },
  { slug: "cjc-ipa", name: "CJC + IPA", size: "10 mg", tag: "Blend", price: "$89.99" },
];

export default function ProductExplorer() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => products.filter((item) => `${item.name} ${item.tag}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <section className="products section" id="catalogue">
      <div className="section-head">
        <div>
          <p className="eyebrow dark">COA-backed quality</p>
          <h2>Popular Products</h2>
        </div>
        <div className="catalogue-tools">
          <label className="catalogue-search">
            <SearchIcon size={18} />
            <span className="sr-only">Filter compounds</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter compounds" />
          </label>
          <p>{filtered.length} compounds shown</p>
        </div>
      </div>

      <div className="product-grid">
        {filtered.map((product, index) => (
          <Link className="product-card" href={`/shop/${product.slug}`} key={product.name} style={{ "--i": index } as React.CSSProperties} aria-label={`View ${product.name}`}>
            <div className="product-image-wrap">
              <span className="product-tag">{product.tag}</span>
              <Image src="/images/vitalis-blank-vial.png" alt="Blank Vitalis specimen vial" width={1024} height={1536} className="product-vial" />
              <span className="batch-dot"><span /> COA ready</span>
            </div>
            <div className="product-info">
              <div><h3>{product.name}</h3><p>{product.size}</p></div>
              <div className="price-row"><span>{product.price} <small>CAD</small></span><i><ArrowUpRight size={17} /></i></div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-state">No compounds match “{query}”. Try a broader search.</p>}
    </section>
  );
}
