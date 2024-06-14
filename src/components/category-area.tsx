"use client"

import { BiArrowToRight } from "react-icons/bi"
import { ProductCard } from "./product-card"
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "@/api";

interface ICategoryArea {
    category: any
}

export function CategoryArea({ category }: ICategoryArea) {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [width, setWidth] = useState("")
    const getWithScroll = () => {
        if (products.length === 3) {
            setWidth("w-[160vw] md:w-[100vw]")
        }
        if (products.length === 4) {
            setWidth("w-[200vw] md:w-[120vw]")
        }
        if (products.length === 5) {
            setWidth("w-[240vw] md:w-[140vw]")
        }
        if (products.length >= 6) {
            setWidth("w-[290vw] md:w-[160vw]")
        }
    }

    useEffect(() => {
        getWithScroll()
    }, [products])
    const getProducts = async () => {
        setIsLoading(true)
        const data = await fetchApi({
            method: "post",
            path: `/products/listByCategory/${category.id}`
        })
        if (data) {
            setProducts(data)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        return console.log("error")
    }
    useEffect(() => {
        getProducts()
    }, [])

    const productsSliced = products.length > 6 ? products.slice(0, 6) : products
    return (
        <div className={`w-full ${productsSliced.length === 0 ? "hidden" : ""}  rounded-2xl `}>
            <div className="flex w-full  lg:w-4/5 lg:mx-auto  px-4 items-center justify-between">
                <h3 className="text-2xl text-primary font-medium">
                    {category.name}
                </h3>
                <Link href={`/categoria/${category.id}`} className="flex items-center mt-5 gap-2 text-sm text-primary font-medium">
                    Ver todos
                    <BiArrowToRight />
                </Link>
            </div>
            <div className="w-full overflow-x-scroll lg:flex lg:justify-center lg:overflow-x-hidden">
                <div className={`${width} mt-5 flex 2xl:max-w-[95%]  mx-auto lg:w-4/5 lg:flex-wrap items-center gap-4 lg:px-0 lg:gap-2 px-4`}>
                    {
                        productsSliced.map((product, index) => {
                            const price = product.price / 100
                            const priceWithDiscount = product.valuePromotionInPercent ? (product.price / 100) - (product.price / 100) * (product.valuePromotionInPercent / 100) : (product.price / 100)

                            return (
                                <ProductCard
                                    id={product.id}
                                    key={index}
                                    name={product.name}
                                    price={price}
                                    image={product.imageUrl}
                                    priceWithDiscount={priceWithDiscount}
                                    discount={product.valuePromotionInPercent}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}