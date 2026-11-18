# aura — Next.js e-commerce store

A front-end-only storefront built with the **Next.js App Router**. Home, shop with
filters, dynamic product pages, a slide-over cart, a multi-step checkout, order
confirmation, wishlist and an account/orders area — all running in the browser with
state in `localStorage`. Light and dark themes throughout.

## Stack

- **Next.js 14 (App Router)** + React 18
- Server components for the catalog, client components for interactivity (cart, filters, checkout)
- Dynamic routes `/product/[slug]` with `generateStaticParams` + `generateMetadata`
- Context + `localStorage` for cart, wishlist, orders and auth (no backend)
- Hand-written CSS, hand-drawn SVG product art (no external images)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Demo account

```
email:    demo@aura.shop
password: aura1234
```

(Shopping, cart and checkout all work without signing in.)

## Pages

| Route | What it is |
|-------|------------|
| `/` | Home — hero, categories, bestsellers, new arrivals |
| `/shop` | Catalog with category / price / sale filters, sort, search (`?category=`, `?q=`) |
| `/product/[slug]` | Product detail — variants, quantity, add to bag, buy now, related |
| `/cart` | Full cart page + a slide-over drawer anywhere |
| `/checkout` | Multi-step checkout (information → shipping → payment) with validation |
| `/order/[id]` | Order confirmation |
| `/wishlist` | Saved items |
| `/login` · `/signup` · `/account` | Auth + order history |

## Next.js patterns shown

- App Router layouts, a client `Providers` boundary wrapping server pages
- `generateStaticParams` + `generateMetadata` on dynamic product routes
- `useSearchParams` behind a `<Suspense>` boundary (shop filters)
- Server/client component split — catalog renders on the server, interactive
  "islands" (`ProductCard`, `ProductBuy`, cart, checkout) are client components
- Theme set before first paint via an inline script (no flash)

## Structure

```
app/            layout, globals.css, home, shop, product/[slug], cart,
                checkout, order/[id], wishlist, login, signup, account, not-found
components/      Navbar, Footer, CartDrawer, ProductCard, ProductBuy, ProductArt,
                Rating, QuantityStepper, Providers, Icon, Logo
context/         Theme, Toast, Store (cart/wishlist/orders), UI, Auth
lib/             products.js (catalog + helpers), useLocalStorage.js
```
