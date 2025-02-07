'use client'

// React Imports
import React, { createContext, useContext } from 'react'

// Third-party Imports
import { toast, type ToastOptions } from 'react-toastify'

interface ToastContextProps {
  showToast: (message: string, type: 'success' | 'error', options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showToast = (message: string, type: 'success' | 'error', options?: ToastOptions) => {
    toast(<div dangerouslySetInnerHTML={{ __html: message }} />, {
      type,
      ...options
    })
  }

  return <ToastContext.Provider value={{ showToast }}>{children}</ToastContext.Provider>
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
