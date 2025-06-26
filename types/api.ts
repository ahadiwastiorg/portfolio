export interface ApiResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  data?: any
  headers?: Record<string, string>
  timeout?: number
  retries?: number
  cache?: RequestCache
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}
