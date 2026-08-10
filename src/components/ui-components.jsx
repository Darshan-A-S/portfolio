import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { uiComponents } from "@/data/ui-components"

// ponytail: local copy of blogs.jsx DoubleLine; shared file once both branches land on dev
export function DoubleLine() {
  return (
    <div className="flex flex-col px-[8px] sm:px-0">
      <div className="border-t border-[color:var(--color-border)]" />
      <div className="flex justify-center">
        <div className="flex h-4 w-full max-w-[768px] justify-center border-x border-[color:var(--color-border)]">
          <div className="flex gap-4">
            <div className="border-l border-[color:var(--color-border)]" />
            <div className="border-l border-[color:var(--color-border)]" />
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-border)]" />
    </div>
  )
}

export function UiComponentCard({ component }) {
  const Icon = component.icon
  return (
    <Link
      to={`/components/${component.slug}`}
      className="group flex items-center gap-3 p-3 transition-colors hover:bg-[var(--color-badge-bg)]/40"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] transition-colors group-hover:border-[var(--color-text-muted)]">
        <Icon className="size-4 text-[var(--color-text-muted)]" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-medium text-[var(--color-text)]">{component.name}</h3>
      </div>
      <ArrowRight className="size-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]" />
    </Link>
  )
}

export function UiComponentRow({ components }) {
  return (
    <div className="mx-auto flex max-w-[768px] flex-col border-x border-[color:var(--color-border)] sm:flex-row">
      <div className="min-w-0 flex-1 border-b border-[color:var(--color-border)] sm:border-b-0">
        <UiComponentCard component={components[0]} />
      </div>
      <div className="hidden flex-row gap-4 sm:flex">
        <div className="border-l border-[color:var(--color-border)]" />
        <div className="border-l border-[color:var(--color-border)]" />
      </div>
      <div className="min-w-0 flex-1">
        {components[1] ? (
          <UiComponentCard component={components[1]} />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-[13px] text-[var(--color-text-muted)]">
            More coming soon
          </div>
        )}
      </div>
    </div>
  )
}

export function UiComponentGrid({ components }) {
  const rows = []
  for (let i = 0; i < components.length; i += 2) rows.push(components.slice(i, i + 2))
  return rows.map((pair, i) => (
    <div key={pair[0].slug}>
      <UiComponentRow components={pair} />
      {i < rows.length - 1 && <DoubleLine />}
    </div>
  ))
}

function UiComponents() {
  const shown = uiComponents.slice(0, 6)
  return (
    <div id="components" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Components
        </div>
      </h2>
      <UiComponentGrid components={shown} />
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto flex max-w-[768px] border-x border-[color:var(--color-border)] justify-center py-2">
          <Link
            role="button"
            to="/components"
            className="inline-flex items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-transparent bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] active:scale-[0.98] cursor-pointer"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UiComponents
