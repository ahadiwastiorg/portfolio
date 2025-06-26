"use client"

import { MobileNav } from "@/components/layout/mobile-nav"
import { LoginDialog } from "@/components/login-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/projects" },
  { name: "Courses", href: "/courses" },
  { name: "Blog", href: "/blog" },
  { name: "Code", href: "/code" },
  { name: "Contact", href: "/#contact" },
]

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Abdul Hadi
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                pathname === item.href && "text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
          <LoginDialog isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <LoginDialog isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <MobileNav navigation={navigation} />
        </div>
      </div>
    </header>
  )
}
