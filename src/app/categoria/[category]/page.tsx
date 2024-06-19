"use client";

import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack, IoArrowDown, IoHome, IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { fetchApi } from "@/api";
import Link from "next/link";
import { LoadingModal } from "@/components/loader";
import Image from "next/image";
const PRODUCTS_PER_PAGE = 8;

export default function Page() {
    const router = useRouter();
    const { category } = useParams();
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [categoryDetail, setCategoryDetail] = useState<any>();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<any>("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const getCategories = async () => {
        const data = await fetchApi({
            method: "get",
            path: "/categories/list",
        });
        if (data) {
            setCategories(data);
            return;
        }
        return console.log("error");
    };

    const getProductsByCategory = async () => {
        const data = await fetchApi({
            method: "post",
            path: `/products/listByCategory/${category}`,
        });
        if (data) {
            setProducts(data);
            return;
        }
        return console.log("error");
    };

    const getProductsInPromotion = async () => {
        if (category === "promocoes") {

            const data = await fetchApi({
                method: "get",
                path: "products/listPromotion",
            });
            if (data) {
                setProducts(data);
                return;
            }
            return console.log("error");
        }
    };

    const getCategoryById = async () => {
        const data = await fetchApi({
            method: "get",
            path: `/categories/get-category/${category}`,
        });
        if (data) {
            setCategoryDetail(data);
            return;
        }
        return console.log("error");
    };

    useEffect(() => {
        Promise.all([getCategories(), getProductsByCategory(), getCategoryById(), getProductsInPromotion()]).then(() => { setLoading(false) });
    }, []);

    const handleSortChange = (value: string) => {
        setSortOrder(value);
        let sortedProducts = [...products];
        if (value === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
    };

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-screen min-h-screen  pb-10">
            <Header categories={categories} animation={false} />
            <div className="w-full fixed z-50 top-16 py-4 lg:hidden h-32 bg-primary">
                    <div className="w-[80%] flex items-center mx-auto rounded bg-zinc-100">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                            className="w-full h-12  pl-4 rounded outline-none bg-transparent"
                            placeholder="Pesquisar..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && search !== "") {
                                    router.push(`/pesquisa/${search}`);
                                }
                            }}
                        />
                        <IoSearch onClick={() => {
                            if (search !== "") {
                                router.push(`/pesquisa/${search}`);
                            }
                        }} className="text-xl relative right-4 text-zinc-500" />
                    </div>
                    <ul className="flex md:w-4/5 md:flex-wrap w-full h-12 text-white px-4 items-center primary font-medium gap-4 overflow-auto">
                        {categories.map((category) => (
                            <Link key={category.id} href={`/categoria/${category.id}`}>
                                {category.name}
                            </Link>
                        ))}
                    </ul>
                </div>
            <div className="w-full 2xl:max-w-[1300px] mx-auto">
                
                <div className="w-4/5 mx-auto flex justify-center md:hidden items-center pt-52 lg:pt-40">
                    <h2 className="text-primary text-2xl font-semibold">{category === "promocoes" ? "Promocões" : categoryDetail?.name}</h2>
                    <IoArrowBack
                        onClick={() => router.push("/")}
                        className="text-primary cursor-pointer text-2xl absolute left-10 hover:bg-primary p-1 rounded hover:text-white duration-500"
                    />
                </div>
                <div className=" w-full pt-40 mx-auto lg:flex justify-start border-b-[0.5px] hidden border-zinc-200 pb-2 mb-5 gap-5 items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="bg-primary text-white hover:text-white hover:opacity-80 duration-500 p-2 rounded-lg">
                                <BreadcrumbLink className="text-white flex gap-2 items-center hover:text-white" href="/">
                                    <IoHome /> Página inicial
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-start text-3xl font-bold text-primary">
                        {category === "promocoes" ? "Promocões" : categoryDetail?.name}
                    </h2>
                </div>
                <div className="w-full lg:w-[95vw] mx-auto flex md:justify-start justify-center mt-5">
                    <Select onValueChange={handleSortChange}>
                        <SelectTrigger className="w-72 bg-zinc-300 h-12 flex items-center justify-between px-2 text-primary border-[0.5px] border-zinc-300 rounded">
                            <SelectValue placeholder="Filtre..." />
                            <MdOutlineKeyboardArrowDown className="text-primary" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price-asc">Preço Crescente</SelectItem>
                            <SelectItem value="price-desc">Preço Decrescente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className={`w-max lg:w-full  justify-center gap-2 lg:gap-4 mt-5 mx-auto grid ${paginatedProducts.length === 0 ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-5"}`}>
                    {paginatedProducts.length === 0 &&
                        <div className="flex flex-col justify-center items-center h-96">
                            <h1 className="text-xl font-bold text-secondary">Nenhum resultado encontrado</h1>
                            <Image src="/empty.png" width={200} quality={100} height={200} alt="imagem de não encontrado" />
                            <div></div>
                        </div>

                        || null}
                    {paginatedProducts.map((product, index) => {
                        const { name, price, valuePromotionInPercent, imageUrl } = product;
                        const priceInRealBrl = price / 100;
                        const discountedValue = valuePromotionInPercent
                            ? (priceInRealBrl * (100 - valuePromotionInPercent)) / 100
                            : priceInRealBrl;
                        return (
                            <ProductCard
                                id={product.id}
                                key={index}
                                name={name}
                                price={priceInRealBrl}
                                priceWithDiscount={discountedValue}
                                discount={valuePromotionInPercent}
                                image={imageUrl}
                            />
                        );
                    })}
                </div>
                <div className="w-full  bg-white rounded-b-3xl">
                    <Pagination className="">
                        <PaginationContent className="mt-5 text-primary justify-center lg:justify-end lg:flex w-full lg:pr-10 pb-5">
                            <div className="flex gap-1">
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, pageIndex) => (
                                    <PaginationItem key={pageIndex}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(pageIndex + 1)}
                                        >
                                            {pageIndex + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
                                        }
                                    />
                                </PaginationItem>
                            </div>
                        </PaginationContent>
                    </Pagination>
                </div>

            </div>
            <LoadingModal loading={loading} />
        </div>
    );
}
