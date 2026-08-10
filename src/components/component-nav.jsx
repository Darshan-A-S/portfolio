import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react"

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip.jsx"
import { uiComponents } from "../data/ui-components"

const navBtnClass =
  "inline-flex size-8 items-center justify-center rounded-md bg-[var(--color-hover-bg)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"

export function ComponentNav({ slug }) {
  const index = uiComponents.findIndex((c) => c.slug === slug)
  const prev = index > 0 ? uiComponents[index - 1] : null
  const next = index < uiComponents.length - 1 ? uiComponents[index + 1] : null

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: uiComponents[index].name, url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={<button type="button" onClick={share} aria-label="Share" className={navBtnClass} />}
          >
            <Share2 className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Share</TooltipContent>
        </Tooltip>
        {prev && (
          <Tooltip>
            <TooltipTrigger
              render={<Link to={`/components/${prev.slug}`} aria-label={`Previous: ${prev.name}`} className={navBtnClass} />}
            >
              <ArrowLeft className="size-4" />
            </TooltipTrigger>
            <TooltipContent>Previous: {prev.name}</TooltipContent>
          </Tooltip>
        )}
        {next && (
          <Tooltip>
            <TooltipTrigger
              render={<Link to={`/components/${next.slug}`} aria-label={`Next: ${next.name}`} className={navBtnClass} />}
            >
              <ArrowRight className="size-4" />
            </TooltipTrigger>
            <TooltipContent>Next: {next.name}</TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  )
}
