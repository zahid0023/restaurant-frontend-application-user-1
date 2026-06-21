import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export type FeaturedDishData = {
  id: number
  name: string
  img: string
  imgAlt: string
  shortDescription: string
  price: string
}

type MenuCarouselProps = {
  data: FeaturedDishData[]
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
            {item.img
              ? <img src={item.img} alt={item.imgAlt} className="size-56 sm:size-72 lg:size-95 object-contain" />
              : (
                <div className="size-56 sm:size-72 lg:size-95 flex flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-20 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                  </svg>
                  <span className="text-sm font-medium text-amber-300 tracking-wide">{item.name}</span>
                </div>
              )
            }
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
