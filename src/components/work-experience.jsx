import { useCallback, useRef } from "react";
import { differenceInMonths, parse } from "date-fns"
import ReactMarkdown from "react-markdown"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { ChevronsUpDownIcon } from "@/components/chevrons-up-down-icon"
import { BriefcaseBusinessIcon, InfinityIcon } from "lucide-react"

export function WorkExperience({
  className,
  experiences
}) {
  return (
    <div className={cn("px-4 text-[var(--color-text)]", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

export function ExperienceItem({
  experience
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="not-prose flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-6 rounded-full"
              aria-hidden />
          ) : (
            <span className="flex size-2 rounded-full bg-[var(--color-text-muted)]" />
          )}
        </div>

        <h3 className="text-lg leading-snug font-semibold">
          {experience.companyWebsite ? (
            <a
              className="underline decoration-current/30 decoration-1 underline-offset-3 hover:underline"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer">
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {experience.isCurrentEmployer && (
          <span
            className="relative flex items-center justify-center"
            aria-label="Current Employer">
            <span
              className="absolute inline-flex size-3 animate-ping rounded-full bg-sky-500 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
          </span>
        )}
      </div>
      <div
        className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-[var(--color-border)]">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

export function ExperiencePositionItem({
  position
}) {
  const chevronsUpDownIconRef = useRef(null)

  const handleOpenChange = useCallback((open) => {
    const controls = chevronsUpDownIconRef.current
    if (!controls) return

    if (open) {
      controls.startAnimation()
    } else {
      controls.stopAnimation()
    }
  }, [])

  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = formatDuration(start, end)

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      onOpenChange={handleOpenChange}
      disabled={!position.description}
      render={<div
        className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-[var(--color-bg)]" />}><CollapsibleTrigger
        className={cn(
          "group/experience-position not-prose block w-full text-left select-none",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:rounded-lg hover:before:bg-[var(--color-hover-bg)]",
          "data-disabled:before:content-none"
        )}>
                  <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
                    <div
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-lg",
                        "bg-[var(--color-badge-bg)] text-[var(--color-text-muted)]",
                        "border border-[var(--color-badge-border)] ring-1 ring-[var(--color-border)] ring-offset-1 ring-offset-[var(--color-bg)]",
                        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                      )}>
                      {position.icon ?? (
                        <BriefcaseBusinessIcon />
                      )}
                    </div>

                    <h4 className="flex-1 font-medium text-balance text-[var(--color-text)]">
                      {position.title}
                    </h4>

                    <div
                      className="shrink-0 text-[var(--color-text-muted)] group-disabled/experience-position:hidden [&_svg]:h-lh [&_svg]:w-4">
                      <ChevronsUpDownIcon ref={chevronsUpDownIconRef} duration={0.15} />
                    </div>
                  </div>

                  <dl
                    className="relative z-1 flex items-center gap-2 pl-9 text-sm text-[var(--color-text-muted)]">
                    {position.employmentType && (
                      <>
                        <div>
                          <dt className="sr-only">Employment Type</dt>
                          <dd>{position.employmentType}</dd>
                        </div>

                        <Separator
                          className="data-vertical:h-4 data-vertical:self-center"
                          orientation="vertical" />
                      </>
                    )}

                    <div>
                      <dt className="sr-only">Employment Period</dt>
                      <dd className="flex items-center gap-0.5 tabular-nums">
                        <span>{start}</span>
                        <span className="font-mono">—</span>
                        {isOngoing ? (
                          <InfinityIcon className="size-4.5 translate-y-[0.5px]" aria-label="Present" />
                        ) : (
                          <span>{end}</span>
                        )}
                      </dd>
                    </div>

                    {duration && (
                      <>
                        <Separator
                          className="data-vertical:h-4 data-vertical:self-center"
                          orientation="vertical" />
                        <div>
                          <dt className="sr-only">Duration</dt>
                          <dd className="tabular-nums">{duration}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </CollapsibleTrigger><CollapsibleContent className="overflow-hidden">
                  {position.description && (
                    <div className="pt-2 pl-9 text-[13px] leading-relaxed text-[var(--color-text)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1">
                      <ReactMarkdown>{position.description}</ReactMarkdown>
                    </div>
                  )}
                </CollapsibleContent>{Array.isArray(position.skills) && position.skills.length > 0 && (
                  <ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-9">
                    {position.skills.map((skill, index) => (
                      <li key={index} className="flex">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md border bg-[var(--color-badge-bg)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-badge-text)] border-[var(--color-badge-border)]",
                          )}>
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}</Collapsible>
  );
}

function formatDuration(start, end) {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return `${years}y`
  }
  return `${years}y ${months}m`
}

function parsePeriodDate(str, fallbackMonth) {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date());
  }
  return parse(`${fallbackMonth === "last" ? "12" : "01"}.${str}`, "MM.yyyy", new Date());
}
