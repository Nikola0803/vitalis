"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, SearchIcon } from "./Icons";
import { catalogue } from "@/lib/catalog";

const focuses = ["All", "Recovery", "Metabolic", "Cellular", "Longevity", "Blends"];

export default function ShopCatalogue() {
  const [focus, setFocus] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => catalogue.filter((item) => (focus === "All" || item.focus === focus) && item.name.toLowerCase().includes(query.toLowerCase())), [focus, query]);
  return (
    <>
      <div className="shop-tools">
        <div className="filter-row">{focuses.map((item) => <button className={focus === item ? "active" : ""} onClick={() => setFocus(item)} key={item}>{item}</button>)}</div>
        <label className="shop-search"><SearchIcon size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search catalogue" /></label>
      </div>
      <div className="shop-count"><span>{filtered.length} research materials</span><span>Prices shown in CAD</span></div>
      <div className="shop-grid">
        {filtered.map((item) => <Link className="shop-card" href={`/shop/${item.slug}`} key={item.slug} aria-label={`View ${item.name}`}>
          <div className="shop-card-image"><span className="coa-pill">COA available</span><Image src="/images/vitalis-blank-vial.png" alt="Blank Vitalis specimen vial" width={1024} height={1536} /></div>
          <div className="purity-bar"><span>Verified purity</span><b>{item.purity}</b></div>
          <div className="shop-card-copy"><small>{item.focus}</small><h2>{item.name}</h2><p>{item.size}</p><div><strong>${item.price.toFixed(2)} CAD</strong><span className="shop-card-arrow"><ArrowUpRight size={16} /></span></div></div>
        </Link>)}
      </div>
    </>
  );
}
