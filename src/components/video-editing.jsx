import { useRef } from "react";

const videos = [
  { id: 1, label: "Campus Walk", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784732841/edit1_rfc9xg.mp4" },
  { id: 2, label: "PhotoOn Photowalk", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733794/edit2_d7zxpz.mp4" },
  { id: 3, label: "Jayciana '26", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733016/hero_ct1nag.mp4" },
  { id: 4, label: "Chamundi Betta", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733668/reel3_j8turf.mp4" },
  { id: 5, label: "Pre-fest", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733163/reel4_zbmrls.mp4" },
  { id: 6, label: "My Companion", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733195/reel5_bnjwgc.mp4" },
  { id: 7, label: "Cinematic", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733114/reel6_oemvu2.mp4" },
  { id: 8, label: "Cinematic II", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733074/reel7_zjebds.mp4" },
  { id: 9, label: "Boys", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784732865/reel8_qblgzw.mp4" },
]

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
      id={`video-${video.id}`}
      className={`group relative overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] scroll-m-[20vh] transition-colors hover:border-[var(--color-text-muted)] ${className}`}
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
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-6">
        <span className="text-[11px] font-medium text-white">{video.label}</span>
      </div>
    </div>
  );
}

export default function VideoEditing({ variant }) {
  return (
    <div id="otherside" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Otherside <span className="text-[10px] text-muted-foreground font-normal">(editing...)</span>
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] p-4">
        <div className="grid grid-cols-2 gap-3">
          <VideoCard
            video={videos[0]}
            style={{ aspectRatio: "9 / 16" }}
          />
          <VideoCard
            video={videos[1]}
            style={{ aspectRatio: "9 / 16" }}
          />
          <VideoCard
            video={videos[2]}
            className="col-span-2"
            style={{ aspectRatio: "16 / 9" }}
          />
        </div>
        <div className={`${variant === "full" ? "mt-3 flex flex-col gap-3" : "mt-3 grid grid-cols-3 gap-3"}`}>
          <VideoCard
            video={videos[3]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
          <VideoCard
            video={videos[4]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
          <VideoCard
            video={videos[5]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
          <VideoCard
            video={videos[6]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
          <VideoCard
            video={videos[7]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
          <VideoCard
            video={videos[8]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
        </div>
      </div>
      {variant !== "full" && (
        <div className="border-t border-[color:var(--color-border)]">
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] flex justify-center py-2">
            <a role="button" href="/otherside" className="inline-flex items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-transparent bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] active:scale-[0.98] cursor-pointer">
              Load More
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
