export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Syed Abdul Hadi",
    alternateName: ["Abdul Hadi", "Abdul Hadi Wasti", "Syed Wasti", "Ahadi Wasti", "Abdul", "Hadi", "Syed"],
    jobTitle: "Senior Software Engineer",
    description:
      "Senior Software Engineer in Dubai, UAE with 8+ years of experience in full-stack development, cloud architecture, and team leadership.",
    worksFor: {
      "@type": "Organization",
      name: "Freelance Software Engineering Services",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "UAE",
    },
    email: "ahadiwasti@gmail.com",
    telephone: "+971581987465",
    url: "https://syedabdulhadi.dev",
    image: "https://syedabdulhadi.dev/profile-image.jpg",
    sameAs: [
      "https://www.linkedin.com/in/ahadiwasti/",
      "https://github.com/ahadiwasti",
      "https://twitter.com/ahadiwasti",
    ],
    knowsAbout: [
      "React.js",
      "Node.js",
      "Golang",
      "JavaScript",
      "TypeScript",
      "AWS",
      "Docker",
      "Kubernetes",
      "Vue.js",
      "Next.js",
      "Microservices",
      "Cloud Architecture",
      "Full Stack Development",
      "Software Engineering",
      "Team Leadership",
      "Technical Consulting",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Dubai, UAE",
      },
      skills: [
        "React Development",
        "Node.js Development",
        "Golang Programming",
        "AWS Cloud Services",
        "Docker Containerization",
        "Kubernetes Orchestration",
        "Full Stack Development",
        "Microservices Architecture",
        "Team Leadership",
      ],
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "PMAS University of Information and Technology",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rawalpindi",
        addressCountry: "Pakistan",
      },
    },
    award: ["AWS Certified Solutions Architect", "Docker Certified Associate", "React Specialist Certification"],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Syed Abdul Hadi - Software Engineering Services Dubai",
    alternateName: "Abdul Hadi Wasti Software Development",
    description:
      "Professional software engineering services in Dubai, UAE. Specializing in full-stack development, cloud architecture, and technical consulting.",
    url: "https://syedabdulhadi.dev",
    telephone: "+971581987465",
    email: "ahadiwasti@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    ],
    serviceType: [
      "Full Stack Development",
      "React Development",
      "Node.js Development",
      "Golang Development",
      "Cloud Architecture",
      "AWS Consulting",
      "Technical Consulting",
      "Software Architecture",
      "Team Leadership",
      "Code Review",
      "Performance Optimization",
    ],
    provider: {
      "@type": "Person",
      name: "Syed Abdul Hadi",
      alternateName: ["Abdul Hadi", "Abdul Hadi Wasti"],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
