import { memo } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

const projects = [
  { id: 1, title: 'Luminous Brand', category: 'Branding', color: '#FF3B00' },
  { id: 2, title: 'Zenith Platform', category: 'UI/UX Design', color: '#F5C860' },
  { id: 3, title: 'Nova Commerce', category: 'Development', color: '#95D9F4' },
  { id: 4, title: 'Pulse Campaign', category: 'Marketing', color: '#F4ACD1' },
  { id: 5, title: 'Vertex Digital', category: 'Strategy', color: '#A8D8A0' },
  { id: 6, title: 'Aurora Series', category: 'Photography', color: '#FF3B00' },
]

const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>

export default memo(function RecentProjects() {
  const ref = useScrollReveal('.rp-card', { stagger: 0.08 })

  return (
    <section className="rp" id="projects" ref={ref}>
      <div className="container">
        <div className="label"><span className="dot" />Portfolio</div>
        <h2 className="stitle" style={{ marginBottom: 50 }}>RECENT <span className="accent">PROJECTS</span></h2>
        <div className="rp__grid">
          {projects.map(p => (
            <div className="rp-card" key={p.id}>
              <div className="rp-card__img" style={{ background: `linear-gradient(135deg,${p.color}20,${p.color}40)` }}>
                <div className="rp-card__icon" style={{ borderColor: p.color }}>
                  <span style={{ color: p.color }}>{p.title.charAt(0)}</span>
                </div>
                <div className="rp-card__overlay">
                  <a href="#" className="rp-card__link" aria-label={`View ${p.title}`}><Arrow /></a>
                </div>
              </div>
              <div className="rp-card__info">
                <span className="rp-card__cat" style={{ color: p.color }}>{p.category}</span>
                <h3 className="rp-card__name">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="rp__cta">
          <a href="#" className="rp__btn">View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
})
