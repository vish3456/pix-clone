import { useEffect, useRef, useState, memo } from 'react'

const data = [
  { num: 4, suffix: 'K+', label: 'Projects Completed' },
  { num: 90, suffix: '+', label: 'Expert Team Members' },
  { num: 42, suffix: '+', label: 'Industry Awards' },
  { num: 24, suffix: '+', label: 'Years of Experience' },
]

export default memo(function Counters() {
  const [vals, setVals] = useState(data.map(() => 0))
  const triggered = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true
        obs.disconnect()
        data.forEach((c, i) => {
          const dur = 2000, steps = dur / 16, inc = c.num / steps
          let cur = 0
          const iv = setInterval(() => {
            cur += inc
            if (cur >= c.num) { cur = c.num; clearInterval(iv) }
            setVals(p => { const n = [...p]; n[i] = Math.floor(cur); return n })
          }, 16)
        })
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="counters" ref={ref}>
      <div className="counters__dots" />
      <div className="container">
        <div className="counters__grid">
          {data.map((c, i) => (
            <div className="counters__item" key={c.label}>
              <div className="counters__num">{vals[i]}{c.suffix}</div>
              <div className="counters__label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
