"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Countdown", href: "#countdown" },
  { label: "Details", href: "#details" },
  { label: "Location", href: "#location" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        .nav-logo { font-size: 26px; }
        .nav-desktop-links { display: flex; gap: 28px; list-style: none; }
        .nav-burger { display: none; }
        .nav-mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none; }
          .nav-burger { display: block; }
          .nav-mobile-menu { display: flex; }
          .nav-logo { font-size: 22px; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(250,247,244,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        padding: scrolled ? "10px 20px" : "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#hero" className="font-script nav-logo"
          style={{ color: "#c9a96e", textDecoration: "none", letterSpacing: 1 }}>
          M &amp; U
        </a>

        {/* Desktop */}
        <ul className="nav-desktop-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-serif"
                style={{ color: "#3d2b2b", textDecoration: "none", fontSize: 14, letterSpacing: 1, fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a96e")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#3d2b2b")}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button className="nav-burger"
          onClick={() => setOpen(!open)}
          style={{
            background: open ? "rgba(201,169,110,0.15)" : "none",
            border: "1px solid rgba(201,169,110,0.4)",
            borderRadius: 8, cursor: "pointer",
            width: 40, height: 40,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
            padding: 8,
          }}
        >
          <span style={{ display: "block", width: 20, height: 2, background: "#3d2b2b", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 20, height: 2, background: "#3d2b2b", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 20, height: 2, background: "#3d2b2b", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div className="nav-mobile-menu" style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(250,247,244,0.98)",
        backdropFilter: "blur(16px)",
        zIndex: 99,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s ease",
      }}>
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-script"
            style={{
              color: "#3d2b2b",
              textDecoration: "none",
              fontSize: 38,
              letterSpacing: 1,
              padding: "14px 0",
              width: "100%",
              textAlign: "center",
              borderBottom: i < links.length - 1 ? "1px solid rgba(201,169,110,0.15)" : "none",
              transition: "color 0.2s",
            }}
          >
            {l.label}
          </a>
        ))}

        <p className="font-sinhala" style={{ color: "#c9a96e", fontSize: 18, marginTop: 36 }}>
          විහඟ &amp; කුමුදි
        </p>
      </div>
    </>
  );
}
