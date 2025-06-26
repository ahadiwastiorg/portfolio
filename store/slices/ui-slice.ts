import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  theme: "light" | "dark" | "system"
  sidebarOpen: boolean
  loading: boolean
  notifications: Array<{
    id: string
    type: "success" | "error" | "warning" | "info"
    message: string
    timestamp: number
  }>
}

const initialState: UiState = {
  theme: "system",
  sidebarOpen: false,
  loading: false,
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addNotification: (
      state,
      action: PayloadAction<{
        type: "success" | "error" | "warning" | "info"
        message: string
      }>,
    ) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions
export default uiSlice.reducer
