import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Markdown from "react-markdown"
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react"
import Navbar from "../components/nav.jsx"
import Seperation from "../components/sperations-bar.jsx"
import Inspirations from "../components/inspirations.jsx"
import SearchModal from "../components/search-modal.jsx"
import NotFoundPage from "./NotFoundPage.jsx"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../components/ui/tooltip.jsx"
import { blogs } from "../data/blogs"

function BlogImage({ img }) {
  const pos =
    img.align === "right"
      ? "float-right ml-3"
      : img.align === "left"
        ? "float-left mr-3"
        : img.align === "center"
          ? "mx-auto"
          : ""
  const size = img.size === "small" ? "w-[45%]" : img.size === "large" ? "w-full" : "w-[65%]"
  return (
    <figure className={`my-2 ${pos} ${size}`}>
      <img
        src={img.img}
        alt={img.alt || ""}
        loading="lazy"
        className="w-full rounded-lg border border-[color:var(--color-border)] object-cover"
        style={img.aspect ? { aspectRatio: img.aspect } : undefined}
      />
      {img.caption && (
        <figcaption className="mt-1 text-center text-[12px] text-[var(--color-text-muted)]">{img.caption}</figcaption>
      )}
    </figure>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const blog = blogs.find((b) => b.slug === slug)
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

  if (!blog) return <NotFoundPage />

  const index = blogs.findIndex((b) => b.slug === blog.slug)
  const prev = index > 0 ? blogs[index - 1] : null
  const next = index < blogs.length - 1 ? blogs[index + 1] : null

  const truncate = (s, n = 20) => (s.length > n ? s.slice(0, n) + ".." : s)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: blog.title, url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch {}
  }

  const navBtnClass = "inline-flex size-8 items-center justify-center rounded-md bg-[var(--color-hover-bg)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onSearchClick={() => setSearchOpen(true)} />
      <Seperation />
      <article className="px-[8px] sm:px-0">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
          <div className="flex items-center justify-between gap-4 border-b border-[color:var(--color-border)] px-4 py-2">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <ArrowLeft className="size-4" />
              Blogs
            </Link>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={<button type="button" onClick={share} aria-label="Share" className={navBtnClass} />}
                  >
                    <Share2 className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>Share</TooltipContent>
                </Tooltip>
                {prev && (
                  <Tooltip>
                    <TooltipTrigger
                      render={<Link to={`/blogs/${prev.slug}`} aria-label={`Previous post: ${prev.title}`} className={navBtnClass} />}
                    >
                      <ArrowLeft className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>Previous post: {truncate(prev.title)}</TooltipContent>
                  </Tooltip>
                )}
                {next && (
                  <Tooltip>
                    <TooltipTrigger
                      render={<Link to={`/blogs/${next.slug}`} aria-label={`Next post: ${next.title}`} className={navBtnClass} />}
                    >
                      <ArrowRight className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>Next post: {truncate(next.title)}</TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </div>

          <h1 className="border-b border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold text-[var(--color-text)]">
            {blog.title} <span className="text-[10px] font-normal text-muted-foreground">({blog.date})</span>
          </h1>
          <div className="overflow-hidden border-t border-[color:var(--color-border)] px-4 py-4 text-[15px] leading-relaxed text-[var(--color-text)] [&_p]:mb-3 [&_h2]:mb-2 [&_h2]:text-[20px] [&_h2]:font-bold [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
            {blog.content.map((block, i) =>
              typeof block === "string" ? (
                <Markdown key={i}>{block}</Markdown>
              ) : (
                <BlogImage key={i} img={block} />
              )
            )}
          </div>
        </div>
      </article>
      <div className="mx-auto w-full max-w-[768px] flex-1 border-x border-[color:var(--color-border)]"></div>
      <Inspirations />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} isDark={isDark} />
    </div>
  )
}
