'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

export function Cart() {
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();
    return (
        <div className="flex flex-col justify-between">
            <h2 className="mb-4">
                Sacola
            </h2>
            <div className="flex flex-col gap-2 w-full overflow-y-scroll h-[65vh]">

                <div className="flex justify-between mt-2 items-center">
                    <div className="w-12 h-12 rounded-lg  bg-zinc-300" />
                    <div className="text-xs ml-2 md:m-0 md:text-sm">
                        <div>
                            Farda curso militar
                        </div>
                        <div>
                            R$ 100,00
                        </div>
                        <div>
                            M
                        </div>
                    </div>
                    <div className=" flex flex-col items-end">
                        <BiTrash className="bg-red-500 float-start text-white hover:bg-opacity-90 frounded-lg w-5 h-5 font-light p-1 rounded duration-300" />
                        <div className="flex gap-1">
                            <button type="button" onClick={() => {
                                if (quantity > 0) setQuantity(quantity - 1)
                            }} className="text-primary curson-pointer w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                -
                            </button>
                            <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="text" className="w-10 text-center" />
                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="text-primary w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 items-center">
                    <div className="w-12 h-12 rounded-lg  bg-zinc-300" />
                    <div className="text-xs ml-2 md:m-0 md:text-sm">
                        <div>
                            Farda curso militar
                        </div>
                        <div>
                            R$ 100,00
                        </div>
                        <div>
                            M
                        </div>
                    </div>
                    <div className=" flex flex-col items-end">
                        <BiTrash className="bg-red-500 float-start text-white hover:bg-opacity-90 frounded-lg w-5 h-5 font-light p-1 rounded duration-300" />
                        <div className="flex gap-1">
                            <button type="button" onClick={() => {
                                if (quantity > 0) setQuantity(quantity - 1)
                            }} className="text-primary curson-pointer w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                -
                            </button>
                            <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="text" className="w-10 text-center" />
                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="text-primary w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 items-center">
                    <div className="w-12 h-12 rounded-lg  bg-zinc-300" />
                    <div className="text-xs ml-2 md:m-0 md:text-sm">
                        <div>
                            Farda curso militar
                        </div>
                        <div>
                            R$ 100,00
                        </div>
                        <div>
                            M
                        </div>
                    </div>
                    <div className=" flex flex-col items-end">
                        <BiTrash className="bg-red-500 float-start text-white hover:bg-opacity-90 frounded-lg w-5 h-5 font-light p-1 rounded duration-300" />
                        <div className="flex gap-1">
                            <button type="button" onClick={() => {
                                if (quantity > 0) setQuantity(quantity - 1)
                            }} className="text-primary curson-pointer w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                -
                            </button>
                            <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="text" className="w-10 text-center" />
                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="text-primary w-8 h-8 hover:text-primary/80 font-light p-1 rounded duration-300">
                                +
                            </button>
                        </div>
                    </div>
                </div>
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
                        Valor total: R$ 300,00
                    </p>
                </div>
            </div>
            <button onClick={() => router.push('/checkout')} type="button" className="bg-primary w-full h-10 hover:bg-primary/80 text-white font-medium rounded mt-4">Finalizar Compra</button>
        </div>
    );
}