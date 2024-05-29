import { BannerCaroussel } from "@/components/banners-caroussel";
import { CategoryArea } from "@/components/category-area";
import { Header } from "@/components/header";
import { HeaderBannerMobile } from "@/components/header-banner-mobile";
import { SearchBar } from "@/components/search-bar";
import { SocialMediaHeader } from "@/components/social-media-header";


export default function Home() {
  return (
    <main className="w-screen md:overflow-hidden">
      <Header animation />
      <div className="pt-16 max-w-full w-full bg-gray-200">
        <HeaderBannerMobile />
        <SocialMediaHeader />
        <SearchBar />
        <BannerCaroussel />;
        <div className="flex bg-white py-4 rounded-t-3xl shadow flex-col pb-16 md:pb-96 lg:pb-0 gap-16 ">
          <CategoryArea category="Camisetas" />
          <CategoryArea category="Camisetas" />
          <CategoryArea category="Camisetas" />
        </div>

      </div>
    </main>
  );
}
