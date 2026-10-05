import VitalisLogo from "@/components/VitalisLogo";

export default function ComingSoon() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--ink)",
      color: "white",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.06,
        backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
      }} aria-hidden="true" />

      {/* Glow */}
      <div style={{
        position: "absolute",
        width: "560px",
        height: "560px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(73,141,126,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} aria-hidden="true" />

      <div style={{ position: "relative", textAlign: "center", maxWidth: "560px" }}>
        <div style={{ width: "160px", marginBottom: "56px" }}>
          <VitalisLogo tone="light" />
        </div>

        <p style={{
          margin: "0 0 20px",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: ".24em",
          color: "var(--sage)",
          fontWeight: 700,
        }}>
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--sage)", marginRight: "10px", verticalAlign: "middle" }} />
          Coming soon
        </p>

        <h1 style={{
          margin: "0 0 28px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(42px, 6vw, 72px)",
          lineHeight: 0.92,
          letterSpacing: "-.045em",
          fontWeight: 400,
        }}>
          Something<br /><em style={{ color: "#d4eee4" }}>precise</em><br />is coming.
        </h1>

        <p style={{
          margin: "0 auto",
          maxWidth: "400px",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "rgba(255,255,255,.65)",
        }}>
          Vitalis is putting the finishing touches on a cleaner approach to research compounds — batch-level documentation, third-party testing, and Canadian fulfilment.
        </p>

        <div style={{
          marginTop: "52px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(255,255,255,.12)",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}>
          {["99%+ tested purity", "Batch-level COAs", "Canadian support"].map((item) => (
            <p key={item} style={{
              margin: 0,
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: ".18em",
              color: "rgba(255,255,255,.45)",
              fontWeight: 700,
            }}>{item}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
