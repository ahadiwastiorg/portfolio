import { Phone, Mail, MapPin, Linkedin } from "lucide-react"
import Link from "next/link"
import { ContactForm } from "@/components/contact-form"

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Let's discuss your next project or potential collaboration opportunities.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+971 581987465</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">ahadiwasti@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Dubai, United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Linkedin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <Link
                    href="https://www.linkedin.com/in/ahadiwasti/"
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    linkedin.com/in/ahadiwasti
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
