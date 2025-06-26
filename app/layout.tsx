import "@/app/globals.css"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { StoreProvider } from "@/components/providers/store-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type React from "react"
import { Suspense } from "react"

export const metadata = {
  metadataBase: new URL("https://ahadiwasti.com"),
  title: {
    default: "Syed Abdul Hadi - Senior Software Engineer Dubai | Full Stack Developer UAE",
    template: "%s | Syed Abdul Hadi - Software Engineer Dubai",
  },
  description:
    "Syed Abdul Hadi (Abdul Hadi Wasti) - Senior Software Engineer in Dubai, UAE. 8+ years experience in React, Node.js, Golang, AWS. Full-stack developer specializing in microservices and cloud architecture.",
  keywords: [
    // Name variations
    "Syed Abdul Hadi",
    "Abdul Hadi",
    "Abdul",
    "Hadi",
    "Syed",
    "Wasti",
    "Abdul Hadi Wasti",
    "Syed Wasti",
    "Ahadi Wasti",
    "Abdul Hadi Syed",
    "Hadi Syed",
    "Abdul Wasti",

    // Professional titles
    "Senior Software Engineer Dubai",
    "Software Engineer Dubai",
    "Full Stack Developer Dubai",
    "React Developer Dubai",
    "Node.js Developer Dubai",
    "Golang Developer Dubai",
    "Software Engineer UAE",
    "Senior Developer Dubai",
    "Tech Lead Dubai",

    // Technical skills
    "React Expert Dubai",
    "AWS Certified Dubai",
    "Microservices Dubai",
    "Cloud Architect Dubai",
    "JavaScript Developer Dubai",
    "TypeScript Developer Dubai",
    "Vue.js Developer Dubai",

    // Location specific
    "Dubai Software Engineer",
    "UAE Software Developer",
    "Dubai Tech Professional",
    "Software Engineer Middle East",
    "Dubai Full Stack Developer",

    // Experience related
    "8 years experience software engineer",
    "Senior developer Dubai",
    "Tech consultant Dubai",
    "Software architect Dubai",
    "Team lead developer Dubai",
  ],
  authors: [{ name: "Syed Abdul Hadi", url: "https://syedabdulhadi.dev" }],
  creator: "Syed Abdul Hadi",
  publisher: "Syed Abdul Hadi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://syedabdulhadi.dev",
    title: "Syed Abdul Hadi - Senior Software Engineer Dubai | Full Stack Developer",
    description:
      "Senior Software Engineer in Dubai with 8+ years experience. Expert in React, Node.js, Golang, AWS. Available for consulting and full-time opportunities.",
    siteName: "Syed Abdul Hadi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Syed Abdul Hadi - Senior Software Engineer Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Abdul Hadi - Senior Software Engineer Dubai",
    description: "Senior Software Engineer in Dubai with 8+ years experience in React, Node.js, Golang, AWS.",
    images: ["/og-image.jpg"],
    creator: "@ahadiwasti",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://syedabdulhadi.dev",
    languages: {
      "en-US": "https://syedabdulhadi.dev",
      "en-AE": "https://syedabdulhadi.dev",
    },
  },
  category: "technology",
  classification: "Software Engineering Portfolio",
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    ICBM: "25.2048, 55.2708",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Syed Abdul Hadi",
              alternateName: ["Abdul Hadi", "Abdul Hadi Wasti", "Syed Wasti", "Ahadi Wasti"],
              jobTitle: "Senior Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE",
              },
              email: "ahadiwasti@gmail.com",
              telephone: "+971581987465",
              url: "https://syedabdulhadi.dev",
              sameAs: ["https://www.linkedin.com/in/ahadiwasti/", "https://github.com/ahadiwasti"],
              knowsAbout: [
                "React",
                "Node.js",
                "Golang",
                "AWS",
                "Docker",
                "Kubernetes",
                "JavaScript",
                "TypeScript",
                "Vue.js",
                "Microservices",
                "Cloud Architecture",
                "Full Stack Development",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "PMAS University of Information and Technology",
              },
            }),
          }}
        />

        {/* Professional Profile Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Syed Abdul Hadi - Software Engineering Services",
              description:
                "Senior Software Engineer in Dubai offering full-stack development, cloud architecture, and technical consulting services.",
              provider: {
                "@type": "Person",
                name: "Syed Abdul Hadi",
              },
              areaServed: {
                "@type": "Place",
                name: "Dubai, UAE",
              },
              serviceType: [
                "Full Stack Development",
                "Cloud Architecture",
                "Technical Consulting",
                "Team Leadership",
                "Software Architecture",
              ],
            }),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Syed Abdul Hadi Portfolio",
              alternateName: "Abdul Hadi Portfolio",
              url: "https://syedabdulhadi.dev",
              description: "Professional portfolio of Syed Abdul Hadi, Senior Software Engineer in Dubai",
              author: {
                "@type": "Person",
                name: "Syed Abdul Hadi",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://syedabdulhadi.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
             <LoadingProvider>
            <Suspense fallback={null}>
              {children}
              <Toaster />
              <Analytics />
              <SpeedInsights />
            </Suspense>
            </LoadingProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
