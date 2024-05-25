"use client"

import { BiArrowToRight } from "react-icons/bi"
import { ProductCard } from "./product-card"
import Link from "next/link";

interface ICategoryArea {
    category: string
    products?: []
}

export function CategoryArea({ category, products }: ICategoryArea) {
    const productList = [
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        }
    ]
    return (
        <div className="w-full h-[390px] md:h-[450px] rounded-2xl ">
            <div className="flex w-full lg:w-4/5 lg:mx-auto  px-4 items-center justify-between">
                <h3 className="text-2xl text-primary font-medium">
                    {category}
                </h3>
                <Link href={`/categoria/${category}`} className="flex items-center mt-5 gap-2 text-sm text-primary font-medium">
                    Ver todos
                    <BiArrowToRight />
                </Link>
            </div>
            <div className="w-full overflow-x-scroll lg:flex lg:justify-center lg:overflow-x-hidden">
                <div className="w-[270vw] md:w-[160vw]  mt-5 flex lg:w-4/5 items-center gap-4 px-4">
                    {
                        productList.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    priceWithDiscount={product.priceWithDiscount}
                                    discount={product.discount}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}