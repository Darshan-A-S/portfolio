import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock({ title, code, className }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={`overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] ${className || ""}`}>
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-[color:var(--color-border)] px-3 py-1.5">
          <span className="truncate font-mono text-[11px] text-[var(--color-text-muted)]">{title}</span>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex size-6 shrink-0 items-center justify-center rounded text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed text-[var(--color-text)]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
