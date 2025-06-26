"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import type { ContactFormData } from "@/services/external/email-service"
import { NotificationService } from "@/services/notification-service"
import { useState } from "react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      const contactData: ContactFormData = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        company: formData.get("company") as string,
        projectType: formData.get("projectType") as string,
        budget: formData.get("budget") as string,
        message: formData.get("message") as string,
      }

      const success = await NotificationService.handleContactFormSubmission(contactData)

      if (success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you within 24 hours.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" placeholder="Your first name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Your last name" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" placeholder="Your company (optional)" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="projectType">Project Type</Label>
        <Select name="projectType" required>
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="mobile-app">Mobile App</SelectItem>
            <SelectItem value="consulting">Technical Consulting</SelectItem>
            <SelectItem value="maintenance">Maintenance & Support</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget Range</Label>
        <Select name="budget" required>
          <SelectTrigger>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
            <SelectItem value="50k+">$50,000+</SelectItem>
            <SelectItem value="discuss">Let's discuss</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, requirements, and timeline..."
          className="min-h-[120px]"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
