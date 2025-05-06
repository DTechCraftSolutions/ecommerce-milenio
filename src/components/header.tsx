"use client"


import { IoBag, IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoMenu, IoSearch } from "react-icons/io5";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartContext } from "@/contexts";

interface IHeader {
    animation: boolean
    categories?: any[]
}

export function Header({ animation, categories }: IHeader) {
    const [isVisible, setIsVisible] = useState("opacity-0");
    const { cart } = useContext(CartContext)
    const [search, setSearch] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    function handleScrollToggleVisiblity() {
        if (window.scrollY < 120) {
            setIsVisible("opacity-0");
            setIsScrolled(false);
        } else {
            setIsVisible("opacity-100");
            setIsScrolled(true);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScrollToggleVisiblity)
        return () => {
            window.removeEventListener("scroll", handleScrollToggleVisiblity)
        }
    })
    const router = useRouter()

    // Determine header background for mobile
    const mobileHeaderBg = !isScrolled ? 'bg-gradient-to-b from-primary to-primary/90' : 'bg-primary shadow-md';
    return (
        <header className={`fixed z-50 left-0 top-0 w-full text-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''} ${mobileHeaderBg} lg:bg-primary lg:mb-10`}>
            <div className="w-full lg:w-[1300px] mx-auto flex flex-col">
                {/* Linha principal: logo, busca, carrinho */}
                <div className="flex justify-between items-center px-4 pt-2 lg:px-16 h-14 lg:h-24">
                    <Sheet>
                        <SheetTrigger className="lg:hidden hover:opacity-80 transition-opacity">
                            <IoMenu className="text-2xl md:text-3xl" />
                        </SheetTrigger>
                        <SheetContent side={"left"} className="bg-white text-black p-0">
                            <div className="h-full flex flex-col">
                                <div className="p-4 border-b">
                                    <Image 
                                        src={"/logo-horizontal.png"} 
                                        alt="Logo" 
                                        width={150} 
                                        height={50} 
                                        className="mx-auto"
                                    />
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Categorias</h3>
                                        <div className="space-y-1">
                                            {categories?.map((category) => (
                                                <Link
                                                    key={category.id}
                                                    href={`/categoria/${category.id}`}
                                                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                >
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 border-t">
                                        <Link
                                            href="/categoria/promocoes"
                                            className="block py-2 px-3 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                                        >
                                            Promoções
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-4 border-t bg-gray-50">
                                    <div className="flex justify-center gap-6">
                                        <a
                                            href={CompanyDetails.facebook}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <IoLogoFacebook className="text-2xl" />
                                        </a>
                                        <a
                                            href={CompanyDetails.instagram}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <IoLogoInstagram className="text-2xl" />
                                        </a>
                                        <a 
                                            href={CompanyDetails.whatsapp} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <IoLogoWhatsapp className="text-2xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    {/* Logo only on desktop */}
                    <Link className="hidden lg:grid hover:opacity-90 transition-opacity" href={"/"}>
                        <Image src={"/logo-horizontal.png"} className="hidden cursor-pointer lg:flex" alt="Logo" width={200} height={200} />
                    </Link>
                    <div className="w-[40%] mr-40 hidden text-black lg:flex items-center rounded-full bg-zinc-100 shadow-sm">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="w-full h-12 pl-4 rounded-full outline-none bg-transparent"
                            placeholder="Pesquisar produtos..."
                            onKeyDown={(e) => e.key === "Enter" && search !== "" && router.push(`/pesquisa/${search}`)}
                        />
                        <button 
                            onClick={() => {
                                if (search !== "") {
                                    router.push(`/pesquisa/${search}`)
                                }
                            }} 
                            className="text-xl hover:bg-zinc-200 duration-300 p-3 relative right-4 text-zinc-500 rounded-full"
                        >
                            <IoSearch />
                        </button>
                    </div>
                    <Sheet>
                        <SheetTrigger className="hover:opacity-80 transition-opacity">
                            <div className={`${cart.length > 0 ? "bg-red-500 text-white flex w-5 h-5 rounded-full float-right relative z-50 justify-center items-center text-xs font-medium" : "hidden"}`}>
                                {cart.length}
                            </div>
                            <IoBag className="text-2xl md:text-3xl" />
                        </SheetTrigger>
                        <SheetContent side={"right"} className="bg-white text-black p-0">
                            <div className="h-full flex flex-col">
                                <div className="p-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-800">Seu Carrinho</h2>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <Cart />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                {/* Linha de navegação desktop */}
                <div className="hidden lg:flex justify-between items-center px-16 pb-2 pt-2">
                    <NavigationMenu className="w-auto">
                        <NavigationMenuList className="flex items-center">
                            <div className="flex items-center">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/90 transition-colors">Categorias</NavigationMenuTrigger>
                                    <NavigationMenuContent className="w-56 flex flex-col px-12 bg-white py-4 text-black max-h-72 shadow-lg rounded-lg">
                                        {categories?.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/categoria/${category.id}`}
                                                className="hover:bg-zinc-100 h-10 flex items-center justify-center hover:text-primary transition-colors text-sm px-4 rounded"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <button 
                                    onClick={() => router.push("/categoria/promocoes")} 
                                    className="hover:bg-primary/90 h-10 transition-colors text-sm px-4 rounded"
                                >
                                    Promoções
                                </button>
                            </div>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center text-white justify-center gap-4">
                        <a
                            href={CompanyDetails.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <IoLogoFacebook className="text-xl" />
                        </a>
                        <a
                            href={CompanyDetails.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <IoLogoInstagram className="text-xl" />
                        </a>
                        <a 
                            href={CompanyDetails.whatsapp} 
                            target="_blank" 
                            rel="noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <IoLogoWhatsapp className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}