export default function TermsPage() {
  const sections = [
    {
      heading: "Disclaimer",
      content: "The information on this website is provided to clearly define the intended use, limitations, and legal boundaries associated with all products offered by Your Health Supply. These guidelines apply to all website visitors, purchasers, affiliates, and partners.",
    },
    {
      heading: "Research Use Only",
      content: "All products supplied by Your Health Supply are intended solely for laboratory research use by qualified professionals. They are not designed, sold, or approved for:",
      bullets: [
        "Human use",
        "Animal use",
        "Diagnostic or therapeutic applications",
        "Cosmetic, dietary, or wellness purposes",
        "Ingestion, injection, inhalation, or topical application",
      ],
      footer: "Any form of direct personal use is strictly prohibited.",
    },
    {
      heading: "No Medical, Therapeutic, or Veterinary Advice",
      content: "Nothing on this website—including product descriptions, educational content, emails, or customer communication—constitutes:",
      bullets: [
        "Medical advice",
        "Health or treatment guidance",
        "Veterinary recommendations",
        "Usage instructions or protocols",
      ],
      footer: "Your Health Supply does not endorse, recommend, or permit the use of any product as a drug, supplement, therapy, or cosmetic ingredient.",
    },
    {
      heading: "No Dosing or Usage Guidance Provided",
      content: "We do not offer:",
      bullets: [
        "Dosing instructions",
        "Reconstitution or preparation guidelines",
        "Research protocols",
        "Application methods",
        "Outcome expectations",
      ],
      footer: "Our sole role is the supply of clearly labeled, research-grade compounds.",
    },
    {
      heading: "Purchaser Responsibilities",
      content: "By purchasing from Your Health Supply, you confirm and agree that:",
      bullets: [
        "You understand the products are for laboratory research use only",
        "You are a qualified purchaser working within appropriate research frameworks",
        "You will comply with all applicable laws and regulations in your jurisdiction",
        "You will not use, distribute, or apply these products in any prohibited manner",
      ],
      footer: "All responsibility for legal compliance rests with the purchaser.",
    },
    {
      heading: "No Guarantees of Suitability for Non-Research Purposes",
      content: "Your Health Supply makes no claims or guarantees regarding the suitability, safety, or effectiveness of any product for any purpose outside laboratory research.",
    },
    {
      heading: "Quality, Handling, and Storage Standards",
      content: "While products are handled under structured internal procedures—including cold storage, labeling, and clean packaging—research materials inherently require careful handling by the end user. It is the purchaser's responsibility to ensure proper:",
      bullets: [
        "Storage",
        "Handling",
        "Experimental environment",
        "Disposal under their facility's guidelines",
      ],
    },
    {
      heading: "No Liability for Misuse",
      content: "Your Health Supply is not liable for:",
      bullets: [
        "Improper use or handling of research materials",
        "Misinterpretation of content on this website",
        "Unauthorized application or administration",
        "Outcomes, injuries, or damages arising from misuse or prohibited use",
      ],
      footer: "Any application outside the stated research-only boundary is strictly at the purchaser's own risk.",
    },
    {
      heading: "Affiliate & Partner Compliance",
      content: "Affiliates and partners must:",
      bullets: [
        "Use research-only messaging",
        "Avoid any claims implying human use, results, or medical effects",
        "Follow the Your Health Supply Affiliate Compliance Agreement",
      ],
      footer: "Failure to comply may result in immediate removal from the program.",
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(32px, 5vw, 52px)",
        color: "#061406",
        marginBottom: 12,
      }}>
        Terms of service
      </h1>
      <h2 style={{
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 600,
        fontSize: 22,
        color: "#061406",
        marginBottom: 40,
      }}>
        Disclaimer
      </h2>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        color: "#374151",
        lineHeight: 1.7,
        marginBottom: 48,
        maxWidth: 680,
      }}>
        The information on this website is provided to clearly define the intended use, limitations,
        and legal boundaries associated with all products offered by Your Health Supply. These
        guidelines apply to all website visitors, purchasers, affiliates, and partners.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {sections.slice(1).map((section) => (
          <div key={section.heading}>
            <h3 style={{
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#061406",
              marginBottom: 12,
            }}>
              {section.heading}
            </h3>
            {section.content && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#374151",
                lineHeight: 1.7,
                marginBottom: section.bullets ? 12 : 0,
              }}>
                {section.content}
              </p>
            )}
            {section.bullets && (
              <ul style={{ paddingLeft: 24, margin: "0 0 12px" }}>
                {section.bullets.map((b) => (
                  <li key={b} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "#374151",
                    lineHeight: 1.7,
                    marginBottom: 4,
                  }}>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {section.footer && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#374151",
                lineHeight: 1.7,
              }}>
                {section.footer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
