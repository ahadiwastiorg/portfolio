import { appConfig } from "@/config/app-config"

interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>()
  private readonly DEFAULT_TTL = appConfig.cache.defaultTTL

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })

    // Also store in localStorage for persistence
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          `cache_${key}`,
          JSON.stringify({
            data,
            timestamp: Date.now(),
            ttl,
          }),
        )
      } catch (error) {
        console.warn("Failed to store cache in localStorage:", error)
      }
    }
  }

  get<T>(key: string): T | null {
    // First check memory cache
    const memoryItem = this.cache.get(key)
    if (memoryItem && this.isValid(memoryItem)) {
      return memoryItem.data
    }

    // Then check localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`cache_${key}`)
        if (stored) {
          const item: CacheItem<T> = JSON.parse(stored)
          if (this.isValid(item)) {
            // Restore to memory cache
            this.cache.set(key, item)
            return item.data
          } else {
            // Remove expired item
            localStorage.removeItem(`cache_${key}`)
          }
        }
      } catch (error) {
        console.warn("Failed to retrieve cache from localStorage:", error)
      }
    }

    return null
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): void {
    this.cache.delete(key)
    if (typeof window !== "undefined") {
      localStorage.removeItem(`cache_${key}`)
    }
  }

  clear(): void {
    this.cache.clear()
    if (typeof window !== "undefined") {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith("cache_"))
      keys.forEach((key) => localStorage.removeItem(key))
    }
  }

  private isValid<T>(item: CacheItem<T>): boolean {
    return Date.now() - item.timestamp < item.ttl
  }

  async getOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl: number = this.DEFAULT_TTL): Promise<T> {
    const cached = this.get<T>(key)
    if (cached) {
      return cached
    }

    const data = await fetchFn()
    this.set(key, data, ttl)
    return data
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern)

    // Clear from memory
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }

    // Clear from localStorage
    if (typeof window !== "undefined") {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith("cache_") && regex.test(key.substring(6)))
      keys.forEach((key) => localStorage.removeItem(key))
    }
  }
}

export const cacheManager = new CacheManager()
