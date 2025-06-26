import { AuthService } from "@/services/auth-service"
import type { LoginCredentials, RegisterData, User } from "@/types/auth"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  sessionExpiry: number | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  sessionExpiry: null,
}

// Async thunks
export const loginUser = createAsyncThunk("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(credentials)

    // Store tokens in localStorage
    localStorage.setItem("auth_token", response.data.token)
    localStorage.setItem("refresh_token", response.data.refreshToken)

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Login failed")
  }
})

export const registerUser = createAsyncThunk("auth/register", async (userData: RegisterData, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(userData)

    localStorage.setItem("auth_token", response.data.token)
    localStorage.setItem("refresh_token", response.data.refreshToken)

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Registration failed")
  }
})

export const refreshAuthToken = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.refreshToken()

    localStorage.setItem("auth_token", response.data.token)
    localStorage.setItem("refresh_token", response.data.refreshToken)

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Token refresh failed")
  }
})

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await AuthService.logout()
  } finally {
    // Clear tokens regardless of API response
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setTokens: (
      state,
      action: PayloadAction<{
        token: string
        refreshToken: string
        expiresIn: number
      }>,
    ) => {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000
      state.isAuthenticated = true
    },
    checkTokenExpiry: (state) => {
      if (state.sessionExpiry && Date.now() > state.sessionExpiry) {
        state.isAuthenticated = false
        state.token = null
        state.user = null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      // Refresh token
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000
        state.isAuthenticated = true
      })
      .addCase(refreshAuthToken.rejected, (state) => {
        state.isAuthenticated = false
        state.token = null
        state.refreshToken = null
        state.user = null
        state.sessionExpiry = null
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.refreshToken = null
        state.isAuthenticated = false
        state.sessionExpiry = null
        state.error = null
      })
  },
})

export const { clearError, setTokens, checkTokenExpiry } = authSlice.actions
export default authSlice.reducer
