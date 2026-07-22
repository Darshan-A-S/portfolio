import { Children, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

const defaultVariants = {
  initial: { y: "30%", opacity: 0, filter: "blur(4px)", scale: 0.96 },
  animate: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: {
    y: "-30%",
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.96,
  },
}

export function TextFlip({
  as: Component = motion.p,
  className,
  children,
  interval = 2.5,
  transition = { type: "spring", stiffness: 120, damping: 20, mass: 0.8 },
  variants = defaultVariants,
  play = true,
  onIndexChange
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = Children.toArray(children)

  useEffect(() => {
    if (!play) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, interval * 1000)

    return () => clearInterval(timer);
  }, [play, interval, items.length, onIndexChange])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component
        key={currentIndex}
        className={cn("inline-block", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        variants={variants}>
        {items[currentIndex]}
      </Component>
    </AnimatePresence>
  );
}
