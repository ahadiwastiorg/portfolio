export interface RpcRequest {
  jsonrpc: "2.0"
  method: string
  params?: any
  id: number | string
}

export interface RpcResponse<T = any> {
  jsonrpc: "2.0"
  result?: T
  error?: {
    code: number
    message: string
    data?: any
  }
  id: number | string | null
}

export class RpcError extends Error {
  constructor(
    message: string,
    public code: number,
    public id?: number | string | null,
    public data?: any,
  ) {
    super(message)
    this.name = "RpcError"
  }
}
