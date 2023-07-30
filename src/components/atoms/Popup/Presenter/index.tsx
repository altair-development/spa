import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
}
const Presenter = ({ children }: Props) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#popup-presenter")
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(children, ref.current) : null
}

export default Presenter