import { cn } from "@/lib/utils"

type HeadingProps = {
  className?: string
}

export default function Heading({ className }: HeadingProps) {
  return (
    <h1 className={cn("text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl", className)}>
      Sizzling Summer Delights
      <br />
      <span className='relative'>
        Effortless
        <svg
          width='223'
          height='12'
          viewBox='0 0 223 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden'
        >
          <path
            d='M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551'
            stroke='url(#paint0_linear_10365_68643)'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <defs>
            <linearGradient
              id='paint0_linear_10365_68643'
              x1='18.8541'
              y1='3.72033'
              x2='42.6487'
              y2='66.6308'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='var(--primary)' />
              <stop offset='1' stopColor='var(--primary-foreground)' />
            </linearGradient>
          </defs>
        </svg>
      </span>{' '}
      Recipes for Parties!
    </h1>
  )
}
