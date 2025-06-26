export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "student"
  createdAt: string
  updatedAt: string
  subscription?: Subscription
  enrolledCourses?: string[]
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role?: "student"
}

export interface Subscription {
  id: string
  plan: "trial" | "monthly" | "yearly"
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate: string
  autoRenew: boolean
}
