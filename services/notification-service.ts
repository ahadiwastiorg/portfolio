import { EmailService, type ContactFormData } from "@/services/external/email-service"
import { AnalyticsService } from "@/services/external/analytics-service"

export interface NotificationOptions {
  email?: boolean
  analytics?: boolean
  push?: boolean
}

export class NotificationService {
  static async handleContactFormSubmission(
    data: ContactFormData,
    options: NotificationOptions = { email: true, analytics: true },
  ): Promise<boolean> {
    const results: boolean[] = []

    try {
      // Send email notification
      if (options.email) {
        const emailSent = await EmailService.sendContactForm(data)
        results.push(emailSent)
      }

      // Track analytics event
      if (options.analytics) {
        AnalyticsService.trackContactFormSubmission(data)
        results.push(true)
      }

      // Send push notification (if implemented)
      if (options.push) {
        const pushSent = await this.sendPushNotification({
          title: "New Contact Form Submission",
          body: `${data.firstName} ${data.lastName} submitted a contact form`,
          data: { type: "contact_form", email: data.email },
        })
        results.push(pushSent)
      }

      return results.every(Boolean)
    } catch (error) {
      console.error("Failed to handle contact form submission:", error)
      return false
    }
  }

  static async handleUserRegistration(userEmail: string, userName: string, userId: string): Promise<boolean> {
    try {
      // Send welcome email
      const emailSent = await EmailService.sendWelcomeEmail(userEmail, userName)

      // Identify user in analytics
      AnalyticsService.identifyUser(userId, {
        name: userName,
        email: userEmail,
        signup_date: new Date().toISOString(),
      })

      // Track registration event
      AnalyticsService.trackEvent({
        name: "user_registered",
        userId,
        properties: {
          email: userEmail,
          name: userName,
        },
      })

      return emailSent
    } catch (error) {
      console.error("Failed to handle user registration:", error)
      return false
    }
  }

  private static async sendPushNotification(notification: {
    title: string
    body: string
    data?: Record<string, any>
  }): Promise<boolean> {
    // Implement push notification logic here
    // This could use Firebase Cloud Messaging, OneSignal, etc.
    console.log("Push notification:", notification)
    return true
  }
}
