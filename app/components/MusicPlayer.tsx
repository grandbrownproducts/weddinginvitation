"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Try to autoplay immediately; browsers may block this without a user gesture,
  // so also start on the user's first scroll/click/keypress as a fallback.
  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    tryPlay();
    const onGesture = () => {
      tryPlay();
      ["scroll", "click", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, onGesture));
    };
    ["scroll", "click", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
    return () => ["scroll", "click", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, onGesture));
  }, []);

  return <audio ref={audioRef} loop autoPlay src="/music/wedding.mp3" />;
}
