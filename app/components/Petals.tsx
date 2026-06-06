"use client";

import { useEffect, useState } from "react";

interface Flower {
  id: number;
  left: number;
  delay: number;
  fallDuration: number;
  swayDuration: number;
  size: number;
  type: number;
  opacity: number;
}

/* SVG flower shapes */
const FlowerSVG = ({ type, size }: { type: number; size: number }) => {
  const colors = [
    ["#f9a8c9", "#f472b6", "#fbcfe8"],  // pink
    ["#fca5a5", "#ef4444", "#fecaca"],  // red
    ["#c4b5fd", "#8b5cf6", "#ddd6fe"],  // purple
    ["#fdba74", "#f97316", "#fed7aa"],  // orange
    ["#86efac", "#22c55e", "#bbf7d0"],  // green (leaves)
  ];
  const [outer, inner, center] = colors[type % colors.length];

  if (type === 4) {
    // Leaf shape
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 4 C28 4 36 12 36 22 C36 32 28 38 20 38 C12 38 4 32 4 22 C4 12 12 4 20 4Z"
          fill={outer} opacity="0.85" />
        <line x1="20" y1="6" x2="20" y2="36" stroke={inner} strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="14" x2="10" y2="22" stroke={inner} strokeWidth="1" opacity="0.4" />
        <line x1="20" y1="14" x2="30" y2="22" stroke={inner} strokeWidth="1" opacity="0.4" />
      </svg>
    );
  }

  const petalCount = type === 0 ? 5 : type === 1 ? 6 : type === 2 ? 8 : 5;
  const petalPath = petalCount === 5
    ? "M20,20 Q18,10 20,4 Q22,10 20,20"
    : petalCount === 6
    ? "M20,20 Q17,11 20,4 Q23,11 20,20"
    : "M20,20 Q18,12 20,5 Q22,12 20,20";

  const angles = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {angles.map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 20 20)`}>
          <path d={petalPath} fill={outer} opacity="0.9" stroke={inner} strokeWidth="0.4" />
        </g>
      ))}
      {/* Center */}
      <circle cx="20" cy="20" r="4" fill={center} stroke={inner} strokeWidth="0.8" />
      <circle cx="20" cy="20" r="2" fill="#fff" opacity="0.7" />
    </svg>
  );
};

export default function Petals() {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    const generated: Flower[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      delay: Math.random() * 14,
      fallDuration: 9 + Math.random() * 10,
      swayDuration: 4 + Math.random() * 4,
      size: 20 + Math.random() * 24,
      type: Math.floor(Math.random() * 5),
      opacity: 0.55 + Math.random() * 0.4,
    }));
    setFlowers(generated);
  }, []);

  return (
    <>
      {flowers.map((f) => (
        <div
          key={f.id}
          className="flower-petal"
          style={{
            left: `${f.left}%`,
            opacity: f.opacity,
            animationDuration: `${f.fallDuration}s, ${f.swayDuration}s`,
            animationDelay: `${f.delay}s, ${f.delay * 0.4}s`,
          }}
        >
          <FlowerSVG type={f.type} size={f.size} />
        </div>
      ))}
    </>
  );
}
