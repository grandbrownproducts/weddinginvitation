export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #2a1e1e 0%, #1a1010 100%)",
        padding: "80px 24px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top border */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: "linear-gradient(90deg, transparent, #c9a96e 30%, #f0d080 50%, #c9a96e 70%, transparent)",
      }} />

      {/* Decorative flowers */}
      <div style={{ fontSize: 28, marginBottom: 20, opacity: 0.6 }}>
        🌸 🌺 🌸
      </div>

      {/* English names */}
      <p className="font-script gold-shimmer" style={{ fontSize: 60, marginBottom: 6 }}>
        Malindu & Uththara
      </p>

      {/* Sinhala names only */}
      <p
        className="font-sinhala"
        style={{
          color: "rgba(201,169,110,0.75)",
          fontSize: 22,
          fontWeight: 600,
          marginBottom: 20,
          letterSpacing: 2,
        }}
      >
        මලිඳු &amp; උත්තරා
      </p>

      <div className="gold-divider" style={{ marginBottom: 20 }} />

      <p className="font-serif" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>
        10 · January · 2027 · Colombo, Sri Lanka
      </p>

      <p className="font-serif" style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, fontStyle: "italic", marginBottom: 36 }}>
        "And they lived happily ever after..."
      </p>

      <div className="footer-links">
        {[
          { href: "#story", label: "Our Story" },
          { href: "#gallery", label: "Gallery" },
          { href: "#countdown", label: "Countdown" },
          { href: "#details", label: "Details" },
          { href: "#location", label: "Location" },
          { href: "#rsvp", label: "RSVP" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="font-serif"
            style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 13, letterSpacing: 1 }}
          >
            {label}
          </a>
        ))}
      </div>

      <div style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>
        Made with <span className="heart-pulse" style={{ display: "inline-block" }}>❤️</span> for Malindu & Uththara
      </div>
    </footer>
  );
}
