"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/network/api-client"
import { cacheManager } from "@/lib/cache/cache-manager"

interface UseApiOptions {
  immediate?: boolean
  cache?: boolean
  cacheTTL?: number
  retries?: number
}

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(endpoint: string, options: UseApiOptions = {}) {
  const { immediate = true, cache = true, cacheTTL = 5 * 60 * 1000, retries = 3 } = options

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (customEndpoint?: string) => {
      const url = customEndpoint || endpoint
      const cacheKey = `api_${url}`

      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        // Check cache first
        if (cache) {
          const cached = cacheManager.get<T>(cacheKey)
          if (cached) {
            setState({ data: cached, loading: false, error: null })
            return cached
          }
        }

        // Fetch from API
        const response = await apiClient.get<T>(url, { retries })
        const data = response.data

        // Cache the result
        if (cache) {
          cacheManager.set(cacheKey, data, cacheTTL)
        }

        setState({ data, loading: false, error: null })
        return data
      } catch (error: any) {
        const errorMessage = error.message || "An error occurred"
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
        throw error
      }
    },
    [endpoint, cache, cacheTTL, retries],
  )

  const mutate = useCallback(
    async (method: "POST" | "PUT" | "PATCH" | "DELETE", data?: any, customEndpoint?: string) => {
      const url = customEndpoint || endpoint
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        let response
        switch (method) {
          case "POST":
            response = await apiClient.post<T>(url, data, { retries })
            break
          case "PUT":
            response = await apiClient.put<T>(url, data, { retries })
            break
          case "PATCH":
            response = await apiClient.patch<T>(url, data, { retries })
            break
          case "DELETE":
            response = await apiClient.delete<T>(url, { retries })
            break
        }

        const result = response.data

        // Invalidate related cache
        if (cache) {
          cacheManager.invalidatePattern(`api_${url.split("?")[0]}.*`)
        }

        setState({ data: result, loading: false, error: null })
        return result
      } catch (error: any) {
        const errorMessage = error.message || "An error occurred"
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
        throw error
      }
    },
    [endpoint, cache, retries],
  )

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    ...state,
    execute,
    mutate,
    refetch: () => execute(),
  }
}
