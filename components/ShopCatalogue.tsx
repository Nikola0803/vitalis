"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, SearchIcon } from "./Icons";
import { catalogue } from "@/lib/catalog";

const focuses = ["All", "Recovery", "Metabolic", "Cellular", "Longevity", "Neuro", "Blends"];

export default function ShopCatalogue() {
  const [focus, setFocus] = useState("All");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("focus");
      if (requested && focuses.includes(requested)) setFocus(requested);
      setQuery(params.get("q") ?? "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const filtered = useMemo(() => catalogue.filter((item) => {
    const searchText = `${item.name} ${item.focus} ${item.summary} ${item.variants.map((variant) => variant.sku).join(" ")}`.toLowerCase();
    return (focus === "All" || item.focus === focus) && searchText.includes(query.toLowerCase());
  }), [focus, query]);
  return (
    <>
      <div className="shop-tools">
        <div className="filter-row">{focuses.map((item) => <button className={focus === item ? "active" : ""} onClick={() => setFocus(item)} key={item}>{item}</button>)}</div>
        <label className="shop-search" id="catalogue-search"><SearchIcon size={18} /><span className="sr-only">Search catalogue</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search catalogue" /></label>
      </div>
      <div className="shop-count"><span>{filtered.length} research materials</span><span>Prices shown in CAD</span></div>
      <div className="shop-grid">
        {filtered.map((item) => <Link className="shop-card" href={`/shop/${item.slug}`} key={item.slug} aria-label={`View ${item.name}`}>
          <div className="shop-card-image"><span className="coa-pill">{item.coaUrl ? "COA available" : item.comingSoon ? "Coming soon" : "Documentation pending"}</span><Image src={item.image} alt={`${item.name} Vitalis vial and carton`} width={1254} height={1254} /></div>
          <div className="purity-bar"><span>{item.coaUrl ? "Verified report" : "Documentation"}</span><b>{item.purity}</b></div>
          <div className="shop-card-copy"><small>{item.focus}</small><h2>{item.name}</h2><p>{item.size}</p><div><strong>${item.price.toFixed(2)} CAD</strong><span className="shop-card-arrow"><ArrowUpRight size={16} /></span></div></div>
        </Link>)}
      </div>
    </>
  );
}
