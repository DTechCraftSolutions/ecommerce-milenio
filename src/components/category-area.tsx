import { BiArrowToRight } from "react-icons/bi"
import { ProductCard } from "./product-card"

interface ICategoryArea {
    category: string
    products?: []
}

export function CategoryArea({ category, products }: ICategoryArea) {
    const productList = [
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        },
        {
            name: "Camisetas",
            price: 100,
            image: "",
            priceWithDiscount: 90,
            discount: 10
        }
    ]
    return (
        <div className="w-full h-[300px] md:h-[450px]">
            <div className="flex w-full md:w-4/5 md:mx-auto  px-4 items-center justify-between">
                <h3 className="text-2xl text-primary font-medium">
                    {category}
                </h3>
                <button className="flex items-center mt-5 gap-2 text-sm text-primary font-medium">
                    Ver todos
                    <BiArrowToRight />
                </button>
            </div>
            <div className="w-full overflow-x-scroll md:flex md:justify-center md:overflow-x-hidden">
                <div className="w-[200vw] mt-5 flex md:w-4/5 items-center gap-4 px-4">
                    {
                        productList.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    priceWithDiscount={product.priceWithDiscount}
                                    discount={product.discount}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}