"use client";

import { useRef, useState } from "react";
import posthog from "posthog-js";
import { Play } from "lucide-react";

export default function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const video = ref.current;
    if (!video) return;
    setStarted(true);
    video.play().catch(() => {});
    if (posthog.__loaded) posthog.capture("demo_video_played");
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-100 bg-sky-50 shadow-2xl shadow-sky-200/60">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src="/videos/ghost-demo.mp4"
        poster="/videos/ghost-demo-poster.jpg"
        preload="none"
        playsInline
        controls={started}
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label="Play the Ghost demo video"
          className="group absolute inset-0 flex items-center justify-center bg-sky-900/10 transition-colors hover:bg-sky-900/20"
        >
          <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-105">
            <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8 fill-sky-500 text-sky-500" />
          </span>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-800 shadow">
            Watch the 45s demo
          </span>
        </button>
      )}
    </div>
  );
}
