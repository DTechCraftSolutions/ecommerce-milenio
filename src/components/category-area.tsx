"use client"

import { BiArrowToRight } from "react-icons/bi"
import { ProductCard } from "./product-card"
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "@/api";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface ICategoryArea {
    category: any
}

export function CategoryArea({ category }: ICategoryArea) {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [width, setWidth] = useState("")
    
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

    const productsSliced = products.length > 8 ? products.slice(0, 8) : products
    return (
        <div className={`w-full ${productsSliced.length === 0 ? "hidden" : ""} lg:max-w-[1300px] mx-auto pl-4 lg:pl-0 rounded-2xl `}>
            <div className="flex w-full  px-4 items-center justify-between">
                <h3 className="text-2xl my-6 text-primary font-semibold">
                    {category.name}
                </h3>
                <Link href={`/categoria/${category.id}`} className="flex items-center mt-5 gap-2 text-sm text-primary font-medium">
                    Ver todos
                    <BiArrowToRight />
                </Link>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max 2xl:grid 2xl:grid-cols-5 gap-6">
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
            <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}