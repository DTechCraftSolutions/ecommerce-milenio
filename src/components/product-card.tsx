import Link from "next/link";
import { useRouter } from "next/router";
import { IoBag } from "react-icons/io5";

interface IProductCard {
    name: string;
    price: number;
    image?: string;
    priceWithDiscount: number;
    discount?: number;
}

export function ProductCard({ name, price, image, priceWithDiscount, discount }: IProductCard) {
    
    return (
        <div className="w-full md:w-56 p-4 bg-white rounded-2xl">
            <div className="w-full flex items-end rounded h-[230px] md:h-[250px] bg-zinc-300">
                <p className="text-center w-full text-sm text-white">
                    {name}
                </p>
            </div>
            <p className="text-xs text-secondary">
                de R$ {String(price.toFixed(2)).replace(".", ",")}
            </p>
            <p className="text-zinc-500">
                por <span className="text-lg font-bold text-primary">
                    R$ {String(priceWithDiscount.toFixed(2)).replace(".", ",")}
                </span>
            </p>
            <Link href={"/produto/123"} className="w-full rounded h-10 hover:opacity-90 hover:duration-500 bg-primary flex items-center justify-center gap-2 text-white font-medium">
                <IoBag className="text-white text-xl" />
                Adicionar
            </Link>
        </div>
    );
}
