export const routes = {
  home: "/",
  about: "/#about",
  experience: "/#experience",
  skills: "/#skills",
  projects: "/projects",
  blog: "/blog",
  code: "/code",
  contact: "/#contact",
  login: "/login",
  dashboard: "/dashboard",
} as const

export const apiRoutes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  user: {
    profile: "/user/profile",
  },
  projects: {
    list: "/projects",
    detail: (id: string) => `/projects/${id}`,
    featured: "/projects/featured",
  },
  blog: {
    list: "/blog",
    detail: (id: string) => `/blog/${id}`,
  },
} as const
