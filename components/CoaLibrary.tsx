"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CheckIcon, SearchIcon } from "./Icons";
import { catalogue, coaRows } from "@/lib/catalog";

type Filter = "all" | "glp" | "blends" | "peptides" | "ancillaries";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All reports" },
  { value: "glp", label: "GLP series" },
  { value: "blends", label: "Blends" },
  { value: "peptides", label: "Peptides" },
  { value: "ancillaries", label: "Ancillaries" },
];

export default function CoaLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [activeLot, setActiveLot] = useState<string | null>(null);

  const reports = useMemo(() => coaRows.map((row) => {
    const product = catalogue.find((item) => item.name === row.product);
    const kind: Filter = product?.focus === "Metabolic" ? "glp" : product?.focus === "Blends" ? "blends" : "peptides";
    return { ...row, size: product?.size ?? "Research material", image: product?.image ?? "/images/products/bpc-157.png", kind };
  }), []);

  const filtered = reports.filter((report) => {
    const term = query.trim().toLowerCase();
    const matchesSearch = !term || `${report.product} ${report.lot} ${report.report} ${report.purity} ${report.method}`.toLowerCase().includes(term);
    return matchesSearch && (filter === "all" || report.kind === filter);
  });
  const activeReport = reports.find((report) => report.lot === activeLot);

  useEffect(() => {
    if (!activeLot) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveLot(null); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.classList.remove("modal-open"); };
  }, [activeLot]);

  return <main className="coa-library-page">
    <section className="page-hero coa-library-hero">
      <div>
        <p className="eyebrow">Independent verification</p>
        <h1>Trace every vial<br />back to the evidence.</h1>
        <p>Search batch-specific analytical reports, review test methods, and connect each material to its documented lot.</p>
      </div>
    </section>
    <section className="coa-library-shell">
      <div className="coa-control-panel">
        <label className="coa-library-search">
          <SearchIcon size={20} />
          <span className="sr-only">Search certificate library</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, compound, batch code, purity, or lab..." />
        </label>
        <div className="coa-filters" aria-label="Filter certificate reports">
          {filters.map((item) => <button type="button" className={filter === item.value ? "active" : ""} onClick={() => setFilter(item.value)} key={item.value}>{item.label}</button>)}
        </div>
      </div>

      <div className="coa-library-heading">
        <div><p>Document library</p><h2>Published lot reports</h2></div>
        <span>{filtered.length} {filtered.length === 1 ? "report" : "reports"}</span>
      </div>

      {filtered.length ? <div className="coa-report-grid">
        {filtered.map((report) => <article className="coa-report-card" key={report.lot}>
          <button className="coa-card-trigger" type="button" aria-label={`Open lab report for ${report.product}, lot ${report.lot}`} onClick={() => setActiveLot(report.lot)} />
          <div className="coa-report-image">
            <Image src={report.image} alt={`${report.product} Vitalis vial and carton`} width={1254} height={1254} />
            <span>{report.externalUrl ? "Testides verified" : "Report on file"}</span>
          </div>
          <div className="coa-report-copy">
            <div className="coa-report-title"><div><p>{report.product}</p><h2>{report.product} {report.size.split(" / ")[0]}</h2></div><ArrowUpRight size={18} /></div>
            <dl>
              <div><dt>Lot / report</dt><dd>{report.lot}</dd></div>
              <div><dt>Purity</dt><dd>{report.purity}</dd></div>
              <div><dt>Laboratory</dt><dd>Independent lab</dd></div>
              <div><dt>Analyzed</dt><dd>{report.date}</dd></div>
            </dl>
            <span className="coa-open-label">Open lab report</span>
          </div>
        </article>)}
      </div> : <div className="coa-empty"><SearchIcon size={28} /><p>No documentation matches “{query}”.</p></div>}
    </section>
    {activeReport && <div className="coa-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveLot(null); }}>
      <section className="coa-modal" role="dialog" aria-modal="true" aria-labelledby="coa-modal-title">
        <button type="button" className="coa-modal-close" onClick={() => setActiveLot(null)} aria-label="Close report">×</button>
        <div className="coa-document-top"><span>VITALIS / CERTIFICATE OF ANALYSIS</span><span>{activeReport.lot}</span></div>
        <div className="coa-document-title"><div><small>Independent analytical report</small><h2 id="coa-modal-title">{activeReport.product} {activeReport.size.split(" / ")[0]}</h2></div><strong><CheckIcon size={15} /> Verified</strong></div>
        <div className="coa-document-meta"><div><small>Lot / report</small><b>{activeReport.lot}</b></div><div><small>Purity</small><b>{activeReport.purity}</b></div><div><small>Method</small><b>{activeReport.method}</b></div><div><small>Analyzed</small><b>{activeReport.date}</b></div></div>
        <div className="coa-external-report"><CheckIcon size={30}/><h3>Verified Testides record</h3><p>This product is connected to its report-specific third-party verification page.</p><a href={activeReport.externalUrl} target="_blank" rel="noreferrer">Visit certificate at Testides <ArrowUpRight size={15}/></a></div>
        <div className="coa-document-foot"><span>Independent third-party laboratory</span>{activeReport.externalUrl ? <a href={activeReport.externalUrl} target="_blank" rel="noreferrer">Verify at Testides ↗</a> : <span>For research documentation</span>}</div>
      </section>
    </div>}
  </main>;
}
