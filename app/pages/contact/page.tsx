"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px 80px" }}>
      <h1 style={{
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(40px, 6vw, 72px)",
        color: "#061406",
        marginBottom: 20,
      }}>
        Contact
      </h1>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "#374151",
        lineHeight: 1.7,
        marginBottom: 40,
      }}>
        At Vitalis, we believe trust is built through communication that&apos;s fast, clear, and human. If you have a question about an order, need documentation, or want to confirm product details or availability, our team is here to help.
      </p>

      {submitted ? (
        <div style={{
          background: "#d1fae5",
          border: "1px solid #6ee7b7",
          borderRadius: 8,
          padding: 24,
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#065f46" }}>
            Thank you! We&apos;ll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#061406",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#6d9fab")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email*"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#061406",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#6d9fab")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid #d1d5db",
                borderRadius: 4,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                boxSizing: "border-box",
                color: "#061406",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6d9fab")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <textarea
              placeholder="Comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={6}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid #d1d5db",
                borderRadius: 4,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
                color: "#061406",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6d9fab")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#6d9fab",
              color: "white",
              border: "none",
              padding: "14px 36px",
              borderRadius: 4,
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4a7d8b")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#6d9fab")}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
