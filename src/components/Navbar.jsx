import { useState, useEffect, useCallback, memo } from 'react'

export default memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 50); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback(() => setMenuOpen(false), [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#hero" className="nav__logo">PIXORA</a>
        <div className="nav__links">
          <a href="#hero" className="nav__link">Home</a>
          <a href="#about" className="nav__link">About</a>
          <a href="#services" className="nav__link">Services</a>
          <a href="#projects" className="nav__link">Projects</a>
          <a href="#blog" className="nav__link">Blog</a>
          <a href="#contact" className="nav__link">Contact</a>
        </div>
        <div className="nav__right">
          <a href="#contact" className="nav__cta">Let's Talk</a>
          <button className={`nav__burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="nav__mobile">
          <a href="#hero" onClick={close}>Home</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#blog" onClick={close}>Blog</a>
          <a href="#contact" onClick={close}>Contact</a>
        </div>
      )}
    </nav>
  )
})
