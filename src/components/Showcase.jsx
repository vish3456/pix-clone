import { memo } from 'react'

export default memo(function Showcase() {
  const marqueeItems = [
    'DESIGN & DEVELOPMENT',
    'INFOGRAPHIC AND OTHER',
    'BRAND STRATEGY',
    'MOTION GRAPHICS',
    'ART DIRECTION & 3D',
  ]

  return (
    <section className="showcase-banner">
      {/* Orange Iconic Ticker Marquee with Flower Emblems */}
      <div className="showcase-banner__ticker">
        <div className="showcase-banner__track">
          {[0, 1, 2].map((group) => (
            <div key={group} className="showcase-banner__group">
              {marqueeItems.map((text, idx) => (
                <div key={idx} className="showcase-banner__item">
                  <span className="showcase-banner__text">{text}</span>
                  <div className="showcase-banner__flower">
                    <svg viewBox="0 0 100 100" className="showcase-banner__flower-svg">
                      <circle cx="50" cy="50" r="14" fill="#FFFFFF" />
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <circle
                          key={deg}
                          cx={50 + 26 * Math.cos((deg * Math.PI) / 180)}
                          cy={50 + 26 * Math.sin((deg * Math.PI) / 180)}
                          r="16"
                          fill="#FFFFFF"
                        />
                      ))}
                    </svg>
                    <span className="showcase-banner__flower-label">LET&apos;S<br />TALK</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Pinstripes Under Marquee */}
      <div className="showcase-banner__stripes">
        <div className="showcase-banner__stripe" />
        <div className="showcase-banner__stripe" />
        <div className="showcase-banner__stripe" />
        <div className="showcase-banner__stripe" />
      </div>
    </section>
  )
})
