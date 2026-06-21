import LogoSvg from '@/assets/svg/logo'

// Util Imports
import { cn } from '@/lib/utils'

type LogoProps = {
    className?: string
    name?: string | null
    logoUrl?: string | null
}

const Logo = ({ className, name, logoUrl }: LogoProps) => {
    return (
        <div className={cn('flex items-center gap-2.5', className)}>
            {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={name ?? 'Logo'} className='size-14 object-contain' />
            ) : (
                <LogoSvg className='size-14' />
            )}
            <span className='text-2xl font-bold'>{name ?? 'Our Restaurant'}</span>
        </div>
    )
}

export default Logo
