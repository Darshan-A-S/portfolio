import { useState, useEffect } from "react"
import Navbar from "../components/nav.jsx"
import Seperation from "../components/sperations-bar.jsx"
import Inspirations from "../components/inspirations.jsx"
import SearchModal from "../components/search-modal.jsx"
import { BlogRow, DoubleLine } from "../components/blogs.jsx"
import { blogs } from "../data/blogs"

export default function BlogsPage() {
  const [query, setQuery] = useState("")
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen((p) => !p)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      if (e.key === "Escape") setSearchOpen(false)
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') setIsDark((prev) => !prev)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const toggleTheme = () => setIsDark((prev) => !prev)

  const filtered = query
    ? blogs.filter((b) => `${b.title} ${b.content}`.toLowerCase().includes(query.toLowerCase()))
    : blogs

  const pairs = []
  for (let i = 0; i < filtered.length; i += 2) pairs.push(filtered.slice(i, i + 2))

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onSearchClick={() => setSearchOpen(true)} />
      <Seperation />
      <div id="blogs" className="px-[8px] sm:px-0">
        <h2 className="border-b border-[color:var(--color-border)]">
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
            Blogs
          </div>
        </h2>
        <div className="border-b border-[color:var(--color-border)]">
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-3 py-2">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs..."
                className="w-full rounded-lg border border-[var(--color-badge-border)] bg-transparent py-2 pl-9 pr-3 text-[13px] font-mono text-[var(--color-text)] outline-none transition-shadow hover:shadow-md placeholder:text-[var(--color-text-muted)]"
              />
            </div>
          </div>
        </div>
        <DoubleLine />
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] py-10 text-center text-[13px] text-[var(--color-text-muted)]">
            No results found
          </div>
        ) : (
          pairs.map((pair, i) => (
            <div key={pair[0].slug}>
              <BlogRow blogs={pair} />
              {i < pairs.length - 1 && <DoubleLine />}
            </div>
          ))
        )}
      </div>
      <DoubleLine />
      <Inspirations />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
    </div>
  )
}
