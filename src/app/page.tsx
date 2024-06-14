"use client"

import { fetchApi } from "@/api";
import { BannerCaroussel } from "@/components/banners-caroussel";
import { CategoryArea } from "@/components/category-area";
import { Header } from "@/components/header";
import { HeaderBannerMobile } from "@/components/header-banner-mobile";
import { LoadingModal } from "@/components/loader";
import { SearchBar } from "@/components/search-bar";
import { SocialMediaHeader } from "@/components/social-media-header";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    const data = await fetchApi({
      method: "get",
      path: "/banners/get-all",
    })
    if (data) {
      return setBanners(data)
    }
    return toast.error("Não foi possivel carregar os banners, atualize a página!")
  }
  const getCategories = async () => {
    const data = await fetchApi({
      method: "get",
      path: "/categories/list",
    })
    if (data) {
      setCategories(data)
      return
    }
    return toast.error("Não foi possivel carregar as categorias, atualize a página!")
  }
  useEffect(() => {
    Promise.all([getCategories(), getBanners()]).then(() => setIsLoading(false))
  },[])
  return (
    <main className="w-screen md:overflow-hidden">
      <Header animation categories={categories} />
      <div className="pt-16 max-w-full w-full">
        <HeaderBannerMobile />
        <SocialMediaHeader />
        <SearchBar categories={categories} />
        <BannerCaroussel banners={banners} />
        <div className="flex bg-white py-4shadow flex-col pb-16 md:pb-96 lg:pb-0 gap-16 ">
          {categories.map((category: any) => (
            <CategoryArea key={category.id} category={category} />
          ))}
        </div>

      </div>
      <LoadingModal loading={isLoading} />
    </main>
  );
}
