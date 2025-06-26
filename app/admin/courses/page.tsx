"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
// import { CoursesManagement } from "@/components/admin/courses-management"
import { useSession } from "@/hooks/use-session"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminCoursesPage() {
  const { user, isAuthenticated, isLoading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login?redirect=/admin/courses")
    }
  }, [isAuthenticated, user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {/* <CoursesManagement /> */}
        </main>
      </div>
    </div>
  )
}
