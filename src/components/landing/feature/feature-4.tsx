'use client'

import { useCallback, useEffect, useState } from 'react'
import { type CarouselApi } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Heading from './heading'
import Paragraph from './paragraph'
import MenuCarousel, { type FeaturedDishData } from './menu-carousel'
import NameCarousel from './name-carousel'
import ThumbCarousel from './thumb-carousel'
import DishShortDescriptionCarousel from './dish-short-description-carousel'

const Feature4 = ({ menudata }: { menudata: FeaturedDishData[] }) => {
    const [mainApi, setMainApi] = useState<CarouselApi>()
    const [nameApi, setNameApi] = useState<CarouselApi>()
    const [thumbApi, setThumbApi] = useState<CarouselApi>()
    const [commentsApi, setCommentsApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!mainApi) return
        setCurrent(mainApi.selectedScrollSnap())
        mainApi.on('select', () => {
            const index = mainApi.selectedScrollSnap()
            setCurrent(index)
            nameApi?.scrollTo(index)
            thumbApi?.scrollTo(index)
            commentsApi?.scrollTo(index)
        })
    }, [mainApi, nameApi, thumbApi, commentsApi])

    useEffect(() => {
        if (!nameApi) return
        nameApi.on('select', () => {
            const index = nameApi.selectedScrollSnap()
            setCurrent(index)
            mainApi?.scrollTo(index)
            thumbApi?.scrollTo(index)
            commentsApi?.scrollTo(index)
        })
    }, [nameApi, mainApi, thumbApi, commentsApi])

    useEffect(() => {
        if (!thumbApi) return
        thumbApi.on('select', () => {
            const index = thumbApi.selectedScrollSnap()
            setCurrent(index)
            mainApi?.scrollTo(index)
            nameApi?.scrollTo(index)
            commentsApi?.scrollTo(index)
        })
    }, [thumbApi, mainApi, nameApi, commentsApi])

    useEffect(() => {
        if (!commentsApi) return
        commentsApi.on('select', () => {
            const index = commentsApi.selectedScrollSnap()
            setCurrent(index)
            mainApi?.scrollTo(index)
            nameApi?.scrollTo(index)
            thumbApi?.scrollTo(index)
        })
    }, [commentsApi, mainApi, nameApi, thumbApi])

    const handleThumbClick = useCallback(
        (index: number) => { mainApi?.scrollTo(index) },
        [mainApi]
    )

    return (
        <section className='flex min-h-[calc(100dvh)] items-center overflow-x-hidden'>
            <Card className='mx-auto w-full max-w-7xl border-none bg-transparent shadow-none px-4 sm:px-6 lg:px-8'>
                {/* Section 1: h1 + p + NameCarousel  |  Section 2: MenuCarousel */}
                <CardContent className='grid grid-cols-1 gap-6 gap-y-12 md:gap-y-16 lg:grid-cols-5 px-0'>
                    <div className='flex w-full flex-col justify-center gap-5 max-lg:items-center lg:col-span-3 lg:h-95.5'>
                        <Heading className='max-lg:text-center' />
                        <Paragraph className='max-lg:text-center' />
                        <NameCarousel
                            data={menudata}
                            setApi={setNameApi}
                            className='mt-18 max-lg:text-center'
                        />
                    </div>
                    <MenuCarousel
                        data={menudata}
                        setApi={setMainApi}
                        className='w-full lg:col-span-2'
                    />
                </CardContent>

                {/* Section 3: ThumbCarousel  |  Section 4: DishShortDescriptionCarousel */}
                <CardContent className='grid grid-cols-1 gap-24 gap-y-12 md:gap-y-16 lg:grid-cols-5 px-0'>
                    <ThumbCarousel
                        data={menudata}
                        setApi={setThumbApi}
                        current={current}
                        onThumbClick={handleThumbClick}
                        className='max-lg:order-2 lg:col-span-3'
                    />
                    <DishShortDescriptionCarousel
                        data={menudata}
                        setApi={setCommentsApi}
                        className='lg:col-span-2'
                    />
                </CardContent>
            </Card>
        </section>
    )
}

export default Feature4
