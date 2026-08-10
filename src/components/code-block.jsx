"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { highlight } from "@/lib/highlight"

export function CodeBlock({ title, code, language = "tsx", expandable = false, className }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-code text-code-foreground", className)}>
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-[color:var(--color-border)] px-3 py-2">
          <span className="truncate font-mono text-[11px] text-muted-foreground">{title}</span>
          <CopyButton
            text={code}
            variant="ghost"
            size="icon-sm"
            className="size-6 rounded-md border-none text-muted-foreground hover:text-code-foreground"
          />
        </div>
      )}
      <pre
        className={cn(
          "relative overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed",
          expandable && !open && "max-h-[280px]"
        )}
      >
        <code className="hljs break-words whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlight(code, language) }} />
        {expandable && !open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-code to-transparent" />
        )}
      </pre>
      {expandable && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-center gap-1 px-3 py-2 text-[12px] font-medium text-zinc-400 transition-colors hover:text-zinc-100"
        >
          {open ? "Show less" : "Show more"}
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        </button>
      )}
    </div>
  )
}
