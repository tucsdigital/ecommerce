import { cn } from "@/lib/utils";
import { satoshi } from "@/styles/fonts";
import React from "react";
import { SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
import { LayoutSpacing } from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaInstagram />,
    url: "https://www.instagram.com/nativa.revestimientos/?hl=es",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/61556626936642/mentions/",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="px-4">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] px-4 pb-6 bg-[#F0F0F0]">
        <div className="max-w-frame mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className="mb-4">
                <Image src="/images/nativa_logo.png" alt="Nativa Revestimientos" width={180} height={48} priority />
              </Link>
              <p className="text-gray-700 text-sm mb-4 max-w-[320px]">
                Nativa Revestimientos — soluciones en revestimientos y maderas nativas. Asesoramiento, suministro y proyectos a medida.
              </p>
              <div className="flex items-center space-x-3">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold mb-3">Empresa</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/#nosotros">Nosotros</Link></li>
                  <li><Link href="/contact">Contacto</Link></li>
                  <li><Link href="/#cotizador">Cotizador</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3">Productos</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/shop">Todos los productos</Link></li>
                  <li><Link href="/shop?filter=newArrival">Novedades</Link></li>
                  <li><Link href="/shop?filter=specialOffer">Ofertas</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="h-[1px] border-t-black/10 my-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} Nativa Revestimientos. Todos los derechos reservados.</p>
            <p>Desarrollado por <Link href="https://tucsdigital.com/" className="text-gray-800 font-medium">TUCS DIGITAL</Link></p>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
