"use client";

import { useEffect, useState } from "react";
import ProductSectionSkeleton from "@/components/common/ProductSectionSkeleton";
import DressStyle from "@/components/homepage/DressStyle";
import DressStyleSkeleton from "@/components/homepage/DressStyleSkeleton";
import Destacados from "@/components/homepage/Destacados";
import DestacadosSkeleton from "@/components/homepage/Destacados/DestacadosSkeleton";
import Cotizador from "@/components/homepage/CotizadorNew";
import QuienesSomos from "@/components/homepage/QuienesSomos";
import QuienesSomosSkeleton from "@/components/homepage/QuienesSomos/QuienesSomosSkeleton";
// Obras y Ubicacion ocultas en la versión actual
// import Obras from "@/components/homepage/Obras";
// import ObrasSkeleton from "@/components/homepage/Obras/ObrasSkeleton";
// import Ubicacion from "@/components/homepage/Ubicacion";
// import UbicacionSkeleton from "@/components/homepage/Ubicacion/UbicacionSkeleton";
import InstagramGrid from "@/components/homepage/InstagramGrid";
import AtencionPersonalizada from "@/components/homepage/AtencionPersonalizada";
import AtencionPersonalizadaSkeleton from "@/components/homepage/AtencionPersonalizada/AtencionPersonalizadaSkeleton";
import Header from "@/components/homepage/Header";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import OfferPopup from "@/components/common/OfferPopup";
import { AnimatePresence } from "framer-motion";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import CategoryCarousel from "@/components/homepage/CategoryCarousel";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Usar la API interna que ya filtra por estadoTienda === 'Activo'
        const res = await fetch('/api/products?all=1', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Error al cargar productos');
        }
        const fetchedProducts = await res.json() as Product[];
        setProducts(fetchedProducts);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derivados: ofertas y nuevos productos (ya filtrados por estadoTienda === 'Activo')
  const ofertasEspeciales = products.filter((p) => p.specialOffer === true);
  const nuevosIngresos = products.filter((p) => p.newArrival === true);

  return (
    <>
      <Header />
      <div className="section-bg-1 section-pad">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {loading ? <DressStyleSkeleton /> : <DressStyle />}
        </div>
      </div>
      
      <div className="section-bg-1 section-pad">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {!loading && ofertasEspeciales.length > 0 && (
            <CategoryCarousel
              title=""
              subtitle=""
              featuredImage={ofertasEspeciales[0]?.srcUrl || "/images/1.png"}
              products={ofertasEspeciales.slice(0, 8)}
            />
          )}
        </div>
      </div>

      <div className="section-bg-1 section-pad">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {!loading && nuevosIngresos.length > 0 && (
            <CategoryCarousel
              title=""
              subtitle=""
              featuredImage={nuevosIngresos[0]?.srcUrl || "/images/3.png"}
              products={nuevosIngresos.slice(0, 8)}
            />
          )}
        </div>
      </div>

      {/* Secciones de categorías eliminadas en favor de Ofertas y Nuevos */}

      {/* COTIZADOR: maqueta no funcional */}
      <div className="section-bg-2 section-pad">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <Cotizador />
        </div>
      </div>

      {/* Resto de secciones en el orden solicitado */}
      {loading ? <QuienesSomosSkeleton /> : (
        <div className="section-bg-1 section-pad">
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <InstagramGrid />
            <QuienesSomos />
          </div>
        </div>
      )}
      {loading ? <AtencionPersonalizadaSkeleton /> : (
        <div className="section-bg-2 section-pad">
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <AtencionPersonalizada />
          </div>
        </div>
      )}
      
      <AnimatePresence>
        <OfferPopup />
      </AnimatePresence>
      <WhatsAppButton />
    </>
  );
}
