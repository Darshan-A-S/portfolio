import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export function ShimmeringText({
  text,
  duration = 2,
  isStopped = false,
  className,
  ...props
}) {
  const createCharVariants = React.useCallback(charIndex => ({
    running: {
      color: ["var(--color)", "var(--shimmering-color)", "var(--color)"],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: text.length * 0.08,
        delay: (charIndex * duration) / text.length,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },

    stopped: {
      color: "var(--color)",
      opacity: 1,
      transition: {
        duration: duration * 0.4,
        ease: "easeOut",
      },
    }
  }), [duration, text.length])

  return (
    <motion.span
      className={cn(
        "inline-block select-none",
        "[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]",
        className
      )}
      {...props}>
      {text?.split("")?.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial="stopped"
          animate={isStopped ? "stopped" : "running"}
          variants={createCharVariants(i)}
          aria-hidden>
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
