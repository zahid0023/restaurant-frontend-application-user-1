"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import "@/i18n"

export function BackgroundImage({
  src,
  alt = "",
  as: Tag = "div",
  children,
  className,
  overlayClassName,
}: {
  src?: string
  alt?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  overlayClassName?: string
}) {
  return (
    <Tag className={cn("relative", className)}>
      {src && (
        <Image src={src} alt={alt} fill className="object-cover" priority />
      )}
      {src && (
        <div className={cn("absolute inset-0 bg-foreground/50", overlayClassName)} />
      )}
      {children}
    </Tag>
  )
}

export function Overline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm font-semibold tracking-[0.2em] uppercase text-primary", className)}>
      {children}
    </p>
  )
}

export function Title({
  children,
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
}) {
  return (
    <Tag className={cn("font-bold leading-tight text-foreground text-4xl sm:text-5xl lg:text-6xl", className)}>
      {children}
    </Tag>
  )
}

export function ShortDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-lg sm:text-xl leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  )
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <BackgroundImage
      as="section"
      className="min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
    >
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Overline className="mb-4">{t("hero.overline")}</Overline>

        <Title as="h1" className="mb-6 text-white">
          {t("hero.title1")}
          <br />
          <span className="text-amber-400">{t("hero.title2")}</span>
        </Title>

        <ShortDescription className="max-w-2xl mx-auto mb-10 text-stone-300">
          {t("hero.desc")}
        </ShortDescription>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-amber-600 hover:bg-amber-500 text-white border-transparent text-base h-12 px-8"
          >
            <Link href="#menu">{t("hero.cta1")}</Link>
          </Button>
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="size-6" />
      </a>
    </BackgroundImage>
  )
}
