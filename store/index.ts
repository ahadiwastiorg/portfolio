import { combineReducers, configureStore } from "@reduxjs/toolkit"

import authSlice from "./slices/auth-slice"
import blogSlice from "./slices/blog-slice"
import projectsSlice from "./slices/projects-slice"
import uiSlice from "./slices/ui-slice"
import userSlice from "./slices/user-slice"

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  projects: projectsSlice,
  blog: blogSlice,
  ui: uiSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
