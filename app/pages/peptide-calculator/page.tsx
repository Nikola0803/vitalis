"use client";
import { useState, useRef, useEffect } from "react";

const PEPTIDES: Record<string, { label: string; pepMg: number; bac: number; dose: number }> = {
  reta5:       { label: "Retatrutide 5mg",                                pepMg: 5,   bac: 2,  dose: 0.5  },
  reta10:      { label: "Retatrutide 10mg",                               pepMg: 10,  bac: 2,  dose: 0.5  },
  reta20:      { label: "Retatrutide 20mg",                               pepMg: 20,  bac: 2,  dose: 1    },
  cjc_ipa10:   { label: "CJC + Ipamorelin (10mg)",                        pepMg: 10,  bac: 2,  dose: 0.25 },
  glow70:      { label: "GLOW70",                                          pepMg: 70,  bac: 5,  dose: 0.5  },
  klow80:      { label: "KLOW80",                                          pepMg: 80,  bac: 5,  dose: 0.5  },
  wolverine10: { label: "Wolverine 10 (BPC-157 5mg + TB-500 5mg)",        pepMg: 10,  bac: 2,  dose: 0.25 },
  wolverine20: { label: "Wolverine 20 (BPC-157 10mg + TB-500 10mg)",      pepMg: 20,  bac: 2,  dose: 0.5  },
  bpc5:        { label: "BPC-157 5mg",                                     pepMg: 5,   bac: 2,  dose: 0.25 },
  bpc10:       { label: "BPC-157 10mg",                                    pepMg: 10,  bac: 2,  dose: 0.25 },
  cjc5:        { label: "CJC-1295 5mg",                                    pepMg: 5,   bac: 2,  dose: 0.1  },
  cjc10:       { label: "CJC-1295 10mg",                                   pepMg: 10,  bac: 2,  dose: 0.1  },
  dsip10:      { label: "DSIP 10mg",                                       pepMg: 10,  bac: 2,  dose: 0.1  },
  epi10:       { label: "Epithalon 10mg",                                  pepMg: 10,  bac: 1,  dose: 0.1  },
  ghkcu50:     { label: "GHK-Cu 50mg",                                     pepMg: 50,  bac: 5,  dose: 0.5  },
  ghkcu100:    { label: "GHK-Cu 100mg",                                    pepMg: 100, bac: 10, dose: 1    },
  igf1:        { label: "IGF-1 LR3 1mg",                                   pepMg: 1,   bac: 1,  dose: 0.05 },
  ipa10:       { label: "Ipamorelin 10mg",                                  pepMg: 10,  bac: 2,  dose: 0.1  },
  kpv10:       { label: "KPV 10mg",                                         pepMg: 10,  bac: 2,  dose: 0.1  },
  motsc10:     { label: "MOTS-c 10mg",                                      pepMg: 10,  bac: 2,  dose: 0.1  },
  nad500:      { label: "NAD+ 500mg",                                       pepMg: 500, bac: 10, dose: 50   },
  nad1000:     { label: "NAD+ 1000mg",                                      pepMg: 1000,bac: 20, dose: 50   },
  tb500_10:    { label: "TB-500 10mg",                                      pepMg: 10,  bac: 2,  dose: 0.25 },
};

const reconstitutionTips = [
  { icon: "🌡️", title: "Bring to room temperature first", desc: "Allow both the peptide vial and BAC water to reach room temperature before reconstituting. Cold liquids can cause peptide aggregation and uneven mixing." },
  { icon: "💧", title: "Add BAC water slowly", desc: "Draw the BAC water into your syringe and inject it gently down the side of the peptide vial — not directly onto the powder. This prevents foaming and peptide degradation." },
  { icon: "🔄", title: "Swirl, never shake", desc: "Gently roll the vial between your palms or swirl in slow circles until the powder is fully dissolved. Vigorous shaking creates air bubbles and can break peptide bonds." },
  { icon: "⏳", title: "Give it time to dissolve", desc: "Some peptides (especially larger ones like TB-500) may take several minutes to fully dissolve. Be patient — if the liquid is still cloudy after gentle swirling, wait a few more minutes before drawing." },
  { icon: "🧊", title: "Refrigerate promptly", desc: "Once reconstituted, store your peptide vial in the refrigerator (2–8°C) immediately. Most reconstituted peptides remain stable for 4–6 weeks when refrigerated." },
  { icon: "🌑", title: "Protect from light", desc: "UV and direct light degrade peptides rapidly. Keep vials in their original box or wrap in foil when not in use. Never leave a reconstituted vial on a counter in sunlight." },
  { icon: "🧴", title: "Use bacteriostatic water only", desc: "Always use bacteriostatic water (BAC water with 0.9% benzyl alcohol) — not sterile water. The benzyl alcohol prevents bacterial growth and significantly extends shelf life after reconstitution." },
  { icon: "⚠️", title: "Use enough BAC water", desc: "Adding insufficient BAC water may lead to incomplete reconstitution, leaving undissolved peptide powder in the vial and making your dosing inaccurate. Stick to the recommended amount for your vial." },
  { icon: "🔬", title: "Clean technique every time", desc: "Wipe the rubber stopper of both vials with an alcohol swab before every insertion. Use a fresh needle to draw — never reuse needles between vials or injections." },
  { icon: "📅", title: "Label your vials", desc: "Write the reconstitution date on each vial with a marker. Discard any reconstituted peptide older than 6 weeks, even if it looks clear — potency degrades over time." },
  { icon: "❄️", title: "Never freeze reconstituted peptides", desc: "Freezing a reconstituted peptide can cause ice crystals to form and permanently damage the peptide structure. Lyophilized (dry) powder can be frozen, but once mixed — refrigerate only." },
];

