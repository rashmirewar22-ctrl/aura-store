'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { products, categories } from '@/lib/products'
import ProductCard from './ProductCard'
import Icon from './Icon'

const sorts = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'rating', label: 'Top rated' }
]

export default function ShopClient() {
  const params = useSearchParams()
  const router = useRouter()
  const [category, setCategory] = useState(params.get('category') || 'all')
  const [q, setQ] = useState(params.get('q') || '')
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(600)
  const [onSale, setOnSale] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setCategory(params.get('category') || 'all')
    setQ(params.get('q') || '')
  }, [params])

  function pickCategory(slug) {
    setCategory(slug)
    router.replace(slug === 'all' ? '/shop' : `/shop?category=${slug}`, { scroll: false })
  }

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (onSale && !p.compareAt) return false
      if (p.price > maxPrice) return false
      if (q) {
        const hay = (p.name + ' ' + p.blurb + ' ' + p.category).toLowerCase()
        if (!hay.includes(q.toLowerCase())) return false
      }
      return true
    })
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price)
    else if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating)
    return out
  }, [category, q, sort, maxPrice, onSale])

  const activeName = categories.find((c) => c.slug === category)?.name || 'All'

  return (
    <div className="container shop">
      <div className="shop-head">
        <div>
          <span className="sec-eyebrow">{list.length} products</span>
          <h1>{q ? `“${q}”` : activeName}</h1>
        </div>
        <div className="shop-sort">
          <Icon name="filter" size={15} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {sorts.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="shop-body">
        <aside className={`shop-filters ${filtersOpen ? 'open' : ''}`}>
          <div className="filter-block">
            <h4>Category</h4>
            <div className="filter-cats">
              {categories.map((c) => (
                <button key={c.slug} className={category === c.slug ? 'on' : ''} onClick={() => pickCategory(c.slug)}>{c.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-block">
            <h4>Max price</h4>
            <input type="range" min="20" max="600" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            <div className="filter-range-val">Up to <strong>${maxPrice}</strong></div>
          </div>
          <div className="filter-block">
            <label className="filter-check">
              <input type="checkbox" checked={onSale} onChange={(e) => setOnSale(e.target.checked)} />
              <span>On sale only</span>
            </label>
          </div>
          <button className="btn btn-ghost btn-block" onClick={() => { setCategory('all'); setMaxPrice(600); setOnSale(false); setQ(''); router.replace('/shop', { scroll: false }) }}>Reset filters</button>
        </aside>

        <div className="shop-main">
          <button className="shop-filter-toggle" onClick={() => setFiltersOpen((v) => !v)}>
            <Icon name="filter" size={16} /> Filters
          </button>
          {list.length === 0 ? (
            <div className="shop-empty">
              <h3>Nothing matches.</h3>
              <p>Try widening your price range or clearing the search.</p>
            </div>
          ) : (
            <div className="product-grid">
              {list.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
