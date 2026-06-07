"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "./SafeImage";

const photos = [
  { src: "/photos/1.png", alt: "Vihanga & Sandali", label: "Together ♥" },
  { src: "/photos/2.png", alt: "Our Moment",         label: "Our Moment" },
  { src: "/photos/3.png", alt: "Sandali",           label: "Sandali" },
  { src: "/photos/4.png", alt: "Side by Side",       label: "Side by Side" },
];

export default function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" style={{ padding: "80px 16px", background: "linear-gradient(180deg, #fff 0%, #faf5f0 100%)" }}>
      <div ref={titleRef} className="section-fade" style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="font-serif" style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>
          Captured moments
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(38px, 8vw, 64px)", color: "#3d2b2b" }}>
          Our Gallery
        </h2>
        <div className="ornament-line" style={{ maxWidth: 280, margin: "0 auto" }}>
          <span style={{ color: "#c9a96e", fontSize: 16 }}>🌸</span>
        </div>
      </div>

      <div className="gallery-grid">
        {photos.map((p, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={i}
              className={`gallery-item-${i}`}
              onClick={() => setLightbox(p.src)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer",
                boxShadow: isHov ? "0 20px 60px rgba(61,43,43,0.25), 0 0 0 3px rgba(201,169,110,0.5)" : "0 6px 24px rgba(61,43,43,0.12)",
                transform: isHov ? "scale(1.015)" : "scale(1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              <SafeImage src={p.src} alt={p.alt} fill
                style={{
                  objectFit: "cover",
                  filter: isHov ? "brightness(1.05) saturate(1.15)" : "brightness(0.97) saturate(1.08)",
                  transition: "filter 0.4s ease, transform 0.5s ease",
                  transform: isHov ? "scale(1.06)" : "scale(1)",
                }}
              />
              {/* Vignette */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(61,30,20,0.22) 100%)", pointerEvents: "none" }} />
              {/* Hover overlay + label */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: isHov
                  ? "linear-gradient(0deg, rgba(61,43,43,0.65) 0%, rgba(61,43,43,0.1) 50%, transparent 100%)"
                  : "linear-gradient(0deg, rgba(61,43,43,0.3) 0%, transparent 60%)",
                transition: "background 0.4s ease",
                display: "flex", alignItems: "flex-end", padding: 12,
              }}>
                <span className="font-script" style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: i === 0 ? 22 : 18,
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                  opacity: isHov ? 1 : 0.75,
                  transition: "opacity 0.4s ease",
                }}>
                  {p.label}
                </span>
              </div>
              {/* Corner brackets on hover */}
              {isHov && (
                <>
                  <div style={{ position: "absolute", top: 8, left: 8,   width: 20, height: 20, borderTop: "2px solid rgba(201,169,110,0.8)", borderLeft:  "2px solid rgba(201,169,110,0.8)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 8, right: 8,  width: 20, height: 20, borderTop: "2px solid rgba(201,169,110,0.8)", borderRight: "2px solid rgba(201,169,110,0.8)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 8, left: 8,  width: 20, height: 20, borderBottom: "2px solid rgba(201,169,110,0.8)", borderLeft:  "2px solid rgba(201,169,110,0.8)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderBottom: "2px solid rgba(201,169,110,0.8)", borderRight: "2px solid rgba(201,169,110,0.8)", pointerEvents: "none" }} />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,8,8,0.96)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(90vw, 720px)",
              height: "min(80vh, 580px)",
              borderRadius: 12, overflow: "hidden",
              border: "2px solid rgba(201,169,110,0.5)",
              boxShadow: "0 0 0 8px rgba(201,169,110,0.08), 0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            <SafeImage src={lightbox} alt="Photo" fill
              style={{ objectFit: "contain", filter: "brightness(1.03) saturate(1.1)" }} />
          </div>

          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "50%", color: "white", fontSize: 18,
            width: 44, height: 44, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>

          {/* Thumbnail strip */}
          <div style={{ position: "absolute", bottom: 16, display: "flex", gap: 8 }}>
            {photos.map((p, i) => (
              <div key={i} onClick={(e) => { e.stopPropagation(); setLightbox(p.src); }}
                style={{
                  width: 48, height: 48, borderRadius: 8, overflow: "hidden", position: "relative",
                  cursor: "pointer",
                  border: lightbox === p.src ? "2px solid #c9a96e" : "2px solid rgba(255,255,255,0.2)",
                  opacity: lightbox === p.src ? 1 : 0.55,
                  transition: "all 0.2s",
                }}
              >
                <SafeImage src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
