import { useState, useEffect, useRef, useCallback, memo } from 'react'

const items = [
  { text: "Pixora transformed our brand identity completely. Their creative vision and attention to detail exceeded all our expectations.", author: 'Sarah Mitchell', role: 'CEO, TechVenture' },
  { text: "Working with Pixora was a game-changer for our business. They delivered a website that not only looks stunning but drives real results.", author: 'James Rodriguez', role: 'Founder, Apex Digital' },
  { text: "The level of creativity and professionalism at Pixora is unmatched. They truly understand how to bring a brand's vision to life.", author: 'Emma Thompson', role: 'Marketing Director, Nova Corp' },
]

export default memo(function Testimonials() {
  const [active, setActive] = useState(0)
  const timer = useRef(null)

  const go = useCallback((i) => {
    setActive(i)
    clearInterval(timer.current)
    timer.current = setInterval(() => setActive(p => (p + 1) % items.length), 5000)
  }, [])

  useEffect(() => {
    timer.current = setInterval(() => setActive(p => (p + 1) % items.length), 5000)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section className="testi">
      <div className="container">
        <div className="testi__header">
          <div className="label" style={{justifyContent:'center'}}><span className="dot" />Testimonials</div>
          <h2 className="stitle" style={{textAlign:'center'}}>WHAT OUR <span className="accent">CLIENTS</span> SAY</h2>
        </div>
        <div className="testi__slider">
          {items.map((t, i) => (
            <div className={`testi__slide ${i === active ? 'active' : ''}`} key={i}>
              <div className="testi__quote">&ldquo;</div>
              <p className="testi__text">{t.text}</p>
              <div className="testi__author">
                <div className="testi__avatar">{t.author.charAt(0)}</div>
                <div><div className="testi__name">{t.author}</div><div className="testi__role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
        <div className="testi__dots">
          {items.map((_, i) => <button key={i} className={`testi__dot ${i === active ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i+1}`} />)}
        </div>
        <div className="testi__nav">
          <button className="testi__arrow" onClick={() => go((active - 1 + items.length) % items.length)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button className="testi__arrow" onClick={() => go((active + 1) % items.length)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  )
})
