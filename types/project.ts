export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  technologies: string[]
  category: string
  image: string
  images?: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  status: "completed" | "in-progress" | "planned"
  createdAt: string
  updatedAt: string
}

export interface ProjectFilters {
  technology?: string
  category?: string
  search?: string
  status?: string
}
