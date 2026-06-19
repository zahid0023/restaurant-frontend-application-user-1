import { cn } from "@/lib/utils"

type ParagraphProps = {
  className?: string
}

export default function Paragraph({ className }: ParagraphProps) {
  return (
    <p className={cn("text-muted-foreground", className)}>
      Dive into a world of flavor this summer with our collection of Sizzling Summer Delights!
      <br />
      From refreshing appetizers to delightful desserts
    </p>
  )
}
