import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

/**
 * Shared scroll-reveal hook. Animates children matching `selector`
 * when the ref element enters the viewport. Uses a single
 * IntersectionObserver per component, auto-disconnects after trigger.
 */
export function useScrollReveal(selector = '.reveal', options = {}) {
  const ref = useRef(null)
  const { threshold = 0.15, y = 50, x = 0, stagger = 0.1, duration = 0.8 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll(selector)
    if (!targets.length) return

    // Set initial state via GSAP to avoid flash
    gsap.set(targets, { y, x, opacity: 0 })

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(targets, {
            y: 0, x: 0, opacity: 1,
            duration, stagger,
            ease: 'power3.out',
          })
          obs.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [selector, threshold, y, x, stagger, duration])

  return ref
}

/**
 * Throttled callback using requestAnimationFrame.
 * Returns a stable ref-based function that won't cause re-renders.
 */
export function useThrottledCallback(callback) {
  const rafId = useRef(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  const throttled = useCallback((...args) => {
    if (rafId.current) return
    rafId.current = requestAnimationFrame(() => {
      callbackRef.current(...args)
      rafId.current = null
    })
  }, [])

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return throttled
}
