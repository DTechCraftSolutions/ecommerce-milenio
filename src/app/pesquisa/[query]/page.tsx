"use client"

import { fetchApi } from "@/api";
import { Header } from "@/components/header";
import { LoadingModal } from "@/components/loader";
import { ProductCard } from "@/components/product-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoHome, IoSearch } from "react-icons/io5";

export default function Page({
    params,
}: {
    params: { query: string }
}) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const getProductByName = async () => {
        const reponse = await fetchApi({
            path: `/products/getByName/${params.query}`,
            method: "post"
        })
        if (reponse) {
            setProducts(reponse)
            return
        }
        return console.log("error")
    }

    const router = useRouter()
    const getCategories = async () => {
        const data = await fetchApi({
            method: "get",
            path: "/categories/list",
        })
        if (data) {
            setCategories(data)
            return
        }
        return console.log("error")
    }
    useEffect(() => {
        Promise.all([getProductByName(), getCategories()]).then(() => setLoading(false))
    }, [])
    return (
        loading ? <LoadingModal loading={loading} /> : (
            <div className="w-full  min-h-screen">
                <Header categories={categories} animation={false} />
                <div className="w-full 2xl:max-w-[1300px] mx-auto">
                    <div className="pt-16 lg:pt-32 px-4 lg:px-16">
                        <div className=" hidden mx-auto pt-8 lg:flex justify-start border-b-[0.5px] border-zinc-200 pb-2 mb-5 gap-5 items-center">
                            <Breadcrumb className="">
                                <BreadcrumbList>
                                    <BreadcrumbItem className="bg-primary text-white hover:text-white hover:opacity-80 duration-500 p-2 rounded-lg">
                                        <BreadcrumbLink className="text-white flex gap-2 items-center hover:text-white" href="/"><IoHome className="" /> Página inicial</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </BreadcrumbList>
                            </Breadcrumb>

                            <h2 className=" text-start text-3xl flex items-center gap-2 font-bold text-primary ">
                                <IoSearch />
                                {params.query}
                            </h2>

                        </div>
                        <div className="flex lg:hidden justify-between my-4 gap-2 items-center text-lg text-primary font-medium py-3 border-b-[0.5px]">
                            <BiArrowBack onClick={() => router.push("/")} className="text-2xl text-primary float-left" />
                            <h2 className="mr-6 text-start text-2xl flex items-center gap-2 font-bold text-primary ">
                                <IoSearch />
                                {params.query}
                            </h2>
                            <div>

                            </div>
                        </div>
                        <div className="pb-10">
                            <div className="lg:grid flex gap-4 flex-wrap justify-center items-center  lg:grid-cols-4 w-full py-4">
                                {products.length > 0 ? products.map((product: any, index: number) => {
                                    const price = product.price / 100
                                    const priceWithDiscount = product.valuePromotionInPercent ? (product.price / 100) - (product.price / 100) * (product.valuePromotionInPercent / 100) : (product.price / 100)
                                    return (
                                        <ProductCard key={index} id={product.id} name={product.name} price={price} image={product.imageUrl} discount={product.valuePromotionInPercent} priceWithDiscount={priceWithDiscount} />
                                    )
                                }) : null}
                            </div>
                            {products.length === 0 &&
                                <div className="flex flex-col justify-center items-center h-96">
                                    <h1 className="text-xl font-bold text-secondary">Nenhum resultado encontrado</h1>
                                    <Image src="/empty.png" width={200} quality={100} height={200} alt="imagem de não encontrado" />
                                    <div></div>
                                </div>

                                || null}
                        </div>

                    </div>
                </div>
            </div>
        )
    )
}