"use client"


import { IoBag, IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoMenu, IoSearch } from "react-icons/io5";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { CompanyDetails } from "@/info/company-details";
import { Cart } from "./cart";

interface IHeader {
    animation: boolean
}

export function Header({ animation }: IHeader) {
    const [isVisible, setIsVisible] = useState("opacity-0");
    function handleScrollToggleVisiblity() {
        if (window.scrollY < 120) {
            return setIsVisible("opacity-0")
        } else {
            return setIsVisible("opacity-100")
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScrollToggleVisiblity)
        return () => {
            window.removeEventListener("scroll", handleScrollToggleVisiblity)
        }
    })
    return (
        <header className="bg-primary fixed z-50 justify-between px-4 pt-2 lg:px-16 text-white w-full h-16 lg:h-32 ">
            <div className="w-full flex justify-between lg:py-4 items-center">
                <Sheet >
                    <SheetTrigger className="lg:hidden">
                        <IoMenu className="text-3xl" />
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetClose className="outline-none ring-transparent ring-0" />
                    </SheetContent>

                </Sheet>
                <Image src={"/logo-horizontal.png"} className="hidden lg:flex" alt="Logo" width={200} height={200} />
                <Image className={`${animation ? isVisible : ""} lg:hidden`} src={"/logo-sem-fundo.png"} alt="Logo" width={50} height={50} />
                <div className="w-[40%] mr-40 hidden  text-black lg:flex items-center rounded bg-zinc-100">
                    <input
                        type="text"
                        className="w-full h-12  pl-4 rounded outline-none bg-transparent"
                        placeholder="Pesquisar..."
                    />
                    <IoSearch className="text-xl relative right-4 text-zinc-500" />
                </div>
                <Sheet >
                    <SheetTrigger>
                        <IoBag className="text-3xl" />
                    </SheetTrigger>
                    <SheetContent side={"right"}>
                        <Cart />
                    </SheetContent>

                </Sheet>

            </div>
            <div className="w-[40%]  hidden justify-between lg:flex mx-auto">
                <NavigationMenu className="w-full">
                    <NavigationMenuList className="flex items-center">
                        <div className="flex items-center">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-primary">Categorias</NavigationMenuTrigger>
                                <NavigationMenuContent className="w-56 flex flex-col px-12 bg-primary py-4 text-white max-h-72">
                                    <NavigationMenuLink>Fardas</NavigationMenuLink>
                                    <NavigationMenuLink>Estojos</NavigationMenuLink>
                                    <NavigationMenuLink>Garrafas</NavigationMenuLink>
                                    <NavigationMenuLink>Bolsas</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <button className="hover:bg-zinc-400 h-10 hover:text-black bg-opacity-20 hover:duration-500 text-sm px-4 rounded ">
                                Promoções
                            </button>
                        </div>

                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex  items-center text-white justify-center gap-4">
                    <a
                        href={CompanyDetails.facebook}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IoLogoFacebook className="text-3xl" />
                    </a>
                    <a
                        href={CompanyDetails.instagram}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IoLogoInstagram className="text-3xl" />
                    </a>
                    <a href={CompanyDetails.whatsapp} target="_blank" rel="noreferrer">
                        <IoLogoWhatsapp className="text-3xl" />
                    </a>
                </div>

            </div>

        </header>
    );
}