"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { UtensilsCrossed, Rss, Globe, Share2 } from "lucide-react"
import "@/i18n"

interface FooterLink { label: string; href: string }
interface FooterHour { day: string; time: string }

export default function Footer() {
  const { t } = useTranslation()
  const links = t("footer.links", { returnObjects: true }) as FooterLink[]
  const hours = t("footer.hours", { returnObjects: true }) as FooterHour[]

  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <UtensilsCrossed className="size-5 text-amber-500" />
              La Bella Cucina
            </Link>
            <p className="text-sm leading-relaxed mb-6">{t("footer.desc")}</p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="RSS Feed" className="hover:text-amber-400 transition-colors">
                <Rss className="size-5" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-amber-400 transition-colors">
                <Globe className="size-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-amber-400 transition-colors">
                <Share2 className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.quickLinksTitle")}</h4>
            <ul className="space-y-3 text-sm">
              {links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.hoursTitle")}</h4>
            <ul className="space-y-3 text-sm">
              {hours.map((h, i) => (
                <li key={i}>
                  <span className="text-stone-300">{h.day}</span>
                  <br />
                  <span className="text-amber-400 font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.visitTitle")}</h4>
            <address className="not-italic text-sm space-y-2">
              <p>{t("footer.address1")}</p>
              <p>{t("footer.address2")}</p>
              <p className="mt-4">
                <a href="tel:+15550123456" className="hover:text-amber-400 transition-colors">
                  {t("footer.phone")}
                </a>
              </p>
              <p>
                <a href="mailto:hello@labellacucina.com" className="hover:text-amber-400 transition-colors">
                  {t("footer.email")}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-amber-400 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
