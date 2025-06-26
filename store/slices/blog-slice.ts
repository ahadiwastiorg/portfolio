import { BlogService } from "@/services/blog-service"
import type { BlogPost } from "@/types/models"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface BlogState {
  posts: BlogPost[]
  currentPost: BlogPost | null
  isLoading: boolean
  error: string | null
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
}

export const fetchBlogPosts = createAsyncThunk("blog/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await BlogService.getBlogPosts()
    // Map CMSBlogPost[] to BlogPost[]
    const posts: BlogPost[] = response.data.posts.map((post: any) => ({
      ...post,
      image: post.image ?? "", // Provide default or map as needed
      published: post.published ?? false, // Provide default or map as needed
    }))
    return posts
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch blog posts")
  }
})

export const fetchBlogPostById = createAsyncThunk("blog/fetchById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await BlogService.getBlogPost(id)
    // Map CMSBlogPost to BlogPost
    const post: BlogPost = {
      ...response.data,
      author: typeof response.data.author === "object" && response.data.author !== null
        ? response.data.author.name
        : response.data.author ?? "",
      image: response.data.image ?? "",
      published: response.data.published ?? false,
      publishedAt: response.data.publishedAt ?? "",
    }
    return post
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch blog post")
  }
})

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null
    },
    clearBlogError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action: PayloadAction<BlogPost[]>) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchBlogPostById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action: PayloadAction<BlogPost>) => {
        state.isLoading = false
        state.currentPost = action.payload
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearCurrentPost, clearBlogError } = blogSlice.actions
export default blogSlice.reducer
