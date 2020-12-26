import { useEffect, useState, useRef, MutableRefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = (
  refToMonitorResize: MutableRefObject<HTMLDivElement | null>
) => {
  const [contentRect, setContentRect] = useState({ width: 0, height: 0 })
  const observer = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (window.ResizeObserver) {
      observer.current = new window.ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect
        setContentRect({ width, height })
      })
    } else {
      observer.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect
        setContentRect({ width, height })
      })
    }

    if (refToMonitorResize.current && observer.current) {
      observer.current.observe(refToMonitorResize.current)
    }

    return () => {
      if (observer.current && refToMonitorResize.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(refToMonitorResize.current)
      }
    }
  }, [refToMonitorResize])

  return contentRect
}

export default useResizeObserver

