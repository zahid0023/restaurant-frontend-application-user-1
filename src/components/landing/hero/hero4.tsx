import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import MenuCTA from "@/components/common/menu-cta"
import Heading from "@/components/landing/hero/heading"
import Paragraph from "@/components/landing/hero/paragraph"

const Hero4 = () => {
    return (
        <section className='flex min-h-[calc(100dvh-4rem)] overflow-x-hidden'>
            <Card className='w-full flex flex-col justify-between border-none bg-transparent shadow-none'>
                <CardContent className='flex flex-1 flex-col items-center justify-center gap-8 text-center mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <Heading />
                    <Paragraph />
                    <MenuCTA buttonText="Explore Menu" />
                </CardContent>

                <CardFooter className='p-0'>
                    <Image
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-19.png'
                        alt='Dishes'
                        width={1920}
                        height={720}
                        className='min-h-67 w-full object-cover'
                        loading="eager"
                        priority
                    />
                </CardFooter>
            </Card>
        </section>
    )
}

export default Hero4
