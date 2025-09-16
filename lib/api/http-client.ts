import { ApiError, type ApiResponse, type RequestConfig } from "@/types/api"
function getServerBaseUrl(): string {
  if (typeof window === "undefined") {
    // Running on the server — use absolute URL
    return process.env.API_URL || "http://localhost:3031/api"
  }
  return "/api"
}
class HttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

   constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || getServerBaseUrl()){
    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
    }
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = "GET", data, headers = {}, timeout = 10000, retries = 3, cache = "default" } = config

    const url = /^https?:\/\//.test(endpoint)
      ? endpoint // absolute URL → use as-is
      : `${this.baseURL}${endpoint}` // relative URL → just prefix (if baseURL set)
    const token = this.getAuthToken()
    console.log("Making request to:", url, "with method:", method, "and headers:", headers)
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    }

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      cache,
      ...(data && { body: JSON.stringify(data) }),
    }

    // Add timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    requestConfig.signal = controller.signal

    try {
      const response = await this.executeWithRetry(() => fetch(url, requestConfig), retries)

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status, await response.text())
      }

      const contentType = response.headers.get("content-type") ?? ""

      let parsedBody: unknown
      if (contentType.includes("application/json")) {
        parsedBody = await response.json()
      } else {
        // Return the raw text so we can inspect the HTML error in dev tools
        const rawText = await response.text()
        throw new ApiError(`Expected JSON but received “${contentType || "unknown"}”`, response.status, rawText)
      }

      return {
        data: parsedBody as T,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiError) {
        throw error
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408)
      }

      throw new ApiError(error instanceof Error ? error.message : "Unknown error", 0)
    }
  }

  private async executeWithRetry<T>(fn: () => Promise<T>, retries: number, delay = 1000): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      if (retries > 0 && this.shouldRetry(error)) {
        await this.sleep(delay)
        return this.executeWithRetry(fn, retries - 1, delay * 2)
      }
      throw error
    }
  }

  private shouldRetry(error: any): boolean {
    if (error instanceof ApiError) {
      return error.status >= 500 || error.status === 429
    }
    return true
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  }

  // HTTP Methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "POST", data })
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "PUT", data })
  }

  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "PATCH", data })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }
}

export const httpClient = new HttpClient()


// import { ApiError, type ApiResponse, type RequestConfig } from "@/types/api"

// class HttpClient {
//   private baseURL: string
//   private defaultHeaders: Record<string, string>

//   constructor(baseURL = "") {
//     this.baseURL = baseURL
//     this.defaultHeaders = {
//       "Content-Type": "application/json",
//     }
//   }

//   private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
//     const { method = "GET", data, headers = {}, timeout = 10000, retries = 3, cache = "default" } = config

//     const url = /^https?:\/\//.test(endpoint)
//       ? endpoint // absolute URL → use as-is
//       : `${this.baseURL}${endpoint}` // relative URL → just prefix (if baseURL set)
//     const token = this.getAuthToken()

//     const requestHeaders = {
//       ...this.defaultHeaders,
//       ...headers,
//       ...(token && { Authorization: `Bearer ${token}` }),
//     }

//     const requestConfig: RequestInit = {
//       method,
//       headers: requestHeaders,
//       cache,
//       ...(data && { body: JSON.stringify(data) }),
//     }

//     // Add timeout
//     const controller = new AbortController()
//     const timeoutId = setTimeout(() => controller.abort(), timeout)
//     requestConfig.signal = controller.signal

//     try {
//       const response = await this.executeWithRetry(() => fetch(url, requestConfig), retries)

//       clearTimeout(timeoutId)

//       if (!response.ok) {
//         throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status, await response.text())
//       }

//       const contentType = response.headers.get("content-type") ?? ""

//       let parsedBody: unknown
//       if (contentType.includes("application/json")) {
//         parsedBody = await response.json()
//       } else {
//         // Return the raw text so we can inspect the HTML error in dev tools
//         const rawText = await response.text()
//         throw new ApiError(`Expected JSON but received “${contentType || "unknown"}”`, response.status, rawText)
//       }

//       return {
//         data: parsedBody as T,
//         status: response.status,
//         headers: Object.fromEntries(response.headers.entries()),
//       }
//     } catch (error) {
//       clearTimeout(timeoutId)

//       if (error instanceof ApiError) {
//         throw error
//       }

//       if (error instanceof Error && error.name === "AbortError") {
//         throw new ApiError("Request timeout", 408)
//       }

//       throw new ApiError(error instanceof Error ? error.message : "Unknown error", 0)
//     }
//   }

//   private async executeWithRetry<T>(fn: () => Promise<T>, retries: number, delay = 1000): Promise<T> {
//     try {
//       return await fn()
//     } catch (error) {
//       if (retries > 0 && this.shouldRetry(error)) {
//         await this.sleep(delay)
//         return this.executeWithRetry(fn, retries - 1, delay * 2)
//       }
//       throw error
//     }
//   }

//   private shouldRetry(error: any): boolean {
//     if (error instanceof ApiError) {
//       return error.status >= 500 || error.status === 429
//     }
//     return true
//   }

//   private sleep(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms))
//   }

//   private getAuthToken(): string | null {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("auth_token")
//     }
//     return null
//   }

//   // HTTP Methods
//   async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { ...config, method: "GET" })
//   }

//   async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { ...config, method: "POST", data })
//   }

//   async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { ...config, method: "PUT", data })
//   }

//   async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { ...config, method: "PATCH", data })
//   }

//   async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { ...config, method: "DELETE" })
//   }
// }

// export const httpClient = new HttpClient()