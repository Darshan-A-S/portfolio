import { useEffect } from "react"
import { CheckpointRailChat } from "../components/checkpoint-rail-chat.jsx"

export default function CheckpointRailDemoPage() {
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
    document.documentElement.classList.toggle("dark", dark)
  }, [])

  return (
    <div className="h-dvh overflow-hidden">
      <CheckpointRailChat fullscreen />
    </div>
  )
}