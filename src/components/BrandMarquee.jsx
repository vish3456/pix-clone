import { memo } from 'react'

const brands = ['DUPONT', 'REUTERS', 'ZOOM', 'TELEPERFORMANCE', 'HEINEKEN', 'BESTSELLER']

export default memo(function BrandMarquee() {
  return (
    <section className="bm">
      <div className="bm__track">
        {[...brands, ...brands].map((b, i) => <span className="bm__item" key={i}>{b}</span>)}
      </div>
    </section>
  )
})
