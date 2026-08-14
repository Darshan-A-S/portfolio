import { useEffect, useRef, useState, useCallback } from "react"

const cssVar = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback

const LOCAL_KEY = "dino-local-board"

const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []
  } catch {
    return []
  }
}

const writeLocal = (rows) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(rows.slice(0, 10)))
  } catch {
    /* storage full / private mode -> ignore */
  }
}

const toRows = (list) => (list || []).map((row, i) => ({ rank: row.rank ?? i + 1, name: row.name, score: row.score }))

const DINO_W = 44
const DINO_H = 47
const GROUND_Y = 112
const DINO_X = 55

export default function DinoGame() {
  const canvasRef = useRef(null)
  const nameInputRef = useRef(null)
  const restartRef = useRef(null)
  const [finished, setFinished] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [isLocal, setIsLocal] = useState(false)
  const [saved, setSaved] = useState(null)
  const [status, setStatus] = useState(null)
  const finishedRef = useRef(finished)

  finishedRef.current = finished

  const loadBoard = useCallback(async () => {
    try {
      const res = await fetch("/api/dino-score")
      if (res.ok) {
        const data = await res.json()
        setLeaderboard(toRows(data.top))
        setIsLocal(false)
        return
      }
    } catch {
      /* no API in dev / API down -> fall back to local board */
    }
    setLeaderboard(toRows(readLocal()))
    setIsLocal(true)
  }, [])

  useEffect(() => {
    loadBoard()
  }, [loadBoard])

  const saveScore = useCallback(
    async (e) => {
      e?.preventDefault()
      if (!finished) return
      setStatus("saving")
      const name = nameInputRef.current?.value.trim().slice(0, 20) || "Anonymous"
    try {
      const res = await fetch("/api/dino-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score: finished }),
      })
      if (res.ok) {
        const data = await res.json()
        setSaved(data)
        setLeaderboard(toRows(data.top))
        setIsLocal(false)
        setStatus("ok")
        return
      }
    } catch {
      /* fall through to local */
    }
    const local = readLocal()
    const existing = local.find((r) => r.name.toLowerCase() === name.toLowerCase())
    if (existing) existing.score = Math.max(existing.score, finished)
    else local.push({ name, score: finished })
    local.sort((a, b) => b.score - a.score)
    writeLocal(local)
    const rank = local.findIndex((r) => r.name.toLowerCase() === name.toLowerCase()) + 1
    setSaved({ rank })
    setLeaderboard(toRows(local))
    setIsLocal(true)
    setStatus("ok")
  }, [finished])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const scale = window.devicePixelRatio || 1
    const W = canvas.clientWidth
    const H = 150
    canvas.width = W * scale
    canvas.height = H * scale
    ctx.scale(scale, scale)
    ctx.textAlign = "center"

    let dino = { y: GROUND_Y - DINO_H, vy: 0, jumping: false }
    let obstacles = []
    let cloudX = 0
    let speed = 6
    let score = 0
    let distance = 0
    let gameOver = false
    let started = false
    let lastObstacle = 0
    let raf
    let lastT = performance.now()

    const restart = () => {
      dino = { y: GROUND_Y - DINO_H, vy: 0, jumping: false }
      obstacles = []
      cloudX = 0
      speed = 6
      score = 0
      distance = 0
      gameOver = false
      started = true
      setFinished(null)
      setSaved(null)
      setStatus(null)
    }

    const jump = () => {
      if (gameOver) return restart()
      if (finishedRef.current) return
      if (!dino.jumping) {
        dino.jumping = true
        dino.vy = -13
      }
      if (!started) {
        started = true
        dino.jumping = true
        dino.vy = -13
      }
    }

    restartRef.current = restart

    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        jump()
      }
    }
    const onTap = () => jump()
    window.addEventListener("keydown", onKey)
    canvas.addEventListener("pointerdown", onTap)

    const frame = (now) => {
      const dt = Math.min((now - lastT) / 16.67, 3)
      lastT = now
      const dinoBox = { x: DINO_X + 6, y: dino.y + 6, w: DINO_W - 10, h: DINO_H - 12 }

      dino.vy += 0.8 * dt
      dino.y += dino.vy * dt
      if (dino.y >= GROUND_Y - DINO_H) {
        dino.y = GROUND_Y - DINO_H
        dino.jumping = false
        dino.vy = 0
      }

      if (started && !gameOver) {
        distance += speed * dt
        score = Math.floor(distance / 10)
        speed = Math.min(12, speed + 0.0015 * dt)

        lastObstacle -= dt
        if (lastObstacle <= 0) {
          const cw = 16 + Math.random() * 18
          obstacles.push({ x: W, w: cw, h: 30 + Math.random() * 25, passed: false })
          lastObstacle = 45 + Math.random() * 80
        }

        cloudX = (cloudX + 0.3 * dt) % (W + 200)

        for (const o of obstacles) {
          o.x -= speed * dt
          if (!o.passed && o.x + o.w < DINO_X) {
            o.passed = true
          }
        }
        obstacles = obstacles.filter((o) => o.x + o.w > 0)

        if (
          obstacles.some((o) => {
            const ox = o.x + 3
            const ow = o.w - 6
            return dinoBox.x < ox + ow && dinoBox.x + dinoBox.w > ox && dinoBox.y < GROUND_Y && dinoBox.y + dinoBox.h > GROUND_Y - o.h
          })
        ) {
          gameOver = true
          setFinished(score)
        }
      }

      const textColor = cssVar("--color-text", "#2b2b2b")
      const muted = cssVar("--color-text-muted", "#888")
      ctx.clearRect(0, 0, W, H)

      const mx = W + 200 - (cloudX % (W + 200))
      ctx.fillStyle = muted
      ctx.beginPath()
      ctx.arc(mx - 60, 30, 16, 0, Math.PI * 2)
      ctx.arc(mx - 40, 26, 12, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = textColor
      ctx.fillRect(dinoBox.x, dinoBox.y, dinoBox.w, dinoBox.h)

      for (const o of obstacles) {
        ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h)
      }

      ctx.fillStyle = textColor
      ctx.fillRect(0, GROUND_Y, W, 2)

      ctx.font = "12px sans-serif"
      ctx.fillStyle = muted
      ctx.fillText(String(score).padStart(4, "0"), W / 2, 16)

      if (!started) {
        ctx.fillStyle = muted
        ctx.fillText("Press space or tap to start", W / 2, H / 2)
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
      canvas.removeEventListener("pointerdown", onTap)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[min(var(--radius-lg),10px)] border border-[var(--color-text-muted)]/40">
        <canvas
          ref={canvasRef}
          className="block h-[150px] w-full"
          height="150"
          style={{ touchAction: "manipulation" }}
        />
        {finished !== null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--color-bg)]/90 backdrop-blur-sm p-4">
            <p className="text-[24px] font-bold tabular-nums">Score: {finished}</p>
            {saved ? (
              <>
                <p className="text-[13px] text-[var(--color-text-muted)]">
                  Saved — you're #{saved.rank ?? "—"} on the board
                </p>
                <button
                  onClick={() => restartRef.current?.()}
                  className="mt-1 inline-flex items-center gap-2 rounded-[min(var(--radius-lg),10px)] bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)]"
                >
                  Play again
                </button>
              </>
            ) : (
              <>
                <form className="flex gap-2" onSubmit={saveScore}>
                  <input
                    ref={nameInputRef}
                    maxLength="20"
                    defaultValue=""
                    placeholder="Your name"
                    autoFocus
                    className="w-40 rounded-[min(var(--radius-lg),10px)] border border-[var(--color-text-muted)]/40 bg-[var(--color-bg)] px-3 py-1 text-[13px] outline-none focus:border-[var(--color-text)]"
                  />
                  <button
                    type="submit"
                    disabled={status === "saving"}
                    className="rounded-[min(var(--radius-lg),10px)] bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] disabled:opacity-50"
                  >
                    {status === "saving" ? "Saving…" : "Save score"}
                  </button>
                </form>
                <button onClick={() => restartRef.current?.()} className="text-[12px] text-[var(--color-text-muted)] hover:underline">
                  Restart
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {leaderboard.length > 0 && (
        <div className="mt-3">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            {isLocal ? "Leaderboard (this browser)" : "Global leaderboard"}
          </p>
          <ol className="mt-1 flex flex-col gap-0.5 text-[13px]">
            {leaderboard.slice(0, 10).map((row) => (
              <li key={row.rank} className="flex items-center gap-2">
                <span className="w-6 shrink-0 tabular-nums text-[var(--color-text-muted)]">{row.rank}</span>
                <span className="truncate">{row.name}</span>
                <span className="ml-auto tabular-nums">{row.score}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}