"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What forms do your products come in (lyophilized vs. liquid)?",
    answer: "Our products are supplied in lyophilized (freeze-dried) form for stability during storage and shipping. We store and ship products in lyophilized form whenever possible so they remain more stable in transit and arrive in the best condition.",
    defaultOpen: true,
  },
  {
    question: "Do you provide COAs / third-party testing?",
    answer: "Yes. Every batch we sell undergoes third-party testing for purity, identity, and safety. Certificates of Analysis (COAs) are available for each product and batch. You can verify your batch's COA directly at our verification portal.",
  },
  {
    question: "How fast do you ship, and is shipping tracked?",
    answer: "We typically ship within 1-2 business days. Standard shipping takes 1-3 business days within Canada. All orders are shipped with tracking so you can monitor your package every step of the way.",
  },
  {
    question: "Where do you ship?",
    answer: "We currently ship across Canada. All orders are dispatched from our Canadian facility, ensuring fast delivery times and compliance with Canadian regulations.",
  },
  {
    question: "How are orders packaged?",
    answer: "Orders are packed discreetly in plain packaging with no indication of contents on the outside. Products are packed with appropriate cold-chain materials when required to maintain product integrity during transit.",
  },
  {
    question: "Why is cold storage so important?",
    answer: "Peptides are sensitive molecules that can degrade when exposed to heat, light, or moisture. Cold storage (2-8°C) significantly extends the shelf life of lyophilized peptides. Improper storage can lead to loss of potency and research reliability.",
  },
  {
    question: "How do you store and handle products before shipping?",
    answer: "All products are stored in climate-controlled conditions at 2-8°C. Our facility maintains strict temperature monitoring and handling protocols to ensure products maintain their integrity from manufacture to delivery.",
  },
  {
    question: "How should I store my products when they arrive?",
    answer: "Lyophilized peptides should be stored in the refrigerator (2-8°C), protected from light.",
  },
  {
    question: "What if there is a problem with my order?",
    answer: "If you experience any issues with your order, please contact us immediately at our support email or phone number. We are committed to resolving any problems quickly and ensuring your satisfaction.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, Mastercard, American Express) and e-Transfer. Unlike many other suppliers, we do NOT require Bitcoin or cryptocurrency for payment.",
  },
  {
    question: "Do your products contain fillers?",
    answer: "No. Our peptides are supplied as pure lyophilized compounds with no fillers, binders, or additives. What you receive is the pure peptide compound, accurately labeled and documented.",
  },
  {
    question: "Is my information kept private?",
    answer: "Yes. We take privacy very seriously. Your personal information is never sold or shared with third parties. All transactions are processed securely, and your order information is kept confidential.",
  },
  {
    question: "Can I become an affiliate or partner?",
    answer: "Yes! We have an affiliate program available. Please contact us through our contact page or email to discuss partnership opportunities and commission structures.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {/* Header */}
      <div style={{ padding: "60px 24px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Prompt', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 72px)",
            color: "#061406",
            marginBottom: 16,
          }}>
            FAQs
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#061406" }}>
            Frequently Asked Questions
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 48 }}>
            We&apos;re big on clarity and consistency. This page covers the questions we hear most—from ordering and delivery to product format and general handling information. If you don&apos;t see what you&apos;re looking for, contact us and we&apos;ll point you in the right direction.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div style={{ background: "#b8d8e2", padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "24px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#061406",
                  lineHeight: 1.4,
                }}>
                  {faq.question}
                </span>
                <span style={{
                  flexShrink: 0,
                  fontSize: 20,
                  color: "#061406",
                  fontWeight: 300,
                  lineHeight: 1,
                }}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div style={{
                  paddingBottom: 24,
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
