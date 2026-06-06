"use client";

import { useEffect, useRef } from "react";
import SafeImage from "./SafeImage";

const milestones = [
  {
    year: "The Beginning",
    title: "We First Met",
    text: "A chance encounter that changed everything. The moment we met, the world seemed a little brighter and life a little more beautiful.",
    photo: "/photos/couple4.jpg",
    side: "left",
    accent: "#f9c6d0",
  },
  {
    year: "Growing Closer",
    title: "Falling in Love",
    text: "Every shared laugh, every late-night conversation, every adventure together — we fell deeper in love with every passing day.",
    photo: "/photos/couple2.jpg",
    side: "right",
    accent: "#c6d9f9",
  },
  {
    year: "Forever",
    title: "The Proposal",
    text: "He asked, she said yes. A perfect moment that marked the beginning of our forever together.",
    photo: "/photos/couple3.jpg",
    side: "left",
    accent: "#d9c6f9",
  },
];

function PhotoFrame({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div className="story-photo" style={{ position: "relative", padding: 10 }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20,
        background: `radial-gradient(ellipse at 40% 40%, ${accent}55, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 5, left: 5, right: 5, bottom: 5,
        borderRadius: 16, border: "1px solid rgba(201,169,110,0.35)",
        pointerEvents: "none", zIndex: 2,
      }} />
      <div style={{
        width: "100%", height: 260, borderRadius: 14, overflow: "hidden",
        position: "relative",
        boxShadow: "0 16px 48px rgba(61,43,43,0.18)",
      }}>
        <SafeImage src={src} alt={alt} fill
          style={{ objectFit: "cover", filter: "brightness(1.02) saturate(1.12)" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(61,30,20,0.2) 100%)",
          pointerEvents: "none",
        }} />
      </div>
      {/* Corner brackets */}
      {[{ top: 3, left: 3 }, { top: 3, right: 3 }, { bottom: 3, left: 3 }, { bottom: 3, right: 3 }].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos, width: 16, height: 16, zIndex: 3, pointerEvents: "none",
          borderTop:    i < 2 ? "2px solid rgba(201,169,110,0.7)" : undefined,
          borderBottom: i >= 2 ? "2px solid rgba(201,169,110,0.7)" : undefined,
          borderLeft:   i % 2 === 0 ? "2px solid rgba(201,169,110,0.7)" : undefined,
          borderRight:  i % 2 !== 0 ? "2px solid rgba(201,169,110,0.7)" : undefined,
        }} />
      ))}
    </div>
  );
}

function CardContent({ milestone, align }: { milestone: typeof milestones[0]; align: "left" | "right" | "center" }) {
  return (
    <div style={{ textAlign: align }}>
      <p className="font-serif" style={{ color: "#c9a96e", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
        ✦ {milestone.year} ✦
      </p>
      <h3 className="font-script" style={{ fontSize: 36, color: "#3d2b2b", marginBottom: 12, lineHeight: 1.1 }}>
        {milestone.title}
      </h3>
      <div style={{
        width: 40, height: 1,
        background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
        margin: align === "right" ? "0 0 14px auto" : align === "center" ? "0 auto 14px" : "0 auto 14px 0",
      }} />
      <p className="font-serif" style={{ color: "#7a5c5c", fontSize: 16, lineHeight: 1.9, fontStyle: "italic" }}>
        {milestone.text}
      </p>
    </div>
  );
}

function StoryCard({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
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

  const isLeft = milestone.side === "left";

  return (
    <div ref={ref} className="section-fade" style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
      {/* Desktop: 3-col grid — Mobile: single col (CSS handles switch) */}
      <div className="story-grid">
        {/* Left cell */}
        <div className={isLeft ? "story-text-left" : ""}>
          {isLeft
            ? <CardContent milestone={milestone} align="right" />
            : <PhotoFrame src={milestone.photo} alt={milestone.title} accent={milestone.accent} />
          }
        </div>

        {/* Timeline (hidden on mobile via CSS) */}
        <div className="story-timeline" style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
          <div style={{ width: 2, flex: 1, minHeight: index === 0 ? 0 : 40, background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.5))" }} />
          <div style={{
            width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #c9a96e, #f0d080)",
            boxShadow: "0 0 0 5px rgba(201,169,110,0.18), 0 2px 8px rgba(201,169,110,0.4)",
          }} />
          <div style={{ width: 2, flex: 1, minHeight: 40, background: "linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)" }} />
        </div>

        {/* Right cell */}
        <div className={!isLeft ? "story-text-right" : ""}>
          {isLeft
            ? <PhotoFrame src={milestone.photo} alt={milestone.title} accent={milestone.accent} />
            : <CardContent milestone={milestone} align="left" />
          }
        </div>
      </div>
    </div>
  );
}

export default function OurStory() {
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="story" style={{ padding: "80px 0", background: "linear-gradient(180deg, #faf7f4 0%, #f5efe8 100%)" }}>
      <div ref={titleRef} className="section-fade" style={{ textAlign: "center", marginBottom: 64, padding: "0 16px" }}>
        <p className="font-serif" style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>
          How it all began
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(38px, 8vw, 64px)", color: "#3d2b2b" }}>
          Our Love Story
        </h2>
        <div className="ornament-line" style={{ maxWidth: 280, margin: "0 auto" }}>
          <span style={{ color: "#c9a96e", fontSize: 16 }}>♥</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
        {milestones.map((m, i) => <StoryCard key={i} milestone={m} index={i} />)}
      </div>
    </section>
  );
}
