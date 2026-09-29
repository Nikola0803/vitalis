"use client";
import { useState } from "react";

export default function AffiliatesPage() {
  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(32px, 5vw, 52px)",
        color: "#061406",
        marginBottom: 24,
      }}>
        Affiliate Request
      </h1>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        color: "#374151",
        lineHeight: 1.7,
        marginBottom: 48,
        maxWidth: 600,
      }}>
        We keep our affiliate network small and quality-focused. Share a few details below so we can
        confirm alignment. Approved partners receive a referral link/code, resources, and a simple
        setup to start earning.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {/* Form */}
        <div>
          {submitted ? (
            <div style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: 8,
              padding: 24,
              textAlign: "center",
            }}>
              <p style={{ color: "#166534", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                Thank you! We&apos;ll review your request and respond within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Full Name", key: "name", placeholder: "Your name", type: "text" },
                { label: "Email", key: "email", placeholder: "your@email.com", type: "email" },
                { label: "Website / Social Media", key: "website", placeholder: "https://", type: "url" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#061406",
                    marginBottom: 6,
                  }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid #d1d5db",
                      borderRadius: 4,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#061406",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#061406",
                  marginBottom: 6,
                }}>
                  Tell us about yourself
                </label>
                <textarea
                  placeholder="Brief description of your platform and audience..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#061406",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "#6d9fab",
                  color: "white",
                  border: "none",
                  padding: "14px 32px",
                  borderRadius: 4,
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Submit Request
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h2 style={{
            fontFamily: "'Prompt', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#061406",
            marginBottom: 20,
          }}>
            Customer Support
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Customer Service", value: "info@vitalisbioscience.ca" },
              { label: "Billing", value: "finance@vitalisbiosciences.ca" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b7280", margin: "0 0 2px" }}>
                  {label}
                </p>
                <a href={`mailto:${value}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6d9fab", textDecoration: "none" }}>
                  {value}
                </a>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#374151",
            lineHeight: 1.6,
            marginTop: 24,
          }}>
            We aim to respond within one business day, with priority given to shipment issues,
            order verification, and research documentation requests.
          </p>

          <div style={{ marginTop: 24 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b7280", margin: "0 0 4px" }}>
              Hours of Operation
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#061406", margin: 0 }}>
              Monday–Friday<br />9:00 AM – 5:00 PM (EST)
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b7280", margin: "0 0 4px" }}>
              Head Office
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#061406", margin: 0 }}>
              556 Bryne Dr, Barrie, ON L4N 9P6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
