import { useRef } from "react";
import edit1 from "./../assets/videos/edit1.mp4";
import edit2 from "./../assets/videos/edit2.mp4";
import hero from "./../assets/videos/hero.mp4";
import reel3 from "./../assets/videos/reel3.mp4";
import reel4 from "./../assets/videos/reel4.mp4";
import reel5 from "./../assets/videos/reel5.mp4";
import reel6 from "./../assets/videos/reel6.mp4";
import reel7 from "./../assets/videos/reel7.mp4";
import reel8 from "./../assets/videos/reel8.mp4";

function VideoCard({ video, style, className = "" }) {
  const ref = useRef(null);

  const handleEnter = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => {
      setTimeout(() => { v.muted = false; }, 100);
    });
  };

  const handleLeave = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] transition-colors hover:border-[var(--color-text-muted)] ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {video.src ? (
        <video
          ref={ref}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[11px] text-[var(--color-text-muted)]">
          {video.label}
        </div>
      )}
    </div>
  );
}

export default function VideoEditing() {
  return (
    <div className="border-b border-[color:var(--color-border)]">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[20px] font-bold">
          Otherside
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] p-4">
        <div className="grid grid-cols-2 gap-3">
          <VideoCard
            video={{ id: 1, label: "Edit 1", src: edit1 }}
            style={{ aspectRatio: "9 / 16" }}
          />
          <VideoCard
            video={{ id: 2, label: "Edit 2", src: edit2 }}
            style={{ aspectRatio: "9 / 16" }}
          />
          <VideoCard
            video={{ id: 3, label: "Hero", src: hero }}
            className="col-span-2"
            style={{ aspectRatio: "16 / 9" }}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <VideoCard
            video={{ id: 4, label: "Reel 3", src: reel3 }}
            style={{ aspectRatio: "16 / 9" }}
          />
          <VideoCard
            video={{ id: 5, label: "Reel 4", src: reel4 }}
            style={{ aspectRatio: "16 / 9" }}
          />
          <VideoCard
            video={{ id: 6, label: "Reel 5", src: reel5 }}
            style={{ aspectRatio: "16 / 9" }}
          />
          <VideoCard
            video={{ id: 7, label: "Reel 6", src: reel6 }}
            style={{ aspectRatio: "16 / 9" }}
          />
          <VideoCard
            video={{ id: 8, label: "Reel 7", src: reel7 }}
            style={{ aspectRatio: "16 / 9" }}
          />
          <VideoCard
            video={{ id: 9, label: "Reel 8", src: reel8 }}
            style={{ aspectRatio: "16 / 9" }}
          />
        </div>
      </div>
    </div>
  );
}
