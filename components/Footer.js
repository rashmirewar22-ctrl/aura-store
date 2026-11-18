'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import Icon from './Icon'
import { useToast } from '@/context/ToastContext'

export default function Footer() {
  const toast = useToast()
  const [email, setEmail] = useState('')

  function subscribe(e) {
    e.preventDefault()
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.success('You’re on the list')
      setEmail('')
    } else {
      toast.error('Enter a valid email')
    }
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>Considered objects for calm, everyday living. Made to last, shipped carbon-neutral.</p>
        </div>
        <div className="footer-news">
          <h4>Join the list</h4>
          <p>New arrivals, slow restocks and the occasional note. No noise.</p>
          <form onSubmit={subscribe}>
            <input placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit"><Icon name="arrowRight" size={17} /></button>
          </form>
        </div>
      </div>
      <div className="footer-cols">
        <div>
          <h5>Shop</h5>
          <Link href="/shop?category=audio">Audio</Link>
          <Link href="/shop?category=living">Living</Link>
          <Link href="/shop?category=carry">Carry</Link>
          <Link href="/shop?category=wear">Wear</Link>
        </div>
        <div>
          <h5>Company</h5>
          <Link href="/shop">About</Link>
          <Link href="/shop">Sustainability</Link>
          <Link href="/shop">Journal</Link>
        </div>
        <div>
          <h5>Help</h5>
          <Link href="/shop">Shipping</Link>
          <Link href="/shop">Returns</Link>
          <Link href="/account">Account</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} aura. All rights reserved.</span>
        <span>Front-end only · built with Next.js · data in your browser</span>
      </div>
    </footer>
  )
}
