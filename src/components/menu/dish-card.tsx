import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { type PublicMenuDish } from "@/services/menu"

const EN_LOCALE_ID = 1

type DishCardProps = {
  dish: PublicMenuDish
}

export default function DishCard({ dish }: DishCardProps) {
  const locale = dish.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? dish.locales[0]

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={dish.img}
          alt={dish.img_alt}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-col gap-1 p-4">
        <h3 className="text-lg font-semibold">{locale?.name}</h3>
        {locale?.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{locale.description}</p>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <span className="text-lg font-bold text-amber-500">
          ${Number(dish.price).toFixed(2)}
        </span>
      </CardFooter>
    </Card>
  )
}
