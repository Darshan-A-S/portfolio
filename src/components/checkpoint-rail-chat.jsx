import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Maximize2, Minimize2 } from "lucide-react"
import { CheckpointRail } from "dasregistry"
import "dasregistry/style.css"

const MESSAGES = [
  {
    role: "user",
    text: "ok be honest — how hard is building a React component library, really?",
  },
  {
    role: "ai",
    text: "Honestly? The first component is easy. The 20th is where the fun begins — you'll rediscover CSS specificity, fight your own naming scheme, and question why you ever thought a 'simple Button' was a good idea. Worth it though: it's the fastest way to look smarter than you are.",
  },
  { role: "user", text: "What toolchain should I use for the build?" },
  {
    role: "ai",
    text: "TypeScript plus tsup. It reads your source once and emits ESM, CJS, and .d.ts from the same entry — no separate compile steps or hand-written declarations. Vite hosts the demo so you can eyeball every component, and the build script copies the stylesheet into dist. One config file covers the whole pipeline, which means fewer things to blame when CI is sad.",
  },
  {
    role: "user",
    text: "How do I theme it so it doesn't clash with consumer apps?",
  },
  {
    role: "ai",
    text: "Scope every class behind a das- prefix so your styles never collide, and define the color tokens once at the top. Lean on CSS light-dark() so a single stylesheet adapts to light and dark mode automatically — consumers just set color-scheme and the whole kit follows. Theming is the part most people get wrong, so lock it down early and let consumers fight over colors later, not you.",
  },
  {
    role: "user",
    text: "That checkpoint rail is slick. How does it actually work?",
  },
  {
    role: "ai",
    text: "Every user prompt becomes a checkpoint — a small horizontal line in a rail on the right edge of the chat. Hover a line to see the prompt snippet, click to scroll straight to that part of the conversation, and the line under whatever you're reading glows red as you scroll. It's a table of contents for a long thread, so nobody has to scroll a wall of text to find the one question that mattered.",
  },
  {
    role: "user",
    text: "How do I ship a demo so people can preview the components?",
  },
  {
    role: "ai",
    text: "Run a Vite app that renders every component side by side in light and dark mode, with a registry listing so the demo doubles as documentation. Each component gets a section, a state example, and the actual props it accepts. It's the fastest way for a reviewer to say it looks right without reading a line of source — and the fastest way for you to realize the date picker still has a bug on Sundays.",
  },
]

const EXTRA = [
  {
    role: "user",
    text: "What can your DatePicker do that a native input can't?",
  },
  {
    role: "ai",
    text: "Native date inputs give you a picker but zero personality and no range. This one ships month, year, and decade navigation, a range mode you can drag across days, and a Nothing-style look that matches your brand. The value stays a plain YYYY-MM-DD string, so your forms and storage don't care how fancy the UI is.",
  },
  { role: "user", text: "How do consumers import the styles?" },
  {
    role: "ai",
    text: 'One shared stylesheet, imported exactly once per app: import "dasregistry/style.css". No CSS-in-JS, no scoped styles, no per-component imports to forget. Because every class is das- prefixed, the only way your styles and the library\'s fight is if a consumer deliberately overrides the tokens — which is a feature, not a bug, and a great excuse for a dramatic email thread.',
  },
  { role: "user", text: "How do I version and publish without breaking anyone?" },
  {
    role: "ai",
    text: "Semver discipline is your safety net. Bump the version for every change, keep main, module, and types pointed at dist, and only run npm publish after a green build. Tag every release and keep a short changelog so you can always answer what changed since last week in ten seconds — and never, ever call a 0.0.x version stable.",
  },
  { role: "user", text: "Do I build keyboard support myself?" },
  {
    role: "ai",
    text: "Only the parts native elements don't give you. Put everything interactive on real <button>, <input>, and <a> tags and focus, Enter, and Space come free. Add focus-visible rings, keep aria-live on anything that announces itself, and respect prefers-reduced-motion. That's 90% of accessibility, and it costs almost nothing — the other 10% is arguing with a screen reader.",
  },
  { role: "user", text: "How do I know if anyone is actually using it?" },
  {
    role: "ai",
    text: "Watch npm downloads and version trends rather than stars. A flat download curve with no recent versions means nobody is installing it; a bump after each release means someone is. Keep the README install command correct at all times — a broken first step kills more libraries than a bug ever does.",
  },
]

const REPLIES = [
  "Got it — filing that under 'good question, stay tuned'.",
  "Interesting. Tell me more — I'm all ears (and tokens).",
  "Makes sense. Want me to walk through the next step, or should I wing it?",
  "On it. Anything else, or should I start writing code?",
]

