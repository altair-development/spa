import { useState, useCallback, useEffect, useMemo } from 'react'
import { expandHash, debug } from '../utils'

export const useHash = () => {
  const [tmpHash, setHash] = useState(() => {
    let windowLocationHash = ''
    if (typeof window !== 'undefined') {
      debug('location.hash', window.location.hash)
      windowLocationHash = window.location.hash
    }
    return windowLocationHash
  })

  const hash = useMemo(() => {
    return expandHash(tmpHash)
  }, [tmpHash])

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [hashChangeHandler])

  // const updateHash = useCallback(
  //   newHash => {
  //     if (newHash !== hash) window.location.hash = newHash
  //   },
  //   [hash]
  // )

  return [Object.freeze(hash)]
}