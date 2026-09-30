"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";

export default function HeaderSearch() {
  const router = useRouter();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [query, setQuery] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}#catalogue-search` : "/shop#catalogue-search");
    detailsRef.current?.removeAttribute("open");
  }

  return <details className="header-search" ref={detailsRef}>
    <summary aria-label="Search products"><SearchIcon /></summary>
    <form onSubmit={submit}>
      <SearchIcon size={17} />
      <label className="sr-only" htmlFor="site-product-search">Search products or SKUs</label>
      <input id="site-product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or SKUs" autoComplete="off" />
      <button type="submit">Search</button>
    </form>
  </details>;
}
