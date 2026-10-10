import { memo } from 'react'

export default memo(function AgencyVision() {
  return (
    <section className="av">
      <div className="av__bg">
        <div className="av__gradient" />
        <button className="av__play" aria-label="Play video">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <div className="av__bar">
        <div className="container">
          <div className="av__bar-inner">
            <div className="av__bar-item"><span className="av__bar-num">15+</span><span className="av__bar-label">Years Experience</span></div>
            <div className="av__bar-divider" />
            <div className="av__bar-item"><span className="av__bar-num">350+</span><span className="av__bar-label">Projects Delivered</span></div>
            <div className="av__bar-divider" />
            <div className="av__bar-item"><span className="av__bar-num">98%</span><span className="av__bar-label">Client Satisfaction</span></div>
          </div>
        </div>
      </div>
    </section>
  )
})
