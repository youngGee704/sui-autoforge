"use client"

import type React from "react"

import { useState } from "react"
import MainLayout from "../../components/layout/main-layout"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <MainLayout>
      <div className="py-12 md:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
          Contact Us
          <div className="w-48 sm:w-64 md:w-96 h-1 bg-[#4e8aff] mt-2"></div>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-300 mb-8">
              Have questions about Sui Autoforge? We're here to help! Fill out the form and our team will get back to
              you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#4e8aff] p-3 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-300">info@suiautoforge.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#4e8aff] p-3 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#4e8aff] p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Location</h3>
                  <p className="text-gray-300">123 Blockchain Street, San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-[#4e8aff] focus:border-[#4e8aff] outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-[#4e8aff] focus:border-[#4e8aff] outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-[#4e8aff] focus:border-[#4e8aff] outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-[#4e8aff] focus:border-[#4e8aff] outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#4e8aff] text-white px-8 py-3 rounded-full hover:bg-[#2683ff] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

