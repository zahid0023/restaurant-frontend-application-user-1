import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { type FeaturedDishData } from "./menu-carousel"

type NameCarouselProps = {
  data: FeaturedDishData[]
  setApi: (api: CarouselApi) => void
  className?: string
}

export default function NameCarousel({ data, setApi, className }: NameCarouselProps) {
  return (
    <Carousel
      className={cn("w-full", className)}
      setApi={setApi}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {data.map(item => (
          <CarouselItem key={item.id}>
            <h2 className="text-4xl font-bold tracking-tight text-amber-500 lg:text-6xl">{item.name}</h2>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
