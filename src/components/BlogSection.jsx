import { memo } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

const posts = [
  { id: 1, title: 'The Future of Digital Branding in 2024', category: 'Branding', date: 'Oct 5, 2024', color: '#FF3B00' },
  { id: 2, title: 'How UX Design Drives Business Growth', category: 'Design', date: 'Sep 28, 2024', color: '#F5C860' },
  { id: 3, title: 'Building Scalable Web Applications', category: 'Development', date: 'Sep 15, 2024', color: '#95D9F4' },
]

export default memo(function BlogSection() {
  const ref = useScrollReveal('.blog-card', { stagger: 0.12 })

  return (
    <section className="blog" id="blog" ref={ref}>
      <div className="container">
        <div className="label"><span className="dot" />Blog</div>
        <h2 className="stitle" style={{ marginBottom: 50 }}>LATEST <span className="accent">INSIGHTS</span></h2>
        <div className="blog__grid">
          {posts.map(p => (
            <article className="blog-card" key={p.id}>
              <div className="blog-card__img" style={{ background: `linear-gradient(135deg,${p.color}18,${p.color}35)` }}>
                <span className="blog-card__cat" style={{ background: p.color }}>{p.category}</span>
              </div>
              <div className="blog-card__body">
                <span className="blog-card__date">{p.date}</span>
                <h3 className="blog-card__title">{p.title}</h3>
                <a href="#" className="blog-card__link">
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})
