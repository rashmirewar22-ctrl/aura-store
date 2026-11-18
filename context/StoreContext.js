'use client'
import { createContext, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { getProduct } from '@/lib/products'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('aura.cart', [])
  const [wishlist, setWishlist] = useLocalStorage('aura.wishlist', [])
  const [orders, setOrders] = useLocalStorage('aura.orders', [])

  const addItem = useCallback((slug, color, qty = 1) => {
    setCart((list) => {
      const idx = list.findIndex((i) => i.slug === slug && i.color === color)
      if (idx >= 0) {
        const next = [...list]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...list, { slug, color, qty }]
    })
  }, [setCart])

  const updateQty = useCallback((slug, color, qty) => {
    setCart((list) =>
      list
        .map((i) => (i.slug === slug && i.color === color ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    )
  }, [setCart])

  const removeItem = useCallback((slug, color) => {
    setCart((list) => list.filter((i) => !(i.slug === slug && i.color === color)))
  }, [setCart])

  const clearCart = useCallback(() => setCart([]), [setCart])

  const toggleWish = useCallback((slug) => {
    setWishlist((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]))
  }, [setWishlist])

  const placeOrder = useCallback((order) => {
    setOrders((list) => [order, ...list])
    setCart([])
  }, [setOrders, setCart])

  const detailed = useMemo(
    () => cart.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((i) => i.product),
    [cart]
  )
  const count = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart])
  const subtotal = useMemo(
    () => detailed.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [detailed]
  )

  const value = {
    cart,
    detailed,
    count,
    subtotal,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    wishlist,
    toggleWish,
    inWish: (slug) => wishlist.includes(slug),
    orders,
    placeOrder
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
