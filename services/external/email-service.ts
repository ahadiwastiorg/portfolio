export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  company?: string
  projectType: string
  budget: string
  message: string
}

export class EmailService {
  private static readonly API_KEY = process.env.SENDGRID_API_KEY
  private static readonly FROM_EMAIL = process.env.FROM_EMAIL || "noreply@example.com"
  private static readonly TO_EMAIL = process.env.TO_EMAIL || "ahadiwasti@gmail.com"

  static async sendContactForm(data: ContactFormData): Promise<boolean> {
    if (!this.API_KEY) {
      console.warn("SendGrid API key not configured, logging email instead")
      console.log("Contact form submission:", data)
      return true
    }

    try {
      const emailTemplate = this.createContactFormTemplate(data)
      return await this.sendEmail(emailTemplate)
    } catch (error) {
      console.error("Failed to send contact form email:", error)
      return false
    }
  }

  static async sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
    if (!this.API_KEY) {
      console.warn("SendGrid API key not configured")
      return true
    }

    try {
      const emailTemplate: EmailTemplate = {
        to: userEmail,
        subject: "Welcome to Syed Abdul Hadi's Portfolio",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Welcome, ${userName}!</h1>
            <p>Thank you for signing up to my portfolio website.</p>
            <p>You now have access to exclusive content and can interact with my projects.</p>
            <p>Best regards,<br>Syed Abdul Hadi</p>
          </div>
        `,
        text: `Welcome, ${userName}! Thank you for signing up to my portfolio website.`,
      }

      return await this.sendEmail(emailTemplate)
    } catch (error) {
      console.error("Failed to send welcome email:", error)
      return false
    }
  }

  private static createContactFormTemplate(data: ContactFormData): EmailTemplate {
    return {
      to: this.TO_EMAIL,
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Project Details</h3>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="color: #666; font-size: 12px;">
            This email was sent from the contact form on your portfolio website.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        ${data.company ? `Company: ${data.company}` : ""}
        Project Type: ${data.projectType}
        Budget: ${data.budget}
        
        Message:
        ${data.message}
      `,
    }
  }

  private static async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: template.to }],
              subject: template.subject,
            },
          ],
          from: { email: this.FROM_EMAIL },
          content: [
            {
              type: "text/html",
              value: template.html,
            },
            ...(template.text
              ? [
                  {
                    type: "text/plain",
                    value: template.text,
                  },
                ]
              : []),
          ],
        }),
      })

      return response.ok
    } catch (error) {
      console.error("SendGrid API error:", error)
      return false
    }
  }
}
