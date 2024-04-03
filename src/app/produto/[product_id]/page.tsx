import { Button } from "@/components/ui/button"
import Image from "next/image"
import { IoArrowBack, IoBag } from "react-icons/io5"

export default function Page({
  params,
  searchParams,
}: {
  params: { product_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { product_id } = params

  const variations = [
    "Gola polo M",
    "Gola polo G",
    "Gola polo P",
    "Gola careca GG",
  ]

  return (
    <div className="w-screen min-h-screen">
      <div className="w-full h-16 px-4 flex items-center justify-between text-primary fixed">
        <IoArrowBack className="text-2xl  " />
        <div className="w-16 h-16 rounded-full flex justify-center items-center bg-primary">
          <Image className="w-10 h-10" src={"/logo-sem-fundo.png"} alt="Logo" width={100} height={100} />
        </div>
        <IoBag className="text-2xl " />
      </div>
      <div className="w-full h-[50vh] justify-end flex flex-col items-center bg-zinc-200">
        <div className="mb-20 justify-between w-14 flex items-center">
          <div className="w-4 h-4 rounded-full bg-primary"></div>
          <div className="w-4 h-4 rounded-full bg-white"></div>
          <div className="w-4 h-4 rounded-full bg-white"></div>
        </div>
      </div>
      <div className="w-full h-40  pt-8 bg-white md:rounded-none px-4 rounded-t-3xl md:mt-0 -mt-16">
        <h2 className="w-full text-center text-2xl font-bold text-primary ">
          Farda curso militar
        </h2>
        <h3 className="font-semibold text-primary mt-5">
          Variação
        </h3>
        <div className="w-full flex gap-2 flex-wrap  mt-5">
          {variations.map((variation, index) => (
            <div key={index} className=" h-14 flex justify-center rounded  items-center text-lg font-medium px-4 bg-zinc-200 text-primary">
              {variation}
            </div>
          ))}

        </div>
        <h3 className="font-semibold text-primary mt-5">
          Descrição
        </h3>
        <p className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla pariatur quidem harum neque dignissimos minima, temporibus dolorem adipisci libero. Corporis, at doloribus? Odit tempore quibusdam quas, adipisci ipsum tempora.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ut a veritatis. Voluptatem dolor, aliquid a perspiciatis repellendus blanditiis accusamus tenetur, nulla atque quod, maiores vitae provident minima quos explicabo?
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quo itaque maxime a fugit nam aperiam nobis accusantium pariatur alias, aliquid laboriosam tenetur, ducimus amet omnis, in eius magnam. Voluptates.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, autem in corrupti necessitatibus impedit error architecto tempora illo, dolor, rerum ex ipsa aut! Accusantium eligendi provident, numquam voluptatem laborum itaque?
        </p>

        <div className="h-32">

        </div>
      </div>
      <div className="fixed left-0 z-50 w-full justify-center flex items-center bottom-0">
        <Button className="w-[90%] gap-2 h-12 mt-5">
          <IoBag className="text-xl" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  )
}