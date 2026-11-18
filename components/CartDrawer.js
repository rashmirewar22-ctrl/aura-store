'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Icon from './Icon'
import ProductArt from './ProductArt'
import QuantityStepper from './QuantityStepper'
import { useStore } from '@/context/StoreContext'
import { useUI } from '@/context/UIContext'
import { money } from '@/lib/products'

const FREE_SHIP = 150

export default function CartDrawer() {
  const { detailed, subtotal, count, updateQty, removeItem } = useStore()
  const { drawerOpen, closeCart } = useUI()

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeCart()
    }
    if (drawerOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [drawerOpen, closeCart])

  if (!drawerOpen) return null

  const remaining = Math.max(0, FREE_SHIP - subtotal)
  const pct = Math.min(100, (subtotal / FREE_SHIP) * 100)

  return (
    <div className="drawer-overlay" onMouseDown={closeCart}>
      <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cart-head">
          <h3>Your bag <span>({count})</span></h3>
          <button className="nav-ico" onClick={closeCart} aria-label="Close"><Icon name="close" size={19} /></button>
        </div>

        {detailed.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-ico"><Icon name="cart" size={26} /></div>
            <p>Your bag is empty.</p>
            <Link href="/shop" className="btn btn-primary" onClick={closeCart}>Start shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-ship">
              {remaining > 0 ? (
                <span>You’re <strong>{money(remaining)}</strong> away from free shipping</span>
              ) : (
                <span>You’ve unlocked <strong>free shipping</strong> 🎉</span>
              )}
              <div className="cart-ship-bar"><span style={{ width: `${pct}%` }} /></div>
            </div>

            <div className="cart-items">
              {detailed.map((i) => (
                <div className="cart-item" key={i.slug + i.color}>
                  <Link href={`/product/${i.slug}`} onClick={closeCart} className="cart-item-art">
                    <ProductArt art={i.product.art} tint={i.product.tint} />
                  </Link>
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <Link href={`/product/${i.slug}`} onClick={closeCart}>{i.product.name}</Link>
                      <button className="link-x" onClick={() => removeItem(i.slug, i.color)} aria-label="Remove"><Icon name="trash" size={16} /></button>
                    </div>
                    {i.color && <span className="cart-item-opt">{i.color}</span>}
                    <div className="cart-item-foot">
                      <QuantityStepper small value={i.qty} onChange={(q) => updateQty(i.slug, i.color, q)} />
                      <strong>{money(i.product.price * i.qty)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              <div className="cart-sub">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p className="cart-note">Shipping & taxes calculated at checkout.</p>
              <Link href="/checkout" className="btn btn-primary btn-block" onClick={closeCart}>Checkout</Link>
              <button className="btn btn-ghost btn-block" onClick={closeCart}>Keep shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
