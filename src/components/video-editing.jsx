import { useState, useEffect, useRef } from "react";
import edit1 from "../assets/videos/edit1.webm";
import ArrowHint from "./arrow-hint";
import edit2 from "../assets/videos/edit2.webm";
import hero from "../assets/videos/hero.webm";
import reel3 from "../assets/videos/reel3.webm";
import reel4 from "../assets/videos/reel4.webm";
import reel5 from "../assets/videos/reel5.webm";
import reel6 from "../assets/videos/reel6.webm";
import reel7 from "../assets/videos/reel7.webm";
import reel8 from "../assets/videos/reel8.webm";
import ethnic from "../assets/videos/ethnic.webm";
import raghudixit from "../assets/videos/raghudixit.webm";

const videos = [
  { id: 1, label: "Campus Walk", src: edit1, caption: { heading: "Campus Walk", body: <>First ever reel, new to college and new friend <a href="https://www.instagram.com/shre_s__" target="_blank" rel="noreferrer" className="font-playfair italic decoration-1 underline-offset-2 hover:text-[var(--color-text)]">@shre_s__</a> who is also intersted in editing, learnt so many new things while editing thissss.</> } },
  { id: 2, label: "PhotoOn Photowalk", src: edit2, caption: { heading: "Photo Walk", body: "This walk was special because it happened on my birthday, and with my fav ppl ❤️." } },
  { id: 3, label: "Jayciana '26", src: hero },
  { id: 4, label: "Chamundi Betta", src: reel3 },
  { id: 5, label: "Pre-fest", src: reel4 },
  { id: 6, label: "My Companion", src: reel5 },
  { id: 7, label: "Cinematic", src: reel6 },
  { id: 8, label: "Cinematic II", src: reel7 },
  { id: 9, label: "Boys", src: reel8 },
  { id: 10, label: "Ethnic Day", src: ethnic, caption: { heading: "Ethnic Day", body: "Favourite event for most of the college students, energy was max 🕺 (my friends threw in the air)" } },
  { id: 11, label: "The Raghu Dixit Project", src: raghudixit, caption: { heading: "The Raghu Dixit Project", body: "The best musical experience you can have, and also energetic" } },
]

function VideoCard({ video, style, className = "" }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const hoveredRef = useRef(false);
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
    hoveredRef.current = true;
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => {
      setTimeout(() => { v.muted = false; }, 100);
    });
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.pause();
    v.currentTime = 0;
  };

  useEffect(() => {
    // video mounted lazily — if the cursor is already over the card, start playback
    if (loaded && hoveredRef.current) handleEnter();
  }, [loaded]);

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

function VideoHintOverlays() {
  return (
    <>
      <ArrowHint
        className="items-start sm:inline-flex"
        style={{ top: "50px", left: "-50px" }}
        text="hover to
play"
        direction="up"
        tilt={18}
        textGap={-5}
        textTilt={-5}
        textNudge={-25}
        arrowWidth={24}
        arrowHeight={30}
      />
    </>
  );
}

function ReelsRow({ reel1, reel2, showHint = false }) {
  const caption = (c) => c && (
    <>
      <h3 className="font-playfair italic text-[22px]">{c.heading}</h3>
      <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">{c.body}</p>
    </>
  );
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <VideoCard
            video={reel1}
            style={{ aspectRatio: "9 / 16" }}
          />
          {showHint && <VideoHintOverlays />}
        </div>
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
<div id="otherside" className="relative scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <div className="relative mx-auto max-w-[768px]">
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
            showHint
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <VideoCard
                video={videos[0]}
                style={{ aspectRatio: "9 / 16" }}
              />
              <VideoHintOverlays />
            </div>
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
