import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/nav.jsx"
import Seperation from "../components/sperations-bar.jsx"
import LogoFoot from "../components/logo-foot.jsx"
import Inspirations from "../components/inspirations.jsx"
import SearchModal from "../components/search-modal.jsx"

export default function NotFoundPage() {
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
      if (e.key === "d" && !e.ctrlKey && !e.metaKey && e.target.tagName !== "INPUT") setIsDark((prev) => !prev)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onSearchClick={() => setSearchOpen(true)} />
      <Seperation />
      <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
        <div className="mx-auto max-w-[768px] border-x border-b border-[color:var(--color-border)]">
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
            <h1 className="font-playfair italic text-[96px] leading-none tracking-tight">404</h1>
            <h2 className="text-[26px] font-bold">Page not found</h2>
            <p className="max-w-md text-[14px] text-[var(--color-text-muted)]">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-transparent bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] active:scale-[0.98]"
            >
              Back to home
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </Link>
          </div>
        </div>
      </div>
      <Seperation />
      <LogoFoot />
      <Inspirations />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
    </div>
  )
}
