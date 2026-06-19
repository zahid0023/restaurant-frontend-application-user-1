import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export type MenuData = {
  id: number
  name: string
  img: string
  imgAlt: string
  shortDescription: string
  price: string
}

type MenuCarouselProps = {
  data: MenuData[]
  setApi: (api: CarouselApi) => void
  className?: string
}

export default function MenuCarousel({ data, setApi, className }: MenuCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  return (
    <Carousel
      className={className}
      setApi={setApi}
      plugins={[plugin.current]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {data.map(item => (
          <CarouselItem key={item.id} className="flex w-full items-center justify-center">
            <img src={item.img} alt={item.imgAlt} className="size-95 object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
