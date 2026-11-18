import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, getProduct, related, money } from '@/lib/products'
import ProductArt from '@/components/ProductArt'
import Rating from '@/components/Rating'
import ProductBuy from '@/components/ProductBuy'
import ProductCard from '@/components/ProductCard'
import Icon from '@/components/Icon'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug)
  if (!product) return { title: 'Not found' }
  return {
    title: product.name,
    description: product.blurb
  }
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug)
  if (!product) notFound()
  const more = related(product.slug)

  return (
    <div className="container pdp">
      <nav className="crumbs">
        <Link href="/">Home</Link><Icon name="chevronR" size={13} />
        <Link href="/shop">Shop</Link><Icon name="chevronR" size={13} />
        <span>{product.name}</span>
      </nav>

      <div className="pdp-grid">
        <div className="pdp-media">
          <div className="pdp-art">
            <ProductArt art={product.art} tint={product.tint} />
            {product.badge && <span className="pcard-badge">{product.badge}</span>}
          </div>
          <div className="pdp-thumbs">
            {[0, 1, 2].map((i) => (
              <div className="pdp-thumb" key={i} style={{ opacity: i === 0 ? 1 : 0.55 }}>
                <ProductArt art={product.art} tint={i === 0 ? product.tint : [product.tint[1], product.tint[0]]} />
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <span className="pdp-cat">{product.category}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} size={16} />
          <div className="pdp-price">
            {money(product.price)}
            {product.compareAt && <><s>{money(product.compareAt)}</s><span className="pdp-save">Save {money(product.compareAt - product.price)}</span></>}
          </div>
          <p className="pdp-desc">{product.description}</p>

          <ProductBuy product={product} />

          <ul className="pdp-features">
            {product.features.map((f) => (
              <li key={f}><Icon name="check" size={15} /> {f}</li>
            ))}
          </ul>

          <div className="pdp-perks">
            <span><Icon name="truck" size={17} /> Free shipping over $150</span>
            <span><Icon name="refresh" size={17} /> 45-day returns</span>
          </div>
        </div>
      </div>

      <section className="shelf">
        <div className="section-head"><div><span className="sec-eyebrow">You might also like</span><h2>Pairs well with.</h2></div></div>
        <div className="product-grid">
          {more.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  )
}
