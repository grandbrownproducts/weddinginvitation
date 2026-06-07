"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.loop = true;
    audio.volume = 1;

    const tryPlay = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    // Multiple attempts to start playback (muted) as soon as possible —
    // covers cases where the audio element isn't ready immediately on mount.
    tryPlay();
    const t1 = setTimeout(tryPlay, 300);
    const t2 = setTimeout(tryPlay, 1000);
    const t3 = setTimeout(tryPlay, 3000);
    audio.addEventListener("canplay", tryPlay);
    audio.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    const unmute = () => {
      audio.muted = false;
      tryPlay();
      ["scroll", "click", "keydown", "touchstart", "mousemove"].forEach((ev) => window.removeEventListener(ev, unmute));
    };
    ["scroll", "click", "keydown", "touchstart", "mousemove"].forEach((ev) => window.addEventListener(ev, unmute, { passive: true }));

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      audio.removeEventListener("canplay", tryPlay);
      audio.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      ["scroll", "click", "keydown", "touchstart", "mousemove"].forEach((ev) => window.removeEventListener(ev, unmute));
    };
  }, []);

  return <audio ref={audioRef} loop autoPlay playsInline preload="auto" src="/music/wedding.mp3" />;
}
