"use client";

import { useEffect, useRef } from "react";

export default function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="location" style={{ padding: "80px 16px", background: "linear-gradient(180deg, #f5efe8 0%, #faf7f4 100%)", textAlign: "center" }}>
      <div ref={ref} className="section-fade">
        <p className="font-serif" style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>
          Venue Location
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(38px, 8vw, 64px)", color: "#3d2b2b" }}>
          Find Us Here
        </h2>
        <div className="ornament-line" style={{ maxWidth: 300, margin: "0 auto" }}>
          <span style={{ color: "#c9a96e", fontSize: 16 }}>📍</span>
        </div>

        {/* Venue card */}
        <div className="venue-card" style={{ maxWidth: 860, margin: "0 auto 28px" }}>
          <div>
            <p className="font-script" style={{ fontSize: 26, color: "#3d2b2b", marginBottom: 4 }}>Grand Wedding Hall</p>
            <p className="font-serif" style={{ color: "#7a5c5c", fontSize: 14 }}>📍 Colombo 03, Sri Lanka</p>
          </div>
          <div className="venue-divider">
            <p className="font-serif" style={{ color: "#a89090", fontSize: 12, marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>Ceremony</p>
            <p className="font-serif" style={{ color: "#3d2b2b", fontSize: 15, fontWeight: 600 }}>9:00 AM — 12:00 PM</p>
            <p className="font-serif" style={{ color: "#a89090", fontSize: 12, marginTop: 10, marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>Reception Lunch</p>
            <p className="font-serif" style={{ color: "#3d2b2b", fontSize: 15, fontWeight: 600 }}>12:00 PM onwards</p>
          </div>
          <div className="venue-divider">
            <p className="font-serif" style={{ color: "#a89090", fontSize: 12, marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>Date</p>
            <p className="font-script" style={{ color: "#3d2b2b", fontSize: 24 }}>10 January 2027</p>
          </div>
        </div>

        {/* Map */}
        <div style={{
          maxWidth: 860, margin: "0 auto",
          borderRadius: 16, overflow: "hidden",
          boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
          border: "3px solid rgba(201,169,110,0.25)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 10, left: 10, zIndex: 10,
            background: "rgba(255,255,255,0.95)", borderRadius: 10,
            padding: "7px 12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 14 }}>💍</span>
            <span className="font-serif" style={{ fontSize: 12, color: "#3d2b2b", fontWeight: 600 }}>Vihanga & Sandali</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.71050822218!2d79.8211540!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue"
          />
        </div>

        <a
          href="https://maps.google.com/?q=Colombo,Sri+Lanka"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24,
            background: "linear-gradient(135deg, #c9a96e, #d4b88a)",
            color: "#3d2b2b", padding: "14px 28px", borderRadius: 50,
            textDecoration: "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15, fontWeight: 600, letterSpacing: 1.5,
            boxShadow: "0 4px 20px rgba(201,169,110,0.4)",
          }}
        >
          🗺️ &nbsp;Get Directions
        </a>
      </div>
    </section>
  );
}
