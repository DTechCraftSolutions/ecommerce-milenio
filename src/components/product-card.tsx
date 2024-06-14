import Link from "next/link";
import { useRouter } from "next/router";
import { IoBag } from "react-icons/io5";

interface IProductCard {
    name: string;
    price: number;
    image?: string;
    priceWithDiscount: number;
    discount?: number;
    id?: string;
}

export function ProductCard({ name, price, image, priceWithDiscount, discount, id }: IProductCard) {

    return (
        <div className="w-44 lg:w-48 2xl:w-56 rounded-2xl">
            <div style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
            }} className="w-full 2xl:h-[350px] border-[0.5px] flex items-end rounded h-[230px] md:h-[250px] bg-cover bg-no-repeat">
                <div className="text-center h-full flex items-end justify-center  bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.7)] bg-cover bg-no-repeat z-30 w-full text-sm text-white">
                    {name}
                </div>
            </div>
            <div className="h-12 flex flex-col justify-center">
                {
                    price !== priceWithDiscount ?
                        <div>
                            <p className="text-xs text-secondary">
                                de R$ {String(price.toFixed(2)).replace(".", ",")}
                            </p>
                            <p className="text-zinc-500">
                                por <span className="text-lg font-bold text-primary">
                                    R$ {String(priceWithDiscount.toFixed(2)).replace(".", ",")}
                                </span>
                            </p>
                        </div>
                        :
                        <p className="text-lg font-bold text-primary">
                            R$ {String(priceWithDiscount.toFixed(2)).replace(".", ",")}
                        </p>
                }
            </div>
            <Link href={`/produto/${id}`} className="w-full rounded h-10 hover:opacity-90 hover:duration-500 bg-primary flex items-center justify-center gap-2 text-white font-medium">
                <IoBag className="text-white text-xl" />
                Adicionar
            </Link>
        </div>
    );
}
