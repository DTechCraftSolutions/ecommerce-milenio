"use client"

import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack, IoArrowDown, IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function Page() {
    const { category } = useParams()
    const router = useRouter()

    return (
        <div className="w-screen">
            <Header animation={false} />
            <div className="w-full fixed top-16 py-4 lg:hidden h-32 bg-primary">
                <div className="w-[80%] flex items-center mx-auto rounded bg-zinc-100">
                    <input
                        type="text"
                        className="w-full h-12  pl-4 rounded outline-none bg-transparent"
                        placeholder="Pesquisar..."
                    />
                    <IoSearch className="text-xl relative right-4 text-zinc-500" />
                </div>
                <ul className={`flex md:w-4/5 md:flex-wrap w-full h-12 text-white px-4 items-center primary font-medium gap-4 overflow-auto`}>
                    <li>
                        Fardas
                    </li>
                    <li>
                        Camisas
                    </li>
                    <li>
                        Camisetas
                    </li>
                    <li>
                        Cadernos
                    </li>
                    <li>
                        Canecas
                    </li>
                    <li>
                        Canetas
                    </li>
                    <li>
                        Livros
                    </li>

                </ul>
            </div>
            <div className="w-4/5 mx-auto flex justify-center items-center pt-52 lg:pt-40">
                <h2 className="text-primary text-2xl font-semibold  ">
                    {category}
                </h2>
                <IoArrowBack onClick={() => router.push("/")} className="text-primary cursor-pointer text-2xl absolute left-10 hover:bg-primary p-1 rounded hover:text-white duration-500" />
            </div>
            <div className="w-[95%] mx-auto flex justify-center mt-5">
                <Select>
                    <SelectTrigger className="w-72 h-12 flex items-center justify-between px-2 text-primary border-[0.5px] border-zinc-300 rounded">
                        <SelectValue placeholder="Filtre..." />
                        <MdOutlineKeyboardArrowDown className="text-primary" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Relevância</SelectItem>
                        <SelectItem value="dark">Preço</SelectItem>
                        <SelectItem value="system">Preço</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className="w-[95%] gap-4 mt-5 mx-auto grid grid-cols-2 lg:grid-cols-6">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard key={index}
                        name="Camiseta Preta"
                        price={100}
                        priceWithDiscount={90}
                        discount={10}
                        image="/camiseta.png"
                    />
                ))}
            </div>
            <Pagination>
                <PaginationContent className="mt-5 text-primary justify-center lg:justify-end lg:flex w-full lg:pr-10 pb-5">
                    <div className="flex gap-1">
                        <PaginationItem>
                            <PaginationPrevious href="?page=2" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="?page=3" />
                        </PaginationItem>
                    </div>
                </PaginationContent>
            </Pagination>


        </div>
    )
}