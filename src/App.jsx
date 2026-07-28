import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import Projects from './components/projects.jsx'
import VideoEditing from './components/video-editing.jsx'
import { LeetCodeContributions } from './components/leetcode-contributions.jsx'
import LogoFoot from './components/logo-foot.jsx'
import AsciiWebcam from './components/ascii-webcam.jsx'
import Inspirations from './components/inspirations.jsx'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SearchModal from './components/search-modal.jsx'
import OthersidePage from './pages/OthersidePage.jsx'

function HomePage() {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [searchOpen, setSearchOpen] = useState(false)

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
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (e.key === 'Escape') setSearchOpen(false)
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
      <AsciiWebcam />
      <LogoFoot />
      <Inspirations />

      <Analytics />
      <SpeedInsights />

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/otherside" element={<OthersidePage />} />
    </Routes>
  )
}

export default App
