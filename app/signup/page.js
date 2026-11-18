'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export default function SignupPage() {
  const { register } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }))
  }

  function submit(e) {
    e.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.password.length < 6) next.password = 'At least 6 characters.'
    setErrors(next)
    if (Object.keys(next).length) return
    const res = register(form)
    if (res.ok) {
      toast.success('Account created')
      router.push('/account')
    } else {
      setErrors({ email: res.error })
    }
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-sub">Faster checkout, order history and a saved wishlist.</p>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label className="label">Full name</label>
            <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Mara Fin" />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="At least 6 characters" />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          <button className="btn btn-primary btn-block btn-lg" type="submit">Create account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
      </div>
    </div>
  )
}
