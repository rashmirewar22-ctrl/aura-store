'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductArt from '@/components/ProductArt'
import Icon from '@/components/Icon'
import { useStore } from '@/context/StoreContext'
import { money } from '@/lib/products'

export default function OrderPage({ params }) {
  const { orders } = useStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const order = orders.find((o) => o.id === params.id)

  if (!mounted) return <div className="container order-page"><div className="order-loading">Loading your order…</div></div>

  if (!order) {
    return (
      <div className="container order-page">
        <div className="shop-empty">
          <h3>We couldn’t find that order.</h3>
          <p>It may have been placed in another browser. Your orders live on this device.</p>
          <Link href="/shop" className="btn btn-primary">Back to shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container order-page">
      <div className="order-hero">
        <span className="order-check"><Icon name="check" size={28} /></span>
        <h1>Thank you, {order.name.split(' ')[0]}.</h1>
        <p>Your order <strong className="mono">{order.id}</strong> is confirmed. A receipt is on its way to {order.email}.</p>
      </div>

      <div className="order-card">
        <div className="order-items">
          {order.items.map((i) => (
            <div className="order-item" key={i.slug + i.color}>
              <div className="order-item-art"><ProductArt art={i.art} tint={i.tint} /></div>
              <div className="order-item-info">
                <strong>{i.name}</strong>
                <span>{i.color ? `${i.color} · ` : ''}Qty {i.qty}</span>
              </div>
              <span>{money(i.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="order-totals">
          <div className="summary-row"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : money(order.shipping)}</span></div>
          <div className="summary-row"><span>Tax</span><span>{money(order.tax)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{money(order.total)}</span></div>
        </div>
      </div>

      <div className="order-meta">
        <div><span className="order-meta-k">Shipping to</span><p>{order.address}</p></div>
        <div><span className="order-meta-k">Method</span><p>{order.method === 'express' ? 'Express (1–2 days)' : 'Standard (3–5 days)'}</p></div>
      </div>

      <div className="order-actions">
        <Link href="/shop" className="btn btn-primary btn-lg">Continue shopping</Link>
        <Link href="/account" className="btn btn-ghost btn-lg">View all orders</Link>
      </div>
    </div>
  )
}
