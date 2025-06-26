"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export function CourseFilters() {
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    price: "",
    features: [],
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-categories" />
              <Label htmlFor="all-categories">All Categories</Label>
            </div>
            {categories.map((category: any) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>
                  {category.name} ({category.coursesCount})
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Level</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-levels" />
              <Label htmlFor="all-levels">All Levels</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Beginner" id="beginner" />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.price} onValueChange={(value) => handleFilterChange("price", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-prices" />
              <Label htmlFor="all-prices">All Prices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Paid</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button
        className="w-full"
        onClick={() =>
          setFilters({
            search: "",
            category: "",
            level: "",
            price: "",
            features: [],
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  )
}
