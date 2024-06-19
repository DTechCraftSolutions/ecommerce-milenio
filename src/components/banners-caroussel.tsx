"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

interface BannerCarousselProps {
    banners: any[]
}

export function BannerCaroussel({ banners }: BannerCarousselProps) {

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className={`${banners.length === 0 ? "hidden" : ""} w-[92%] lg:mt-24 md:max-w-[1300px] mx-auto -z-0   max-w-full`}>
            <CarouselContent className="w-full ">
                {
                    banners.map((banner) => {
                     
                        return (
                            <CarouselItem key={banner.id} style={{ backgroundImage: `url('${banner.imageUrl}')` }} className="w-full bg-center bg-cover md:h-96 h-48"></CarouselItem>
                        )
                    })
                }
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
        </Carousel>

    )
}
