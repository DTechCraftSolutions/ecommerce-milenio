"use client"

import { fetchApi } from "@/api";
import { BannerCaroussel } from "@/components/banners-caroussel";
import { CategoryArea } from "@/components/category-area";
import Footer from "@/components/footer";
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
    <main className="w-screen md:overflow-hidden bg-gray-50">
      <Header animation categories={categories} />
      {/* Bloco superior elegante mobile */}
      <div className="lg:hidden bg-white pb-6">
        {/* Banner topo vermelho e logo */}
        <div className="relative w-full h-32 bg-[#c43e42] flex flex-col items-center justify-end">
          <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <img src="/logo-sem-fundo.png" alt="Logo" className="w-16 h-16 object-contain" />
          </div>
        </div>
        {/* Nome, slogan, redes sociais */}
        <div className="flex flex-col items-center mt-16 px-4">
          <h1 className="text-2xl font-bold text-primary mb-1 text-center">Colégio 3º Milenio</h1>
          <p className="text-gray-500 text-sm mb-4 text-center">Loja oficial do Colégio 3º Milenio</p>
          <div className="flex gap-6 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-gray-500 text-2xl"><i className="fab fa-facebook" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-gray-500 text-2xl"><i className="fab fa-instagram" /></a>
            <a href="https://wa.me" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-gray-500 text-2xl"><i className="fab fa-whatsapp" /></a>
          </div>
          {/* Barra de pesquisa */}
          <div className="w-full max-w-md">
            <SearchBar categories={categories} />
          </div>
        </div>
        {/* Banner promocional */}
        <div className="px-4 mt-6">
          <div className="rounded-2xl shadow overflow-hidden">
            <BannerCaroussel banners={banners} />
          </div>
        </div>
      </div>
      {/* Fim bloco superior elegante mobile */}
      {/* Topo antigo só no desktop */}
      <div className="hidden lg:block">
        <HeaderBannerMobile />
        <SocialMediaHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar categories={categories} />
          <div className="mt-32">
            <BannerCaroussel banners={banners} />
          </div>
        </div>
      </div>
      {/* Conteúdo principal compartilhado */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mt-12 space-y-16 pb-16 md:pb-24 lg:pb-32">
          {categories.map((category: any) => (
            <CategoryArea key={category.id} category={category} />
          ))}
        </div>
      </div>
      <LoadingModal loading={isLoading} />
      <div className="mt-10 bg-white">
        <Footer />
      </div>
    </main>
  );
}
