import { useState, useEffect } from 'react'
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
import { LeetCodeContributions } from './components/github-contributions.jsx'
import LogoFoot from './components/logo-foot.jsx'
import AsciiWebcam from './components/ascii-webcam.jsx'
import Inspirations from './components/inspirations.jsx'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Logo isDark={isDark} />
      <Seperation />
      <Name />
      <Seperation />
      <Details />
      <Seperation />
      <Socials />
      <Seperation />
      <About />
      <Seperation />
      <Tech />
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
    </div>
  )
}

export default App
