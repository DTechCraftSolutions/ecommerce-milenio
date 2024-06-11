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
import { useContext, useEffect, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Cart } from "@/components/cart"
import { useRouter } from "next/navigation"
import { fetchApi } from "@/api"
import { LoadingModal } from "@/components/loader"
import Cookie from "js-cookie"
import { CartContext } from "@/contexts"
import { toast } from "sonner"

export default function Page({
  params,
  searchParams,
}: {
  params: { product_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { product_id } = params

  const [productDetails, setProductDetails] = useState<any>({})
  const [variants, setVariants] = useState<any>([])
  const [selectedVariant, setSelectedVariant] = useState<any>("")
  const [relationedProducts, setRelationedProducts] = useState<any>([])
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any>([])
  const [observation, setObservation] = useState("")
  const [openCart, setOpenCart] = useState(false)
  const { cart, setCart } = useContext(CartContext)
  const [discount, setDiscount] = useState(0)
  const getProductById = async () => {
    const response = await fetchApi({
      path: `/products/getById/${product_id}`,
      method: "post"
    })
    if (response) {
      if(response.valuePromotionInPercent){
        setDiscount(response.valuePromotionInPercent/100)
      }
      return setProductDetails(response)
    }
    return console.log("error")
  }
  const getVeriantsByProduct = async () => {
    const response = await fetchApi({
      path: `/variants/product/${product_id}`,
      method: "get"
    })
    if (response) {
      setLoading(false)
      return setVariants(response)
    }
    return console.log("error")
  }

  useEffect(() => {
    Promise.all([getProductById(), getVeriantsByProduct(), getCategories()])
      .then(() => setTimeout(() => setLoading(false), 2000))
  }, [])

  const shareProduct = () => {
    const url = `${window.location.origin}/produto/${product_id}`
    window.open((`https://wa.me/?text=${url}`), "_blank")
  }
  const getCategories = async () => {
    const response = await fetchApi({
      path: `/categories/list`,
      method: "get"
    })
    if (response) {
      return setCategories(response)
    }
    return console.log("error")
  }
  const getRelationedProducts = async () => {
    const response = await fetchApi({
      path: `/products/listByCategory/${productDetails?.categoryId}`,
      method: "post"
    })
    if (response) {
      return setRelationedProducts(response)
    }
    return console.log("error")
  }

  const handleAddToCart = async () => {
    const alreadyExistThisProductInCart = cart.find((cartItem) => {
      if (cartItem.product_id === productDetails.id) {
        return cartItem
      }
    })

    if (alreadyExistThisProductInCart) return toast("Produto já existe na sacola", {
      action: {
        label: "Ir a sacola",
        onClick: () => setOpenCart(true)
      }
    })



    const variant = variants.find((variant: any) => variant.id === selectedVariant)

    const actualStock = await fetchApi({
      path: `/variants/${variant.id}`,
      method: "get"
    })

    if ( actualStock.amount <= 0) return toast.error("Variação sem estoque!")

 

    const priceWithDiscount = productDetails.valuePromotionInPercent ? (productDetails.price / 100) - (productDetails.price / 100) * (productDetails.valuePromotionInPercent / 100) : (productDetails.price / 100)
    const newCartItem = {
      name: productDetails?.name,
      price: priceWithDiscount,
      variantName: variant.name,
      product_id: productDetails?.id,
      variant_id: selectedVariant,
      quantity: amount,
      observation: observation !== observation ? observation : undefined,
      imageUrl: productDetails?.imageUrl
    }

    setCart([...cart, newCartItem])
    Cookie.set("cart", JSON.stringify([...cart, newCartItem]))
    toast("Produto adicionado!", {
      description: `${productDetails.name}, ${amount} ${amount === 1 ? "unidade" : "unidades"}`,
      action: {
        label: "Ir a sacola",
        onClick: () => setOpenCart(true),
      },
    })
  }

  useEffect(() => {
    if (productDetails) {
      getRelationedProducts()
    }
  }, [productDetails])

  const router = useRouter()
  return (
    loading ? <div><LoadingModal loading={loading} /></div> : <div className="w-full min-h-screen lg:bg-gray-200 pb-8">
      <div className="w-full md:px-10  h-16 md:h-28 px-4 flex bg-primary z-50 items-center text-white md:bg-primary justify-between  fixed">
        <button onClick={() => router.back()} className="md:hidden">
          <IoArrowBack className="text-2xl" />
        </button>
        <div className="w-16 h-16 rounded-full md:hidden flex justify-center items-center bg-primary">
          <Link href={"/"}><Image className="w-10 h-10" src={"/logo-sem-fundo.png"} alt="Logo" width={100} height={100} /></Link>
        </div>
        <Link className="hidden md:block" href={"/"}><Image className="hidden md:block" src={"/logo-horizontal.png"} alt="Logo" width={200} height={200} /></Link>
        <div className="w-[30%] mr-32 hidden justify-between lg:flex">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex items-center">
              <div className="flex items-center">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary">Categorias</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-56 flex flex-col px-12 bg-primary py-4 text-white max-h-72">
                    {categories?.map((category: any) => (
                      <Link
                        key={category.id}
                        href={`/categoria/${category.id}`}
                        className="hover:bg-zinc-400 h-10 flex items-center justify-center hover:text-black bg-opacity-20 hover:duration-500 text-sm px-4 rounded "
                      >
                        {category.name}
                      </Link>
                    ))}
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
              <IoLogoFacebook className="text-xl" />
            </a>
            <a
              href={CompanyDetails.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <IoLogoInstagram className="text-xl" />
            </a>
            <a href={CompanyDetails.whatsapp} target="_blank" rel="noreferrer">
              <IoLogoWhatsapp className="text-xl" />
            </a>
          </div>

        </div>
        <Sheet open={openCart} onOpenChange={setOpenCart}>
          <SheetTrigger>
            <div className={`${cart.length > 0 ? "bg-red-500 text-white flex w-4 h-4 rounded-full  float-right relative z-50 full justify-center items-center" : "hidden"}`}>
              1
            </div>
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
      <div style={{ backgroundImage: `url(${productDetails?.imageUrl})` }} className="w-full h-[60vh] md:hidden bg-center justify-end flex flex-col items-center bg-cover bg-no-repeat">
        <div className="w-full h-full -z-10 bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.2)]">

        </div>
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
            {productDetails.name}
          </h2>
        </div>
        <div className="md:flex w-[80vw] mx-auto h-[75vh] px-10 hidden bg-white py-6 rounded-t-3xl shadow-md justify-between  ">
          <div style={{ backgroundImage: `url(${productDetails.imageUrl})` }} className="w-[35%] h-full shadow-lg rounded-lg flex justify-center items-end bg-cover bg-center bg-no-repeat">
            <div className=" justify-between w-14 flex mb-5 items-center">

            </div>
          </div>
          <div className="w-[60%]">
            <h3 className="font-semibold text-primary mt-5">
              Variação
            </h3>
            <div className=" flex gap-2 flex-wrap  mt-5">
              {variants.length === 0 ?
                <div>
                  <p className="text-red-500 font-medium text-xl">Esgotado!</p>
                </div>

                :
                variants?.map((variant: any, index: number) => (
                  <button onClick={() => {
                    if (variant.amount > 0) {
                      setSelectedVariant(variant.id)
                    }
                    if (selectedVariant === variant.id) {
                      setSelectedVariant("")
                    }
                  }} key={index} className={`h-10  flex justify-center rounded  items-center ${variant.amount === 0 ? "bg-opacity-60 text-red-500" : "cursor-pointer"}  font-medium px-4 py-2 ${variant.id === selectedVariant ? "bg-primary text-white" : "bg-zinc-200"}`}>
                    {variant.name}
                    {variant.amount === 0 && <p className="text-red-500 ml-2">Esgotado!</p>}
                  </button>
                ))
              }
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
                <Button onClick={shareProduct} className="bg-green-500 mt-5 hover:bg-green-600 gap-2">
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

                {
                  loading ? "" :
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-primary ">Total R$</h3>
                      <h3 className="font-semibold text-2xl text-primary">
                        {String(( (productDetails?.price / 100) * amount * (1- (discount))).toFixed(2)).replace(".", ",")}
                      </h3>
                    </div>
                }
                <Button onClick={handleAddToCart} disabled={!selectedVariant} className="gap-4 shadow bg-primary mt-5 -z-30 h-10 px-10">
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
            {productDetails?.description}
          </p>
          <h3 className="font-semibold text-primary my-5">Veja também</h3>
          <div className="grid gap-5 grid-cols-4">
            {relationedProducts?.map((product: any, index: number) => {
              const price = product.price / 100
              const priceWithDiscount = product.valuePromotionInPercent ? (product.price / 100) - (product.price / 100) * (product.valuePromotionInPercent / 100) : (product.price / 100)
              return (
                <ProductCard key={index} id={product.id} name={product.name} price={price} image={productDetails.imageUrl} discount={product.valuePromotionInPercent} priceWithDiscount={priceWithDiscount} />
              )
            })}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="w-full h-40 md:hidden pt-8  bg-white md:rounded-none px-4 rounded-t-3xl md:mt-0 -mt-16">
        <h2 className="w-full text-center text-2xl font-bold text-primary ">
          {productDetails?.name}
        </h2>
        <h3 className="font-semibold md:hidden text-primary mt-5">
          Variação
        </h3>
        <div className="w-full flex gap-2 flex-wrap  mt-5">
          {variants.length === 0 ?
            <div>
              <p className="text-red-500 font-medium text-xl">Esgotado!</p>
            </div>

            :
            variants?.map((variant: any, index: number) => (
              <div onClick={() => {
                if (variant.amount > 0) setSelectedVariant(variant.id)
                if (selectedVariant === variant.id) setSelectedVariant("")
              }} key={index} className={`h-10  flex justify-center rounded  items-center ${variant.amount === 0 ? "bg-opacity-60 text-red-500" : "cursor-pointer"}  font-medium px-4 py-2 ${variant.id === selectedVariant ? "bg-primary text-white" : "bg-zinc-200"}`}>
                {variant.name}
                {variant.amount <= 0 && <p className="text-red-500 ml-2">Esgotado!</p>}
              </div>
            ))
          }
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
          <div className="flex items-end
         text-primary font-bold my-5 gap-2">
            <h3 className="text-xl font-medium">
              Total R$
            </h3>
            <p className="text-3xl">
              {loading ? "" : String(( (productDetails?.price / 100) * amount * (1- (discount))).toFixed(2)).replace(".", ",")}
            </p>
          </div>
        </div>
        <Button onClick={() => {
          shareProduct()
        }} className="bg-green-500 mt-5 hover:bg-green-600 gap-2">
          <IoLogoWhatsapp className="text-2xl" />
          Compartilhar produto
        </Button>
        <h3 className="font-semibold text-primary mt-5">
          Descrição
        </h3>
        <p className="mt-5">
          {
            productDetails?.description
          }
        </p>
        <h3 className="text-primary my-5 font-bold">Veja mais</h3>
        <div className="w-full overflow-x-scroll">
          <div className="flex flex-wrap justify-between gap-5 ">
            {relationedProducts?.map((product: any, index: number) => {
              const price = product.price / 100
              const priceWithDiscount = product.valuePromotionInPercent ? (product.price / 100) - (product.price / 100) * (product.valuePromotionInPercent / 100) : (product.price / 100)
              return (
                <ProductCard key={index} id={product.id} name={product.name} price={price} image={productDetails.imageUrl} discount={product.valuePromotionInPercent} priceWithDiscount={priceWithDiscount} />
              )
            })}
          </div>
        </div>
        <div className="h-32">

        </div>
      </div>
      <div className={`fixed ${loading ? "hidden" : ""} md:hidden h-20 pb-4 bg-white left-0 z-50 w-full justify-center flex items-center bottom-0`}>
        <Button onClick={handleAddToCart} disabled={!selectedVariant} className="w-[90%] bg-primary gap-2 h-12 mt-5">
          <IoBag className="text-xl" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  )
}