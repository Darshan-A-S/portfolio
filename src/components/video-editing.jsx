import { useState, useEffect, useRef } from "react";

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
  const cardRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoaded(true); obs.disconnect(); } },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      ref={cardRef}
      id={`video-${video.id}`}
      className={`group relative overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] scroll-m-[20vh] transition-colors hover:border-[var(--color-text-muted)] ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {loaded ? (
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
          {variant === "full" ? (
            <>
              <div className="flex flex-col gap-3">
                <VideoCard
                  video={videos[0]}
                  style={{ aspectRatio: "9 / 16" }}
                />
                {/* ponytail: top/bottom lines reach the left 768 frame via left-[-1rem]; left border stays; right border removed; small tick on the right aligns with reel 2's bottom line */}
                <div className="relative h-28 border-l border-[color:var(--color-border)] px-4 pt-2 pb-6 before:absolute before:top-0 before:left-[calc(-1rem-1px)] before:right-[-0.75rem] before:border-t before:border-[color:var(--color-border)] after:absolute after:bottom-0 after:left-[calc(-1rem-1px)] after:right-[-1.5rem] after:border-t after:border-[color:var(--color-border)]">
                  <h3 className="font-playfair italic text-[22px]">Campus Walk</h3>
                  <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">First ever reel, new to college and new friend <a href="https://www.instagram.com/shre_s__" target="_blank" rel="noreferrer" className="font-playfair italic decoration-1 underline-offset-2 hover:text-[var(--color-text)]">@shre_s__</a> who is also intersted in editing, learnt so many new things while editing thissss.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {/* ponytail: no -ml so the left border lands on col2's edge, matching video 2's left border */}
                {/* ponytail: top border blends with the reel top via a pseudo line that spans into col1; bottom border hits the film frame; left border stays; right border removed */}
                <div className="relative h-28 border-l border-[color:var(--color-border)] px-4 pt-2 pb-6 before:absolute before:top-0 before:left-[-100%] before:right-[-1rem] before:border-t before:border-[color:var(--color-border)] after:absolute after:bottom-0 after:left-[-1.25rem] after:right-[-1rem] after:border-t after:border-[color:var(--color-border)]">
                  <h3 className="font-playfair italic text-[22px]">Photo Walk</h3>
                  <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">This walk was special because it happened on my birthday, and with my fav ppl ❤️.</p>
                </div>
                <VideoCard
                  video={videos[1]}
                  style={{ aspectRatio: "9 / 16" }}
                />
              </div>
            </>
          ) : (
            <>
              <VideoCard
                video={videos[0]}
                style={{ aspectRatio: "9 / 16" }}
              />
              <VideoCard
                video={videos[1]}
                style={{ aspectRatio: "9 / 16" }}
              />
            </>
          )}
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
