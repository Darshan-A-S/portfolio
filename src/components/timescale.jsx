"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Markdown from "react-markdown"
import { cn } from "@/lib/utils"
import logoDark from "@/assets/DAS-white.svg"
import logoLight from "@/assets/DAS-light.svg"
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react"

const BIRTH_YEAR = 2004

const MILESTONES = [
  { year: 2004, content: "Born in Davanagere, Karnataka" },
  { year: 2005 }, { year: 2006 }, { year: 2007 },
  { year: 2008, content: "Started **primary school**.", image: "https://res.cloudinary.com/k2uloqof/image/upload/v1785355642/1680427925637-f158fdac-c382-4d46-9570-6dc4fc006e7a_2_lo1e3u.jpg", highlight: "primary school" },
  { year: 2009 }, { year: 2010 }, { year: 2011 }, { year: 2012 }, { year: 2013 },
  { year: 2014, content: "Started high school." },
  { year: 2015 }, { year: 2016 },
  { year: 2017},
  { year: 2018 },   { year: 2019, content: "Was **Sathya House Captain**.\n\nOur house won the annual sports meet that year.", image: "https://res.cloudinary.com/k2uloqof/image/upload/v1785352923/FB_IMG_1689957926651_cmsl6s.jpg", highlight: "Sathya House Captain" },
  { year: 2020},
  { year: 2021, content: "Learned C and C++." },
  { year: 2022, content: "Began engineering degree in Computer Science." },
  { year: 2023, content: "Built projects in Java, Python, and web technologies. Started exploring AI/ML." },
  { year: 2024, content: "Developed ProctorPro — an online exam proctoring system with real-time multi-face detection during a hackathon." },
  { year: 2025, content: "Built projects in Java, Python, and web technologies. Started exploring AI/ML." },
  { year: 2026, content: "Built this portfolio. Continued exploring AI integration in practical products.\n- Redesigned the entire UI with Tailwind v4\n- Added interactive timeline with hover previews\n- Integrated LeetCode contribution stats\n- Built search modal with 30+ items\n\nJoined Texas AI as an Associate Software Engineer. Working on backend systems with Java and Spring Boot." },
]

