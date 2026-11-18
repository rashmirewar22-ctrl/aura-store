'use client'
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import Icon from '@/components/Icon'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setToasts((l) => l.filter((t) => t.id !== id)), [])

  const push = useCallback((message, type = 'success') => {
    const id = ++idRef.current
    setToasts((l) => [...l, { id, message, type }])
    setTimeout(() => dismiss(id), 2800)
  }, [dismiss])

  const toast = {
    success: (m) => push(m, 'success'),
    info: (m) => push(m, 'info'),
    error: (m) => push(m, 'error')
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} onClick={() => dismiss(t.id)}>
            <span className="toast-ico"><Icon name={t.type === 'success' ? 'check' : 'cart'} size={15} /></span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
