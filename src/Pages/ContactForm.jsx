"use client"

import { useState } from "react"
import FormField from "../components/FormField"
import { User, Mail, MessageSquare, Send } from "lucide-react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      alert("Message sent successfully!")
    } catch (error) {
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="contact-name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            error={errors.name}
            icon={User}
            autoComplete="name"
          />

          <FormField
            id="contact-email"
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            error={errors.email}
            icon={Mail}
            autoComplete="email"
          />

          <FormField
            id="contact-subject"
            name="subject"
            label="Subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter message subject"
            required
            error={errors.subject}
            icon={MessageSquare}
          />

          <div className="space-y-2">
            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">
              Message <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
              className={`
                w-full px-3 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200 resize-vertical
                ${errors.message ? "border-red-500 focus:ring-red-500" : ""}
              `}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="text-sm text-red-600" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
