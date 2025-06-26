export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
}

export interface PageView {
  page: string
  title?: string
  userId?: string
  properties?: Record<string, any>
}

export class AnalyticsService {
  private static readonly GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  private static readonly MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

  // Google Analytics 4
  static trackPageView(pageView: PageView): void {
    if (typeof window === "undefined") return

    // Google Analytics
    if (this.GA_MEASUREMENT_ID && (window as any).gtag) {
      ;(window as any).gtag("config", this.GA_MEASUREMENT_ID, {
        page_title: pageView.title,
        page_location: window.location.href,
        user_id: pageView.userId,
        custom_map: pageView.properties,
      })
    }

    // Mixpanel
    if (this.MIXPANEL_TOKEN && (window as any).mixpanel) {
      ;(window as any).mixpanel.track("Page View", {
        page: pageView.page,
        title: pageView.title,
        url: window.location.href,
        ...pageView.properties,
      })
    }
  }

  static trackEvent(event: AnalyticsEvent): void {
    if (typeof window === "undefined") return

    // Google Analytics
    if (this.GA_MEASUREMENT_ID && (window as any).gtag) {
      ;(window as any).gtag("event", event.name, {
        user_id: event.userId,
        ...event.properties,
      })
    }

    // Mixpanel
    if (this.MIXPANEL_TOKEN && (window as any).mixpanel) {
      ;(window as any).mixpanel.track(event.name, {
        ...event.properties,
        timestamp: new Date().toISOString(),
      })
    }

    // Custom analytics (could be your own service)
    this.sendToCustomAnalytics(event)
  }

  static identifyUser(userId: string, properties?: Record<string, any>): void {
    if (typeof window === "undefined") return

    // Google Analytics
    if (this.GA_MEASUREMENT_ID && (window as any).gtag) {
      ;(window as any).gtag("config", this.GA_MEASUREMENT_ID, {
        user_id: userId,
      })
    }

    // Mixpanel
    if (this.MIXPANEL_TOKEN && (window as any).mixpanel) {
      ;(window as any).mixpanel.identify(userId)
      if (properties) {
        ;(window as any).mixpanel.people.set(properties)
      }
    }
  }

  // Convenience methods for common events
  static trackProjectView(projectId: string, projectTitle: string): void {
    this.trackEvent({
      name: "project_viewed",
      properties: {
        project_id: projectId,
        project_title: projectTitle,
      },
    })
  }

  static trackContactFormSubmission(formData: Record<string, any>): void {
    this.trackEvent({
      name: "contact_form_submitted",
      properties: {
        project_type: formData.projectType,
        budget: formData.budget,
        has_company: !!formData.company,
      },
    })
  }

  static trackDownload(fileName: string, fileType: string): void {
    this.trackEvent({
      name: "file_downloaded",
      properties: {
        file_name: fileName,
        file_type: fileType,
      },
    })
  }

  static trackSocialClick(platform: string, url: string): void {
    this.trackEvent({
      name: "social_link_clicked",
      properties: {
        platform,
        url,
      },
    })
  }

  private static async sendToCustomAnalytics(event: AnalyticsEvent): Promise<void> {
    try {
      // Send to your custom analytics endpoint
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      })
    } catch (error) {
      console.warn("Failed to send custom analytics:", error)
    }
  }
}
