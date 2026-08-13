"use client";
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import { IconSwap, IconSwapItem } from "@/components/icon-swap"
import { CopyIcon, CheckIcon, CircleXIcon } from "lucide-react"

export function CopyStateIcon({
  state,
  idleIcon,
  doneIcon,
  errorIcon
}) {
  return (
    <IconSwap>
      <IconSwapItem key={state} as={motion.span}>
        {state === "idle" &&
          (idleIcon ?? (
            <CopyIcon data-slot="idle-icon" />
          ))}

        {state === "done" &&
          (doneIcon ?? (
            <CheckIcon data-slot="done-icon" />
          ))}

        {state === "error" &&
          (errorIcon ?? (
            <CircleXIcon data-slot="error-icon" />
          ))}
      </IconSwapItem>
    </IconSwap>
  );
}

export function CopyButton({
  className,
  size = "icon",
  children,
  text,
  idleIcon,
  doneIcon,
  errorIcon,
  onClick,
  onCopySuccess,
  onCopyError,
  ...props
}) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess,
    onCopyError,
  })

  return (
    <Button
      className={cn("will-change-transform", className)}
      size={size}
      onClick={(e) => {
        copy(text)
        onClick?.(e)
      }}
      aria-label="Copy"
      {...props}>
      <CopyStateIcon
        state={state}
        idleIcon={idleIcon}
        doneIcon={doneIcon}
        errorIcon={errorIcon} />
      {children}
    </Button>
  );
}
