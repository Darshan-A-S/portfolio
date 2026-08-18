import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/nav.jsx'
import Logo from './components/logo.jsx'
import Name from './components/name.jsx'
import Details from './components/details.jsx'
import Seperation from './components/sperations-bar.jsx'
import Socials from './components/socials.jsx'
import About from './components/about.jsx'
import Experience from './components/experience.jsx'
import Education from './components/education.jsx'
import Tech from './components/techstack.jsx'
import UiComponents from './components/ui-components.jsx'
import Projects from './components/projects.jsx'
import VideoEditing from './components/video-editing.jsx'
import { LeetCodeContributions } from './components/leetcode-contributions.jsx'
import LogoFoot from './components/logo-foot.jsx'
import Inspirations from './components/inspirations.jsx'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SearchModal from './components/search-modal.jsx'
import Timescale from './components/timescale.jsx'
import OthersidePage from './pages/OthersidePage.jsx'
import ComponentsPage from './pages/ComponentsPage.jsx'
import ComponentPage from './pages/ComponentPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import QuoteModal from './components/quote-modal.jsx'

function HomePage() {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [timescaleOpen, setTimescaleOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((p) => !p)
      }
      if ((e.ctrlKey || e.metaKey) && e.code === "Quote") {
        e.preventDefault()
        setTimescaleOpen((p) => !p)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (e.key === 'Escape') { setSearchOpen(false); setTimescaleOpen(false) }
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') setIsDark((prev) => !prev)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }, [location])

  const timescaleOpenRef = useRef(timescaleOpen)
  useEffect(() => { timescaleOpenRef.current = timescaleOpen }, [timescaleOpen])

  useEffect(() => {
    const isMobile = matchMedia("(pointer: coarse)").matches
    if (!isMobile) return

    let timer = null

    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10

      if (atBottom && !timescaleOpenRef.current) {
        if (!timer) {
          timer = setTimeout(() => {
            if (!timescaleOpenRef.current) setTimescaleOpen(true)
            timer = null
          }, 1500)
        }
      } else {
        if (timer) { clearTimeout(timer); timer = null }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onSearchClick={() => setSearchOpen(true)} />
      <Logo isDark={isDark} />
      <Seperation />
      <Name />
      <Seperation />
      <Details />
      <Seperation />
      <Socials />
      <Seperation />
      <Tech isDark={isDark} />
      <Seperation />
      <UiComponents />
      <Seperation />
      <Experience />
      <Seperation />
      <Education />
      <Seperation />
      <Projects />
      <Seperation />
      <VideoEditing />
      <Seperation />
      <LeetCodeContributions />
      <Seperation />
      <LogoFoot />
      <Inspirations />

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
      <Timescale open={timescaleOpen} onClose={() => setTimescaleOpen(false)} isDark={isDark} />
    </div>
  )
}

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        navigate('/')
      }
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        navigate('/das')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/otherside" element={<OthersidePage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/:slug" element={<ComponentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <QuoteModal />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
