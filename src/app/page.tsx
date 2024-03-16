import { BannerCaroussel } from "@/components/banners-caroussel";
import { CategoryArea } from "@/components/category-area";
import { Header } from "@/components/header";
import { HeaderBannerMobile } from "@/components/header-banner-mobile";
import { SearchBar } from "@/components/search-bar";
import { SocialMediaHeader } from "@/components/social-media-header";


export default function Home() {
  return (
    <main className="w-screen md:overflow-hidden">
      <Header />
      <div className="pt-16 max-w-full w-full">
        <HeaderBannerMobile />
        <SocialMediaHeader />
        <SearchBar />
        <BannerCaroussel />;
        <div className="flex flex-col gap-5">
          <CategoryArea category="Camisetas" />
          <CategoryArea category="Camisetas" />
          <CategoryArea category="Camisetas" />
        </div>

      </div>
    </main>
  );
}
