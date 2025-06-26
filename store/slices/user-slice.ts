import { AuthService } from "@/services/auth-service"
import type { User } from "@/types/auth"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  profile: User | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
}

export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.getProfile()
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch user profile")
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload
      state.error = null
    },
    clearProfile(state) {
      state.profile = null
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setProfile, clearProfile, clearError } = userSlice.actions
export default userSlice.reducer
