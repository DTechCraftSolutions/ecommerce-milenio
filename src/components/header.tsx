"use client"


import { IoBag, IoMenu } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
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
        <header className="bg-primary fixed flex items-center z-50 justify-between px-4 text-white w-full h-16">
            <Sheet >
                <SheetTrigger>
                    <IoMenu className="text-3xl" />
                </SheetTrigger>
                <SheetContent side={"left"}>

                </SheetContent>

            </Sheet>
            <Image className={`${isVisible}`} src={"/logo-sem-fundo.png"} alt="Logo" width={50} height={50} />
            <Sheet >
                <SheetTrigger>
                    <IoBag className="text-3xl" />
                </SheetTrigger>
                <SheetContent side={"right"}>

                </SheetContent>

            </Sheet>
        </header>
    );
}