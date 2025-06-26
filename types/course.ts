export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  instructorId: string
  category: string
  categoryId: string
  price: number
  originalPrice?: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  studentsCount: number
  lessonsCount: number
  isPublished: boolean
  isFeatured: boolean
  hasFreeTrial: boolean
  trialLessons: number
  createdAt: string
  updatedAt: string
  tags: string[]
  requirements: string[]
  whatYouWillLearn: string[]
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl: string
  duration: string
  order: number
  isFree: boolean
  isPublished: boolean
  resources: LessonResource[]
  createdAt: string
  updatedAt: string
}

export interface LessonResource {
  id: string
  title: string
  type: "pdf" | "zip" | "link" | "code"
  url: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  coursesCount: number
  isActive: boolean
  createdAt: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: string
  completedLessons: string[]
  progress: number
  lastAccessedAt: string
  status: "active" | "completed" | "cancelled"
  subscription?: Subscription
}

export interface Subscription {
  id: string
  userId: string
  plan: "trial" | "monthly" | "yearly"
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate: string
  autoRenew: boolean
}

export interface Comment {
  id: string
  lessonId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
  updatedAt: string
  replies: Comment[]
  likes: number
  isEdited: boolean
}
