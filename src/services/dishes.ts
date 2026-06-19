const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1"

export type FeaturedDishLocale = {
  locale_id: number
  name: string
  description: string
}

export type FeaturedDish = {
  id: number
  locales: FeaturedDishLocale[]
  cheapest_variant_id: number
  price: number
  img: string
  img_alt: string
}

type FeaturedDishesResponse = {
  data: FeaturedDish[]
}

export async function getFeaturedDishes(localeId: number = 1): Promise<FeaturedDish[]> {
  const res = await fetch(`${BASE_URL}/dishes/public/featured`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error("Failed to fetch featured dishes")

  const json: FeaturedDishesResponse = await res.json()

  return [...json.data].sort((a, b) => a.cheapest_variant_id - b.cheapest_variant_id)
}
