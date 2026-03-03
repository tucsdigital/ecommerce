"use client";

import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product";

type Props = {
  title?: string;
  subtitle?: string;
  featuredImage: string;
  products: Product[];
};

const CategoryCarousel = ({ title = "Colección", subtitle = "", featuredImage, products }: Props) => {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: imagen de categoría (visible en md+) */}
        <div className="hidden md:block rounded-2xl overflow-hidden relative h-96">
          <Image src={featuredImage} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
            <h3 className="text-3xl font-bold text-white">{title}</h3>
            {subtitle && <p className="text-white/90 mt-2">{subtitle}</p>}
            <a href="/shop" className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-full font-medium">VER MÁS</a>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold">{title}</h4>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
            {/* Controls will be rendered inside the Carousel (so they have access to context) */}
            <div aria-hidden className="hidden sm:flex items-center gap-2" />
          </div>

          <div className="relative">
            <div
              className="absolute inset-0 rounded-xl bg-cover bg-center sm:hidden"
              style={{ backgroundImage: `url(${featuredImage})` }}
              aria-hidden
            />
            <div className="absolute inset-0 rounded-xl bg-black/10 sm:hidden" aria-hidden />
          <Carousel className="relative z-10">
            {/* Controls need to be inside the Carousel provider */}
            <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
              <CarouselPrevious className="bg-white" />
              <CarouselNext className="bg-white" />
            </div>
            <CarouselContent className="px-1 sm:px-0 gap-4">
              {products.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="pl-0 basis-4/5 xs:basis-2/3 sm:basis-1/2 lg:basis-1/2"
                >
                  <div className="relative flex justify-center">
                    <div className="w-full">
                      <ProductCard data={p} variant="carousel" className="p-0" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;