function TimescaleRoot({ className, orientation = "horizontal", ...props }) {
  return (
    <div
      data-slot="timescale-root"
      data-orientation={orientation}
      className={cn(
        "group/timescale relative flex w-full [--timescale-rail:--spacing(14)]",
        "data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function TimescaleViewport({ className, ...props }) {
  return (
    <div
      data-slot="timescale-viewport"
      className={cn(
        "no-scrollbar w-full",
        "group-data-[orientation=horizontal]/timescale:flex group-data-[orientation=horizontal]/timescale:flex-1 group-data-[orientation=horizontal]/timescale:scroll-fade-x group-data-[orientation=horizontal]/timescale:overflow-x-auto group-data-[orientation=horizontal]/timescale:overscroll-x-contain group-data-[orientation=horizontal]/timescale:pl-20 group-data-[orientation=horizontal]/timescale:scroll-fade-s-40",
        className
      )}
      {...props}
    />
  )
}

function TimescaleHeader({ className, ...props }) {
  return (
    <div
      data-slot="timescale-header"
      aria-hidden="true"
      className={cn(
        "z-10",
        "group-data-[orientation=horizontal]/timescale:absolute group-data-[orientation=horizontal]/timescale:top-0 group-data-[orientation=horizontal]/timescale:left-0 group-data-[orientation=horizontal]/timescale:w-20 group-data-[orientation=horizontal]/timescale:shrink-0 group-data-[orientation=horizontal]/timescale:bg-linear-to-r group-data-[orientation=horizontal]/timescale:from-[var(--color-bg)] group-data-[orientation=horizontal]/timescale:from-75% group-data-[orientation=horizontal]/timescale:to-transparent group-data-[orientation=horizontal]/timescale:pr-4 group-data-[orientation=horizontal]/timescale:text-right",
        "group-data-[orientation=vertical]/timescale:grid group-data-[orientation=vertical]/timescale:w-full group-data-[orientation=vertical]/timescale:grid-cols-[var(--timescale-rail)_1fr] group-data-[orientation=vertical]/timescale:gap-x-4 group-data-[orientation=vertical]/timescale:bg-[var(--color-bg)]",
        className
      )}
      {...props}
    />
  )
}

function TimescaleTrack({ className, ...props }) {
  return (
    <div
      data-slot="timescale-track"
      className={cn(
        "relative flex",
        "group-data-[orientation=horizontal]/timescale:w-max group-data-[orientation=horizontal]/timescale:items-start",
        "group-data-[orientation=vertical]/timescale:w-full group-data-[orientation=vertical]/timescale:flex-col group-data-[orientation=vertical]/timescale:pt-4",
        className
      )}
      {...props}
    />
  )
}

function TimescaleRail({ className, ...props }) {
  return (
    <div
      data-slot="timescale-rail"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute border-dashed border-[color:var(--color-border)]",
        "group-data-[orientation=horizontal]/timescale:inset-x-0 group-data-[orientation=horizontal]/timescale:top-(--timescale-rail) group-data-[orientation=horizontal]/timescale:h-px group-data-[orientation=horizontal]/timescale:border-t",
        "group-data-[orientation=vertical]/timescale:inset-y-0 group-data-[orientation=vertical]/timescale:left-(--timescale-rail) group-data-[orientation=vertical]/timescale:w-px group-data-[orientation=vertical]/timescale:border-l",
        className
      )}
      {...props}
    />
  )
}

function TimescaleItem({ className, ...props }) {
  return (
    <div
      data-slot="timescale-item"
      className={cn(
        "relative",
        "group-data-[orientation=horizontal]/timescale:w-20 group-data-[orientation=horizontal]/timescale:shrink-0 group-data-[orientation=horizontal]/timescale:not-last:pr-4 group-data-[orientation=horizontal]/timescale:has-data-[slot=timescale-content]:w-80",
        "group-data-[orientation=vertical]/timescale:grid group-data-[orientation=vertical]/timescale:w-full group-data-[orientation=vertical]/timescale:grid-cols-[var(--timescale-rail)_1fr] group-data-[orientation=vertical]/timescale:gap-x-4 group-data-[orientation=vertical]/timescale:not-last:pb-4",
        className
      )}
      {...props}
    />
  )
}

function TimescaleTick({ className, ...props }) {
  return (
    <span
      data-slot="timescale-tick"
      aria-hidden="true"
      className={cn(
        "absolute z-10 bg-[var(--color-border)]",
        "group-data-[orientation=horizontal]/timescale:top-(--timescale-rail) group-data-[orientation=horizontal]/timescale:left-0 group-data-[orientation=horizontal]/timescale:h-3 group-data-[orientation=horizontal]/timescale:w-px group-data-[orientation=horizontal]/timescale:-translate-y-1/2",
        "group-data-[orientation=vertical]/timescale:top-2.5 group-data-[orientation=vertical]/timescale:left-(--timescale-rail) group-data-[orientation=vertical]/timescale:h-px group-data-[orientation=vertical]/timescale:w-3 group-data-[orientation=vertical]/timescale:-translate-x-1/2",
        className
      )}
      {...props}
    />
  )
}

function TimescaleAge({ className, ...props }) {
  return (
    <p
      data-slot="timescale-age"
      className={cn(
        "text-xs leading-5 font-medium text-[var(--color-text-muted)] tabular-nums",
        "in-data-[slot=timescale-header]:tracking-widest in-data-[slot=timescale-header]:uppercase",
        "group-data-[orientation=vertical]/timescale:col-start-1 group-data-[orientation=vertical]/timescale:row-start-1 group-data-[orientation=vertical]/timescale:pr-4 group-data-[orientation=vertical]/timescale:text-right",
        className
      )}
      {...props}
    />
  )
}

function TimescaleYear({ className, ...props }) {
  return (
    <p
      data-slot="timescale-year"
      className={cn(
        "text-xs leading-5 font-medium text-[var(--color-text-muted)] tabular-nums",
        "in-data-[slot=timescale-header]:tracking-widest in-data-[slot=timescale-header]:uppercase",
        "group-data-[orientation=vertical]/timescale:col-start-2 group-data-[orientation=vertical]/timescale:row-start-1",
        className
      )}
      {...props}
    />
  )
}

function TimescaleContent({ className, ...props }) {
  return (
    <div
      data-slot="timescale-content"
      className={cn(
        "w-full py-4 text-left",
        "group-data-[orientation=horizontal]/timescale:mt-4",
        "group-data-[orientation=vertical]/timescale:col-start-2 group-data-[orientation=vertical]/timescale:row-start-2",
        className
      )}
      {...props}
    />
  )
}

function HoverImage({ src, children }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)
  const autoTimer = useRef(null)
  const anim = useRef(null)
  const mouseX = useMotionValue(0)
  const topMV = useMotionValue(0)
  const dims = useRef(null)
  const touchHover = useRef(false)

  useEffect(() => {
    dims.current = null
    const img = new Image()
    img.onload = () => { dims.current = { w: img.naturalWidth, h: img.naturalHeight } }
    img.src = src
  }, [src])

  const show = (e) => {
    if (touchHover.current) return
    clearTimeout(timer.current)
    clearTimeout(autoTimer.current)
    anim.current?.stop()
    mouseX.set(e.clientX)
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const h = dims.current ? (dims.current.h / dims.current.w) * 240 : 200
      topMV.set(rect.top - h - 12)
    }
    setHovered(true)
  }

  const onMove = (e) => {
    if (!hovered || touchHover.current) return
    anim.current?.stop()
    anim.current = animate(mouseX, e.clientX, {
      type: "spring",
      stiffness: 100,
      damping: 20,
    })
  }

  const onImgLoad = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const h = e.target.offsetHeight
      animate(topMV, rect.top - h - 12, {
        type: "spring",
        stiffness: 150,
        damping: 20,
      })
    }
  }

  const hide = () => {
    if (touchHover.current) return
    timer.current = setTimeout(() => {
      anim.current?.stop()
      setHovered(false)
    }, 150)
  }

  const touchShow = (e) => {
    touchHover.current = true

    if (hovered) {
      clearTimeout(autoTimer.current)
      anim.current?.stop()
      setHovered(false)
      touchHover.current = false
      return
    }

    clearTimeout(autoTimer.current)
    clearTimeout(timer.current)
    anim.current?.stop()

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      mouseX.set(rect.left + rect.width / 2)
      const h = dims.current ? (dims.current.h / dims.current.w) * 240 : 200
      topMV.set(rect.top - h - 12)
    }

    setHovered(true)

    autoTimer.current = setTimeout(() => {
      anim.current?.stop()
      setHovered(false)
      touchHover.current = false
    }, 2000)
  }

  const touchImg = () => {
    clearTimeout(autoTimer.current)
    anim.current?.stop()
    setHovered(false)
    touchHover.current = false
  }

  useEffect(() => () => {
    clearTimeout(timer.current)
    clearTimeout(autoTimer.current)
    anim.current?.stop()
  }, [])

  return (
    <span
      ref={ref}
      className="relative inline"
      onMouseEnter={show}
      onMouseMove={onMove}
      onMouseLeave={hide}
      onTouchStart={touchShow}
    >
      {children}
      {createPortal(
        <AnimatePresence>
          {hovered && (
            <motion.img
              src={src}
              onLoad={onImgLoad}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed z-[9999] w-60 -translate-x-1/2 rounded-xl border border-[var(--color-border)] shadow-xl"
              style={{ top: topMV, left: mouseX }}
              onMouseEnter={show}
              onMouseLeave={hide}
              onTouchStart={touchImg}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </span>
  )
}

const INTRO_SCROLL_START_HOLD = 200

function TimescaleIntroScroll({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const viewport = ref.current?.querySelector('[data-slot="timescale-viewport"]')
    if (!viewport) return

    const distance = viewport.scrollWidth - viewport.clientWidth
    if (distance <= 0) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      viewport.scrollLeft = distance
      return
    }

    const timer = window.setTimeout(() => {
      viewport.scrollTo({ left: distance, behavior: "smooth" })
    }, INTRO_SCROLL_START_HOLD)

    return () => window.clearTimeout(timer)
  }, [])

  return <div ref={ref} className="contents">{children}</div>
}

export default function Timescale({ open, onClose, isDark }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative mx-4 w-full max-w-[900px] rounded-xl border border-[color:var(--color-border)] bg-[var(--color-bg)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-5 py-3">
          <h2 className="text-sm font-medium text-[var(--color-text)]">Timeline</h2>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-muted)]">
            ESC
          </kbd>
        </div>

        <div className="overflow-x-auto p-5">
          <TimescaleIntroScroll>
            <TimescaleRoot>
              <TimescaleHeader>
                <TimescaleAge>Age</TimescaleAge>
                <TimescaleYear>Years</TimescaleYear>
              </TimescaleHeader>

              <TimescaleViewport>
                <TimescaleTrack>
                  <TimescaleRail />

                  {MILESTONES.map((m) => (
                    <TimescaleItem key={m.year}>
                      <TimescaleTick />
                      <TimescaleAge>{m.year - BIRTH_YEAR}</TimescaleAge>
                      <TimescaleYear>{m.year}</TimescaleYear>

                      {m.content && (
                        <TimescaleContent className="text-[13px] leading-relaxed text-[var(--color-text)] [&_p]:mb-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1.5">
                          {m.highlight ? (
                            <Markdown
                              components={{
                                strong: ({ children }) => {
                                  const text = typeof children === "string" ? children : ""
                                  if (text && text === m.highlight) {
                                    return <HoverImage src={m.image}><strong>{text}</strong></HoverImage>
                                  }
                                  return <strong>{children}</strong>
                                },
                              }}
                            >
                              {m.content}
                            </Markdown>
                          ) : m.image ? (
                            <HoverImage src={m.image}>
                              <Markdown>{m.content}</Markdown>
                            </HoverImage>
                          ) : (
                            <Markdown>{m.content}</Markdown>
                          )}
                        </TimescaleContent>
                      )}
                    </TimescaleItem>
                  ))}
                </TimescaleTrack>
              </TimescaleViewport>
            </TimescaleRoot>
          </TimescaleIntroScroll>
        </div>

        <div className="hidden sm:flex items-center justify-between border-t border-[color:var(--color-border)] px-5 py-2">
          <img src={isDark ? logoDark : logoLight} alt="DAS" className="h-5 w-[25px]" />
          <div className="flex items-center gap-4 text-[11px] text-[var(--color-text-muted)]">
          </div>
        </div>
      </div>
    </div>
  )
}