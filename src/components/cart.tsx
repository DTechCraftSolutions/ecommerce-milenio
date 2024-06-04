'use client'

import { CartContext } from "@/contexts";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Cookies from "js-cookie";

export function Cart() {
    const { cart, setCart } = useContext(CartContext)
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const cookieCart = Cookies.get("cart")
        if (cookieCart) setCart(JSON.parse(cookieCart))
    }, [])
    const handleChangeQuantity = (item_id: string, quantity: number) => {
        const newCart = cart.map((cartItem: any) => {
            if (cartItem.item_id === item_id) {
                return {
                    ...cartItem,
                    quantity
                }
            }
            return cartItem
        })
        setCart(newCart)
        Cookies.set("cart", JSON.stringify(newCart))
    }
    const handleSumOne = (product_id: string) => {
        const newCart = cart.map((cartItem: any) => {
            if (cartItem.product_id === product_id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
            }
            return cartItem
        })
        setCart(newCart)
        Cookies.set("cart", JSON.stringify(newCart))
    }
    const handleDelete = (product_id: string) => {
        const newCart = cart.filter((cartItem: any) => cartItem.product_id !== product_id)
        setCart(newCart)
        Cookies.set("cart", JSON.stringify(newCart))
    }
    const handleSubOne = (product_id: string) => {
        const newCart = cart.map((cartItem: any) => {
            if (cartItem.product_id === product_id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1
                }
            }
            return cartItem
        })
        setCart(newCart)
        Cookies.set("cart", JSON.stringify(newCart))
    }
    const totalValue = cart.reduce((acc: number, cartItem: any) => acc + (cartItem.price * cartItem.quantity), 0).toFixed(2)
    return (
        <div className="flex flex-col justify-between">
            <h2 className="mb-4">
                Sacola
            </h2>
            <div className="flex flex-col gap-2 w-full no-scrollbar overflow-y-scroll h-[65vh]">
                {cart.length === 0 ? "Sua sacola está vazia" : null}
                {
                    cart.map((cartItem: any) => {
                        return (
                            <div  key={cartItem.product_id} className="flex justify-between mt-2 items-center">
                                <div style={{backgroundImage: `url(${cartItem.imageUrl})`}} className="w-12 h-12 rounded-lg bg-cover bg-no-repeat" />
                                <div className="text-xs text-start w-32 ml-2 md:m-0 md:text-sm">
                                    <p>
                                        {cartItem.name}
                                    </p>
                                    <p>
                                        R$ {cartItem.price}
                                    </p>
                                    <p>
                                        {cartItem.variantName}
                                    </p>
                                </div>
                                <div className=" flex flex-col items-end">
                                    <BiTrash onClick={() => handleDelete(cartItem.product_id)} className="bg-red-500  cursor-pointer float-start text-white hover:bg-opacity-90 frounded-lg w-5 h-5 font-light p-1 rounded duration-300" />
                                    <div className="flex gap-1">
                                        <button type="button" onClick={() => {
                                            if (cartItem.quantity > 0) handleSubOne(cartItem.product_id)
                                        }} className="text-primary curson-pointer w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                            -
                                        </button>
                                        <input value={cartItem.quantity} onChange={(e) => handleChangeQuantity(cartItem.product_id, parseInt(e.target.value))} type="text" className="w-10 text-center" />
                                        <button type="button" onClick={() => handleSumOne(cartItem.product_id)} className="text-primary w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <div className="flex w-full flex-col gap-2 bg-white  mt-4 items-end">
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="">Calcular frete</label>
                    <div className="flex w-full gap-2 items-center">
                        <input placeholder="CEP" type="text" className="w-full h-8 pl-4 rounded outline-none bg-transparent border-[0.5px] border-zinc-300" />
                        <button type="button" className="bg-primary px-4 text-white h-8 rounded hover:bg-primary/80 font-medium">Aplicar</button>
                    </div>
                </div>
                <div className="">
                    <p>
                        Valor total: R$ {String(totalValue).replace(".", ",")}.
                    </p>
                </div>
            </div>
            <button onClick={() => router.push('/checkout')} type="button" className="bg-primary w-full h-10 hover:bg-primary/80 text-white font-medium rounded mt-4">Finalizar Compra</button>
        </div>
    );
}