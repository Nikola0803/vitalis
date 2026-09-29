"use client";

import { useMemo, useState } from "react";

const compounds = [
  ["", "— Skip or choose a peptide —", 0],
  ["glp3-5", "GLP-3 5 mg", 5], ["glp3-10", "GLP-3 10 mg", 10], ["glp3-20", "GLP-3 20 mg", 20],
  ["bpc-5", "BPC-157 5 mg", 5], ["bpc-10", "BPC-157 10 mg", 10],
  ["cjc-ipa", "CJC + Ipamorelin 10 mg", 10], ["tb-500", "TB-500 10 mg", 10],
  ["mots-c", "MOTS-C 10 mg", 10], ["ghk-cu", "GHK-Cu 50 mg", 50], ["nad", "NAD+ 500 mg", 500],
] as const;

export default function DilutionCalculator() {
  const [selected, setSelected] = useState("");
  const [mass, setMass] = useState(5);
  const [water, setWater] = useState(2);
  const [dose, setDose] = useState(0.25);
  const [capacity, setCapacity] = useState<50 | 100>(100);

  const values = useMemo(() => {
    const concentration = mass > 0 && water > 0 ? mass / water : 0;
    const drawMl = concentration > 0 ? dose / concentration : 0;
    const units = Math.max(0, drawMl * 100);
    const doses = dose > 0 ? mass / dose : 0;
    return { concentration, drawMl, units, doses };
  }, [mass, water, dose]);

  const chooseCompound = (value: string) => {
    setSelected(value);
    const item = compounds.find(([id]) => id === value);
    if (item && item[2]) setMass(item[2]);
  };

  return <div className="original-calc">
    <section className="calc-card peptide-picker"><span>Peptide selection — optional</span><label>Select a peptide to auto-fill the vial amount<select value={selected} onChange={(e) => chooseCompound(e.target.value)}>{compounds.map(([id,label]) => <option value={id} key={id}>{label}</option>)}</select></label></section>
    <section className="calc-card"><span>Reconstitution</span><div className="calc-input-grid"><label>Peptide amount<div><input type="number" min="0" step="0.1" value={mass} onChange={(e) => setMass(Number(e.target.value))} /><b>mg</b></div></label><label>BAC water added<div><input type="number" min="0" step="0.1" value={water} onChange={(e) => setWater(Number(e.target.value))} /><b>mL</b></div></label></div></section>
    <section className="calc-card"><span>Desired dose</span><label>Dose amount<div><input type="number" min="0" step="0.05" value={dose} onChange={(e) => setDose(Number(e.target.value))} /><b>mg</b></div></label></section>
    <section className="calc-card syringe-card">
      <span>Syringe visualization</span>
      <div className="syringe-toggle"><button className={capacity === 100 ? "active" : ""} onClick={() => setCapacity(100)}>1 mL · 100 IU</button><button className={capacity === 50 ? "active" : ""} onClick={() => setCapacity(50)}>½ mL · 50 IU</button></div>
      <Syringe units={values.units} capacity={capacity} />
      <p className="draw-instruction">Draw to the <b>{Math.min(values.units, capacity).toFixed(1)} IU</b> mark ({Math.min(values.drawMl, capacity / 100).toFixed(3)} mL)</p>
      <div className="calc-results"><div><small>Desired dose</small><b>{dose.toFixed(2)} mg</b></div><div><small>Concentration</small><b>{values.concentration.toFixed(2)} mg/mL</b></div><div><small>Draw volume</small><b>{values.drawMl.toFixed(3)} mL ({values.units.toFixed(1)} IU)</b></div><div><small>Doses per vial</small><b>{values.doses.toFixed(1)} doses</b></div></div>
      {values.units > capacity && <p className="calc-warning">The calculated draw exceeds the selected syringe capacity. Choose a larger syringe or review the inputs.</p>}
    </section>
  </div>;
}

function Syringe({ units, capacity }: { units: number; capacity: 50 | 100 }) {
  const clamped = Math.min(Math.max(units, 0), capacity);
  const barrelX = 74;
  const barrelWidth = 780;
  const fillWidth = barrelWidth * (clamped / capacity);
  const major = capacity === 100 ? 10 : 5;
  const ticks = Array.from({ length: capacity / 2 + 1 }, (_, i) => i * 2);
  return <div className="syringe-wrap">
    <div className="syringe-readout">{clamped.toFixed(1)} IU <span>=</span> {(clamped / 100).toFixed(3)} mL<i /></div>
    <svg className="syringe-svg" viewBox="0 0 980 210" role="img" aria-label={`Syringe showing ${clamped.toFixed(1)} international units`}>
      <defs><linearGradient id="syringeFill" x1="0" x2="1"><stop offset="0" stopColor="#63A693" stopOpacity=".72"/><stop offset="1" stopColor="#498D7E" stopOpacity=".42"/></linearGradient></defs>
      <path d="M64 78H26L10 88l16 10h38" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={barrelX} y="48" width={barrelWidth} height="82" rx="8" fill="#fff" stroke="currentColor" strokeWidth="4" />
      <rect x={barrelX + 3} y="51" width={Math.max(fillWidth - 3, 0)} height="76" fill="url(#syringeFill)" />
      <rect x="58" y="64" width="20" height="54" rx="5" fill="#dfe3e1" stroke="currentColor" strokeWidth="3" />
      <rect x="854" y="38" width="22" height="102" rx="4" fill="#dfe3e1" stroke="currentColor" strokeWidth="3" />
      <path d="M876 70h56v38h-56" fill="#e7eae8" stroke="currentColor" strokeWidth="3" /><rect x="932" y="62" width="27" height="54" rx="5" fill="#aeb4b1" />
      {ticks.map((tick) => { const x = barrelX + barrelWidth * (tick / capacity); const isMajor = tick % major === 0; return <g key={tick}><line x1={x} y1="130" x2={x} y2={isMajor ? 82 : 100} stroke="currentColor" strokeWidth={isMajor ? 3 : 1.5} />{isMajor && <text x={x} y="158" textAnchor="middle" fontSize="15" fill="currentColor">{tick}</text>}</g>; })}
      <line x1={barrelX + fillWidth} y1="24" x2={barrelX + fillWidth} y2="131" stroke="#0b2f2c" strokeWidth="4" strokeDasharray="6 5" />
      <path d={`M${barrelX + fillWidth - 7} 28h14l-7 10Z`} fill="#0b2f2c" />
      <text x="464" y="190" textAnchor="middle" fontSize="13" fill="#697571">{capacity} IU / {capacity / 100} mL syringe · {major} IU major / 2 IU minor graduations</text>
    </svg>
  </div>;
}
