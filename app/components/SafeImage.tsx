"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f5e8e4, #ede0f0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 40 }}>📷</span>
        <span style={{ fontSize: 11, color: "#a89090", fontFamily: "serif", letterSpacing: 1 }}>
          Add photo here
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
