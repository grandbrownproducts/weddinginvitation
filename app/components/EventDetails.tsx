"use client";

import { useEffect, useRef } from "react";

const events = [
  {
    icon: "💍",
    title: "Wedding Ceremony",
    time: "9:00 AM",
    date: "Sunday, 10 January 2027",
    venue: "Grand Wedding Hall",
    location: "Colombo, Sri Lanka",
    desc: "Join us as we exchange our vows and begin our journey as husband and wife.",
  },
  {
    icon: "🍽️",
    title: "Reception Lunch",
    time: "12:00 PM",
    date: "Sunday, 10 January 2027",
    venue: "Grand Ballroom",
    location: "Colombo, Sri Lanka",
    desc: "Celebrate with us over lunch, music, and joy as we toast to our new life together.",
  },
];

function EventCard({ event, index }: { event: typeof events[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="section-fade event-card"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(201,169,110,0.2)",
        borderRadius: 20,
        padding: "32px 28px",
        textAlign: "center",
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        animationDelay: `${index * 0.2}s`,
      }}
    >
      <div style={{ fontSize: 44, marginBottom: 16 }}>{event.icon}</div>
      <h3 className="font-script" style={{ fontSize: 34, color: "#3d2b2b", marginBottom: 14 }}>
        {event.title}
      </h3>
      <div className="gold-divider" style={{ marginBottom: 20 }} />
      <p className="font-serif" style={{ color: "#c9a96e", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
        {event.time}
      </p>
      <p className="font-serif" style={{ color: "#7a5c5c", fontSize: 14, marginBottom: 18 }}>
        {event.date}
      </p>
      <div style={{ background: "rgba(201,169,110,0.08)", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
        <p className="font-serif" style={{ color: "#3d2b2b", fontSize: 16, fontWeight: 600 }}>{event.venue}</p>
        <p className="font-serif" style={{ color: "#a89090", fontSize: 13, marginTop: 4 }}>📍 {event.location}</p>
      </div>
      <p className="font-serif" style={{ color: "#7a5c5c", fontSize: 15, fontStyle: "italic", lineHeight: 1.7 }}>
        {event.desc}
      </p>
    </div>
  );
}

export default function EventDetails() {
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
    <section id="details" style={{ padding: "80px 16px", background: "linear-gradient(180deg, #faf7f4 0%, #f5efe8 100%)", textAlign: "center" }}>
      <div ref={titleRef} className="section-fade" style={{ marginBottom: 48 }}>
        <p className="font-serif" style={{ color: "#c9a96e", letterSpacing: 4, fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>
          Save the date
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(38px, 8vw, 64px)", color: "#3d2b2b" }}>
          Event Details
        </h2>
        <div className="gold-divider" />
      </div>

      <div className="event-cards">
        {events.map((e, i) => <EventCard key={i} event={e} index={i} />)}
      </div>
    </section>
  );
}
