"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeaderBannerMobile() {
    const [isVisible, setIsVisible] = useState("");
    function handleScrollToggleVisiblity() {
        if (window.scrollY < 120) {
            return setIsVisible("opacity-100")
        } else {
            return setIsVisible("opacity-0")
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScrollToggleVisiblity)
        return () => {
            window.removeEventListener("scroll", handleScrollToggleVisiblity)
        }
    })
    return (
        <div style={{ backgroundImage: "url('/banner.jpg')" }} className="bg-cover lg:hidden flex justify-center items-center  w-full h-32">
            <div className={`w-24 z-50 h-24 bg-primary relative flex justify-center items-center -bottom-16 border-2 duration-500 border-white rounded-full ${isVisible}`}>
                <Image className="w-16 h-16"
                    src={"/logo-sem-fundo.png"}
                    alt="Logo"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}