"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import type { BlogFilters } from "./blog-list-page"

interface BlogSidebarProps {
  filters: BlogFilters
  onFiltersChange: (filters: BlogFilters) => void
}

interface BlogCategory {
  id: string
  name: string
  count: number
}

interface BlogTag {
  id: string
  name: string
  count: number
}

export function BlogSidebar({ filters, onFiltersChange }: BlogSidebarProps) {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [searchInput, setSearchInput] = useState(filters.search)

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Fetch categories
    setCategories([
      { id: "all", name: "All", count: 45 },
      { id: "technology", name: "Technology", count: 18 },
      { id: "electronics", name: "Electronics", count: 12 },
      { id: "programming", name: "Programming", count: 15 },
      { id: "web-development", name: "Web Development", count: 20 },
      { id: "mobile", name: "Mobile Development", count: 8 },
      { id: "devops", name: "DevOps", count: 10 },
      { id: "cloud", name: "Cloud Computing", count: 14 },
    ])

    // Fetch popular tags
    setTags([
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
    ])
  }, [])

  const handleCategoryChange = (categoryId: string) => {
    onFiltersChange({
      ...filters,
      category: categoryId,
    })
  }

  const handleTagToggle = (tagId: string) => {
    const newTags = filters.tags.includes(tagId) ? filters.tags.filter((t) => t !== tagId) : [...filters.tags, tagId]

    onFiltersChange({
      ...filters,
      tags: newTags,
    })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFiltersChange({
      ...filters,
      search: searchInput,
    })
  }

  const clearFilters = () => {
    setSearchInput("")
    onFiltersChange({
      category: "all",
      tags: [],
      search: "",
    })
  }

  const hasActiveFilters = filters.category !== "all" || filters.tags.length > 0 || filters.search

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Active Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filters.category !== "all" && (
                <Badge variant="secondary" className="mr-2">
                  Category: {categories.find((c) => c.id === filters.category)?.name}
                </Badge>
              )}
              {filters.tags.map((tagId) => (
                <Badge key={tagId} variant="secondary" className="mr-2">
                  {tags.find((t) => t.id === tagId)?.name}
                </Badge>
              ))}
              {filters.search && (
                <Badge variant="secondary" className="mr-2">
                  Search: "{filters.search}"
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left p-2 rounded-md transition-colors hover:bg-muted ${
                  filters.category === category.id ? "bg-muted font-medium" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.tags.includes(tag.id) ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tag.name}
                <Badge variant="secondary" className="text-xs ml-1">
                  {tag.count}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
