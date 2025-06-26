export const appConfig = {
  name: "Abdul Hadi",
  description: "Senior Software Engineer Portfolio",
  version: "1.0.0",
  author: {
    name: "Abdul Hadi",
    email: "ahadiwasti@gmail.com",
    linkedin: "https://www.linkedin.com/in/ahadiwasti/",
    phone: "+971 581987465",
    location: "Dubai, UAE",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "/rpc",
    timeout: 10000,
    retries: 3,
  },
  cache: {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxSize: 100, // Maximum number of cached items
  },
  session: {
    tokenKey: "auth_token",
    refreshTokenKey: "refresh_token",
    refreshThreshold: 5 * 60 * 1000, // Refresh 5 minutes before expiry
  },
}
