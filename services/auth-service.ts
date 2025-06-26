import { httpClient } from "@/lib/api/http-client"
import type { User, LoginCredentials, RegisterData } from "@/types/auth"
import type { ApiResponse } from "@/types/api"

export class AuthService {
  static async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<{ user: User; token: string; refreshToken: string; expiresIn: number }>> {
    return httpClient.post("/auth/login", credentials)
  }

  static async register(
    userData: RegisterData,
  ): Promise<ApiResponse<{ user: User; token: string; refreshToken: string; expiresIn: number }>> {
    return httpClient.post("/auth/register", userData)
  }

  static async logout(): Promise<ApiResponse<void>> {
    return httpClient.post("/auth/logout")
  }

  static async refreshToken(): Promise<ApiResponse<{ token: string; refreshToken: string; expiresIn: number }>> {
    const refreshToken = localStorage.getItem("refresh_token")
    return httpClient.post("/auth/refresh", { refreshToken })
  }

  static async getProfile(): Promise<ApiResponse<User>> {
    return httpClient.get("/user/profile")
  }

  static async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return httpClient.put("/user/profile", userData)
  }
}
