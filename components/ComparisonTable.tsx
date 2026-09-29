export default function ComparisonTable() {
  const rows = [
    { feature: "Canadian GMP Manufactured", them: false, us: true, themText: null, usText: null },
    { feature: "Canadian Raw Ingredients (API's)", them: false, us: true, themText: null, usText: null },
    { feature: "Canadian Certified Lab Testing", them: false, us: true, themText: null, usText: null },
    { feature: "Accessible Original Lab Results", them: false, us: true, themText: null, usText: null },
    { feature: "Third-Party Purity Testing", them: false, us: true, themText: null, usText: null },
    { feature: "Payment Methods", them: null, us: null, themText: "Bit-Coin & E-Transfer", usText: "Major Credit Cards & E-Transfer" },
    { feature: "Live Support", them: null, us: null, themText: "None", usText: "Canadian Phone & Email Support" },
    { feature: "Shipping speed", them: null, us: null, themText: "7-14 Days", usText: "1-3 Days" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: 42, textAlign: "center", marginBottom: 8 }}>
        Why Choose Our Peptides
      </h2>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 40, fontFamily: "'DM Sans', sans-serif" }}>
        See how we compare to other suppliers
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "12px 0", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1px", color: "#9ca3af", borderBottom: "1px solid #e5e7eb" }}></th>
            <th style={{ textAlign: "center", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1px", color: "#9ca3af", borderBottom: "1px solid #e5e7eb" }}>
              MOST SUPPLIERS
            </th>
            <th style={{ textAlign: "center", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1px", color: "#061406", borderBottom: "1px solid #e5e7eb" }}>
              OUR PEPTIDES
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "18px 0", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#061406" }}>
                {row.feature}
              </td>
              <td style={{ textAlign: "center", padding: "18px 24px" }}>
                {row.themText !== null ? (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9ca3af" }}>{row.themText}</span>
                ) : row.them === false ? (
                  <span style={{ color: "#ef4444", fontSize: 20 }}>✕</span>
                ) : (
                  <span style={{ color: "#10b981", fontSize: 20, fontWeight: 700 }}>✓</span>
                )}
              </td>
              <td style={{ textAlign: "center", padding: "18px 24px" }}>
                {row.usText !== null ? (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#061406", fontWeight: 500 }}>{row.usText}</span>
                ) : row.us === false ? (
                  <span style={{ color: "#ef4444", fontSize: 20 }}>✕</span>
                ) : (
                  <span style={{ color: "#10b981", fontSize: 22, fontWeight: 700 }}>✓</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
