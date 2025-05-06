import Link from "next/link";
import { useRouter } from "next/router";
import { IoBag, IoHeartOutline, IoHeart } from "react-icons/io5";
import { useState } from "react";

interface IProductCard {
    name: string;
    price: number;
    image?: string;
    priceWithDiscount: number;
    discount?: number;
    id?: string;
}

export function ProductCard({ name, price, image, priceWithDiscount, discount, id }: IProductCard) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="w-44 lg:w-48 2xl:w-56 rounded-2xl bg-white group hover:shadow-xl transition-all duration-300 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                }} 
                className="w-full 2xl:h-[350px] border-[0.5px] flex items-end rounded-t-2xl h-[230px] md:h-[250px] bg-cover bg-no-repeat relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
            >
                {discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        -{discount}%
                    </div>
                )}
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
                >
                    {isFavorite ? (
                        <IoHeart className="text-red-500 text-xl" />
                    ) : (
                        <IoHeartOutline className="text-gray-600 text-xl" />
                    )}
                </button>
                <div className="text-center h-full flex items-end justify-center bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.7)] bg-cover bg-no-repeat z-30 w-full text-sm text-white p-4">
                    <p className="line-clamp-2">{name}</p>
                </div>
            </div>
            <div className="h-16 flex flex-col justify-center px-3">
                {
                    price !== priceWithDiscount ? (
                        <div className="space-y-1">
                            <p className="text-xs text-secondary line-through">
                                de R$ {String(price.toFixed(2)).replace(".", ",")}
                            </p>
                            <p className="text-zinc-500">
                                por <span className="text-lg font-bold text-primary">
                                    R$ {String(priceWithDiscount.toFixed(2)).replace(".", ",")}
                                </span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-lg font-bold text-primary">
                            R$ {String(priceWithDiscount.toFixed(2)).replace(".", ",")}
                        </p>
                    )
                }
            </div>
            <Link 
                href={`/produto/${id}`} 
                className="w-full rounded-b-2xl h-10 hover:bg-primary/90 transition-colors duration-300 bg-primary flex items-center justify-center gap-2 text-white font-medium group-hover:translate-y-[-2px] relative overflow-hidden"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <IoBag className="text-white text-xl group-hover:scale-110 transition-transform" />
                Adicionar
            </Link>
            {isHovered && (
                <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none"></div>
            )}
        </div>
    );
}
