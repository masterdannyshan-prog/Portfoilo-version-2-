"use client";

import { useRef, useState } from "react";
import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";

type Props = {
  src: string;
  poster?: string;
  label: string;
};

export function CaseHeroVideo({ src, poster, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      video.play().catch(() => setMuted(true));
    }
  }

  return (
    <figure className="case-hero-video" aria-label={label}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        className="case-hero-video-mute"
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        onClick={toggleMute}
      >
        {muted ? (
          <SpeakerSlashIcon size={16} weight="regular" aria-hidden="true" />
        ) : (
          <SpeakerHighIcon size={16} weight="regular" aria-hidden="true" />
        )}
        <span>{muted ? "Sound off" : "Sound on"}</span>
      </button>
    </figure>
  );
}
