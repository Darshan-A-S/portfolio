import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { searchItems } from "@/data/search-data"
import logoDark from "@/assets/svgs/DAS-white.svg"
import logoLight from "@/assets/svgs/DAS-light.svg"

export default function SearchModal({ open, onClose, isDark }) {
  const [query, setQuery] = useState("")
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const filtered = query
    ? searchItems.filter((item) =>
        `${item.label} ${item.keywords}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : searchItems

  useEffect(() => {
    if (!open) { setQuery(""); return }
    setTimeout(() => inputRef.current?.focus(), 50)
    setActiveIdx(0)
  }, [open])

  useEffect(() => {
    setActiveIdx(0)
    if (listRef.current) listRef.current.scrollTop = 0
  }, [query])

  useEffect(() => {
    const el = listRef.current?.children[activeIdx]
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [activeIdx])

  const go = (idx) => {
    const item = filtered[idx]
    if (!item) return
    if (item.href.startsWith("http")) window.open(item.href, "_blank")
    else if (item.href.startsWith("#")) {
      const el = document.querySelector(item.href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
      else navigate("/" + item.href)
    } else navigate(item.href)
    onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((p) => Math.min(p + 1, filtered.length - 1)) }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((p) => Math.max(p - 1, 0)) }
    if (e.key === "Enter") { e.preventDefault(); go(activeIdx) }
    if (e.key === "Escape") onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-[520px] mx-4 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-bg)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[color:var(--color-border)] px-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--color-text-muted)]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search anything..."
            className="flex-1 bg-transparent py-3.5 text-[14px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-[color:var(--color-border)] px-1.5 py-0.5 text-[11px] font-mono text-[var(--color-text-muted)]">ESC</kbd>
        </div>
        <div ref={listRef} className="h-[300px] overflow-y-auto scrollbar-none py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-[13px] text-[var(--color-text-muted)]">No results found</p>
          ) : (
            filtered.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                onMouseEnter={() => setActiveIdx(i)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors ${
                  i === activeIdx ? "bg-[var(--color-hover-bg)] text-[var(--color-text)]" : "text-[var(--color-text-secondary)]"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--color-text-muted)]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <span className="flex-1">{item.label}</span>
              </button>
            ))
          )}
        </div>
        <div className="hidden sm:flex items-center justify-between border-t border-[color:var(--color-border)] px-4 py-2">
          <img src={isDark ? logoDark : logoLight} alt="DAS" className="h-5 w-[25px]" />
          <div className="flex items-center gap-4 text-[11px] text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1"><kbd className="rounded border border-[color:var(--color-border)] px-1 py-0.5 font-mono">↑</kbd><kbd className="rounded border border-[color:var(--color-border)] px-1 py-0.5 font-mono">↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-[color:var(--color-border)] px-1.5 py-0.5 font-mono">↵</kbd> open</span>
          </div>
        </div>
      </div>
    </div>
  )
}
