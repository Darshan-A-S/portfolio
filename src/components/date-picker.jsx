"use client"

import { useEffect, useId, useRef, useState } from "react"
import "./date-picker.css" // ponytail: local copy of dasregistary/style.css; swap to `import "dasregistary/style.css"` once the registry is published

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]
const pad = (n) => String(n).padStart(2, "0")

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function Chevron({ dir }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  )
}

export function DatePicker({ label, value, onChange, error, disabled }) {
  const inputId = useId()
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => new Date())

  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [open])

  const year = view.getFullYear()
  const month = view.getMonth()
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

  const cells = [
    ...Array.from({ length: new Date(year, month, 1).getDay() }, () => null),
    ...Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
  ]

  function select(day) {
    onChange?.(`${year}-${pad(month + 1)}-${pad(day)}`)
  }

  const display = value
    ? new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : ""

  return (
    <div className="das-dp" ref={rootRef}>
      {label && (
        <label className="das-dp-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="das-dp-input-wrap">
        <input
          id={inputId}
          className="das-dp-input"
          readOnly
          disabled={disabled}
          value={display}
          placeholder="pick a date"
          aria-invalid={error ? true : undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        />
        <svg
          className="das-dp-chevron"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {open && (
        <div className="das-dp-panel">
          <div className="das-dp-header">
            <button type="button" aria-label="Previous month" onClick={() => setView(new Date(year, month - 1, 1))}>
              <Chevron dir="left" />
            </button>
            <span>{view.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span>
            <button type="button" aria-label="Next month" onClick={() => setView(new Date(year, month + 1, 1))}>
              <Chevron dir="right" />
            </button>
          </div>
          <div className="das-dp-grid">
            {WEEKDAYS.map((d, i) => (
              <span className="das-dp-dow" key={i}>
                {d}
              </span>
            ))}
            {cells.map((day, i) =>
              day === null ? (
                <span key={i} />
              ) : (
                <button
                  type="button"
                  key={i}
                  className={[
                    "das-dp-day",
                    value === `${year}-${pad(month + 1)}-${pad(day)}` && "das-dp-day-selected",
                    todayStr === `${year}-${pad(month + 1)}-${pad(day)}` && "das-dp-day-today",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => select(day)}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {error && <span className="das-dp-error">{error}</span>}
    </div>
  )
}
