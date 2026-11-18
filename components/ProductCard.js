'use client'
import Link from 'next/link'
import ProductArt from './ProductArt'
import Rating from './Rating'
import Icon from './Icon'
import { useStore } from '@/context/StoreContext'
import { useUI } from '@/context/UIContext'
import { useToast } from '@/context/ToastContext'
import { money } from '@/lib/products'

export default function ProductCard({ product }) {
  const { addItem, toggleWish, inWish } = useStore()
  const { openCart } = useUI()
  const toast = useToast()
  const wished = inWish(product.slug)

  function quickAdd(e) {
    e.preventDefault()
    addItem(product.slug, product.colors[0], 1)
    toast.success(`${product.name} added to bag`)
    openCart()
  }

  function wish(e) {
    e.preventDefault()
    toggleWish(product.slug)
    toast.info(wished ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  return (
    <Link href={`/product/${product.slug}`} className="pcard">
      <div className="pcard-media">
        <ProductArt art={product.art} tint={product.tint} />
        {product.badge && <span className="pcard-badge">{product.badge}</span>}
        <button className={`pcard-wish ${wished ? 'on' : ''}`} onClick={wish} aria-label="Save">
          <Icon name="heart" size={18} fill={wished ? 'currentColor' : 'none'} />
        </button>
        <button className="pcard-add" onClick={quickAdd}>
          <Icon name="plus" size={16} /> Quick add
        </button>
      </div>
      <div className="pcard-body">
        <div className="pcard-row">
          <h3>{product.name}</h3>
          <span className="pcard-price">
            {money(product.price)}
            {product.compareAt && <s>{money(product.compareAt)}</s>}
          </span>
        </div>
        <p className="pcard-blurb">{product.blurb}</p>
        <Rating value={product.rating} reviews={product.reviews} />
      </div>
    </Link>
  )
}
