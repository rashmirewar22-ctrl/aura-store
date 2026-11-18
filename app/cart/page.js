'use client'
import Link from 'next/link'
import ProductArt from '@/components/ProductArt'
import QuantityStepper from '@/components/QuantityStepper'
import Icon from '@/components/Icon'
import { useStore } from '@/context/StoreContext'
import { money } from '@/lib/products'

export default function CartPage() {
  const { detailed, subtotal, count, updateQty, removeItem } = useStore()
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 9
  const total = subtotal + shipping

  if (detailed.length === 0) {
    return (
      <div className="container cart-page">
        <div className="shop-empty">
          <div className="cart-empty-ico"><Icon name="cart" size={28} /></div>
          <h3>Your bag is empty.</h3>
          <p>Once you add something you love, it’ll show up here.</p>
          <Link href="/shop" className="btn btn-primary">Start shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container cart-page">
      <h1 className="page-title">Your bag <span>({count})</span></h1>
      <div className="cart-layout">
        <div className="cart-list">
          {detailed.map((i) => (
            <div className="cart-line" key={i.slug + i.color}>
              <Link href={`/product/${i.slug}`} className="cart-line-art"><ProductArt art={i.product.art} tint={i.product.tint} /></Link>
              <div className="cart-line-body">
                <div className="cart-line-top">
                  <div>
                    <Link href={`/product/${i.slug}`} className="cart-line-name">{i.product.name}</Link>
                    {i.color && <span className="cart-line-opt">{i.color}</span>}
                  </div>
                  <strong>{money(i.product.price * i.qty)}</strong>
                </div>
                <div className="cart-line-foot">
                  <QuantityStepper value={i.qty} onChange={(q) => updateQty(i.slug, i.color, q)} />
                  <button className="link-x" onClick={() => removeItem(i.slug, i.color)}><Icon name="trash" size={16} /> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{money(total)}</span></div>
          <Link href="/checkout" className="btn btn-primary btn-block btn-lg">Checkout</Link>
          <Link href="/shop" className="summary-cont">Continue shopping</Link>
        </aside>
      </div>
    </div>
  )
}
