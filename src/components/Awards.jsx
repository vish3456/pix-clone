import { memo } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

const awards = [
  { year: '2024', title: 'Best Creative Agency', org: 'Awwwards' },
  { year: '2024', title: 'Site of the Year', org: 'CSS Design Awards' },
  { year: '2023', title: 'Excellence in Design', org: 'FWA Awards' },
  { year: '2023', title: 'Top Digital Agency', org: 'Clutch Global' },
  { year: '2022', title: 'Innovation Award', org: 'Webby Awards' },
]

export default memo(function Awards() {
  const ref = useScrollReveal('.aw__row', { x: -30, y: 0, stagger: 0.08 })

  return (
    <section className="aw" ref={ref}>
      <div className="container">
        <div className="aw__layout">
          <div>
            <div className="label"><span className="dot" />Recognition</div>
            <h2 className="aw__title">AWARDS &<br /><span className="accent">HONORS</span></h2>
            <p className="aw__desc">Our work has been recognized by leading industry organizations worldwide.</p>
          </div>
          <div>
            {awards.map((a, i) => (
              <div className="aw__row" key={i}>
                <span className="aw__year">{a.year}</span>
                <div className="aw__info">
                  <h3 className="aw__name">{a.title}</h3>
                  <span className="aw__org">{a.org}</span>
                </div>
                <div className="aw__icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
