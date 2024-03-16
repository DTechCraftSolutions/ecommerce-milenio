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

export function BannerCaroussel() {

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-[92%] md:w-[70%] mx-auto -z-50   max-w-full">
            <CarouselContent className="w-full ">
                <CarouselItem style={{ backgroundImage: "url('/banner.jpg')" }} className="w-full bg-cover md:h-96 h-48">...</CarouselItem>
                <CarouselItem style={{ backgroundImage: "url('/banner.jpg')" }} className="w-full bg-cover md:h-96 h-48">...</CarouselItem>
                <CarouselItem style={{ backgroundImage: "url('/banner.jpg')" }} className="w-full bg-cover md:h-96 h-48">...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
        </Carousel>

    )
}
