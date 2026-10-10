import { memo } from 'react'

const CURRENT_YEAR = new Date().getFullYear()

export default memo(function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__cta">
        <div className="container">
          <div className="footer__cta-inner">
            <h2 className="footer__cta-title">
              LET&apos;S CREATE SOMETHING<br />EXTRAORDINARY TOGETHER
            </h2>
            <a href="#contact" className="footer__cta-btn">
              <span>Start A Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div>
              <a href="#" className="footer__logo">PIXORA</a>
              <p className="footer__desc">
                Award-winning creative digital agency shaping the future of bold brands through design, technology, and strategy.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__soc" aria-label="Twitter">𝕏</a>
                <a href="#" className="footer__soc" aria-label="Instagram">In</a>
                <a href="#" className="footer__soc" aria-label="Dribbble">Dr</a>
                <a href="#" className="footer__soc" aria-label="Behance">Be</a>
              </div>
            </div>

            <div>
              <h3 className="footer__heading">Navigation</h3>
              <ul className="footer__links">
                <li><a href="#about">About Studio</a></li>
                <li><a href="#services">Digital Services</a></li>
                <li><a href="#portfolio">Featured Works</a></li>
                <li><a href="#process">Our Process</a></li>
                <li><a href="#team">Leadership</a></li>
                <li><a href="#blog">Latest News</a></li>
              </ul>
            </div>

            <div>
              <h3 className="footer__heading">Get In Touch</h3>
              <ul className="footer__contact">
                <li>
                  <span className="footer__clabel">Email</span>
                  <a href="mailto:hello@pixora.design">hello@pixora.design</a>
                </li>
                <li>
                  <span className="footer__clabel">Phone</span>
                  <a href="tel:+18005550199">+1 (800) 555-0199</a>
                </li>
                <li>
                  <span className="footer__clabel">HQ</span>
                  <span>742 Evergreen Terrace, New York, NY</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="footer__heading">Newsletter</h3>
              <p className="footer__desc" style={{ marginBottom: '14px' }}>
                Subscribe to get agency insights, design thinking, and news.
              </p>
              <form className="footer__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="footer__input"
                  placeholder="Enter email address"
                  required
                />
                <button type="submit" className="footer__submit" aria-label="Subscribe">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <p>&copy; {CURRENT_YEAR} PIXORA Studio. All rights reserved.</p>
            <div className="footer__blinks">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})
