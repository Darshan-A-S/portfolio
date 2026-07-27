import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../components/nav.jsx"
import Logo from "../components/logo.jsx"
import Seperation from "../components/sperations-bar.jsx"
import LogoFoot from "../components/logo-foot.jsx"
import Inspirations from "../components/inspirations.jsx"
import SearchModal from "../components/search-modal.jsx"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import VideoEditing from "../components/video-editing.jsx"

export default function OthersidePage() {
  const { hash } = useLocation()
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

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }, [hash])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onSearchClick={() => setSearchOpen(true)} />
      {/* <Logo isDark={isDark} /> */}
      <Seperation />
      <VideoEditing variant="full" />
      {/* <LogoFoot /> */}
      <Inspirations />
      <Analytics />
      <SpeedInsights />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
    </div>
  )
}
