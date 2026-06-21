import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MenuCTAProps = {
  overline?: string
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

export default function MenuCTA({
  overline,
  title,
  description,
  buttonText = "Browse Full Menu",
  buttonHref = "#menu",
  className,
}: MenuCTAProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      {overline && <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">{overline}</p>}
      {title && <h2 className="text-3xl font-bold text-stone-900">{title}</h2>}
      {description && <p className="max-w-xl text-stone-600">{description}</p>}
      <Button
        asChild
        className="h-12 border-transparent px-8 text-base font-semibold text-amber-700 hover:bg-stone-100"
      >
        <Link href={buttonHref}>
          {buttonText}
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </Button>
    </div>
  )
}
