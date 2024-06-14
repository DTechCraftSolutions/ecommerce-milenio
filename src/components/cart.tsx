'use client';

import { CartContext } from "@/contexts";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Cookies from "js-cookie";
import { Button } from "./ui/button";

interface CartItem {
    product_id: string;
    item_id: string;
    name: string;
    price: number;
    quantity: number;
    variantName: string;
    imageUrl: string;
}

export function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const cookieCart = Cookies.get("cart");
        if (cookieCart) setCart(JSON.parse(cookieCart));
    }, [setCart]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, []);

    const handleChangeQuantity = (item_id: string, quantity: number) => {
        const newCart = cart.map((cartItem: CartItem) => {
            if (cartItem.item_id === item_id) {
                return { ...cartItem, quantity };
            }
            return cartItem;
        });
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));
    };

    const handleSumOne = (product_id: string) => {
        const newCart = cart.map((cartItem: CartItem) => {
            if (cartItem.product_id === product_id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));
    };

    const handleDelete = (product_id: string) => {
        const newCart = cart.filter((cartItem: CartItem) => cartItem.product_id !== product_id);
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));
    };

    const handleSubOne = (product_id: string) => {
        const newCart = cart.map((cartItem: CartItem) => {
            if (cartItem.product_id === product_id && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));
    };

    const totalValue = cart.reduce((acc: number, cartItem: CartItem) => acc + (cartItem.price * cartItem.quantity), 0).toFixed(2);

    return (
        <div className="flex flex-col justify-between h-full p-4 bg-white rounded-lg max-w-2xl mx-auto">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                Sacola
            </h2>
            <div className="flex flex-col no-scrollbar gap-2 w-full flex-1 overflow-y-scroll ">
                {cart.length === 0 ? <p className="text-gray-500">Sua sacola está vazia</p> : null}
                {
                    cart.map((cartItem: CartItem) => (
                        <div key={cartItem.product_id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm">
                            <div style={{ backgroundImage: `url(${cartItem.imageUrl})` }} className="w-16 h-16 lg:mr-4 hidden lg:grid rounded-lg bg-cover bg-center" />
                            <div className="flex flex-col w-32 ml-2 md:m-0">
                                <p className="text-sm font-semibold text-gray-800">
                                    {cartItem.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    R$ {cartItem.price.toFixed(2).replace(".", ",")}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {cartItem.variantName}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <BiTrash onClick={() => handleDelete(cartItem.product_id)} className="text-red-500 cursor-pointer w-6 h-6 hover:text-red-600 transition duration-300" />
                                <div className="flex mt-2 gap-2 items-center">
                                    <button type="button" onClick={() => handleSubOne(cartItem.product_id)} className="text-gray-500 w-6 h-6 hover:text-gray-700 transition duration-300">
                                        -
                                    </button>
                                    <input ref={inputRef} value={cartItem.quantity} onChange={(e) => handleChangeQuantity(cartItem.item_id, parseInt(e.target.value) || 1)} type="text" className="w-8 text-center border rounded-md" />
                                    <button type="button" onClick={() => handleSumOne(cartItem.product_id)} className="text-gray-500 w-6 h-6 hover:text-gray-700 transition duration-300">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col w-full gap-2 mt-4 items-end">
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="cep" className="text-gray-600">Calcular frete</label>
                    <div className="flex gap-2 items-center">
                        <input id="cep" placeholder="CEP" type="text" className="w-full h-10 pl-4 rounded-md border border-gray-300" />
                        <button type="button" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition duration-300">Aplicar</button>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-gray-700 font-semibold">
                        Valor total: R$ {String(totalValue).replace(".", ",")}.
                    </p>
                </div>
            </div>
            <Button disabled={cart.length === 0} onClick={() => router.push('/checkout')} type="button" className="bg-primary w-full py-2 text-white font-medium rounded-md mt-4 hover:bg-primary/80 transition duration-300">
                Finalizar Compra
            </Button>
        </div>
    );
}
