"use client"

import { useApi } from "@/api";
import { BannerCaroussel } from "@/components/banners-caroussel";
import { CategoryArea } from "@/components/category-area";
import { Header } from "@/components/header";
import { HeaderBannerMobile } from "@/components/header-banner-mobile";
import { SearchBar } from "@/components/search-bar";
import { SocialMediaHeader } from "@/components/social-media-header";
import { useEffect, useState } from "react";


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const data = await useApi({
      method: "get",
      path: "/categories/list",
    })
    if (data) {
      console.log(data)
      setCategories(data)
      return
    }
    return console.log("error")
  }
  useEffect(() => {
    Promise.all([getCategories()])
  },[])
  return (
    <main className="w-screen md:overflow-hidden">
      <Header animation categories={categories} />
      <div className="pt-16 max-w-full w-full bg-gray-200">
        <HeaderBannerMobile />
        <SocialMediaHeader />
        <SearchBar categories={categories} />
        <BannerCaroussel />;
        <div className="flex bg-white py-4 rounded-t-3xl shadow flex-col pb-16 md:pb-96 lg:pb-0 gap-16 ">
          {categories.map((category: any) => (
            <CategoryArea key={category.id} category={category} />
          ))}
        </div>

      </div>
    </main>
  );
}
