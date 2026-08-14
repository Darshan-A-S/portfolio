import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DinoGame from "../components/DinoGame.jsx"

export default function NotFoundPage() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <div className="flex min-h-screen items-center justify-center px-[8px] sm:px-0">
      <div className="mx-auto w-full max-w-[768px]">
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center sm:py-16">
          <h1 className="font-playfair italic text-[64px] leading-none tracking-tight sm:text-[96px]">404</h1>
          <h2 className="text-[22px] font-bold sm:text-[26px]">Page not found</h2>
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
          <div className="mt-4 w-full max-w-[600px]">
            <DinoGame />
          </div>
        </div>
      </div>
    </div>
  )
}
