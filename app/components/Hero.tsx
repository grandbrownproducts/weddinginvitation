"use client";

import { motion } from "framer-motion";
import SafeImage from "./SafeImage";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #fdf6f0 0%, #f8e8f0 35%, #ede0f8 70%, #e8f0fd 100%)",
        padding: "100px 20px 80px",
      }}
    >
      {/* Decorative background rings */}
      {[300, 450, 600].map((size, i) => (
        <div key={i} style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1px solid rgba(201,169,110,${0.12 - i * 0.03})`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />
      ))}

      {/* Couple photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: "clamp(160px, 45vw, 230px)",
          height: "clamp(160px, 45vw, 230px)",
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid rgba(201,169,110,0.6)",
          boxShadow: "0 0 0 10px rgba(201,169,110,0.07), 0 0 0 20px rgba(201,160,154,0.07), 0 12px 50px rgba(201,160,154,0.4)",
          marginBottom: 36,
          position: "relative",
        }}
      >
        <SafeImage
          src="/photos/1.png"
          alt="Vihanga & Kumudi"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </motion.div>

      {/* Date ribbon */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-serif gold-shimmer"
        style={{ letterSpacing: 5, fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: "uppercase" }}
      >
        ✦  10 · January · 2027  ✦
      </motion.p>

      {/* Main English title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="font-script"
        style={{
          fontSize: "clamp(58px, 10vw, 110px)",
          color: "#3d2b2b",
          lineHeight: 1.05,
          textAlign: "center",
          marginBottom: 6,
          textShadow: "0 2px 20px rgba(201,160,154,0.3)",
        }}
      >
        Vihanga & Kumudi
      </motion.h1>

      {/* Sinhala names — beautiful serif */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="font-sinhala"
        style={{
          fontSize: "clamp(22px, 4vw, 34px)",
          color: "#9a6e7e",
          marginBottom: 16,
          letterSpacing: 3,
          fontWeight: 600,
          textShadow: "0 1px 12px rgba(201,160,154,0.25)",
        }}
      >
        විහඟ &amp; කුමුදි
      </motion.p>

      {/* Ornament */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="ornament-line"
        style={{ maxWidth: 320, width: "100%" }}
      >
        <span style={{ color: "#c9a96e", fontSize: 18 }}>🌸</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="font-serif"
        style={{ fontSize: 19, color: "#7a5c5c", letterSpacing: 1.5, marginTop: 8, textAlign: "center", fontStyle: "italic" }}
      >
        "Two souls, one heart, forever"
      </motion.p>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 36,
          fontSize: 26,
          color: "#c9a96e",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span className="font-serif" style={{ fontSize: 10, letterSpacing: 4, color: "#b8a0a0" }}>SCROLL</span>
        ↓
      </motion.a>
    </section>
  );
}
