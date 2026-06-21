const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1"

export type RestaurantLocale = {
  id: number
  locale_id: number
  sort_order: number
  name: string
  short_description: string | null
  address: string | null
}

export type RestaurantBasicInfo = {
  id: number
  estd: number
  lat: number | null
  lon: number | null
  country: {
    id: number
    code: string
    locales: { id: number; locale_id: number; name: string }[]
  }
  city: {
    id: number
    code: string
    locales: { id: number; locale_id: number; name: string }[]
  }
  phone: string | null
  email: string | null
  logo_url: string | null
  locales: RestaurantLocale[]
}

export type OperatingSlot = {
  id: number
  day_of_week: string
  sequence_no: number
  open_time: string
  close_time: string
  label: string | null
  closes_next_day: boolean
  is_closed: boolean
}

export type ClosedDay = {
  id: number
  day_of_week: string
  note: string | null
}

export type OperatingSchedule = {
  operating: Record<string, OperatingSlot[]>
  closing: ClosedDay[]
}

export async function getRestaurantInfo(): Promise<RestaurantBasicInfo | null> {
  try {
    const res = await fetch(`${BASE_URL}/restaurant-basic-info/public`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = await res.json()
    // Handle both wrapped { restaurant_basic_info: {...} } and unwrapped responses
    return json.restaurant_basic_info ?? (json.id != null ? json : null)
  } catch {
    return null
  }
}

export async function getOperatingSchedule(): Promise<OperatingSchedule | null> {
  try {
    const res = await fetch(`${BASE_URL}/restaurant-operating-hours/public/schedule`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
