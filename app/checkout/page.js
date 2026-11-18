'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProductArt from '@/components/ProductArt'
import Icon from '@/components/Icon'
import { useStore } from '@/context/StoreContext'
import { useToast } from '@/context/ToastContext'
import { money } from '@/lib/products'

const steps = ['Information', 'Shipping', 'Payment']

export default function CheckoutPage() {
  const { detailed, subtotal, placeOrder } = useStore()
  const toast = useToast()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [ship, setShip] = useState('standard')
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'United States',
    card: '', exp: '', cvc: '', cardName: ''
  })
  const [errors, setErrors] = useState({})

  if (detailed.length === 0) {
    return (
      <div className="container cart-page">
        <div className="shop-empty">
          <div className="cart-empty-ico"><Icon name="cart" size={26} /></div>
          <h3>Your bag is empty.</h3>
          <p>Add something before heading to checkout.</p>
          <Link href="/shop" className="btn btn-primary">Shop now</Link>
        </div>
      </div>
    )
  }

  const shipCost = ship === 'express' ? 16 : subtotal >= 150 ? 0 : 9
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipCost + tax

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }))
  }

  function setCard(value) {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    set('card', digits.replace(/(.{4})/g, '$1 ').trim())
  }
  function setExp(value) {
    const d = value.replace(/\D/g, '').slice(0, 4)
    set('exp', d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d)
  }

  function validateInfo() {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (form.firstName.trim().length < 2) e.firstName = 'Required.'
    if (form.lastName.trim().length < 2) e.lastName = 'Required.'
    if (form.address.trim().length < 4) e.address = 'Enter your street address.'
    if (form.city.trim().length < 2) e.city = 'Required.'
    if (form.zip.trim().length < 3) e.zip = 'Required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validatePayment() {
    const e = {}
    if (form.card.replace(/\s/g, '').length < 16) e.card = 'Enter a 16-digit card number.'
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = 'MM/YY'
    if (form.cvc.replace(/\D/g, '').length < 3) e.cvc = '3–4 digits.'
    if (form.cardName.trim().length < 2) e.cardName = 'Name on card.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (step === 0 && !validateInfo()) return
    setStep((s) => s + 1)
  }

  function submit() {
    if (!validatePayment()) return
    const id = 'AUR-' + Date.now().toString(36).toUpperCase().slice(-6)
    placeOrder({
      id,
      items: detailed.map((i) => ({ slug: i.slug, name: i.product.name, color: i.color, qty: i.qty, price: i.product.price, art: i.product.art, tint: i.product.tint })),
      subtotal, shipping: shipCost, tax, total,
      email: form.email,
      name: `${form.firstName} ${form.lastName}`,
      address: `${form.address}, ${form.city} ${form.zip}`,
      method: ship,
      date: Date.now()
    })
    toast.success('Order placed')
    router.push(`/order/${id}`)
  }

  return (
    <div className="container checkout">
      <div className="checkout-main">
        <Link href="/" className="checkout-logo-link">← Back to shop</Link>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s} className={`step-pill ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}>
              <span className="step-n">{i < step ? <Icon name="check" size={13} /> : i + 1}</span>{s}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="co-panel">
            <h2>Contact & shipping</h2>
            <Field label="Email" error={errors.email}><input className="input" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" /></Field>
            <div className="co-row">
              <Field label="First name" error={errors.firstName}><input className="input" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} /></Field>
              <Field label="Last name" error={errors.lastName}><input className="input" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} /></Field>
            </div>
            <Field label="Address" error={errors.address}><input className="input" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="123 Linden Ave" /></Field>
            <div className="co-row">
              <Field label="City" error={errors.city}><input className="input" value={form.city} onChange={(e) => set('city', e.target.value)} /></Field>
              <Field label="ZIP" error={errors.zip}><input className="input" value={form.zip} onChange={(e) => set('zip', e.target.value)} /></Field>
              <Field label="Country"><select className="input" value={form.country} onChange={(e) => set('country', e.target.value)}><option>United States</option><option>Canada</option><option>United Kingdom</option></select></Field>
            </div>
            <button className="btn btn-primary btn-lg btn-block" onClick={next}>Continue to shipping</button>
          </div>
        )}

        {step === 1 && (
          <div className="co-panel">
            <h2>Shipping method</h2>
            {[
              { k: 'standard', t: 'Standard', d: '3–5 business days', c: subtotal >= 150 ? 0 : 9 },
              { k: 'express', t: 'Express', d: '1–2 business days', c: 16 }
            ].map((m) => (
              <button key={m.k} className={`ship-opt ${ship === m.k ? 'on' : ''}`} onClick={() => setShip(m.k)}>
                <span className="ship-radio" />
                <span className="ship-opt-main"><strong>{m.t}</strong><span>{m.d}</span></span>
                <strong>{m.c === 0 ? 'Free' : money(m.c)}</strong>
              </button>
            ))}
            <div className="co-nav">
              <button className="btn btn-ghost btn-lg" onClick={() => setStep(0)}>Back</button>
              <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>Continue to payment</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="co-panel">
            <h2>Payment</h2>
            <p className="co-secure"><Icon name="shield" size={15} /> Demo checkout — no real card is charged.</p>
            <Field label="Card number" error={errors.card}><input className="input" value={form.card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" /></Field>
            <div className="co-row">
              <Field label="Expiry" error={errors.exp}><input className="input" value={form.exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" inputMode="numeric" /></Field>
              <Field label="CVC" error={errors.cvc}><input className="input" value={form.cvc} onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" inputMode="numeric" /></Field>
            </div>
            <Field label="Name on card" error={errors.cardName}><input className="input" value={form.cardName} onChange={(e) => set('cardName', e.target.value)} /></Field>
            <div className="co-nav">
              <button className="btn btn-ghost btn-lg" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary btn-lg" onClick={submit}>Pay {money(total)}</button>
            </div>
          </div>
        )}
      </div>

      <aside className="checkout-summary">
        <h3>Summary</h3>
        <div className="co-items">
          {detailed.map((i) => (
            <div className="co-item" key={i.slug + i.color}>
              <div className="co-item-art"><ProductArt art={i.product.art} tint={i.product.tint} /><span className="co-item-qty">{i.qty}</span></div>
              <div className="co-item-info"><strong>{i.product.name}</strong>{i.color && <span>{i.color}</span>}</div>
              <span className="co-item-price">{money(i.product.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="summary-row"><span>Shipping</span><span>{shipCost === 0 ? 'Free' : money(shipCost)}</span></div>
        <div className="summary-row"><span>Tax</span><span>{money(tax)}</span></div>
        <div className="summary-row total"><span>Total</span><span>{money(total)}</span></div>
      </aside>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      {children}
      {error && <div className="field-error">{error}</div>}
    </div>
  )
}
