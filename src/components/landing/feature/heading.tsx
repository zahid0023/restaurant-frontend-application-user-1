import { cn } from "@/lib/utils"

type HeadingProps = {
  className?: string
}

export default function Heading({ className }: HeadingProps) {
  return (
    <h1 className={cn("text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl", className)}>
      Our Featured Dishes
    </h1>
  )
}
