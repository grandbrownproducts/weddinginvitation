"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "./SafeImage";

export default function CoupleIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState("ඔබ දෙපළට");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => { if (d.invitePhraseTarget) setTarget(d.invitePhraseTarget); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "90px 20px",
        background: "linear-gradient(160deg, #fff8f2 0%, #fdf0f4 50%, #f6eefb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        className="section-fade"
        style={{
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <p className="font-serif" style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 14 }}>
          ✦ With Love and Blessings ✦
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(38px, 6vw, 56px)", color: "#3d2b2b", marginBottom: 30 }}>
          The Groom &amp; The Bride
        </h2>

        <div
          style={{
            width: "clamp(150px, 38vw, 210px)",
            height: "clamp(150px, 38vw, 210px)",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 36px",
            border: "5px solid rgba(201,169,110,0.55)",
            boxShadow: "0 0 0 9px rgba(201,169,110,0.08), 0 14px 50px rgba(201,160,154,0.35)",
            position: "relative",
          }}
        >
          <SafeImage src="/photos/cute-couple.jpg" alt="Vihanga & Sandali illustration" fill style={{ objectFit: "cover" }} />
        </div>

        <div
          className="font-sinhala"
          style={{
            fontSize: "clamp(17px, 2.6vw, 22px)",
            lineHeight: 2,
            color: "#5c4444",
            maxWidth: 680,
            margin: "0 auto",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(6px)",
            borderRadius: 20,
            padding: "36px 28px",
            border: "1px solid rgba(201,169,110,0.3)",
            boxShadow: "0 12px 40px rgba(61,43,43,0.08)",
          }}
        >
          <p style={{ marginBottom: 22 }}>
            කමල් විජේවර්ධන මහතාගේ සහ එම මැතිණියගේ ආදරණීය පුතු{" "}
            <span className="gold-shimmer" style={{ fontWeight: 700 }}>විහඟ</span>
          </p>
          <p style={{ margin: "10px 0", color: "#c9a96e", letterSpacing: 6, fontSize: 18 }}>✦ සහ ✦</p>
          <p>
            නිශාන්ත රාජපක්ෂ මහතාගේ සහ එම මැතිණියගේ ආදරණීය දියණිය{" "}
            <span className="gold-shimmer" style={{ fontWeight: 700 }}>සඳලි</span>
          </p>
        </div>

        <p
          className="font-sinhala"
          style={{
            marginTop: 28,
            fontSize: "clamp(12px, 1.6vw, 14px)",
            lineHeight: 1.9,
            color: "#9a8080",
            maxWidth: 620,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          අතිනත ගැනීම වෙනුවෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන වමෙන්{" "}
          <span className="gold-shimmer" style={{ fontWeight: 600 }}>{target}</span>{" "}
          ගෞරවයෙන් ආරාධනා කර සිටිමු.
        </p>
      </div>
    </section>
  );
}
