import { useRef, useEffect } from "react"

export const useOutsideClick = <T>(callbackFn: (e: T) => void) => {
  const ref = useRef<any>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackFn(event as T)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callbackFn])

  return ref
}