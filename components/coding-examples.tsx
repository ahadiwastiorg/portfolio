"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Play, ExternalLink } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const codeExamples = {
  react: {
    title: "React Custom Hook",
    description: "A custom hook for handling API calls with loading and error states",
    code: `import { useState, useEffect } from 'react';

export function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage example
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
    language: "javascript",
  },
  golang: {
    title: "Golang Microservice",
    description: "A simple REST API microservice with middleware and error handling",
    code: `package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"

    "github.com/gorilla/mux"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type Response struct {
    Success bool        \`json:"success"\`
    Data    interface{} \`json:"data,omitempty"\`
    Error   string      \`json:"error,omitempty"\`
}

// Middleware for logging requests
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

// CORS middleware
func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        
        next.ServeHTTP(w, r)
    })
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
    users := []User{
        {ID: 1, Name: "John Doe", Email: "john@example.com"},
        {ID: 2, Name: "Jane Smith", Email: "jane@example.com"},
    }

    response := Response{
        Success: true,
        Data:    users,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func main() {
    r := mux.NewRouter()
    
    // Apply middleware
    r.Use(loggingMiddleware)
    r.Use(corsMiddleware)
    
    // Routes
    r.HandleFunc("/api/users", getUsersHandler).Methods("GET")
    
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}`,
    language: "go",
  },
  javascript: {
    title: "JavaScript Utility Functions",
    description: "Useful utility functions for data manipulation and validation",
    code: `// Debounce function for performance optimization
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Deep clone object utility
export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === "object") {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// Form validation utilities
export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  phone: (phone) => {
    const re = /^\+?[\d\s\-$$$$]{10,}$/;
    return re.test(phone);
  },
  
  password: (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
  }
};

// Array manipulation utilities
export const arrayUtils = {
  groupBy: (array, key) => {
    return array.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  },
  
  unique: (array, key) => {
    if (key) {
      return array.filter((item, index, self) => 
        index === self.findIndex(t => t[key] === item[key])
      );
    }
    return [...new Set(array)];
  },
  
  sortBy: (array, key, direction = 'asc') => {
    return [...array].sort((a, b) => {
      const aVal = key ? a[key] : a;
      const bVal = key ? b[key] : b;
      
      if (direction === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }
};

// Usage examples
const searchHandler = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

const users = [
  { id: 1, name: 'John', department: 'IT' },
  { id: 2, name: 'Jane', department: 'HR' },
  { id: 3, name: 'Bob', department: 'IT' }
];

const groupedUsers = arrayUtils.groupBy(users, 'department');
console.log(groupedUsers);`,
    language: "javascript",
  },
  docker: {
    title: "Docker Configuration",
    description: "Multi-stage Docker build for Node.js application with optimization",
    code: `# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]

# Docker Compose example
---
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`,
    language: "dockerfile",
  },
}

export function CodingExamples() {
  const [activeTab, setActiveTab] = useState("react")

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: "Code has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Code Examples</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Code Showcase</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Real-world code examples demonstrating best practices and clean architecture.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="golang">Golang</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="docker">Docker</TabsTrigger>
        </TabsList>

        {Object.entries(codeExamples).map(([key, example]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{example.title}</CardTitle>
                    <CardDescription className="mt-2">{example.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">{example.language}</Badge>
                  <Badge variant="outline">Production Ready</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
