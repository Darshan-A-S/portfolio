import { useState, useRef, useEffect } from 'react'
import logoLight from './../assets/svgs/DAS-light.svg'
import logoDark from './../assets/svgs/DAS-white.svg'
import darkmode from './../assets/svgs/darkmode.svg'
import lightmode from './../assets/svgs/lightmode.svg'

const Nav = ({ isDark, toggleTheme, onSearchClick }) => {
  const [rotation, setRotation] = useState(0)
  const tapCount = useRef(0)
  const tapTimer = useRef(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
  }, [])

  const handleLogoTap = () => {
    if (!isIOS) return
    tapCount.current += 1
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => { tapCount.current = 0 }, 1500)
    if (tapCount.current >= 3) {
      tapCount.current = 0
      window.dispatchEvent(new CustomEvent('open-quote'))
    }
  }

  const handleToggle = () => {
    setRotation((prev) => prev + 360)
    toggleTheme()
  }

  const handleSectionClick = (e, hash) => {
    e.preventDefault()
    const el = document.querySelector(hash)
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    window.location.href = '/' + hash
  }

  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <nav className="mx-auto flex max-w-[768px] items-center justify-between border-x border-[color:var(--color-border)] px-[8px] sm:px-4 py-3">
        <a href="/" onClick={handleLogoTap} className="flex items-center gap-2">
          <img src={isDark ? logoDark : logoLight} alt="Logo" className="h-8 w-8" />
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex sm:gap-4">
            <a href="/components" className="text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Components</a>
            <a href="#projects" onClick={(e) => handleSectionClick(e, '#projects')} className="text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Projects</a>
            <a href="/otherside" className="text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">Otherside</a>
          </div>
          <button onClick={onSearchClick} className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--color-badge-border)] transition-transform transition-shadow hover:shadow-md hover:scale-105" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button onClick={onSearchClick} className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[var(--color-badge-border)] px-2.5 py-1.5 text-[11px] font-mono text-[var(--color-text-muted)] transition-transform transition-shadow hover:shadow-md hover:scale-105" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Ctrl+K
          </button>
          <div className="group relative">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-badge-border)] transition-transform transition-shadow hover:shadow-md hover:scale-105"
              onClick={handleToggle}
              aria-label="Toggle dark mode"
            >
              <img
                src={isDark ? lightmode : darkmode}
                alt="Toggle theme"
                className="h-4 w-4 transition-transform duration-500 ease-in-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </button>
          </div>
          <a
            href="https://github.com/Darshan-A-S/portfolio"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-badge-border)] transition-transform transition-shadow hover:shadow-md hover:scale-105"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default Nav
