import { useState, useEffect, useRef } from "react";

const videos = [
  { id: 1, label: "Campus Walk", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784732841/edit1_rfc9xg.mp4", caption: { heading: "Campus Walk", body: <>First ever reel, new to college and new friend <a href="https://www.instagram.com/shre_s__" target="_blank" rel="noreferrer" className="font-playfair italic decoration-1 underline-offset-2 hover:text-[var(--color-text)]">@shre_s__</a> who is also intersted in editing, learnt so many new things while editing thissss.</> } },
  { id: 2, label: "PhotoOn Photowalk", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733794/edit2_d7zxpz.mp4", caption: { heading: "Photo Walk", body: "This walk was special because it happened on my birthday, and with my fav ppl ❤️." } },
  { id: 3, label: "Jayciana '26", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733016/hero_ct1nag.mp4" },
  { id: 4, label: "Chamundi Betta", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733668/reel3_j8turf.mp4" },
  { id: 5, label: "Pre-fest", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733163/reel4_zbmrls.mp4" },
  { id: 6, label: "My Companion", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733195/reel5_bnjwgc.mp4" },
  { id: 7, label: "Cinematic", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733114/reel6_oemvu2.mp4" },
  { id: 8, label: "Cinematic II", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784733074/reel7_zjebds.mp4" },
  { id: 9, label: "Boys", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1784732865/reel8_qblgzw.mp4" },
  { id: 10, label: "Ethnic Day", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1785866960/SnapInsta.to_AQPc82O-C7IMHYBT8EgGqU24ibLtJpPEj74cPgDXiL4nglyHloqt3Mj9IocS46dpKuyoRWa9OqZuwWeEXgwtKG8UzLwC_IqLsPuPM-A_rxvax8.mp4", caption: { heading: "Ethnic Day", body: "Favourite event for most of the college students, energy was max 🕺 (my friends threw in the air)" } },
  { id: 11, label: "The Raghu Dixit Project", src: "https://res.cloudinary.com/k2uloqof/video/upload/v1785866962/SnapInsta.to_AQN58iOrZLfdNNgchSaRHIgupPmjXo0J_cdD8kQavYmCSTENew4SxLXweNVc-tG9miGu-r96XGSFi0HgbRxJCyHW025_FUo4uYUTMi8_heiccw.mp4", caption: { heading: "The Raghu Dixit Project", body: "The best musical experience you can have, and also energetic" } },
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

function ReelsRow({ reel1, reel2 }) {
  const caption = (c) => c && (
    <>
      <h3 className="font-playfair italic text-[22px]">{c.heading}</h3>
      <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">{c.body}</p>
    </>
  );
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        <VideoCard
          video={reel1}
          style={{ aspectRatio: "9 / 16" }}
        />
        <div className="relative flex-1 border-l border-[color:var(--color-border)] px-4 pt-2 pb-6 before:absolute before:top-0 before:left-[calc(-1rem-1px)] before:right-[-0.75rem] before:border-t before:border-[color:var(--color-border)] after:absolute after:bottom-0 after:left-[calc(-1rem-1px)] after:right-[-1.5rem] after:border-t after:border-[color:var(--color-border)]">
          {caption(reel2.caption)}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative flex-1 border-r border-[color:var(--color-border)] px-4 pt-2 pb-6 before:absolute before:top-0 before:left-[-100%] before:right-[-1rem] before:border-t before:border-[color:var(--color-border)] after:absolute after:bottom-0 after:left-[-0.75rem] after:right-[-1rem] after:border-t after:border-[color:var(--color-border)]">
          {caption(reel1.caption)}
        </div>
        <VideoCard
          video={reel2}
          style={{ aspectRatio: "9 / 16" }}
          className="mt-auto"
        />
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
        {variant === "full" ? (
          <ReelsRow
            reel1={videos[0]}
            reel2={videos[1]}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <VideoCard
              video={videos[0]}
              style={{ aspectRatio: "9 / 16" }}
            />
            <VideoCard
              video={videos[1]}
              style={{ aspectRatio: "9 / 16" }}
            />
          </div>
        )}
        <div className="mt-3">
          <VideoCard
            video={videos[2]}
            style={{ aspectRatio: "16 / 9" }}
            className="w-full"
          />
        </div>
        <div className={`${variant === "full" ? "mt-3 flex flex-col gap-3" : "mt-3 grid grid-cols-3 gap-3"}`}>
          <VideoCard
            video={videos[3]}
            style={{ aspectRatio: "16 / 9" }}
            className={variant === "full" ? "w-full" : ""}
          />
          {variant === "full" && (
            <ReelsRow
              reel1={videos[9]}
              reel2={videos[10]}
            />
          )}
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
