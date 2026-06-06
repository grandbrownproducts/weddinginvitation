"use client";

import { useEffect, useRef, useState } from "react";

export default function RSVP() {
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      style={{
        padding: "80px 16px",
        background: "linear-gradient(135deg, #3d2b2b 0%, #5c3d3d 50%, #3d2b40 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background text */}
      <div
        className="font-script"
        style={{
          position: "absolute",
          fontSize: 300,
          color: "rgba(255,255,255,0.03)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        RSVP
      </div>

      <div ref={titleRef} className="section-fade" style={{ position: "relative", zIndex: 1 }}>
        <p style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>
          Kindly reply by December 2026
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(42px, 6vw, 64px)", color: "#fff" }}>
          Will You Join Us?
        </h2>
        <div className="gold-divider" />

        {/* WhatsApp contact */}
        <a
          href="https://wa.me/94710149670"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: 20,
            marginBottom: 8,
            background: "#25D366",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: 50,
            textDecoration: "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(37,211,102,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)";
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.852L0 24l6.266-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.578 9.578 0 01-4.928-1.362l-.352-.21-3.72.904.95-3.63-.23-.373A9.556 9.556 0 012.4 12c0-5.294 4.306-9.6 9.6-9.6s9.6 4.306 9.6 9.6-4.306 9.6-9.6 9.6z"/>
          </svg>
          Chat on WhatsApp · 0710149670
        </a>

        {submitted ? (
          <div
            style={{
              maxWidth: 500,
              margin: "48px auto 0",
              padding: "48px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              borderRadius: 20,
              border: "1px solid rgba(201,169,110,0.3)",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 20 }}>💌</div>
            <h3 className="font-script" style={{ fontSize: 40, color: "#fff", marginBottom: 12 }}>
              Thank you, {form.name}!
            </h3>
            <p className="font-serif" style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontStyle: "italic" }}>
              {form.attending === "yes"
                ? "We are so excited to celebrate our special day with you! See you on 10 January 2027. 🎉"
                : "We will miss you on our special day, but thank you for letting us know."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: 560,
              width: "100%",
              margin: "40px auto 0",
              padding: "32px 20px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: 20,
              border: "1px solid rgba(201,169,110,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              textAlign: "left",
            }}
          >
            <div>
              <label className="font-serif" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Full Name *
              </label>
              <input
                required
                className="rsvp-input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="font-serif" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Contact Number
              </label>
              <input
                type="tel"
                className="rsvp-input"
                placeholder="0710000000"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="rsvp-row">
              <div>
                <label className="font-serif" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Attending?
                </label>
                <select
                  className="rsvp-input"
                  value={form.attending}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                >
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>
              <div>
                <label className="font-serif" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  No. of Guests
                </label>
                <select
                  className="rsvp-input"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                >
                  {["1", "2", "3", "4"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-serif" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                A Message for the Couple
              </label>
              <textarea
                className="rsvp-input"
                placeholder="Share your wishes..."
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #c9a96e, #d4b88a)",
                color: "#3d2b2b",
                border: "none",
                borderRadius: 8,
                padding: "16px 32px",
                fontSize: 15,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(201,169,110,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
                (e.target as HTMLElement).style.boxShadow = "0 8px 28px rgba(201,169,110,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
                (e.target as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,169,110,0.4)";
              }}
            >
              Send RSVP ✉️
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
