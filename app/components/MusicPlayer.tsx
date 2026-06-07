"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Browsers block autoplay WITH sound, but allow it muted.
    // So start muted immediately (plays the instant the page opens),
    // then unmute on the user's very first interaction (scroll/tap/click/key)
    // — giving the effect of music starting "on open".
    audio.muted = true;
    audio.play().catch(() => {});

    const unmute = () => {
      audio.muted = false;
      if (audio.paused) audio.play().catch(() => {});
      ["scroll", "click", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, unmute));
    };
    ["scroll", "click", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, unmute, { passive: true }));
    return () => ["scroll", "click", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, unmute));
  }, []);

  return <audio ref={audioRef} loop autoPlay playsInline src="/music/wedding.mp3" />;
}
