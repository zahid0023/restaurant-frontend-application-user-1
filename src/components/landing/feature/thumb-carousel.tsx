import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { type MenuData } from "./menu-carousel"

type ThumbCarouselProps = {
  data: MenuData[]
  setApi: (api: CarouselApi) => void
  current: number
  onThumbClick: (index: number) => void
  className?: string
}

export default function ThumbCarousel({ data, setApi, current, onThumbClick, className }: ThumbCarouselProps) {
  return (
    <Carousel
      className={cn("relative w-full", className)}
      setApi={setApi}
      opts={{ loop: true }}
    >
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-25 bg-linear-to-r via-85% to-transparent" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-25 bg-linear-to-l via-85% to-transparent" />
      <CarouselContent className="my-1 flex">
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 cursor-pointer items-center sm:basis-1/3 md:basis-1/4 lg:basis-1/3 xl:basis-1/4"
            onClick={() => onThumbClick(index)}
          >
            <div className="relative flex h-33 items-center justify-center">
              <div className={cn("absolute bottom-0 -z-1", current === index ? "text-primary" : "text-border")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="161" height="92" viewBox="0 0 161 92" fill="none">
                  <path
                    d="M0.682517 80.6118L0.501193 39.6946C0.480127 34.9409 3.80852 30.8294 8.46241 29.8603L148.426 0.713985C154.636 -0.579105 160.465 4.16121 160.465 10.504V80.7397C160.465 86.2674 155.98 90.7465 150.453 90.7397L10.6701 90.5674C5.16936 90.5607 0.706893 86.1125 0.682517 80.6118Z"
                    stroke="currentColor"
                  />
                </svg>
              </div>
              <img src={item.img} alt={item.imgAlt} className="size-25" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
