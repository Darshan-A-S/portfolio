export const checkpointRailDoc = {
  intro:
    "A vertical rail of small horizontal lines for chat interfaces. Each line is a checkpoint — hover it to see the section label, click to jump straight there. Drop it along the right edge of a chat scroll container.",

  demoCode: `import { useRef, useState } from "react"
import { CheckpointRail } from "dasregistry"

const MESSAGES = [
  { role: "user", text: "I want to build a React component library. Where do I even start?" },
  { role: "ai", text: "Start with a registry pattern. Build one small component, wire a shared exports index, and ship a single stylesheet." },
  { role: "user", text: "That checkpoint rail is slick. How does it actually work?" },
  { role: "ai", text: "Every user prompt becomes a checkpoint — a small line in a rail on the right edge. Hover to see the prompt, click to jump, and the line under what you're reading glows red." },
]

// one checkpoint per user prompt, pointing at its index in MESSAGES
const CHECKPOINTS = MESSAGES.map((m, i) =>
  m.role === "user" ? { id: \`cp\${i}\`, label: m.text, at: i } : null
).filter(Boolean)

export function CheckpointRailDemo() {
  const [messages, setMessages] = useState(MESSAGES)
  const [current, setCurrent] = useState(CHECKPOINTS[0].id)
  const scrollRef = useRef(null)
  const msgRefs = useRef([])
  const railRef = useRef(null)
  const [railY, setRailY] = useState(0)

  function onScroll() {
    const el = scrollRef.current
    if (!el) return
    const rw = railRef.current
    const S = el.scrollHeight - el.clientHeight
    const range = rw.offsetHeight - el.clientHeight
    setRailY((range < 0 ? -range / 2 : 0) - (range > 0 ? range : 0) * (S > 0 ? el.scrollTop / S : 0))
    let found = CHECKPOINTS[0].id
    for (const c of CHECKPOINTS) {
      const node = msgRefs.current[c.at]
      if (!node) continue
      const top = node.getBoundingClientRect().top - el.getBoundingClientRect().top
      if (top <= el.clientHeight / 2) found = c.id
    }
    if (found) setCurrent(found)
  }

  function pick(id) {
    const at = CHECKPOINTS.find((c) => c.id === id)?.at
    const el = scrollRef.current
    const node = at != null ? msgRefs.current[at] : null
    if (el && node) {
      el.scrollTo({
        top: node.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop,
        behavior: "smooth",
      })
    }
    setCurrent(id)
  }

  return (
    <div className="relative h-[360px] overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg)]">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="h-full overflow-y-auto overflow-x-hidden p-4 sm:pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            ref={(el) => {
              msgRefs.current[i] = el
            }}
            className={\`mb-3 w-fit max-w-[80%] rounded-lg border border-[color:var(--color-border)] px-4 py-3 text-[12px] \${m.role === "user" ? "ml-auto bg-[var(--color-text)] text-[var(--color-bg)]" : "bg-[var(--color-bg-secondary)] text-[var(--color-text)]"}\`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-2 top-0 hidden flex-col items-end py-1.5 sm:flex"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div ref={railRef} className="pointer-events-auto" style={{ transform: \`translateY(\${railY}px)\` }}>
          <CheckpointRail
            items={CHECKPOINTS.map((c) => ({ id: c.id, label: c.label }))}
            currentId={current}
            onSelect={pick}
          />
        </div>
      </div>
    </div>
  )
}`,

  installCli: `npm install dasregistry`,

  installStyle: `import "dasregistry/style.css";`,

  manualDeps: "The component has no dependencies beyond `react` and `react-dom`.",

  sourceCode: `export interface CheckpointItem {
  id: string;
  label: string;
}

export interface CheckpointRailProps {
  items: CheckpointItem[];
  currentId?: string;
  onSelect?: (id: string) => void;
}

export function CheckpointRail({ items = [], currentId, onSelect }: CheckpointRailProps) {
  const gap = Math.max(1, 11 - items.length);
  return (
    <nav className="das-cp" style={{ gap }} aria-label="Chat checkpoints">
      {items.map((item) => {
        const current = item.id === currentId;
        return (
          <button
            key={item.id}
            type="button"
            className={["das-cp-btn", current && "das-cp-current"].filter(Boolean).join(" ")}
            aria-label={\`Jump to \${item.label}\`}
            aria-current={current ? "true" : undefined}
            onClick={() => onSelect?.(item.id)}
          >
            <span className="das-cp-line" aria-hidden="true" />
            <span className="das-cp-tip">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}`,

  usageImport: `import { CheckpointRail } from "dasregistry"
import "dasregistry/style.css";`,

  usageExample: `const [currentId, setCurrentId] = useState("")

<CheckpointRail
  items={checkpoints}
  currentId={currentId}
  onSelect={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
/>`,

  usageNote:
    "Wire the rail to your chat scroll. When a checkpoint becomes visible (for example via `IntersectionObserver` on your message anchors), update `currentId`; when the user clicks a line, `onSelect` fires and you scroll the anchor into view. The component renders purely on the client side — no data loads here. On first render the message list is empty; mount the checkpoints only once the data has loaded, so the rail shows up exactly like this.",

  props: [
    {
      name: "items",
      type: "CheckpointItem[] | undefined",
      description: "The checkpoints, in top-to-bottom order. Each has an id (used for currentId/onSelect) and a label (shown in the hover tooltip). Defaults to an empty list.",
    },
    {
      name: "currentId",
      type: "string | undefined",
      description: "Id of the checkpoint currently visible in the chat; its line renders accent red.",
    },
    {
      name: "onSelect",
      type: "((id: string) => void) | undefined",
      description: "Called with the checkpoint id when a line is clicked.",
    },
  ],

  behavior: [
    "Hovering or keyboard-focusing a line grows it, colors it accent red, and slides out a tooltip with the label to the left. Clicking fires `onSelect`.",
    "The current checkpoint is marked with `aria-current` and a red line, so the visible position stays readable without hover.",
    "Tooltips are pure CSS — no JS state; works on touch-outlined focus too.",
    "Sits on native `<button>` elements, so keyboard tabbing and Enter/Space activation work out of the box.",
    "Styles come from the shared stylesheet — load `dasregistry/style.css` once per app.",
    "Up to 11 items — gaps tighten automatically as the list grows.",
    "When the rail outgrows its viewport, the host overlay scroll-links it to the chat and fades the top and bottom edges (12% gradient mask). That behavior lives in the host page, not the component — the component itself just renders the markers you pass it.",
  ],

  updated: "August 21, 2026",
}