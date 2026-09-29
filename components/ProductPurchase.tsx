"use client";

import { useState } from "react";
import { BagIcon, CheckIcon } from "./Icons";

export default function ProductPurchase({ sizes }: { sizes: string[] }) {
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  return <div className="purchase-controls">
    <div className="size-picker"><label>Size</label><div>{sizes.map((item) => <button className={size === item ? "active" : ""} key={item} onClick={() => setSize(item)}>{item}</button>)}</div></div>
    <div className="purchase-row"><div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>+</button></div><button className={`add-cart ${added ? "added" : ""}`} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800); }}>{added ? <><CheckIcon /> Added to cart</> : <><BagIcon /> Add to cart</>}</button></div>
    <button className="buy-now">Buy it now</button>
  </div>;
}
