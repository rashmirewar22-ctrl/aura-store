'use client'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { StoreProvider } from '@/context/StoreContext'
import { UIProvider } from '@/context/UIContext'
import { AuthProvider } from '@/context/AuthContext'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <StoreProvider>
            <UIProvider>{children}</UIProvider>
          </StoreProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
