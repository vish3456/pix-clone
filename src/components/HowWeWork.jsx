import { memo } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

const steps = [
  { num: '01', title: 'Discovery & Research', desc: 'We start by understanding your brand, audience, and goals through in-depth research and discovery sessions.', color: 'var(--yellow)' },
  { num: '02', title: 'Strategy & Planning', desc: 'We develop a comprehensive strategy and roadmap that aligns with your business objectives.', color: 'var(--orange)' },
  { num: '03', title: 'Design & Development', desc: 'Our team brings the strategy to life through stunning design and robust development.', color: 'var(--pink)' },
  { num: '04', title: 'Launch & Optimize', desc: 'We launch your project and continuously optimize based on data and user feedback.', color: 'var(--cyan)' },
]

export default memo(function HowWeWork() {
  const ref = useScrollReveal('.hww__card', { stagger: 0.12 })

  return (
    <section className="hww" ref={ref}>
      <div className="container">
        <div className="label"><span className="dot" />Process</div>
        <h2 className="stitle" style={{ marginBottom: 50 }}>HOW WE <span className="accent">WORK</span></h2>
        <div className="hww__grid">
          {steps.map(s => (
            <div className="hww__card" key={s.num}>
              <div className="hww__card-top">
                <span className="hww__num">{s.num}</span>
                <div className="hww__dot" style={{ background: s.color }} />
              </div>
              <h3 className="hww__card-title">{s.title}</h3>
              <p className="hww__card-desc">{s.desc}</p>
              <div className="hww__card-line" style={{ background: s.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
