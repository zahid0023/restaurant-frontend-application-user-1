"use client"

import { Phone, Mail, MapPin, MessageCircle, Accessibility, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "@/i18n"

interface Faq {
  q: string
  a: string
}

export default function HelpAccess() {
  const { t } = useTranslation()
  const faqs = t("help.faqs", { returnObjects: true }) as Faq[]

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
                <div className="border border-stone-100 rounded-2xl p-5">
                  <Phone className="size-5 text-amber-600 mb-3" />
                  <p className="font-medium text-stone-800 text-sm mb-1">{t("help.phoneLabel")}</p>
                  <p className="text-stone-500 text-sm">{t("help.phoneValue")}</p>
                </div>
                <div className="border border-stone-100 rounded-2xl p-5">
                  <Mail className="size-5 text-amber-600 mb-3" />
                  <p className="font-medium text-stone-800 text-sm mb-1">{t("help.emailLabel")}</p>
                  <p className="text-stone-500 text-sm">{t("help.emailValue")}</p>
                </div>
                <div className="border border-stone-100 rounded-2xl p-5">
                  <MapPin className="size-5 text-amber-600 mb-3" />
                  <p className="font-medium text-stone-800 text-sm mb-1">{t("help.addressLabel")}</p>
                  <p className="text-stone-500 text-sm">{t("help.addressValue")}</p>
                </div>
                <div className="border border-stone-100 rounded-2xl p-5">
                  <Clock className="size-5 text-amber-600 mb-3" />
                  <p className="font-medium text-stone-800 text-sm mb-1">{t("help.hoursLabel")}</p>
                  <p className="text-stone-500 text-sm">{t("help.hoursValue")}</p>
                </div>
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
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4 border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  <Link href="mailto:hello@labellacucina.com">{t("help.accessibilityCta")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
