const mockTags = [
  { id: "react", name: "React", count: 25 },
  { id: "nodejs", name: "Node.js", count: 20 },
  { id: "typescript", name: "TypeScript", count: 18 },
  { id: "golang", name: "Golang", count: 15 },
  { id: "docker", name: "Docker", count: 12 },
  { id: "aws", name: "AWS", count: 16 },
  { id: "microservices", name: "Microservices", count: 10 },
  { id: "javascript", name: "JavaScript", count: 22 },
  { id: "vue", name: "Vue.js", count: 14 },
  { id: "angular", name: "Angular", count: 8 },
  { id: "electronics", name: "Electronics", count: 12 },
  { id: "iot", name: "IoT", count: 8 },
  { id: "edge-computing", name: "Edge Computing", count: 6 },
  { id: "hardware", name: "Hardware", count: 10 },
  { id: "kubernetes", name: "Kubernetes", count: 9 },
  { id: "performance", name: "Performance", count: 14 },
  { id: "optimization", name: "Optimization", count: 11 },
  { id: "technology", name: "Technology", count: 18 },
  { id: "programming", name: "Programming", count: 15 },
  { id: "web-development", name: "Web Development", count: 20 },
]


export function getAllTags(): Array<{ id: string; name: string; count: number }> {
  return mockTags
}