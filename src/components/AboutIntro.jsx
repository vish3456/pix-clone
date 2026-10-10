import { memo } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

export default memo(function AboutIntro() {
  const ref = useScrollReveal('.reveal')

  return (
    <section className="about-intro" id="about" ref={ref}>
      <div className="container">
        <div className="label reveal"><span className="dot" />Who We Are</div>
        <h2 className="about-intro__title reveal">
          WE ARE A CREATIVE STUDIO FOCUSING ON{' '}
          <span className="accent">DIGITAL EXPERIENCE</span> &amp;{' '}
          <span className="accent">BRANDING</span>
        </h2>
        <div className="about-intro__row reveal">
          <p className="about-intro__desc">
            We blend strategy, creativity, and technology to help brands stand out in a noisy digital world. Our team of designers, developers, and strategists work together to create meaningful experiences.
          </p>
          <a href="#services" className="about-intro__btn">
            Discover More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
})
