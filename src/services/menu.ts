const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1"

async function serverFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  return res.json()
}

export async function clientFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  return res.json()
}

// ---------- Types ----------

export type MenuTypeLocale = {
  id: number
  locale_id: number
  name: string
  description: string
  sort_order: number
}

export type MenuType = {
  id: number
  code: string
  sort_order: number
  locales: MenuTypeLocale[]
}

export type MenuCategoryLocale = {
  id: number
  locale_id: number
  name: string
  description: string
  sort_order: number
}

export type MenuCategory = {
  id: number
  code: string
  sort_order: number
  locales: MenuCategoryLocale[]
}

export type DishLocale = {
  id: number
  locale_id: number
  name: string
  description: string
  sort_order: number
}

export type DishVariantLocale = {
  locale_id: number
  name: string
  description: string | null
  sort_order: number
}

export type DishVariant = {
  id: number
  code: string
  price: number
  sort_order: number
  locales: DishVariantLocale[]
}

export type Dish = {
  id: number
  code: string
  sort_order: number
  is_featured: boolean
  locales: DishLocale[]
  variants: DishVariant[]
}

type PaginatedResponse<T> = {
  data: T[]
  current_page: number
  total_pages: number
  total_elements: number
  page_size: number
  has_next: boolean
  has_previous: boolean
}

// ---------- API ----------

export async function getPublicMenuTypes(): Promise<MenuType[]> {
  const res = await serverFetch<PaginatedResponse<MenuType>>(
    "/menus/public/menu-types?size=50&sort_by=sortOrder"
  )
  return res.data
}

export async function getPublicCategoriesByMenuType(menuTypeId: number): Promise<MenuCategory[]> {
  const res = await clientFetch<PaginatedResponse<MenuCategory>>(
    `/menus/public/menu-types/${menuTypeId}?size=50&sort_by=sortOrder`
  )
  return res.data
}

export async function getPublicAllDishes(page = 0): Promise<PaginatedResponse<Dish>> {
  return clientFetch<PaginatedResponse<Dish>>(
    `/dishes/public/all?size=4&page=${page}&sort_by=sortOrder`
  )
}

export async function getPublicDishesByCategory(categoryId: number, page = 0): Promise<PaginatedResponse<Dish>> {
  return clientFetch<PaginatedResponse<Dish>>(
    `/menus/public/menu-categories/${categoryId}/dishes?size=4&page=${page}&sort_by=sortOrder`
  )
}
