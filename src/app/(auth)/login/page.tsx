"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { login } from "@/services/auth"
import "@/i18n"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") ?? "/"
  const { t } = useTranslation()

  const [form, setForm] = useState({ user_name: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(form)
      router.push(from)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-stone-900 font-bold text-xl mb-6">
          <UtensilsCrossed className="size-6 text-amber-600" />
          <span>La Bella Cucina</span>
        </Link>
        <h1 className="text-2xl font-bold text-stone-900 mt-4">{t("login.title")}</h1>
        <p className="text-stone-500 text-sm mt-1">{t("login.subtitle")}</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user_name" className="text-sm font-medium text-stone-700">
              {t("login.email")}
            </label>
            <input
              id="user_name"
              name="user_name"
              type="email"
              autoComplete="email"
              required
              placeholder={t("login.emailPlaceholder")}
              value={form.user_name}
              onChange={handleChange}
              className="h-9 rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-stone-700">
              {t("login.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="h-9 rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white border-transparent"
          >
            {loading ? t("login.submitting") : t("login.submit")}
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-stone-500">
        {t("login.noAccount")}{" "}
        <Link href="/register" className="text-amber-600 hover:underline font-medium">
          {t("login.createOne")}
        </Link>
      </p>
    </div>
  )
}
