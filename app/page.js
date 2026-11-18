import Link from 'next/link'
import { products, categories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import ProductArt from '@/components/ProductArt'
import Icon from '@/components/Icon'

const valueProps = [
  { icon: 'truck', title: 'Carbon-neutral delivery', text: 'Free over $150, shipped in plastic-free packaging.' },
  { icon: 'refresh', title: '45-day returns', text: 'Live with it for a month. Change your mind, no fuss.' },
  { icon: 'shield', title: 'Made to last', text: 'Guarantees measured in years, not warranty cards.' }
]

export default function Home() {
  const bestsellers = products.filter((p) => p.badge === 'Bestseller')
  const fresh = products.filter((p) => p.badge === 'New')
  const heroArt = ['halo-headphones', 'drift-chair', 'ora-watch', 'fern-planter'].map((s) => products.find((p) => p.slug === s))

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-eyebrow">Autumn edit · 2026</span>
          <h1>Objects for<br /><em>calm</em> living.</h1>
          <p>A small, considered shop of things you’ll keep. Audio that disappears, furniture you sink into, and everyday carry built to outlast the trend cycle.</p>
          <div className="hero-cta">
            <Link href="/shop" className="btn btn-primary btn-lg">Shop the collection <Icon name="arrowRight" size={17} /></Link>
            <Link href="/shop?category=audio" className="btn btn-ghost btn-lg">Explore audio</Link>
          </div>
          <div className="hero-meta">
            <span><strong>4.8★</strong> from 2,100+ reviews</span>
            <span><strong>Free</strong> shipping over $150</span>
          </div>
        </div>
        <div className="hero-art">
          {heroArt.map((p, i) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className={`hero-tile t${i}`}>
              <ProductArt art={p.art} tint={p.tint} />
              <span className="hero-tile-tag">{p.name.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="values">
        {valueProps.map((v) => (
          <div className="value" key={v.title}>
            <span className="value-ico"><Icon name={v.icon} size={22} /></span>
            <div>
              <strong>{v.title}</strong>
              <p>{v.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="cats">
        <div className="section-head">
          <div>
            <span className="sec-eyebrow">Browse by room</span>
            <h2>Four categories, zero clutter.</h2>
          </div>
          <Link href="/shop" className="sec-link">All products <Icon name="arrowRight" size={15} /></Link>
        </div>
        <div className="cat-grid">
          {categories.filter((c) => c.slug !== 'all').map((c) => {
            const sample = products.find((p) => p.category === c.slug)
            return (
              <Link key={c.slug} href={`/shop?category=${c.slug}`} className="cat-tile">
                <ProductArt art={sample.art} tint={sample.tint} />
                <div className="cat-tile-label"><span>{c.name}</span><Icon name="arrowRight" size={16} /></div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="shelf">
        <div className="section-head">
          <div>
            <span className="sec-eyebrow">Loved most</span>
            <h2>Bestsellers.</h2>
          </div>
          <Link href="/shop" className="sec-link">Shop all <Icon name="arrowRight" size={15} /></Link>
        </div>
        <div className="product-grid">
          {bestsellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="pullquote">
        <blockquote>“The things you own should earn their place. aura makes that easy.”</blockquote>
        <cite>— Field Notes Magazine</cite>
      </section>

      <section className="shelf">
        <div className="section-head">
          <div>
            <span className="sec-eyebrow">Just landed</span>
            <h2>New arrivals.</h2>
          </div>
          <Link href="/shop" className="sec-link">Shop all <Icon name="arrowRight" size={15} /></Link>
        </div>
        <div className="product-grid">
          {fresh.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  )
}
