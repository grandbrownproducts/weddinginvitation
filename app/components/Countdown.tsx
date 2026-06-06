"use client";

import { useEffect, useRef, useState } from "react";

const WEDDING_DATE = new Date("2027-01-10T09:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-box">
      <div
        className="font-serif"
        style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#3d2b2b", fontWeight: 600, lineHeight: 1 }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        className="font-serif"
        style={{ fontSize: 12, color: "#c9a96e", letterSpacing: 3, textTransform: "uppercase", marginTop: 8 }}
      >
        {label}
      </div>
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only start on client to avoid SSR/hydration mismatch
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

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

  return (
    <section
      id="countdown"
      style={{
        padding: "80px 16px",
        background: "linear-gradient(135deg, #f5e8e4 0%, #ede0f0 50%, #e8f0e4 100%)",
        textAlign: "center",
      }}
    >
      <div ref={titleRef} className="section-fade">
        <p className="font-serif" style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>
          ✦ The big day ✦
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(42px, 6vw, 64px)", color: "#3d2b2b", marginBottom: 8 }}>
          Counting Down
        </h2>
        <div className="gold-divider" />

        <p className="font-serif" style={{ color: "#7a5c5c", marginTop: 16, marginBottom: 48, fontSize: 17, fontStyle: "italic" }}>
          Until we say "I Do" — 10 January 2027
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {time ? (
            <>
              <TimeBox value={time.days} label="Days" />
              <TimeBox value={time.hours} label="Hours" />
              <TimeBox value={time.minutes} label="Minutes" />
              <TimeBox value={time.seconds} label="Seconds" />
            </>
          ) : (
            ["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <TimeBox key={label} value={0} label={label} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
