'use client'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Icon from '@/components/Icon'
import { useStore } from '@/context/StoreContext'
import { getProduct } from '@/lib/products'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const items = wishlist.map(getProduct).filter(Boolean)

  return (
    <div className="container wishlist-page">
      <h1 className="page-title">Wishlist <span>({items.length})</span></h1>
      {items.length === 0 ? (
        <div className="shop-empty">
          <div className="cart-empty-ico"><Icon name="heart" size={26} /></div>
          <h3>No saved items yet.</h3>
          <p>Tap the heart on any product to keep it here for later.</p>
          <Link href="/shop" className="btn btn-primary">Browse products</Link>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  )
}
