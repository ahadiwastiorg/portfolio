import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Abdul Hadi
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ahadiwasti.com All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm">
          <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  )
}
