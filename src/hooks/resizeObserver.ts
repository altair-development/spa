import { useRef, useEffect, useState } from "react"

export const useResizeObserver = () => {
  const ref = useRef<any | null>(null)
  const [w, setW] = useState<number | null>(null)
  const [h, setH] = useState<number | null>(null)

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver(entries  => {
        setW(entries[0].target.clientWidth)
        setH(entries[0].target.clientHeight)
      })
      resizeObserver.observe(ref.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  return [ref, w, h] as const
}