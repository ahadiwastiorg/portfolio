"use client"

import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, FolderOpen, LayoutDashboard, LogOut, MessageSquare, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useSession()

  return (
    <div className="w-64 bg-card border-r min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Learning Management System</p>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
              asChild
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4 mr-3" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="outline" className="w-full justify-start" onClick={logout}>
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
