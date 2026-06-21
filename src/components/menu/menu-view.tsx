"use client"

import { useState, useEffect } from "react"
import {
  type MenuType,
  type MenuCategory,
  type Dish,
  getPublicCategoriesByMenuType,
  getPublicDishesByCategory,
} from "@/services/menu"
import DishCard from "./dish-card"

const EN_LOCALE_ID = 1

const pillBar = "inline-flex h-auto w-max flex-nowrap rounded-full border border-border bg-card/80 p-1 backdrop-blur-md"
const pillBtn = (active: boolean) =>
  `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
  }`

type MenuViewProps = {
  initialMenuTypes: MenuType[]
}

export default function MenuView({ initialMenuTypes }: MenuViewProps) {
  const [activeMenuTypeId, setActiveMenuTypeId] = useState<number>(initialMenuTypes[0]?.id ?? 0)
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0)
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingDishes, setLoadingDishes] = useState(false)

  useEffect(() => {
    if (!activeMenuTypeId) return

    setLoadingCategories(true)
    setCategories([])
    setActiveCategoryId(0)
    setDishes([])

    getPublicCategoriesByMenuType(activeMenuTypeId)
      .then(async (cats) => {
        setCategories(cats)
        setLoadingCategories(false)
        if (cats.length > 0) {
          const firstCategoryId = cats[0].id
          setActiveCategoryId(firstCategoryId)
          setLoadingDishes(true)
          const d = await getPublicDishesByCategory(firstCategoryId)
          setDishes(d)
          setLoadingDishes(false)
        }
      })
      .catch(() => setLoadingCategories(false))
  }, [activeMenuTypeId])

  const handleMenuTypeChange = (menuTypeId: number) => {
    if (menuTypeId === activeMenuTypeId) return
    setActiveMenuTypeId(menuTypeId)
  }

  const handleCategoryChange = (categoryId: number) => {
    if (categoryId === activeCategoryId) return
    setActiveCategoryId(categoryId)
    setLoadingDishes(true)
    setDishes([])
    getPublicDishesByCategory(categoryId)
      .then((d) => {
        setDishes(d)
        setLoadingDishes(false)
      })
      .catch(() => setLoadingDishes(false))
  }

  const getLocale = (locales: { locale_id: number; name: string }[]) =>
    locales.find((l) => l.locale_id === EN_LOCALE_ID) ?? locales[0]

  return (
    <div className="flex flex-col gap-8 px-6">

      {/* Level 1: Menu type tabs */}
      <div
        role="tablist"
        aria-label="Menu types"
        className="-mx-6 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className={pillBar}>
          {initialMenuTypes.map((menuType) => (
            <button
              key={menuType.id}
              role="tab"
              aria-selected={menuType.id === activeMenuTypeId}
              onClick={() => handleMenuTypeChange(menuType.id)}
              className={pillBtn(menuType.id === activeMenuTypeId)}
            >
              {getLocale(menuType.locales)?.name}
            </button>
          ))}
        </div>
      </div>

      {/* Level 2: Category tabs */}
      {loadingCategories ? (
        <div className="text-sm text-muted-foreground">Loading categories…</div>
      ) : categories.length > 0 && (
        <div
          role="tablist"
          aria-label="Menu categories"
          className="-mx-6 overflow-x-auto max-w-dvw overscroll-x-contain px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={pillBar}>
            {categories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={category.id === activeCategoryId}
                onClick={() => handleCategoryChange(category.id)}
                className={pillBtn(category.id === activeCategoryId)}
              >
                {getLocale(category.locales)?.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dishes grid */}
      {loadingDishes ? (
        <div className="text-sm text-muted-foreground">Loading dishes…</div>
      ) : dishes.length > 0 ? (
        <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : !loadingCategories && activeCategoryId !== 0 ? (
        <p className="text-sm text-muted-foreground">No dishes available in this category.</p>
      ) : null}

    </div>
  )
}
