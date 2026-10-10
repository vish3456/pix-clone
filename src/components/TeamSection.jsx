import { memo } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

const team = [
  { name: 'Alex Rivera', role: 'Creative Director', color: '#FF3B00' },
  { name: 'Maya Chen', role: 'Lead Designer', color: '#F5C860' },
  { name: 'David Park', role: 'Tech Lead', color: '#95D9F4' },
  { name: 'Sofia Martinez', role: 'Strategy Head', color: '#F4ACD1' },
]

export default memo(function TeamSection() {
  const ref = useScrollReveal('.ts__card', { stagger: 0.1 })

  return (
    <section className="ts" id="team" ref={ref}>
      <div className="container">
        <div className="label"><span className="dot" />Our Team</div>
        <h2 className="stitle" style={{ marginBottom: 50 }}>MEET THE <span className="accent">TALENTED</span> TEAM</h2>
        <div className="ts__grid">
          {team.map(m => (
            <div className="ts__card" key={m.name}>
              <div className="ts__img" style={{ background: `linear-gradient(135deg,${m.color}25,${m.color}10)` }}>
                <div className="ts__avatar" style={{ borderColor: m.color }}>
                  <span style={{ color: m.color }}>{m.name.charAt(0)}</span>
                </div>
                <div className="ts__socials">
                  <a href="#" className="ts__social" aria-label="Twitter">𝕏</a>
                  <a href="#" className="ts__social" aria-label="LinkedIn">in</a>
                  <a href="#" className="ts__social" aria-label="Dribbble">●</a>
                </div>
              </div>
              <div className="ts__info">
                <h3 className="ts__name">{m.name}</h3>
                <p className="ts__role">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
