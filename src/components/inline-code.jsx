export function InlineCode({ text }) {
  return String(text).split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded-sm border border-muted/40 bg-muted/40 px-1.5 py-0.2 font-mono text-[0.9em] text-[var(--color-text-secondary)]">
        {part}
      </code>
    ) : (
      part
    )
  )
}