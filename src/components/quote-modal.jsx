import { useState, useEffect, useCallback, useRef } from "react"

const QUOTES = [
  { content: "Any sufficiently advanced technology is equivalent to magic.", author: "Arthur C. Clarke" },
  { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { content: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
  { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { content: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { content: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { content: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "It's not a bug — it's an undocumented feature.", author: "Anonymous" },
  { content: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
  { content: "Working from home: the coffee tastes better and the commute is shorter.", author: "Anonymous" },
  { content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { content: "The best error message is the one that never shows up.", author: "Anonymous" },
  { content: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
  { content: "It works on my machine.", author: "Every Developer Ever" },
  { content: "A computer lets you make more mistakes faster than any invention in human history.", author: "Mitch Ratcliffe" },
  { content: "Deleted code is debugged code.", author: "Jeff Sickel" },
  { content: "The most dangerous phrase in the language is: 'We've always done it this way.'", author: "Grace Hopper" },
  { content: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { content: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
  { content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { content: "The best things in life are free. The rest are in the cloud.", author: "Anonymous" },
  { content: "Someday, all this will be someone else's problem.", author: "Anonymous" },
  { content: "I think it's very important to have a feedback loop, where you're constantly thinking about what you've done and how you could be doing it better.", author: "Elon Musk" },
  { content: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { content: "If you pour your heart into your work, you'll never have to work a day in your life.", author: "Anonymous" },
  { content: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { content: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { content: "The future is already here — it's just not evenly distributed.", author: "William Gibson" },
  { content: "I can explain it to you, but I can't understand it for you.", author: "Anonymous" },
]

const isAndroid = /Android/.test(navigator.userAgent)

export default function QuoteModal() {
  const [open, setOpen] = useState(false)
  const [quote, setQuote] = useState(null)
  const lastShake = useRef(0)
  const prevAcc = useRef(null)

  const pickRandom = useCallback(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
  }, [])

  const handleOpen = useCallback(() => {
    setOpen((p) => !p)
  }, [])

  useEffect(() => {
    if (!open) return
    pickRandom()
  }, [open, pickRandom])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "q") {
        e.preventDefault()
        handleOpen()
      }
      if (e.key === "Escape" && open) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, handleOpen])

  useEffect(() => {
    const handler = () => handleOpen()
    window.addEventListener("open-quote", handler)
    return () => window.removeEventListener("open-quote", handler)
  }, [handleOpen])

  useEffect(() => {
    if (!isAndroid) return
    let mounted = true
    const onMotion = (e) => {
      const acc = e.accelerationIncludingGravity
      if (!acc) return
      if (!prevAcc.current) { prevAcc.current = { x: acc.x, y: acc.y, z: acc.z }; return }
      const dx = Math.abs(acc.x - prevAcc.current.x)
      const dy = Math.abs(acc.y - prevAcc.current.y)
      const dz = Math.abs(acc.z - prevAcc.current.z)
      prevAcc.current = { x: acc.x, y: acc.y, z: acc.z }
      if (dx + dy + dz > 15 && Date.now() - lastShake.current > 2000) {
        lastShake.current = Date.now()
        mounted && handleOpen()
      }
    }
    window.addEventListener("devicemotion", onMotion)
    return () => { mounted = false; window.removeEventListener("devicemotion", onMotion) }
  }, [handleOpen])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 select-none"
      onClick={() => setOpen(false)}
    >
      <div className="max-w-2xl px-6 text-center" onClick={(e) => e.stopPropagation()}>
        {quote && (
          <>
            <p className="text-white font-playfair italic text-2xl sm:text-3xl leading-relaxed">
              &ldquo;{quote.content}&rdquo;
            </p>
            <p className="mt-6 text-white/40 font-playfair italic text-sm text-right">&mdash; {quote.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
