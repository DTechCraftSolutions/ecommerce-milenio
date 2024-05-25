'use client'

import { FormInput } from "@/components/form-input";
import { Header } from "@/components/header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { MdDeliveryDining, MdOutlineAttachMoney } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";

export default function Checkout() {
    const router = useRouter()
    return (
        <div className="w-screen min-h-screen pb-20 bg-gray-200">
            <Header animation={false} />
            <div className="pt-16 lg:pt-32 px-4 lg:px-16">
                <div className="flex justify-between items-center py-3 lg:hidden">
                    <BiArrowBack onClick={() => router.back()} className="text-2xl text-primary" />
                    <h2 className="text-xl text-center font-bold text-primary">Checkout</h2>
                    <div className="w-8"></div>
                </div>
                <div className="mt-2 hidden lg:flex justify-start  mb-5  gap-5 items-center">
                    <Breadcrumb className="">
                        <BreadcrumbList>
                            <BreadcrumbItem className="bg-primary text-white hover:text-white hover:opacity-80 duration-500 p-2 rounded-lg">
                                <BreadcrumbLink className="text-white flex gap-2 items-center hover:text-white" href="/"><IoHome className="" /> Página inicial</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h2 className=" text-start text-2xl font-bold text-primary ">
                        Checkout
                    </h2>
                </div>
                <div className="w-full lg:flex lg:gap-10 lg:items-start">
                    <div className="w-full bg-white shadow-md p-6 rounded-2xl">
                        <div className="w-full">
                            <div className="flex justify-center gap-2 items-center text-lg text-primary font-medium py-3 border-b-[0.5px]">
                                <BiUser className="text-lg text-primary" />
                                Dados Pessoais
                            </div>
                            <div className="w-full px-2 py-2 lg:grid lg:grid-cols-1 lg:gap-4">
                                <FormInput width="lg:w-4/5" label="Nome" type="text" name="name" placeholder="Nome" value="" onChange={() => { }} />
                                <FormInput width="lg:w-4/5" label="Email" type="email" name="email" placeholder="Email" value="" onChange={() => { }} />
                                <FormInput width="lg:w-4/5" label="Telefone" type="text" name="telefone" placeholder="Telefone" value="" onChange={() => { }} />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-center gap-2 items-center text-lg text-primary font-medium py-3 border-b-[0.5px]">
                                <MdDeliveryDining className="text-lg text-primary" />
                                Endereço
                            </div>
                            <div className="w-full px-2 py-2 lg:grid lg:grid-cols-2 lg:gap-4">
                                <FormInput label="Endereço" type="text" name="endereco" placeholder="Endereço" value="" onChange={() => { }} />
                                <FormInput label="Cidade" type="text" name="cidade" placeholder="Cidade" value="" onChange={() => { }} />
                                <FormInput label="CEP" type="text" name="cep" placeholder="CEP" value="" onChange={() => { }} />
                                <FormInput label="Complemento" type="text" name="complemento" placeholder="Complemento" value="" onChange={() => { }} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mb-56 md:mb-0 bg-white shadow-md lg:mt-0 mt-4 p-6 rounded-2xl">
                        <div className="flex justify-center gap-2 items-center text-lg text-primary font-medium py-3 border-b-[0.5px]">
                            <RiFilePaperLine className="text-lg text-primary" />
                            Resumo do pedido
                        </div>
                        <div className="w-full lg:flex lg:gap-2 lg:items-end lg:justify-center">
                            <div className="lg:hidden mt-2">
                                <FormInput width="lg:w-2/5" label="Cupom de desconto" type="text" name="cupom" placeholder="Inserir cupom" value="" onChange={() => { }} />
                            </div>
                            <div className="lg:grid hidden">
                                <label className="font-medium text-sm" htmlFor="">
                                    Cupom de desconto
                                </label>
                                <input type="text" placeholder="Inserir cupom" className="w-full mt-1 h-10 lg:h-12 px-4 rounded bg-zinc-100" />
                            </div>
                            <button className="w-full mt-3 h-10 lg:h-12 bg-primary hover:bg-opacity-90 duration-300 text-white px-4 rounded lg:w-auto lg:mt-0">Aplicar</button>
                        </div>
                        <div className="w-full px-2 py-5 lg:px-16">
                            <div className="w-full mx-auto py-5 gap-2 flex flex-col justify-center items-center lg:w-1/2">
                                <p className="text-sm">2x farda curso militar - R$ 100,00</p>
                                <p className="text-sm font-bold">TOTAL: R$ 200,00</p>
                            </div>
                        </div>
                        <div className="justify-center items-center flex w-full">
                            <Button className="w-full h-12 mt-5 bg-primary hover:bg-primary lg:w-40 lg:mx-auto lg:h-12">Pagar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
