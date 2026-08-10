import { useCallback, useRef, useState } from "react"
import { useTiks } from "@rexa-developer/tiks/react"
import { useWebHaptics } from "web-haptics/react"

export function useCopyToClipboard({
  onCopySuccess,
  onCopyError,
  resetDelay = 1500
} = {}) {
  const [state, setState] = useState("idle")
  const resetTimeoutRef = useRef(null)

  const { trigger: haptic } = useWebHaptics()
  const { success: tiksSuccess, error: tiksError } = useTiks()

  const copy = useCallback(async (text) => {
    // Clear any pending reset
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }

    try {
      const finalText = typeof text === "function" ? text() : text
      await navigator.clipboard.writeText(finalText)

      setState("done")

      haptic("success")
      tiksSuccess()

      onCopySuccess?.(finalText)
    } catch (error) {
      setState("error")

      haptic("error")
      tiksError()

      onCopyError?.(error instanceof Error ? error : new Error("Copy failed"))
    } finally {
      // Schedule reset to idle
      resetTimeoutRef.current = setTimeout(() => {
        setState("idle")
      }, resetDelay)
    }
  }, [onCopySuccess, onCopyError, haptic, tiksSuccess, tiksError, resetDelay])

  return {
    state,
    copy
  };
}
