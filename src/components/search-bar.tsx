"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface IProps {
    categories: any[]
}

export function SearchBar({ categories }: IProps) {
    const [isFixed, setIsFixed] = useState("")

    const fixSearchBar = () => {
        if(window.scrollY > 340) {
            return setIsFixed("fixed py-2 top-10 bg-primary shadow") 
        }
        else {
            return setIsFixed("")
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", fixSearchBar)
        return () => {
            window.removeEventListener("scroll", fixSearchBar)
        }
    })
    const router = useRouter()
    return (
        <div className={`w-full py-2 mt-5 z-50  flex flex-col ${isFixed} lg:hidden duration-500 justify-center items-center`}>
            <div className="w-[80%] flex items-center rounded bg-zinc-100">
                <input
                    type="text"
                    className="w-full h-12  pl-4 rounded outline-none bg-transparent"
                    placeholder="Pesquisar..."
                />
                <IoSearch className="text-xl relative right-4 text-zinc-500" />
            </div>
            <ul  className={`flex md:w-4/5 md:flex-wrap w-full h-12 ${isFixed === "" ? "text-primary" : "text-white"} px-4 items-center primary font-medium gap-4 overflow-auto`}>
                {categories.map((category: any) => (
                    <li onClick={() => router.push(`/categoria/${category.id}`)} key={category.id}>
                        {category.name}
                    </li>
                ))}               
            </ul>
        </div>
    )
}