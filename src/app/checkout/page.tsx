'use client'

import { fetchApi } from "@/api";
import { FormInput } from "@/components/form-input";
import { Header } from "@/components/header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/contexts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { MdDeliveryDining, MdOutlineAttachMoney } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { toast } from "sonner";
import {isBefore} from "date-fns"
import Cookies from "js-cookie";

export default function Checkout() {
    const { cart, setCart } = useContext(CartContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [complement, setComplement] = useState("")
    const [couponCode, setCouponCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([])
    const [discount, setDiscount] = useState(0)

    const totalSum = cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    const router = useRouter()

    const getCoupons = async () => {
        const response = await fetchApi({
            path: "/coupons/get-all",
            method: "get"
        })

        if (response) {
            return setCoupons(response)
        }

        return console.log("error")
    }

    useEffect(() => {
        getCoupons()
        const coupon = Cookies.get("coupon")
        if (coupon) {
            const existCoupon = JSON.parse(coupon)
            setDiscount(existCoupon.discount * totalSum / 100)
        }
    },[])

    const applyCoupon = async () => {
        const existCoupon:any = coupons.find((coupon: any) => coupon.code === couponCode)
        if(existCoupon) {
            const nowDate = new Date()
            const isValid: any = isBefore(nowDate, new Date(existCoupon.expiresIn))
            if (isValid) {
                Cookies.set("coupon", JSON.stringify(existCoupon))
                const response = await fetchApi({
                    path: `/coupons/deleteCoupon/${existCoupon.id}`,
                    method: "delete"
                })
                if (response) {
                    setDiscount(existCoupon.discount * totalSum / 100)
                    setCouponCode("")
                    return toast.success('Cupom aplicado com sucesso')
                }
                return toast.error('erro em aplicar o cupom, tente novamente!')
            } 
            return toast.error('Cupom expirado')
        }
        return toast.error('Cupom inválido')
    }

    const createOrder = async () => {
        let itemsNoStock : any = []
        setLoading(true)
        try {
            if (!name || !email || !phone || !neighborhood || !street || !number || !city || !state || !zipCode) return toast.error('Preencha todos os campos');
            const products = cart.map((item: any) => {
                return {
                    productId: item.product_id,
                    quantity: item.quantity,
                    variantId: item.variant_id || "",
                    observation: item.observation || ""
                }
            });
             await Promise.all(products.map(async(item: any) => {
                const variant = await fetchApi({
                    path: `/variants/${item.variantId}`,
                    method: "get"
                })
                return variant.amount >0 ? null : itemsNoStock.push({name: variant.name, variantId: item.variantId})
            }))
            if(itemsNoStock.length > 0){
                setLoading(false)
                toast.error(`Os seguintes itens não possuem estoque: ${itemsNoStock.map((item: any) => {
                    const productName = cart.find((cartItem: any) => cartItem.variant_id === item.variantId)?.name
                    return productName + ` ${item.name}`
                })}`)
                return
            };
            const orderData = {
                cartItems: products,
                send_product: false,
                paymentStatus: "pendente",
                shippingCost: 0,
                totalAmount: (Number(totalSum) - discount) * 100, // em centavos
                user_address: `${street}, ${number}, ${neighborhood}, ${city}, ${state}, ${zipCode}, ${complement}`,
                user_name: name,
                user_email: email,
                user_telephone: phone
            };

            const response = await fetchApi({
                path: "/orders/register",
                method: "post",
                body: orderData
            });

            if (response && response.id) {
                cart.map(async(item: any) => {
                    const variantData = await fetchApi({
                        path: `/variants/${item.variant_id}`,
                        method: "get"
                    })
                    const productToUpdateStock = {
                        amount: variantData.amount - item.quantity
                    }
                    const updateStock = fetchApi({
                        path: `/variants/update/${item.variant_id}`,
                        method: "put",
                        body: productToUpdateStock
                    })
                    await updateStock
                })
                const checkout = await axios.post('/api/checkout', { orderId: response.id, value: totalSum - discount, items: cart })
                window.location.href = checkout.data.url
                setCart([])
                Cookies.remove("cart")
            } else {
                toast.error('Criação do pedido falhou, tente novamente mais tarde');

            }
        } catch (error) {
            toast.error('Criação do pedido falhou, tente novamente mais tarde');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

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
                                <FormInput width="lg:w-4/5" label="Nome" type="text" name="name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                                <FormInput width="lg:w-4/5" label="Email" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <FormInput width="lg:w-4/5" label="Telefone" type="text" name="telefone" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-center gap-2 items-center text-lg text-primary font-medium py-3 border-b-[0.5px]">
                                <MdDeliveryDining className="text-lg text-primary" />
                                Endereço
                            </div>
                            <div className="w-full px-2 py-2 lg:grid lg:grid-cols-2 lg:gap-4">
                                <FormInput label="Bairro" type="text" name="endereco" placeholder="Bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                                <FormInput label="Rua" type="text" name="endereco" placeholder="Rua" value={street} onChange={(e) => setStreet(e.target.value)} />
                                <FormInput label="Numero" type="text" name="endereco" placeholder="Numero" value={number} onChange={(e) => setNumber(e.target.value)} />
                                <FormInput label="Cidade" type="text" name="cidade" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                                <FormInput label="CEP" type="text" name="cep" placeholder="CEP" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                <FormInput label="UF" type="text" name="complemento" placeholder="UF" value={state} onChange={(e) => setState(e.target.value)} />
                                <FormInput label="Complemento" type="text" name="complemento" placeholder="Complemento" value={complement} onChange={(e) => setComplement(e.target.value)} />
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
                                <FormInput width="lg:w-2/5" label="Cupom de desconto" type="text" name="cupom" placeholder="Inserir cupom" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                            </div>
                            <div className="lg:grid hidden">
                                <label className="font-medium text-sm" htmlFor="">
                                    Cupom de desconto
                                </label>
                                <input type="text" placeholder="Inserir cupom" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="w-full mt-1 h-10 lg:h-12 px-4 rounded bg-zinc-100" />
                            </div>
                            <button onClick={applyCoupon} className="w-full mt-3 h-10 lg:h-12 bg-primary hover:bg-opacity-90 duration-300 text-white px-4 rounded lg:w-auto lg:mt-0">Aplicar</button>
                        </div>
                        <div className="w-full px-2 py-5 lg:px-16">
                            <div className="w-full mx-auto py-5 gap-2 flex flex-col justify-center items-center lg:w-1/2">
                                {cart ? cart.map((item) => {
                                    return (
                                        <p key={item.product_id} className="text-sm">{item.quantity}x {item.name} - R$ {String(item.price.toFixed(2)).replace(".", ",")}</p>
                                    )
                                }) : null}
                                {discount > 0 ? <p className="text-sm">Cupom de desconto aplicado - R$ {String(discount.toFixed(2)).replace(".", ",")}</p> : null}
                                <p className="text-sm font-bold">TOTAL: R$ {String((totalSum - discount).toFixed(2)).replace(".", ",")}</p>
                            </div>
                        </div>
                        <div className="justify-center items-center flex w-full">
                            <Button onClick={createOrder} className="w-full h-12 mt-5 bg-primary hover:bg-primary lg:w-40 lg:mx-auto lg:h-12">
                                {loading ? 
                                <div className="loader border-t-2 border-white rounded-full  w-4 h-4  animate-spin">

                                </div> :
                                "Pagar"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


