'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'
import { useStore } from '@/context/StoreContext'
import { useUI } from '@/context/UIContext'
import { useToast } from '@/context/ToastContext'

export default function ProductBuy({ product }) {
  const { addItem, toggleWish, inWish } = useStore()
  const { openCart } = useUI()
  const toast = useToast()
  const router = useRouter()
  const [color, setColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const wished = inWish(product.slug)

  function add(openDrawer) {
    addItem(product.slug, color, qty)
    toast.success(`${product.name} added to bag`)
    if (openDrawer) openCart()
  }

  function buyNow() {
    add(false)
    router.push('/checkout')
  }

  return (
    <div className="buy">
      {product.colors.length > 1 && (
        <div className="buy-block">
          <span className="buy-label">Colour — <strong>{color}</strong></span>
          <div className="buy-colors">
            {product.colors.map((c) => (
              <button key={c} className={`swatch ${color === c ? 'on' : ''}`} onClick={() => setColor(c)} title={c}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="buy-block">
        <span className="buy-label">Quantity</span>
        <div className="buy-qty">
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
      </div>

      <div className="buy-actions">
        <button className="btn btn-primary btn-lg" onClick={() => add(true)}>
          <Icon name="cart" size={18} /> Add to bag
        </button>
        <button className="btn btn-ghost btn-lg" onClick={buyNow}>Buy it now</button>
        <button className={`buy-wish ${wished ? 'on' : ''}`} onClick={() => { toggleWish(product.slug); toast.info(wished ? 'Removed from wishlist' : 'Saved to wishlist') }} aria-label="Save">
          <Icon name="heart" size={20} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  )
}
