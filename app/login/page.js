'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icon'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export default function LoginPage() {
  const { login } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }))
  }

  function submit(e) {
    e.preventDefault()
    const next = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.password.length < 6) next.password = 'At least 6 characters.'
    setErrors(next)
    if (Object.keys(next).length) return
    const res = login(form)
    if (res.ok) {
      toast.success('Welcome back')
      router.push('/account')
    } else {
      setErrors({ password: res.error })
    }
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-sub">Sign in to track orders and sync your wishlist.</p>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="input-affix">
              <input className="input" type={show ? 'text' : 'password'} value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="••••••••" />
              <button type="button" className="affix-btn" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
            </div>
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          <button className="btn btn-primary btn-block btn-lg" type="submit">Sign in</button>
        </form>
        <button className="auth-demo" onClick={() => setForm({ email: 'demo@aura.shop', password: 'aura1234' })}>Use demo account</button>
        <p className="auth-switch">New to aura? <Link href="/signup">Create an account</Link></p>
      </div>
    </div>
  )
}
