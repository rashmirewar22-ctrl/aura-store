'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProductArt from '@/components/ProductArt'
import Icon from '@/components/Icon'
import { useAuth } from '@/context/AuthContext'
import { useStore } from '@/context/StoreContext'
import { money } from '@/lib/products'

export default function AccountPage() {
  const { user, ready, logout } = useAuth()
  const { orders } = useStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !ready) return <div className="container order-page"><div className="order-loading">Loading…</div></div>

  if (!user) {
    return (
      <div className="container auth-page">
        <div className="auth-card">
          <h1>Your account</h1>
          <p className="auth-sub">Sign in to see your orders and wishlist.</p>
          <Link href="/login" className="btn btn-primary btn-block btn-lg">Sign in</Link>
          <p className="auth-switch">New here? <Link href="/signup">Create an account</Link></p>
        </div>
      </div>
    )
  }

  function initials(name) {
    const p = name.trim().split(/\s+/)
    return (p.length === 1 ? p[0].slice(0, 2) : p[0][0] + p[p.length - 1][0]).toUpperCase()
  }

  return (
    <div className="container account">
      <div className="account-head">
        <div className="account-id">
          <span className="account-av">{initials(user.name)}</span>
          <div><h1>{user.name}</h1><p>{user.email}</p></div>
        </div>
        <button className="btn btn-ghost" onClick={() => { logout(); router.push('/') }}><Icon name="user" size={16} /> Sign out</button>
      </div>

      <h2 className="account-sub">Order history</h2>
      {orders.length === 0 ? (
        <div className="shop-empty">
          <div className="cart-empty-ico"><Icon name="cart" size={24} /></div>
          <h3>No orders yet.</h3>
          <p>When you place an order it’ll appear here.</p>
          <Link href="/shop" className="btn btn-primary">Start shopping</Link>
        </div>
      ) : (
        <div className="orders">
          {orders.map((o) => (
            <div className="order-row" key={o.id}>
              <div className="order-row-head">
                <div>
                  <strong className="mono">{o.id}</strong>
                  <span>{new Date(o.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="order-status">Confirmed</span>
                <strong>{money(o.total)}</strong>
              </div>
              <div className="order-row-items">
                {o.items.map((i) => (
                  <div className="order-chip" key={i.slug + i.color}>
                    <div className="order-chip-art"><ProductArt art={i.art} tint={i.tint} /></div>
                    <span>{i.name} × {i.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
