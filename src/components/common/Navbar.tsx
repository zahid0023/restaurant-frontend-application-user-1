import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'

import Logo from '@/components/common/Logo'
import { MenuIcon } from 'lucide-react'
import { getRestaurantInfo } from '@/services/restaurant'

export type NavigationSection = {
  title: string
  href: string
}

export type NavRestaurantInfo = {
  name: string | null
  logoUrl: string | null
  phone: string | null
  email: string | null
  address: string | null
  todayHours: string | null
  isTodayClosed: boolean
}

const EN_LOCALE_ID = 1

type NavBarProps = {
  navigationData: NavigationSection[]
  className?: string
  restaurantInfo?: NavRestaurantInfo
}

const NavBar = async ({ navigationData, className, restaurantInfo }: NavBarProps) => {
  if (!restaurantInfo) {
    const info = await getRestaurantInfo()
    const locale = info?.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? info?.locales[0]
    restaurantInfo = {
      name: locale?.name ?? null,
      logoUrl: info?.logo_url ?? null,
      phone: info?.phone ?? null,
      email: info?.email ?? null,
      address: locale?.address ?? null,
      todayHours: null,
      isTodayClosed: false,
    }
  }

  return (
    <>
      {/* Main navbar */}
      <header className={cn('bg-background fixed inset-x-0 top-0 z-50 h-16 border-b', className)}>
        <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
          {/* Logo */}
          <a href='/'>
            <Logo
              className='gap-3'
              name={restaurantInfo?.name ?? null}
              logoUrl={restaurantInfo?.logoUrl ?? null}
            />
          </a>

          {/* Navigation */}
          <NavigationMenu className='max-md:hidden'>
            <NavigationMenuList className='flex-wrap justify-start gap-0'>
              {navigationData.map(navItem => (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink
                    href={navItem.href}
                    className='text-muted-foreground hover:text-primary bg-transparent! px-3 py-1.5 text-base! font-medium'
                  >
                    {navItem.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login Button */}
          <Button size='lg' className='max-md:hidden' asChild>
            <a href='#'>Login</a>
          </Button>

          {/* Navigation for small screens */}
          <div className='flex gap-4 md:hidden'>
            <Button size='lg' asChild>
              <a href='#'>Login</a>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon-lg'>
                  <MenuIcon />
                  <span className='sr-only'>Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <a href={item.href}>{item.title}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className='h-16' />
    </>
  )
}

export default NavBar;