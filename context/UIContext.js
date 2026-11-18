'use client'
import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const openCart = useCallback(() => setDrawerOpen(true), [])
  const closeCart = useCallback(() => setDrawerOpen(false), [])
  return (
    <UIContext.Provider value={{ drawerOpen, openCart, closeCart }}>{children}</UIContext.Provider>
  )
}

export function useUI() {
  return useContext(UIContext)
}
