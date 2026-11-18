import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container notfound">
      <span className="notfound-code">404</span>
      <h1>This page wandered off.</h1>
      <p>The page you’re after doesn’t exist, or it moved. Let’s get you back to the good stuff.</p>
      <div className="notfound-cta">
        <Link href="/" className="btn btn-primary btn-lg">Back home</Link>
        <Link href="/shop" className="btn btn-ghost btn-lg">Browse the shop</Link>
      </div>
    </div>
  )
}
