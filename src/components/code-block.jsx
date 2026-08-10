"use client"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export function CodeBlock({ title, code, className }) {
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
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
