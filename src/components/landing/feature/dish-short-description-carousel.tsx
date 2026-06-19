import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { type MenuData } from "./menu-carousel"

type DishShortDescriptionCarouselProps = {
  data: MenuData[]
  setApi: (api: CarouselApi) => void
  className?: string
}

export default function DishShortDescriptionCarousel({ data, setApi, className }: DishShortDescriptionCarouselProps) {
  return (
    <Carousel
      className={cn("flex w-full items-center justify-center", className)}
      setApi={setApi}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {data.map(item => (
          <CarouselItem
            key={item.id}
            className="flex h-full min-h-14 w-full flex-col items-center justify-center gap-2 px-6"
          >
            <span className="text-2xl font-bold text-amber-500">{item.price}</span>
            <p className="text-card-foreground text-center">{item.shortDescription}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
