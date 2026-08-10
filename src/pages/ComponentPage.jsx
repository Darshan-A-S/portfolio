import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Navbar from "../components/nav.jsx"
import Seperation from "../components/sperations-bar.jsx"
import Inspirations from "../components/inspirations.jsx"
import SearchModal from "../components/search-modal.jsx"
import NotFoundPage from "./NotFoundPage.jsx"
import DatePickerDoc from "./datepicker-doc.jsx"
import { uiComponents } from "../data/ui-components"

export default function ComponentPage() {
  const { slug } = useParams()
  const component = uiComponents.find((c) => c.slug === slug)
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

  if (!component) return <NotFoundPage />

  const Icon = component.icon

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onSearchClick={() => setSearchOpen(true)} />
      <Seperation />
      {component.slug === "datepicker" ? (
        <DatePickerDoc />
      ) : (
        <article className="px-[8px] sm:px-0">
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
            <div className="flex items-center justify-between gap-4 border-b border-[color:var(--color-border)] px-4 py-2">
              <Link
                to="/components"
                className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <ArrowLeft className="size-4" />
                Components
              </Link>
            </div>
            <h1 className="flex items-center gap-3 break-words border-b border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold leading-snug text-[var(--color-text)]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)]">
                <Icon className="size-5 text-[var(--color-text-muted)]" />
              </span>
              {component.name}
            </h1>
            <div className="border-t border-[color:var(--color-border)] px-4 py-16 text-center text-[13px] text-[var(--color-text-muted)]">
              {component.description}
              <p className="mt-2">This page is under construction.</p>
            </div>
          </div>
        </article>
      )}
      <Inspirations />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
    </div>
  )
}
