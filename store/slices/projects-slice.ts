import { ProjectService } from "@/services/project-service"
import type { Project, ProjectFilters } from "@/types/project"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface ProjectsState {
  projects: Project[]
  featuredProjects: Project[]
  currentProject: Project | null
  filters: ProjectFilters
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}

const initialState: ProjectsState = {
  projects: [],
  featuredProjects: [],
  currentProject: null,
  filters: {
    technology: "",
    category: "",
    search: "",
  },
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    hasMore: true,
  },
}

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (
    params: {
      page?: number
      limit?: number
      filters?: ProjectFilters
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const response = await ProjectService.getProjects(params)
      return {
        projects: response.data.projects,
        total: response.data.total,
        hasMore: response.data.hasMore,
        page: params.page || 1,
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch projects")
    }
  },
)

export const fetchFeaturedProjects = createAsyncThunk(
  "projects/fetchFeaturedProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProjectService.getProjects({ featured: true })
      return response.data.projects
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch featured projects")
    }
  },
)

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await ProjectService.getProject(id)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch project")
    }
  },
)

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.pagination.page = 1
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false
        const { projects, total, hasMore, page } = action.payload

        if (page === 1) {
          state.projects = projects
        } else {
          state.projects = [...state.projects, ...projects]
        }

        state.pagination = {
          ...state.pagination,
          page,
          total,
          hasMore,
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchFeaturedProjects.fulfilled, (state, action) => {
        state.featuredProjects = action.payload
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentProject = action.payload
      })
  },
})

export const { setFilters, clearFilters, setCurrentProject, clearError } = projectsSlice.actions
export default projectsSlice.reducer
