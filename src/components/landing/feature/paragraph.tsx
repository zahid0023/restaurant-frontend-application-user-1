import { cn } from "@/lib/utils"

type ParagraphProps = {
  className?: string
}

export default function Paragraph({ className }: ParagraphProps) {
  return (
    <p className={cn("text-muted-foreground max-w-xl text-xl", className)}>
      Handpicked by our chefs — explore the dishes our guests love most, from sizzling appetisers
      to irresistible signature desserts.
    </p>
  )
}
