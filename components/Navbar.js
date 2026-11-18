'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './Logo'
import Icon from './Icon'
import { useStore } from '@/context/StoreContext'
import { useUI } from '@/context/UIContext'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'

const links = [
  { href: '/shop', label: 'Shop all' },
  { href: '/shop?category=audio', label: 'Audio' },
  { href: '/shop?category=living', label: 'Living' },
  { href: '/shop?category=carry', label: 'Carry' },
  { href: '/shop?category=wear', label: 'Wear' }
]

export default function Navbar() {
  const { count, wishlist } = useStore()
  const { openCart } = useUI()
  const { theme, toggle } = useTheme()
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [q, setQ] = useState('')

  function submitSearch(e) {
    e.preventDefault()
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : '/shop')
    setSearch(false)
    setQ('')
  }

  return (
    <header className="nav">
      <div className="nav-row">
        <button className="nav-burger" onClick={() => setOpen((v) => !v)} aria-label="Menu"><Icon name="menu" size={20} /></button>

        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}><Logo /></Link>

        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={pathname === l.href.split('?')[0] && l.href === '/shop' ? '' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-ico" onClick={() => setSearch((s) => !s)} aria-label="Search"><Icon name="search" size={19} /></button>
          <button className="nav-ico" onClick={toggle} aria-label="Theme"><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></button>
          <Link href="/wishlist" className="nav-ico wish" aria-label="Wishlist">
            <Icon name="heart" size={19} />
            {wishlist.length > 0 && <span className="nav-dot">{wishlist.length}</span>}
          </Link>
          <Link href={user ? '/account' : '/login'} className="nav-ico hide-sm" aria-label="Account"><Icon name="user" size={19} /></Link>
          <button className="nav-cart" onClick={openCart} aria-label="Cart">
            <Icon name="cart" size={19} />
            {count > 0 && <span className="nav-dot">{count}</span>}
          </button>
        </div>
      </div>

      {search && (
        <form className="nav-search" onSubmit={submitSearch}>
          <Icon name="search" size={18} />
          <input autoFocus placeholder="Search for headphones, chairs, mugs…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="button" className="nav-ico" onClick={() => setSearch(false)}><Icon name="close" size={18} /></button>
        </form>
      )}

      {open && (
        <nav className="nav-mobile">
          {links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href={user ? '/account' : '/login'} onClick={() => setOpen(false)}>{user ? 'Account' : 'Sign in'}</Link>
        </nav>
      )}
    </header>
  )
}