export function CheckpointRailChat({ fullscreen = false }) {
  const initial = fullscreen ? [...MESSAGES, ...EXTRA] : [...MESSAGES, ...EXTRA.slice(0, 5)]
  const initialCheckpoints = initial
    .map((m, i) => (m.role === "user" ? { id: `cp${i}`, label: m.text, at: i } : null))
    .filter(Boolean)
  const [messages, setMessages] = useState(initial)
  const [checkpoints] = useState(initialCheckpoints)
  const [current, setCurrent] = useState(initialCheckpoints[0]?.id ?? "")
  const [input, setInput] = useState("")
  const scrollRef = useRef(null)
  const msgRefs = useRef([])
  const replyIdx = useRef(0)
  const suppressScroll = useRef(false)
  const overlayRef = useRef(null)
  const railRef = useRef(null)
  const [railY, setRailY] = useState(0)

  useEffect(() => {
    updateRail(scrollRef.current?.scrollTop ?? 0)
  }, [])

  function updateRail(top) {
    const el = scrollRef.current
    const ov = overlayRef.current
    const rw = railRef.current
    if (!el || !ov || !rw) return
    const R = rw.offsetHeight
    const O = ov.clientHeight
    const S = el.scrollHeight - el.clientHeight
    const range = R - O
    const base = range < 0 ? -range / 2 : 0
    const travel = range > 0 ? range : 0
    setRailY(base - travel * (S > 0 ? top / S : 0))
  }

  function pick(id) {
    const at = checkpoints.find((c) => c.id === id)?.at
    const el = scrollRef.current
    const node = at != null ? msgRefs.current[at] : null
    if (!el || !node) return
    const top = node.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop
    const unlock = () => {
      suppressScroll.current = false
    }
    setCurrent(id)
    suppressScroll.current = true
    el.scrollTo({ top, behavior: "smooth" })
    el.addEventListener("scrollend", unlock, { once: true })
    window.setTimeout(unlock, 2000)
  }

  function onScroll() {
    const el = scrollRef.current
    if (!el) return
    updateRail(el.scrollTop)
    if (suppressScroll.current) return
    let found = checkpoints[0]?.id ?? ""
    for (const c of checkpoints) {
      const node = msgRefs.current[c.at]
      if (!node) continue
      const top = node.getBoundingClientRect().top - el.getBoundingClientRect().top
      if (top <= el.clientHeight / 2) found = c.id
    }
    if (found) setCurrent(found)
  }

  function send() {
    const t = input.trim()
    if (!t) return
    const reply = REPLIES[replyIdx.current % REPLIES.length]
    replyIdx.current += 1
    setMessages((m) => [...m, { role: "user", text: t }, { role: "ai", text: reply }])
    setInput("")
    requestAnimationFrame(() => {
      const el = scrollRef.current
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    })
  }

  const iconBtn =
    "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover-bg)] hover:text-[var(--color-text)]"

  return (
    <div
      className={
        fullscreen
          ? "flex h-full flex-col"
          : "w-full overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg)]"
      }
    >
      <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2">
        <span className="text-[12px] font-bold uppercase tracking-[3px] text-[var(--color-text)]">
          AI chat
        </span>
        {fullscreen ? (
          <Link to="/components/checkpoint-rail" aria-label="Exit fullscreen" className={iconBtn}>
            <Minimize2 className="size-4" />
          </Link>
        ) : (
          <Link to="/components/checkpoint-rail/demo" aria-label="Open fullscreen demo" className={iconBtn}>
            <Maximize2 className="size-4" />
          </Link>
        )}
      </div>

      <div className={fullscreen ? "relative min-h-0 flex-1 overflow-hidden" : "relative h-[360px] overflow-hidden"}>
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="h-full overflow-y-auto overflow-x-hidden p-4 sm:pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={`mx-auto w-full ${fullscreen ? "max-w-[640px]" : "max-w-[440px]"}`}>
            {messages.map((m, i) => (
              <div
                key={i}
                ref={(el) => {
                  msgRefs.current[i] = el
                }}
                className={`mb-3 w-fit max-w-[80%] rounded-lg border border-[color:var(--color-border)] px-4 py-3 text-[13px] leading-relaxed [overflow-wrap:anywhere] ${
                  m.role === "user"
                    ? "ml-auto bg-[var(--color-text)] text-[var(--color-bg)]"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={overlayRef}
          className="pointer-events-none absolute bottom-0 left-0 right-2 top-0 hidden flex-col items-end py-1.5 sm:flex"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div ref={railRef} className="pointer-events-auto" style={{ transform: `translateY(${railY}px)` }}>
            <CheckpointRail
              items={checkpoints.map((c) => ({ id: c.id, label: c.label }))}
              currentId={current}
              onSelect={pick}
            />
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[color:var(--color-border)] p-3">
        <div className={`mx-auto flex w-full gap-2 ${fullscreen ? "max-w-[640px]" : "max-w-[440px]"}`}>
          <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message dasregistry chat..."
          className="min-w-0 flex-1 rounded-md border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-[13px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
        />
        <button
          type="button"
          onClick={send}
          className="cursor-pointer rounded-md bg-[var(--color-text)] px-4 py-2 text-[13px] font-medium text-[var(--color-bg)] transition-opacity hover:opacity-80"
        >
          Send
          </button>
        </div>
      </div>
    </div>
  )
}