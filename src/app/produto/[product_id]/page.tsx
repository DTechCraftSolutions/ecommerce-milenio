"use client"


import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { CompanyDetails } from "@/info/company-details"
import Image from "next/image"
import { IoArrowBack, IoBag, IoHome, IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoSearch } from "react-icons/io5"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Cart } from "@/components/cart"


export default function Page({
  params,
  searchParams,
}: {
  params: { product_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { product_id } = params

  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [selectedVariation, setSelectedVariation] = useState("Gola polo M")
  const [amount, setAmount] = useState(1)

  const variations = [
    {
      name: "Gola polo M",
      id: "Gola polo M",
    },
    {
      name: "Gola polo G",
      id: "Gola polo G",
    },
    {
      name: "Gola polo P",
      id: "Gola polo P",
    },
    {
      name: "Gola polo GG",
      id: "Gola polo GG",
    }
  ]
  return (
    <div className="w-full min-h-screen lg:bg-gray-200 pb-8">
      <div className="w-full md:px-10 h-16 md:h-28 px-4 flex bg-primary items-center text-white md:bg-primary justify-between  fixed">
        <div className="w-16 h-16 rounded-full md:hidden flex justify-center items-center bg-primary">
          <Link href={"/"}><Image className="w-10 h-10" src={"/logo-sem-fundo.png"} alt="Logo" width={100} height={100} /></Link>
        </div>
        <Link href={"/"}><Image className="hidden md:block" src={"/logo-horizontal.png"} alt="Logo" width={200} height={200} /></Link>
        <div className="w-[30%] mr-32 hidden justify-between lg:flex">
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
        <Sheet>
          <SheetTrigger>
            <IoBag className="text-2xl " />
          </SheetTrigger>
          <SheetContent>
            <SheetClose className="outline-none ring-transparent ring-0" />
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
      {/* imagem mobile */}
      <div className="h-16"></div>
      <div className="w-full h-[50vh] md:hidden  justify-end flex flex-col items-center bg-zinc-200">
      </div>
      {/* Desktop */}
      <div className="hidden  pt-32 md:block">
        <div className="w-3/4 mx-auto flex justify-start border-b-[0.5px] border-zinc-200 pb-2 mb-5 gap-5 items-center">
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="bg-primary text-white hover:text-white hover:opacity-80 duration-500 p-2 rounded-lg">
                <BreadcrumbLink className="text-white flex gap-2 items-center hover:text-white" href="/"><IoHome className="" /> Página inicial</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>

          <h2 className=" text-start text-3xl font-bold text-primary ">
            Farda curso militar
          </h2>
        </div>
        <div className="md:flex w-[80vw] mx-auto h-[75vh] px-10 hidden bg-white py-6 rounded-t-3xl shadow-md justify-between  ">
          <div className="w-[35%] h-full rounded-lg flex justify-center items-end bg-zinc-200">
            <div className=" justify-between w-14 flex mb-5 items-center">
              
            </div>
          </div>
          <div className="w-[60%]">
            <h3 className="font-semibold text-primary mt-5">
              Variação
            </h3>
            <div className=" flex gap-2 flex-wrap  mt-5">
              {variations.map((variation, index) => (
                <div onClick={() => setSelectedVariation(variation.id)} key={index} className={`h-10 cursor-pointer flex justify-center rounded  items-center  font-medium px-4 py-2 ${variation.id === selectedVariation ? "bg-primary text-white" : "bg-zinc-200"}`}>
                  {variation.name}
                </div>
              ))}
            </div>

            <div className="w-full mt-5">
              <div className="">
                <div className="w-f">
                  <h3 className="font-semibold text-primary my-5">
                    Observação
                  </h3>
                  <textarea className="w-[100%] h-24  rounded-lg border-[0.5px] border-zinc-300 px-4 py-2">
                  </textarea>
                </div>
                <Button className="bg-green-500 mt-5 hover:bg-green-600 gap-2">
                  <IoLogoWhatsapp className="text-2xl" />
                  Compartilhar produto
                </Button>
              </div>
            </div>
            <div className="flex items-end mt-12 justify-between w-3/4">
              <div>
                <h3 className="font-semibold mb-5 text-primary ">Quantidade</h3>
                <div className="flex items-center gap-2 text-2xl">
                  <button onClick={() => setAmount(amount > 1 ? amount - 1 : 1)} className="text-2xl text-white w-10 h-10 flex justify-center items-center bg-primary rounded-lg">-</button>
                  <input type="text" value={amount} onChange={(e) => {
                    if (isNaN(Number(e.target.value))) return
                    setAmount(Number(e.target.value))
                  }} className="w-28 h-10 text-base font-normal rounded-lg border-[0.5px] text-center border-zinc-300" />
                  <button onClick={() => setAmount(amount + 1)} className="text-2xl text-white w-10 h-10 flex justify-center items-center bg-primary rounded-lg">+</button>
                </div>
              </div>
              <div>

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-primary ">Total R$</h3>
                  <h3 className="font-semibold text-2xl text-primary"> 100,00</h3>
                </div>
                <Button className="gap-4 shadow bg-primary mt-5 h-10 px-10">
                  <IoBag className="text-white shadow text-xl" />
                  Adicionar
                </Button>
              </div>
            </div>


          </div>
        </div>
        <div className="w-[80vw] mx-auto bg-white p-6 rounded-b-3xl">
          <h3 className="font-semibold text-primary my-5">Descrição</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            tincidunt, dui vel sagittis pellentesque, eros nisl aliquet
            magna, sit amet pellentesque felis purus et tortor. Vivamus
            eget ultrices elit. Nunc tincidunt, dui vel sagittis pellentesque,
            eros nisl aliquet magna, sit amet pellentesque felis purus et
            tortor. Vivamus eget ultrices elit. Nunc tincidunt, dui vel
          </p>
          <h3 className="font-semibold text-primary my-5">Veja também</h3>
          <div className="grid gap-5 grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCard name="Camisetas" price={100} image="" discount={10} priceWithDiscount={90} key={index} />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="w-full h-40 md:hidden pt-8 bg-white md:rounded-none px-4 rounded-t-3xl md:mt-0 -mt-16">
        <h2 className="w-full text-center text-2xl font-bold text-primary ">
          Farda curso militar
        </h2>
        <h3 className="font-semibold md:hidden text-primary mt-5">
          Variação
        </h3>
        <div className="w-full flex gap-2 flex-wrap  mt-5">
          {variations.map((variation, index) => (
            <div key={index} onClick={() => setSelectedVariation(variation.id)} className={` h-14 flex justify-center rounded  items-center text-lg font-medium px-4 ${selectedVariation === variation.id ? "bg-primary text-white" : "bg-zinc-200 text-primary"}`}>
              {variation.name}
            </div>
          ))}

        </div>
        <div className="flex items-end w-full mt-5 justify-between">
          <div>
            <h2 className="font-semibold text-primary">Quantidade</h2>
            <div className="flex mt-5 items-center gap-2">
              <Button className="text-2xl text-white w-10 h-10 flex justify-center items-center bg-primary rounded-lg" onClick={() => setAmount(amount > 1 ? amount - 1 : 1)}>
                -
              </Button>
              <input value={amount} onChange={(e) => {
                if (isNaN(Number(e.target.value))) return
                setAmount(Number(e.target.value))
              }} className="w-10 border-[0.5px] text-center border-zinc-300 h-10" type="text" />
              <Button className="text-2xl text-white w-10 h-10 flex justify-center items-center bg-primary rounded-lg" onClick={() => setAmount(amount + 1)}>
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center
           text-primary font-bold my-5 gap-2">
            <h3 className="text-xl font-medium">
              Total R$
            </h3>
            <p className="text-3xl">
              100,00
            </p>
          </div>
        </div>
        <Button className="bg-green-500 mt-5 hover:bg-green-600 gap-2">
          <IoLogoWhatsapp className="text-2xl" />
          Compartilhar produto
        </Button>
        <h3 className="font-semibold text-primary mt-5">
          Descrição
        </h3>
        <p className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla pariatur quidem harum neque dignissimos minima, temporibus dolorem adipisci libero. Corporis, at doloribus? Odit tempore quibusdam quas, adipisci ipsum tempora.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ut a veritatis. Voluptatem dolor, aliquid a perspiciatis repellendus blanditiis accusamus tenetur, nulla atque quod, maiores vitae provident minima quos explicabo?
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quo itaque maxime a fugit nam aperiam nobis accusantium pariatur alias, aliquid laboriosam tenetur, ducimus amet omnis, in eius magnam. Voluptates.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, autem in corrupti necessitatibus impedit error architecto tempora illo, dolor, rerum ex ipsa aut! Accusantium eligendi provident, numquam voluptatem laborum itaque?
        </p>
        <h3 className="text-primary my-5 font-bold">Veja mais</h3>
        <div className="w-full overflow-x-scroll">
          <div className="w-[350vw] grid grid-cols-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCard name="Camisetas" price={100} image="" discount={10} priceWithDiscount={90} key={index} />
            ))}
          </div>
        </div>
        <div className="h-32">

        </div>
      </div>
      <div className="fixed md:hidden h-20 pb-4 bg-white left-0 z-50 w-full justify-center flex items-center bottom-0">
        <Button className="w-[90%] bg-primary gap-2 h-12 mt-5">
          <IoBag className="text-xl" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  )
}