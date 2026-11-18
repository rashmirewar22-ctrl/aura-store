import { Suspense } from 'react'
import ShopClient from '@/components/ShopClient'

export const metadata = {
  title: 'Shop',
  description: 'Browse audio, living, carry and wear — filter, sort and find your next favourite object.'
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container shop-fallback">Loading the shop…</div>}>
      <ShopClient />
    </Suspense>
  )
}
