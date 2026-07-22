import { useState, useRef, useEffect } from "react";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

const P5_CDN = "https://cdn.jsdelivr.net/npm/p5@1.11.3/lib/p5.min.js";
const ASCIIFY_CDN =
  "https://cdn.jsdelivr.net/npm/p5.asciify@0.10.3/dist/p5.asciify.umd.min.js";

export default function AsciiWebcam() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const p5Ref = useRef(null);

  const handleSurprise = async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript(P5_CDN);
      await loadScript(ASCIIFY_CDN);
      setStarted(true);
    } catch {
      setError("Failed to load required libraries.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!started || !containerRef.current) return;

    const p5Lib = window.p5;
    const sketch = (p) => {
      let cam;

      p.setup = () => {
        p.createCanvas(768, 432, p.WEBGL);
        p.pixelDensity(1);
        cam = p.createCapture(p.VIDEO);
        cam.size(768, 432);
        cam.hide();
      };

      p.draw = () => {
        p.background(0);
        p.push();
        p.scale(-1, 1);
        p.translate(-p.width / 2, -p.height / 2);
        p.image(cam, 0, 0, 768, 432);
        p.pop();
      };

      p.remove = () => {
        if (cam) cam.remove();
      };
    };

    const myp5 = new p5Lib(sketch, containerRef.current);
    p5Ref.current = myp5;

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [started]);

  return (
    <div className="border-b border-[color:var(--color-border)] px-[5px] sm:px-0">
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="relative flex items-center justify-center overflow-hidden]"
          style={{ aspectRatio: "16 / 9" }}
        >
          {!started && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleSurprise}
                disabled={loading}
                className="rounded-full border border-[color:var(--color-border)] bg-[var(--color-bg)] px-6 py-2.5 text-sm font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Loading..." : "Surprise"}
              </button>
            </div>
          )}
          {error && (
            <p className="absolute bottom-3 text-xs text-red-500">{error}</p>
          )}
          <div ref={containerRef} className={started ? "w-full h-full [&>canvas]:!w-full [&>canvas]:!h-full" : "hidden"} />
        </div>
      </div>
    </div>
  );
}
