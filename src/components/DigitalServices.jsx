import { useEffect, useRef, memo } from 'react'

const bubbles = [
  { label: 'E-commerce', size: 130, color: '#FF3B00' },
  { label: 'Marketing', size: 110, color: '#F5C860' },
  { label: 'UI/UX', size: 120, color: '#95D9F4' },
  { label: 'Branding', size: 140, color: '#F4ACD1' },
  { label: 'Development', size: 125, color: '#A8D8A0' },
  { label: 'Web Design', size: 115, color: '#FF3B00' },
  { label: 'SEO', size: 95, color: '#F5C860' },
  { label: 'Analysis', size: 100, color: '#95D9F4' },
  { label: 'SMM', size: 90, color: '#F4ACD1' },
  { label: 'Illustration', size: 105, color: '#A8D8A0' },
]

export default memo(function DigitalServices() {
  const containerRef = useRef(null)
  const ballsRef = useRef([])
  const simRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.clientWidth, h = el.clientHeight

    const balls = bubbles.map(b => ({
      x: Math.random() * (w - b.size) + b.size / 2,
      y: Math.random() * (h - b.size) + b.size / 2,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      r: b.size / 2,
    }))

    let mx = -9999, my = -9999
    const onMove = e => {
      const rect = el.getBoundingClientRect()
      mx = e.clientX - rect.left; my = e.clientY - rect.top
    }
    const onLeave = () => { mx = -9999; my = -9999 }
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })

    const tick = () => {
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        // Mouse repulsion
        const dx = b.x - mx, dy = b.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150 && dist > 0) {
          const f = (150 - dist) / 150 * 0.6
          b.vx += (dx / dist) * f; b.vy += (dy / dist) * f
        }
        b.x += b.vx; b.y += b.vy
        b.vx *= 0.98; b.vy *= 0.98
        // Walls
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -0.7 }
        if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -0.7 }
        if (b.y - b.r < 0) { b.y = b.r; b.vy *= -0.7 }
        if (b.y + b.r > h) { b.y = h - b.r; b.vy *= -0.7 }
        // Ball collisions
        for (let j = i + 1; j < balls.length; j++) {
          const o = balls[j]
          const cx = b.x - o.x, cy = b.y - o.y
          const d = Math.sqrt(cx * cx + cy * cy), minD = b.r + o.r
          if (d < minD && d > 0) {
            const nx = cx / d, ny = cy / d, ov = minD - d
            b.x += nx * ov * 0.5; b.y += ny * ov * 0.5
            o.x -= nx * ov * 0.5; o.y -= ny * ov * 0.5
            const dot = (b.vx - o.vx) * nx + (b.vy - o.vy) * ny
            b.vx -= dot * nx * 0.5; b.vy -= dot * ny * 0.5
            o.vx += dot * nx * 0.5; o.vy += dot * ny * 0.5
          }
        }
        const node = ballsRef.current[i]
        if (node) node.style.transform = `translate(${b.x - b.r}px,${b.y - b.r}px)`
      }
      simRef.current = requestAnimationFrame(tick)
    }
    simRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(simRef.current)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="dserv" id="services">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <div className="label"><span className="dot" />What We Do</div>
          <h2 className="dserv__title">WE CAN <span className="accent">HELP</span> WITH...</h2>
        </div>
      </div>
      <div className="dserv__arena" ref={containerRef}>
        {bubbles.map((b, i) => (
          <div key={b.label} className="dserv__bubble" ref={el => ballsRef.current[i] = el}
            style={{ width: b.size, height: b.size, border: `2px solid ${b.color}` }}>
            <span style={{ color: b.color }}>{b.label}</span>
          </div>
        ))}
      </div>
      <div className="dserv__divider" />
    </section>
  )
})
