"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, SearchIcon } from "./Icons";
import { catalogue } from "@/lib/catalog";

const popularSlugs = ["retatrutide", "bpc-157", "tb-500", "mots-c", "ghk-cu", "cjc-1295-ipamorelin"];
const products = popularSlugs.map((slug) => catalogue.find((item) => item.slug === slug)).filter((item) => item !== undefined);

export default function ProductExplorer() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => products.filter((item) => `${item.name} ${item.focus}`.toLowerCase().includes(query.toLowerCase())),
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
              <span className="product-tag">{product.focus}</span>
              <Image src="/images/vitalis-blank-vial.png" alt="Blank Vitalis specimen vial" width={1024} height={1536} className="product-vial" />
              <span className="batch-dot"><span /> {product.coa ? "COA ready" : "Documentation pending"}</span>
            </div>
            <div className="product-info">
              <div><h3>{product.name}</h3><p>{product.size}</p></div>
              <div className="price-row"><span>${product.price.toFixed(2)} <small>CAD</small></span><i><ArrowUpRight size={17} /></i></div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-state">No compounds match “{query}”. Try a broader search.</p>}
    </section>
  );
}
