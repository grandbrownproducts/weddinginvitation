"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!visible) return null;

  return (
    <>
      <audio ref={audioRef} loop src="/music/wedding.mp3" />
      <button
        onClick={toggle}
        title={playing ? "Pause music" : "Play music"}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 200,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: playing
            ? "linear-gradient(135deg, #c9a96e, #d4b88a)"
            : "rgba(255,255,255,0.9)",
          border: "2px solid rgba(201,169,110,0.5)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          cursor: "pointer",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          backdropFilter: "blur(8px)",
        }}
      >
        {playing ? "🎵" : "🔇"}
      </button>
    </>
  );
}
