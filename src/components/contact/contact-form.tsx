"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2">
          <Send className="size-5 text-amber-600" />
          Send Us a Message
        </h2>
        <p className="text-stone-500 text-sm mb-8">
          Fill in the form and we'll get back to you within 24 hours.
        </p>

        {sent ? (
          <div className="rounded-2xl bg-green-50 border border-green-100 p-8 text-center">
            <p className="text-2xl font-bold text-green-700 mb-2">Message Sent!</p>
            <p className="text-green-600 text-sm">
              Thank you for reaching out. We'll reply to you shortly.
            </p>
            <Button
              variant="outline"
              className="mt-6 border-green-300 text-green-700 hover:bg-green-100"
              onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-stone-700 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-stone-700 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-stone-700 uppercase tracking-wide">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="How can we help?"
                className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-stone-700 uppercase tracking-wide">Message</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell us more…"
                className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all"
            >
              <Send className="size-4 mr-2" />
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
