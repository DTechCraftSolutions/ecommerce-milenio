"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";


interface CartContextProps {
    cart: any[];
    setCart: (cart: any) => void;
    openCart: boolean;
    setOpenCart: Dispatch<SetStateAction<boolean>>
}

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState(JSON.parse(Cookies.get('cart') || '[]'))
    const [openCart, setOpenCart] = useState(true)
    return (
        <CartContext.Provider value={{ cart, setCart, setOpenCart, openCart }}>
            {children}
        </CartContext.Provider>
    );
};



