"use client"

import type { RootState } from "@/store"
import { checkTokenExpiry, logoutUser, refreshAuthToken } from "@/store/slices/auth-slice"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export function useSession() {
  const dispatch = useDispatch()
  const { user, isAuthenticated, sessionExpiry, token, isLoading } = useSelector((state: RootState) => state.auth)

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!isAuthenticated || !sessionExpiry) return

    const timeUntilExpiry = sessionExpiry - Date.now()
    const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0) // 5 minutes before expiry

    const timer = setTimeout(() => {
      dispatch(refreshAuthToken() as any)
    }, refreshTime)

    return () => clearTimeout(timer)
  }, [dispatch, isAuthenticated, sessionExpiry])

  // Check token expiry on app focus
  useEffect(() => {
    const handleFocus = () => {
      dispatch(checkTokenExpiry())
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [dispatch])

  // Periodic token expiry check
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkTokenExpiry())
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(logoutUser() as any)
  }, [dispatch])

  const isSessionValid = useCallback(() => {
    if (!sessionExpiry) return false
    return Date.now() < sessionExpiry
  }, [sessionExpiry])

  return {
    user,
    isAuthenticated: isAuthenticated && isSessionValid(),
    isLoading,
    token,
    logout,
    isSessionValid,
  }
}
