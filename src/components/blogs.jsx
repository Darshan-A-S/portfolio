import { Link } from 'react-router-dom'
import { blogs } from "@/data/blogs"

export function BlogCard({ blog, variant = "card" }) {
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className={
        variant === "row"
          ? "group flex h-full flex-col p-4 transition-colors hover:bg-[var(--color-badge-bg)]/40"
          : "group block overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] transition-colors hover:border-[var(--color-text-muted)]"
      }
    >
      <div className={variant === "row" ? "aspect-video overflow-hidden rounded-lg" : "aspect-video overflow-hidden"}>
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>
      <div className={variant === "row" ? "pt-3" : "px-4 py-3"}>
        <h3 className="break-words text-[15px] font-medium text-[var(--color-text)]">{blog.title}</h3>
        <p className="mt-1 text-left text-[12px] text-[var(--color-text-muted)]">{blog.date}</p>
      </div>
    </Link>
  )
}

export function DoubleLine({ className }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="border-t border-[color:var(--color-border)]" />
      <div className="mx-auto h-4 w-full max-w-[768px]" />
      <div className="border-t border-[color:var(--color-border)]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[768px] -translate-x-1/2 sm:block">
        <div className="flex h-full justify-between">
          <div className="border-l border-[color:var(--color-border)]" />
          <div className="border-l border-[color:var(--color-border)]" />
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 sm:flex">
        <div className="flex h-full gap-4">
          <div className="border-l border-[color:var(--color-border)]" />
          <div className="border-l border-[color:var(--color-border)]" />
        </div>
      </div>
    </div>
  )
}

export function BlogRow({ blogs, last = false }) {
  return (
    <div className="mx-auto flex max-w-[768px] flex-col border-x border-[color:var(--color-border)] sm:flex-row">
      <div className="min-w-0 flex-1">
        <BlogCard variant="row" blog={blogs[0]} />
      </div>
      <DoubleLine className="sm:hidden" />
      <div className="hidden flex-row gap-4 sm:flex">
        <div className="border-l border-[color:var(--color-border)]" />
        <div className="border-l border-[color:var(--color-border)]" />
      </div>
      <div className="min-w-0 flex-1">
        {blogs[1] ? (
          <BlogCard variant="row" blog={blogs[1]} />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-[13px] text-[var(--color-text-muted)]">
            Many more to come
          </div>
        )}
      </div>
      {!last && <DoubleLine className="sm:hidden" />}
    </div>
  )
}

function Blogs() {
  const rows = []
  const shown = blogs.slice(0, 4)
  for (let i = 0; i < shown.length; i += 2) rows.push(shown.slice(i, i + 2))
  return (
    <div id="blogs" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Blogs
        </div>
      </h2>
      {rows.map((pair, i) => (
        <div key={pair[0].slug}>
          <BlogRow blogs={pair} last={i === rows.length - 1} />
          {i < rows.length - 1 && <DoubleLine className="hidden sm:block" />}
        </div>
      ))}
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto flex max-w-[768px] border-x border-[color:var(--color-border)] justify-center py-2">
          <Link
            role="button"
            to="/blogs"
            className="inline-flex items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-transparent bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] active:scale-[0.98] cursor-pointer"
          >
            Load More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Blogs
