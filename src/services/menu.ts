const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1"

async function publicFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  return res.json()
}

// ---------- Types ----------

export type PublicMenuLocale = {
  locale_id: number
  name: string
  description: string
}

export type PublicMenuDishLocale = {
  locale_id: number
  name: string
  description: string
}

export type PublicMenuDish = {
  id: number
  locales: PublicMenuDishLocale[]
  cheapest_variant_id: number
  price: number
  img: string
  img_alt: string
}

export type PublicMenuCategoryLocale = {
  locale_id: number
  name: string
  description: string
}

export type PublicMenuCategory = {
  id: number
  locales: PublicMenuCategoryLocale[]
  dishes: PublicMenuDish[]
}

export type PublicMenu = {
  id: number
  locales: PublicMenuLocale[]
  categories: PublicMenuCategory[]
}

// ---------- API ----------

export async function getPublicMenu(): Promise<PublicMenu[]> {
  return publicFetch<PublicMenu[]>("/menus/public")
}
