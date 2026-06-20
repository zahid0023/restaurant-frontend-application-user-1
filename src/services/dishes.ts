const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1"

export type DishLocale = {
  id: number
  locale_id: number
  name: string
  description: string
  sort_order: number
}

export type DishVariantLocale = {
  id: number
  locale_id: number
  description: string
  sort_order: number
}

export type DishVariantImage = {
  id: number
  url: string
}

export type DishVariant = {
  id: number
  is_default: boolean
  price: number
  locales: DishVariantLocale[]
  images: DishVariantImage[]
}

export type PublicDish = {
  id: number
  code: string
  sort_order: number
  is_featured: boolean
  locales: DishLocale[]
  variants: DishVariant[]
}

type PublicDishesResponse = {
  data: PublicDish[]
}

export async function getFeaturedDishes(): Promise<PublicDish[]> {
  const res = await fetch(`${BASE_URL}/dishes/public/all?isFeatured=true`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error("Failed to fetch featured dishes")

  const json: PublicDishesResponse = await res.json()
  return json.data
}