function fmt(val: number, dec: number) {
  return val.toFixed(dec).replace(/\.?0+$/, "") || "0";
}

function drawSyringe(canvas: HTMLCanvasElement, fillUnits: number, maxIU: number) {
  const majorEvery = maxIU === 50 ? 5 : 10;
  const minorEvery = maxIU === 50 ? 1 : 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const W = 600, H = 230;
  if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  const labelCol = "#373737";
  const teal = "#282828", tealDim = "#737373", tealDark = "#111111";
  const text2 = "#303030", text3 = "#595959";
  const fillCol = "#c5c5c5";
  const bg2 = "#e8e8e8", bg3 = "#cfcfcf";
  const needleEndX = 70, plungerX = 510;
  const bW = plungerX - needleEndX;
  const bY = 68, bH = 52, bMid = bY + bH / 2;
  const clamp = Math.max(0, Math.min(fillUnits || 0, maxIU));
  const fraction = clamp / maxIU;

  // needle shaft
  ctx.strokeStyle = labelCol; ctx.lineWidth = 3; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(needleEndX, bMid); ctx.lineTo(needleEndX - 48, bMid); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(needleEndX - 46, bMid - 5); ctx.lineTo(needleEndX - 52, bMid); ctx.stroke();

  // needle hub
  ctx.fillStyle = bg3; ctx.strokeStyle = tealDim; ctx.lineWidth = 1.5;
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(needleEndX - 10, bY + 10, 14, bH - 20, 3);
  ctx.fill(); ctx.stroke();

  // barrel
  ctx.fillStyle = "#ffffff"; ctx.strokeStyle = labelCol; ctx.lineWidth = 2.5;
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(needleEndX, bY, bW, bH, 4);
  ctx.fill(); ctx.stroke();

  // fill
  if (fraction > 0) {
    ctx.save();
    ctx.beginPath();
    (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(needleEndX, bY, bW, bH, 4);
    ctx.clip();
    ctx.fillStyle = fillCol;
    ctx.fillRect(needleEndX, bY, fraction * bW, bH);
    ctx.restore();
  }

  // ticks
  for (let iu = 0; iu <= maxIU; iu += minorEvery) {
    const x = needleEndX + (iu / maxIU) * bW;
    const maj = iu % majorEvery === 0;
    ctx.strokeStyle = maj ? teal : tealDim;
    ctx.lineWidth = maj ? 2.2 : 1.2;
    ctx.lineCap = "butt";
    ctx.beginPath(); ctx.moveTo(x, bY + bH); ctx.lineTo(x, bY + bH - (maj ? bH * 0.72 : bH * 0.35)); ctx.stroke();
  }

  // IU labels
  ctx.fillStyle = text2; ctx.font = '500 13px "DM Mono",monospace';
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  for (let l = 0; l <= maxIU; l += majorEvery) {
    ctx.fillText(String(l), needleEndX + (l / maxIU) * bW, bY + bH + 7);
  }

  // plunger flange
  ctx.fillStyle = bg3; ctx.strokeStyle = tealDim; ctx.lineWidth = 2;
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(plungerX + 4, bY - 8, 14, bH + 16, 3);
  ctx.fill(); ctx.stroke();

  // rod
  ctx.fillStyle = bg2; ctx.strokeStyle = tealDim; ctx.lineWidth = 2;
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(plungerX + 18, bMid - 6, 20, 12, 2);
  ctx.fill(); ctx.stroke();

  // thumb
  ctx.fillStyle = "#929292";
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(plungerX + 38, bMid - 10, 14, 20, 3);
  ctx.fill();

  // callout
  if (fraction > 0) {
    const ax = needleEndX + fraction * bW;
    ctx.setLineDash([4, 3]); ctx.strokeStyle = teal; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ax, bY - 4); ctx.lineTo(ax, bY - 26); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = teal;
    ctx.beginPath(); ctx.moveTo(ax, bY - 4); ctx.lineTo(ax - 5, bY - 13); ctx.lineTo(ax + 5, bY - 13); ctx.closePath(); ctx.fill();
    const lbl = fmt(clamp, 1) + " IU  =  " + fmt(clamp / 100, 3) + " mL";
    ctx.font = '500 13px "DM Mono",monospace';
    const tw = ctx.measureText(lbl).width;
    const lx = Math.min(Math.max(ax - tw / 2 - 8, 2), W - tw - 20);
    const ly = bY - 52;
    ctx.fillStyle = tealDark; ctx.beginPath();
    (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(lx, ly, tw + 16, 24, 5);
    ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(lbl, lx + 8, ly + 12);
  }

  // syringe capacity label
  ctx.fillStyle = text3; ctx.font = '400 11px "DM Sans",sans-serif'; ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText(`${maxIU} IU / ${(maxIU / 100).toFixed(1)} mL syringe — ${majorEvery} IU major / ${minorEvery} IU minor graduations`, W / 2, bY + bH + 30);

  // legend
  const ly2 = bY + bH + 62;
  ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.font = '400 11px "DM Sans",sans-serif';
  ctx.strokeStyle = teal; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(30, ly2 - 7); ctx.lineTo(30, ly2 + 7); ctx.stroke();
  ctx.fillStyle = text3; ctx.fillText(`= ${majorEvery} IU (major)`, 37, ly2);
  ctx.strokeStyle = tealDim; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(190, ly2 - 4); ctx.lineTo(190, ly2 + 4); ctx.stroke();
  ctx.fillStyle = text3; ctx.fillText(`= ${minorEvery} IU (minor)`, 197, ly2);
  ctx.fillStyle = fillCol; ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(355, ly2 - 6, 13, 13, 2);
  ctx.fill();
  ctx.fillStyle = text3; ctx.fillText("= your dose", 372, ly2);
}

export default function PeptideCalculatorPage() {
  const [selectedKey, setSelectedKey] = useState("");
  const [peptideAmount, setPeptideAmount] = useState("");
  const [bacWater, setBacWater] = useState("");
  const [doseAmount, setDoseAmount] = useState("");
  const [syringeMax, setSyringeMax] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pepMg = parseFloat(peptideAmount);
  const bacMl = parseFloat(bacWater);
  const doseMg = parseFloat(doseAmount);

  const result = (() => {
    if (!pepMg || !bacMl || !doseMg || pepMg <= 0 || bacMl <= 0 || doseMg <= 0) return null;
    const conc = pepMg / bacMl;
    const volMl = doseMg / conc;
    const units = volMl * 100;
    const dosesPerVial = pepMg / doseMg;
    return { volMl, units, dosesPerVial };
  })();

  useEffect(() => {
    if (!canvasRef.current) return;
    drawSyringe(canvasRef.current, result?.units ?? 0, syringeMax);
  }, [result, syringeMax]);

  const handlePeptideSelect = (key: string) => {
    setSelectedKey(key);
    if (key && PEPTIDES[key]) {
      const p = PEPTIDES[key];
      setPeptideAmount(String(p.pepMg));
      setBacWater(String(p.bac));
      setDoseAmount(String(p.dose));
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    color: "#061406",
    background: "white",
  };

  const sectionStyle: React.CSSProperties = {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "24px",
    marginBottom: 16,
  };

  const capText = result
    ? result.units > syringeMax
      ? `Draw to the ${fmt(syringeMax, 1)} IU mark — ⚠ dose exceeds this syringe. Switch to 100 IU syringe.`
      : `Draw to the ${fmt(result.units, 1)} IU mark (${fmt(result.volMl, 3)} mL)`
    : "Enter values above to see draw position";

  const warnText = result && result.units < 5
    ? `⚠ Draw volume is ${fmt(result.units, 1)} IU — below 5 IU, which is difficult to measure accurately. Try increasing your BAC water amount.`
    : result && result.units > 50
    ? `⚠ Draw volume is ${fmt(result.units, 1)} IU — above 50 IU, which may be uncomfortable.`
    : null;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 style={{
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(32px, 5vw, 56px)",
        color: "#061406",
        marginBottom: 6,
      }}>
        Peptide Calculator
      </h1>
      <p style={{ color: "#6b7280", fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 40 }}>
        For Research Purposes Only
      </p>

      {/* Peptide Selection */}
      <div style={sectionStyle}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1px", color: "#9ca3af", marginBottom: 12 }}>
          PEPTIDE SELECTION — optional
        </p>
        <label style={{ fontSize: 13, color: "#374151", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 8 }}>
          Select a peptide to auto-fill amount &amp; see dose range
        </label>
        <select
          value={selectedKey}
          onChange={(e) => handlePeptideSelect(e.target.value)}
          style={{ ...inputStyle, appearance: "none" as const }}
        >
          <option value="">— Skip or choose a peptide —</option>
          {Object.entries(PEPTIDES).map(([key, p]) => (
            <option key={key} value={key}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Reconstitution */}
      <div style={sectionStyle}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1px", color: "#9ca3af", marginBottom: 16 }}>
          RECONSTITUTION
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: "#374151", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 8 }}>
              Peptide amount
            </label>
            <div style={{ position: "relative" }}>
              <input type="number" placeholder="e.g. 5" value={peptideAmount}
                onChange={(e) => setPeptideAmount(e.target.value)}
                style={{ ...inputStyle, paddingRight: 40 }} />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9ca3af" }}>mg</span>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#374151", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 8 }}>
              BAC water added
            </label>
            <div style={{ position: "relative" }}>
              <input type="number" placeholder="e.g. 2" value={bacWater}
                onChange={(e) => setBacWater(e.target.value)}
                style={{ ...inputStyle, paddingRight: 40 }} />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9ca3af" }}>mL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desired Dose */}
      <div style={sectionStyle}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1px", color: "#9ca3af", marginBottom: 16 }}>
          DESIRED DOSE
        </p>
        <label style={{ fontSize: 13, color: "#374151", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 8 }}>
          Dose amount
        </label>
        <div style={{ position: "relative" }}>
          <input type="number" placeholder="e.g. 0.250" value={doseAmount}
            onChange={(e) => setDoseAmount(e.target.value)}
            style={{ ...inputStyle, paddingRight: 40 }} />
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9ca3af" }}>mg</span>
        </div>
      </div>

      {/* Syringe Visualization */}
      <div style={sectionStyle}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1px", color: "#9ca3af", marginBottom: 12 }}>
          SYRINGE VISUALIZATION
        </p>
        {/* Syringe type toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 10, padding: 4, width: "fit-content" }}>
          <button
            onClick={() => setSyringeMax(100)}
            style={{
              borderRadius: 7, padding: "6px 16px", fontSize: 12, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", cursor: "pointer", border: "none", transition: "0.15s",
              background: syringeMax === 100 ? "#6d9fab" : "transparent",
              color: syringeMax === 100 ? "white" : "#6b7280",
            }}
          >
            1 mL · 100 IU
          </button>
          <button
            onClick={() => setSyringeMax(50)}
            style={{
              borderRadius: 7, padding: "6px 16px", fontSize: 12, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", cursor: "pointer", border: "none", transition: "0.15s",
              background: syringeMax === 50 ? "#6d9fab" : "transparent",
              color: syringeMax === 50 ? "white" : "#6b7280",
            }}
          >
            ½ mL · 50 IU
          </button>
        </div>

        <canvas
          ref={canvasRef}
          style={{ width: "100%", maxWidth: 600, display: "block" }}
        />
        <div style={{ fontSize: 12, color: "#595959", marginTop: 8, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
          {capText}
        </div>

        {warnText && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 6, fontSize: 13, color: "#92400e", fontFamily: "'DM Sans', sans-serif" }}>
            {warnText}
          </div>
        )}

        {result && (
          <div style={{ marginTop: 16, padding: "16px", background: "#f9fafb", borderRadius: 6, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Desired dose", value: `${fmt(doseMg, 3)} mg` },
                { label: "Concentration", value: `${fmt(pepMg / bacMl, 2)} mg/mL` },
                { label: "Draw volume", value: `${fmt(result.volMl, 3)} mL (${fmt(result.units, 1)} IU)` },
                { label: "Doses per vial", value: `${Math.floor(result.dosesPerVial)} doses` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9ca3af", margin: "0 0 2px", letterSpacing: "0.5px" }}>{label.toUpperCase()}</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#061406", margin: 0, fontWeight: 600 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reconstitution Tips */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 24, marginBottom: 24, color: "#061406" }}>
          RECONSTITUTION TIPS
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {reconstitutionTips.map((tip) => (
            <div key={tip.title} style={{
              display: "flex",
              gap: 14,
              background: "#f9fafb",
              borderRadius: 8,
              padding: "16px 20px",
              alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{tip.icon}</span>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#061406", margin: "0 0 4px" }}>
                  {tip.title}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9ca3af", marginTop: 24, lineHeight: 1.6, textAlign: "center" }}>
          ⚠ For research and educational purposes only. Not medical advice.<br />
          Anecdotal ranges reflect community-reported figures — not clinical recommendations.<br />
          Always verify calculations independently before administering any compound.
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
