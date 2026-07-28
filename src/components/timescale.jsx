"use client"

import { useEffect, useRef } from "react"
import Markdown from "react-markdown"
import { cn } from "@/lib/utils"
import logoDark from "@/assets/DAS-white.svg"
import logoLight from "@/assets/DAS-light.svg"

const BIRTH_YEAR = 2000

const MILESTONES = [
  { year: 2000, content: "Born in Can Tho, Viet Nam." },
  { year: 2001 }, { year: 2002 }, { year: 2003 }, { year: 2004 }, { year: 2005 },
  { year: 2006, content: "Started at Thuan Hung Primary School." },
  { year: 2007 }, { year: 2008 }, { year: 2009 }, { year: 2010 },
  { year: 2011, content: "Started at Thuan Hung Secondary School." },
  { year: 2012 }, { year: 2013 },
  { year: 2014, content: `Started learning to code and built my first website.

Won awards:

- 1st Prize — Can Tho City Young Informatics Contest 2014
- Consolation Prize — National Young Informatics Contest 2014

Visited Ha Noi, the capital, for the first time.` },
  { year: 2015, content: `Won awards:

- 3rd Prize — Can Tho City Young Informatics Contest 2015
- Consolation Prize — National Young Informatics Contest 2015
- Outstanding Student — Most Outstanding Student of the District
- 2nd Prize — Can Tho City Youth and Children's Creativity Contest 2015
- 3rd Prize — Can Tho City Science and Engineering Fair 2015

Visited Thu Dau Mot, Binh Duong for the first time.

Admitted to the specialized Computer Science class at Ly Tu Trong High School for the Gifted.` },
  { year: 2016, content: `Won awards:

- Consolation Prize — Can Tho City Young Informatics Contest 2016
- 1st Prize — Can Tho City Youth and Children's Creativity Contest 2016
- 3rd Prize — National Young Informatics Contest 2016
- Consolation Prize — National Youth and Children's Creativity Contest 2016

Visited Quy Nhon, Binh Dinh for the first time, and returned to Ha Noi.` },
  { year: 2017, content: `Won awards:

- 2nd Prize — Can Tho City Outstanding Student Selection Exam 2016-2017
- Consolation Prize — Can Tho City Young Informatics Contest 2017
- 3rd Prize — Can Tho City Young Informatics Contest 2017
- 2nd Prize — Can Tho City Youth and Children's Creativity Contest 2017
- Creative Award — Binh Duong Hackathon 2017` },
  { year: 2018, content: `Won awards:

- 1st Prize — Can Tho City Science and Engineering Fair 2018
- 3rd Prize — Can Tho City Outstanding Student Selection Exam 2017-2018
- 3rd Prize — National Science and Engineering Fair 2018 (ViSEF)
- 3rd Prize — Can Tho City Young Informatics Contest 2018
- 2nd Prize — Can Tho City Youth and Children's Creativity Contest 2018
- 3rd Prize — National Young Informatics Contest 2018

Earned direct admission to University of Science — VNUHCM, majoring in Information Systems.

Began freelancing and joined Tung Tung as a UI/UX Designer.

Visited Da Lat, Lam Dong and Ba Ria - Vung Tau for the first time.` },
  { year: 2019, content: `Became a Mobile Developer at Tung Tung.

Won 2nd Prize — Business Startup Competition 2019.` },
  { year: 2020, content: "Became a Web Developer at Tung Tung." },
  { year: 2021 },
  { year: 2022, content: `Joined Simplamo as a Senior Frontend Developer and UI Lead.

Launched [ZaDark](https://zadark.com) — 80k+ downloads, 30k+ active users.

Won Bronze Medal — 10th Design, Manufacturing, and Application Award 2022.` },
  { year: 2023 },
  { year: 2024, content: "Founded [Quaric](https://quaric.com)." },
  { year: 2025, content: `Open-sourced [chanhdai.com](https://github.com/ncdai/chanhdai.com) — 2k+ stars on GitHub.

Released [React Wheel Picker](https://react-wheel-picker.chanhdai.com) — 30k+ weekly downloads, selected for the [Vercel OSS Program](https://vercel.com/open-source-program).

Followed by [shadcn](https://x.com/shadcn) on X.` },
  { year: 2026, content: `Joined [shadcncraft](https://shadcncraft.com) as a Design Engineer.

Selected for the [Claude for Open Source Program](https://claude.com/contact-sales/claude-for-oss).` },
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
                          <Markdown>{m.content}</Markdown>
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