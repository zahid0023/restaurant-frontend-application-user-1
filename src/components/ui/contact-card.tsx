"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"

type ContactCardProps = {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  popoverContent?: React.ReactNode
}

export function ContactCard({ icon: Icon, label, value, href, popoverContent }: ContactCardProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={ref} className="border border-stone-100 rounded-2xl p-5 h-40 flex flex-col relative">
      <Icon className="size-5 text-amber-600 mb-2 shrink-0" />
      <p className="font-medium text-stone-800 text-sm mb-1 shrink-0">{label}</p>

      {href ? (
        <a href={href} className="text-stone-500 text-sm hover:text-amber-600 transition-colors truncate">
          {value}
        </a>
      ) : (
        <p className="text-stone-500 text-sm line-clamp-2">{value}</p>
      )}

      {popoverContent && (
        <>
          <button
            onClick={() => setOpen(v => !v)}
            className="text-amber-600 text-xs mt-auto pt-1 text-left hover:underline"
          >
            View full schedule
          </button>

          {open && (
            <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl p-4 z-20">
              {popoverContent}
            </div>
          )}
        </>
      )}
    </div>
  )
}
