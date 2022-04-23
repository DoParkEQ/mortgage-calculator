import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useResizeObserver = () => {
  const [observerEntry, setObserverEntry] = useState<ResizeObserverEntry>()
  const [node, setNode] = useState<HTMLDivElement>(null)
  const observer = useRef<ResizeObserver>(null)

  const disconnect = useCallback(() => observer.current?.disconnect(), [])

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry))
    if (node) observer.current.observe(node)
  }, [node])

  useLayoutEffect(() => {
    observe()
    return () => disconnect()
  }, [disconnect, observe])

  return { ref: setNode, entry: observerEntry }
}
