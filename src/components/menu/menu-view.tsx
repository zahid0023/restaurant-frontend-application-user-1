"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { type PublicMenu } from "@/services/menu"
import { Card, CardContent } from "@/components/ui/card"
import DishCard from "./dish-card"

const EN_LOCALE_ID = 1

type MenuViewProps = {
  menus: PublicMenu[]
}

export default function MenuView({ menus }: MenuViewProps) {
  const [activeMenuId, setActiveMenuId] = useState<number>(menus[0]?.id ?? 0)
  const [activeCategoryId, setActiveCategoryId] = useState<number>(
    menus[0]?.categories[0]?.id ?? 0
  )

  const activeMenu = menus.find(m => m.id === activeMenuId) ?? menus[0]
  const activeCategory = activeMenu?.categories.find(c => c.id === activeCategoryId)
    ?? activeMenu?.categories[0]

  const getLocale = (locales: { locale_id: number; name: string; description?: string }[]) =>
    locales.find(l => l.locale_id === EN_LOCALE_ID) ?? locales[0]

  const handleMenuChange = (menuId: number) => {
    setActiveMenuId(menuId)
    const menu = menus.find(m => m.id === menuId)
    setActiveCategoryId(menu?.categories[0]?.id ?? 0)
  }

  return (
    <section>
      <Card className="border-none bg-transparent shadow-none">
      <CardContent className="flex flex-col gap-8 px-0">
      {/* Level 1: Menu type tabs */}
      <div className="flex gap-2 overflow-x-auto border-b pb-4 scrollbar-none">
        {menus.map(menu => (
          <button
            key={menu.id}
            onClick={() => handleMenuChange(menu.id)}
            className={cn(
              "shrink-0 rounded-full px-6 py-2 text-sm font-semibold transition-all",
              activeMenuId === menu.id
                ? "bg-amber-500 text-white shadow-md"
                : "bg-muted text-muted-foreground hover:bg-amber-100 hover:text-amber-700"
            )}
          >
            {getLocale(menu.locales)?.name}
          </button>
        ))}
      </div>

      {/* Level 2: Category tabs */}
      {activeMenu?.categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {activeMenu.categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={cn(
                "shrink-0 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                activeCategoryId === category.id
                  ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "bg-muted text-muted-foreground hover:bg-stone-200 dark:hover:bg-stone-800"
              )}
            >
              {getLocale(category.locales)?.name}
            </button>
          ))}
        </div>
      )}

      {/* Dishes for active category */}
      {activeCategory && (
        <div className="flex flex-col gap-6">
          {getLocale(activeCategory.locales)?.description && (
            <p className="text-sm text-muted-foreground">
              {getLocale(activeCategory.locales)?.description}
            </p>
          )}

          {activeCategory.dishes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeCategory.dishes.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No dishes available in this category.</p>
          )}
        </div>
      )}
      </CardContent>
      </Card>
    </section>
  )
}
