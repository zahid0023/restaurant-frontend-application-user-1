"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  type MenuType,
  type MenuCategory,
  type Dish,
  getPublicCategoriesByMenuType,
  getPublicAllDishes,
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
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingDishes, setLoadingDishes] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  const fetchPage = useCallback(async (categoryId: number, p: number, replace: boolean) => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoadingDishes(true)
    try {
      const res = categoryId === 0
        ? await getPublicAllDishes(p)
        : await getPublicDishesByCategory(categoryId, p)
      setDishes((prev) => replace ? res.data : [...prev, ...res.data])
      setHasMore(res.has_next)
      setPage(p)
    } finally {
      setLoadingDishes(false)
      loadingRef.current = false
    }
  }, [])

  // On menu type change: load categories + first page of all dishes
  useEffect(() => {
    if (!activeMenuTypeId) return
    setLoadingCategories(true)
    setCategories([])
    setActiveCategoryId(0)
    setDishes([])
    setPage(0)
    setHasMore(false)

    getPublicCategoriesByMenuType(activeMenuTypeId)
      .then((cats) => {
        setCategories(cats)
        setLoadingCategories(false)
      })
      .catch(() => setLoadingCategories(false))

    fetchPage(0, 0, true)
  }, [activeMenuTypeId, fetchPage])

  // IntersectionObserver: load next page when sentinel enters viewport
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          fetchPage(activeCategoryId, page + 1, false)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, page, activeCategoryId, fetchPage])

  const handleMenuTypeChange = (menuTypeId: number) => {
    if (menuTypeId === activeMenuTypeId) return
    setActiveMenuTypeId(menuTypeId)
  }

  const handleCategoryChange = (categoryId: number) => {
    if (categoryId === activeCategoryId) return
    setActiveCategoryId(categoryId)
    setDishes([])
    setPage(0)
    setHasMore(false)
    fetchPage(categoryId, 0, true)
  }

  const getLocale = (locales: { locale_id: number; name: string }[]) =>
    locales.find((l) => l.locale_id === EN_LOCALE_ID) ?? locales[0]

  return (
    <div className="flex max-w-dvw flex-col gap-8">

      {/* Level 1: Menu type tabs — hidden when there is only one type */}
      {initialMenuTypes.length > 1 && (
        <div
          role="tablist"
          aria-label="Menu types"
          className="max-w-dvw overflow-x-auto overscroll-x-contain px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      )}

      {/* Level 2: Category tabs */}
      {loadingCategories ? (
        <div className="px-6 text-sm text-muted-foreground">Loading categories…</div>
      ) : categories.length > 0 && (
        <div
          role="tablist"
          aria-label="Menu categories"
          className="max-w-dvw overflow-x-auto overscroll-x-contain px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={pillBar}>
            <button
              role="tab"
              aria-selected={activeCategoryId === 0}
              onClick={() => handleCategoryChange(0)}
              className={pillBtn(activeCategoryId === 0)}
            >
              All
            </button>
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
      {dishes.length > 0 ? (
        <div className="grid grid-cols-1 justify-items-center gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : !loadingDishes && !loadingCategories ? (
        <p className="px-6 text-sm text-muted-foreground">No dishes available.</p>
      ) : null}

      {/* Infinite scroll sentinel + loading indicator */}
      <div ref={sentinelRef} className="flex justify-center py-4">
        {loadingDishes && (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
        )}
      </div>

    </div>
  )
}
