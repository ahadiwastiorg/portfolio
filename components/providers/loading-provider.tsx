"use client"

import type React from "react"

import LoadingScreen from "@/components/ui/loading-screen"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type LoadingContextValue = {
  showLoading: (message?: string) => void
  hideLoading: () => void
  isLoading: boolean
  message: string
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("Loading…")

  const showLoading = useCallback((msg = "Loading…") => {
    setMessage(msg)
    setIsLoading(true)
  }, [])

  const hideLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Optional: automatically hide after 20 s as a safeguard
  useEffect(() => {
    if (!isLoading) return
    const id = setTimeout(() => setIsLoading(false), 20_000)
    return () => clearTimeout(id)
  }, [isLoading])

  const value = useMemo(
    () => ({ showLoading, hideLoading, isLoading, message }),
    [showLoading, hideLoading, isLoading, message],
  )

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <LoadingScreen message={message} />}
    </LoadingContext.Provider>
  )
}

/* Hook for easy access inside components */
export function useLoadingContext() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error("useLoadingContext must be used within LoadingProvider")
  return ctx
}
