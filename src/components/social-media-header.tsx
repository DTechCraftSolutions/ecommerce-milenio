import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { CompanyDetails } from "@/info/company-details";

export function SocialMediaHeader() {
    return (
        <div className="w-full lg:hidden mt-20 ">
            <h2 className="text-3xl w-full text-center font-medium text-secondary">
                {CompanyDetails.name}
            </h2>
            <p className="text-center w-full text-zinc-700">
                {CompanyDetails.comerce_descriptrion}
            </p>
            <div className="flex w-full items-center mt-5 text-primary justify-center gap-4">
                <a
                    href={CompanyDetails.facebook}
                    target="_blank"
                    rel="noreferrer"
                >
                    <IoLogoFacebook className="text-3xl" />
                </a>
                <a
                    href={CompanyDetails.instagram}
                    target="_blank"
                    rel="noreferrer"
                >
                    <IoLogoInstagram className="text-3xl" />
                </a>
                <a href={CompanyDetails.whatsapp} target="_blank" rel="noreferrer">
                    <IoLogoWhatsapp className="text-3xl" />
                </a>
            </div>

        </div>
    );
}
