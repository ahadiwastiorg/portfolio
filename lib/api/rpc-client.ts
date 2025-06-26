import { type RpcRequest, type RpcResponse, RpcError } from "@/types/rpc"

class RpcClient {
  private baseURL: string
  private requestId = 1

  constructor(baseURL: string = process.env.NEXT_PUBLIC_RPC_URL || "/rpc") {
    this.baseURL = baseURL
  }

  async call<T = any>(
    method: string,
    params?: any,
    options: {
      timeout?: number
      retries?: number
    } = {},
  ): Promise<T> {
    const { timeout = 10000, retries = 3 } = options

    const request: RpcRequest = {
      jsonrpc: "2.0",
      method,
      params,
      id: this.requestId++,
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await this.executeWithRetry(
        () =>
          fetch(this.baseURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...this.getAuthHeaders(),
            },
            body: JSON.stringify(request),
            signal: controller.signal,
          }),
        retries,
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new RpcError(`HTTP ${response.status}: ${response.statusText}`, -32603, request.id)
      }

      const result: RpcResponse<T> = await response.json()

      if (result.error) {
        throw new RpcError(result.error.message, result.error.code, result.id, result.error.data)
      }

      return result.result
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof RpcError) {
        throw error
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new RpcError("Request timeout", -32603, request.id)
      }

      throw new RpcError(error instanceof Error ? error.message : "Unknown RPC error", -32603, request.id)
    }
  }

  async batch<T = any>(
    requests: Array<{
      method: string
      params?: any
    }>,
  ): Promise<T[]> {
    const batchRequest = requests.map((req) => ({
      jsonrpc: "2.0" as const,
      method: req.method,
      params: req.params,
      id: this.requestId++,
    }))

    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(batchRequest),
    })

    if (!response.ok) {
      throw new RpcError(`HTTP ${response.status}: ${response.statusText}`, -32603)
    }

    const results: RpcResponse<T>[] = await response.json()
    return results.map((result) => {
      if (result.error) {
        throw new RpcError(result.error.message, result.error.code, result.id, result.error.data)
      }
      return result.result
    })
  }

  private async executeWithRetry<T>(fn: () => Promise<T>, retries: number, delay = 1000): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.executeWithRetry(fn, retries - 1, delay * 2)
      }
      throw error
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

export const rpcClient = new RpcClient()
