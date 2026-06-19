import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MenuCTAProps = {
  buttonText?: string
  buttonHref?: string
  className?: string
}

export default function MenuCTA({
  buttonText = "Browse Full Menu",
  buttonHref = "#menu",
  className,
}: MenuCTAProps) {
  return (
    <Button
      asChild
      className={cn("h-12 border-transparent px-8 text-base font-semibold text-amber-700 hover:bg-stone-100", className)}
    >
      <Link href={buttonHref}>
        {buttonText}
        <ArrowRight className="ml-2 size-4" />
      </Link>
    </Button>
  )
}
