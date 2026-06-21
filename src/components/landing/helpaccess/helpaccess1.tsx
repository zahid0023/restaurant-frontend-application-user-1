"use client"

import { Phone, Mail, MapPin, MessageCircle, Accessibility, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ContactCard } from "@/components/ui/contact-card"
import Link from "next/link"
import "@/i18n"

interface Faq {
  q: string
  a: string
}

export type DaySchedule = {
  day: string
  hours: string
}

type HelpAccessProps = {
  phone?: string | null
  email?: string | null
  address?: string | null
  schedule?: DaySchedule[] | null
}

export default function HelpAccess({ phone, email, address, schedule }: HelpAccessProps) {
  const { t } = useTranslation()
  const faqs = t("help.faqs", { returnObjects: true }) as Faq[]

  const displayPhone = phone ?? "No Information Available"
  const displayEmail = email ?? "No Information Available"
  const displayAddress = address ?? "No Information Available"
  const accessibilityEmail = email ?? ""

  const hoursPreview = schedule?.find(s => s.hours !== "Closed")
  const hoursValue = hoursPreview ? `${hoursPreview.day}: ${hoursPreview.hours}` : "No Information Available"

  const hoursPopover = schedule && schedule.length > 0 ? (
    <ul className="text-sm space-y-1.5">
      {schedule.map(({ day, hours }) => (
        <li key={day} className="flex justify-between gap-2">
          <span className="text-stone-600 font-medium w-8 shrink-0">{day}</span>
          <span className={hours === "Closed" ? "text-red-400" : "text-amber-600 font-medium"}>
            {hours}
          </span>
        </li>
      ))}
    </ul>
  ) : undefined

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {t("help.overline")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            {t("help.title")}
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            {t("help.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ */}
          <div>
            <h3 className="text-xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
              <MessageCircle className="size-5 text-amber-600" />
              {t("help.faqTitle")}
            </h3>
            <div className="space-y-5">
              {faqs.map((item, i) => (
                <div key={i} className="border-b border-stone-100 pb-5">
                  <p className="font-medium text-stone-800 mb-1">{item.q}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Accessibility */}
          <div className="flex flex-col gap-8">
            {/* Contact cards */}
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
                <Phone className="size-5 text-amber-600" />
                {t("help.contactTitle")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactCard
                  icon={Phone}
                  label={t("help.phoneLabel")}
                  value={displayPhone}
                  href={`tel:${displayPhone}`}
                />
                <ContactCard
                  icon={Mail}
                  label={t("help.emailLabel")}
                  value={displayEmail}
                  href={`mailto:${displayEmail}`}
                />
                <ContactCard
                  icon={MapPin}
                  label={t("help.addressLabel")}
                  value={displayAddress}
                />
                <ContactCard
                  icon={Clock}
                  label={t("help.hoursLabel")}
                  value={hoursValue}
                  popoverContent={hoursPopover}
                />
              </div>
            </div>

            {/* Accessibility note */}
            <div className="bg-amber-50 rounded-2xl p-6 flex gap-4">
              <Accessibility className="size-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900 mb-1">{t("help.accessibilityTitle")}</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {t("help.accessibilityDesc")}
                </p>
                {accessibilityEmail && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-4 border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    <Link href={`mailto:${accessibilityEmail}`}>{t("help.accessibilityCta")}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
