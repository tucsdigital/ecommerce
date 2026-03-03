"use client";

import { Product } from '@/types/product';
import React, { useState } from "react";
import { PLACEHOLDER_IMAGE } from '@/lib/constants'

const PhotoSection = ({ data }: { data: Product }) => {
  console.log('Datos del producto:', {
    id: data.id,
    name: data.name,
    images: data.images,
    srcUrl: data.srcUrl
  });
  
  // Lista de miniaturas: srcUrl + images, sin duplicados
  const thumbnails = Array.from(new Set([data.srcUrl, ...(data.images || [])].filter(Boolean)));

  const [selected, setSelected] = useState<string>(data.srcUrl);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
      {/* Galería de miniaturas */}
      <div className="flex flex-nowrap lg:flex-col gap-3 w-full lg:w-[96px] items-center lg:items-start justify-start overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
        {thumbnails.map((photo, index) => (
            <button
              key={index}
              type="button"
            className={`bg-white rounded-[12px] w-20 h-20 sm:w-24 sm:h-24 lg:w-[96px] lg:h-[96px] shrink-0 overflow-hidden border-2 ${selected === photo ? "border-blue-500" : "border"}`}
              onClick={() => setSelected(photo)}
            >
            <img
                src={photo}
                width={152}
                height={167}
                className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
                alt={data.name}
                onError={(e) => {
                  // @ts-ignore
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
            </button>
          ))}
        </div>

      {/* Imagen principal */}
      <div className="flex items-center justify-center bg-white rounded-[16px] w-full max-w-[520px] sm:max-w-[620px] lg:max-w-none mx-auto aspect-square overflow-hidden mb-3 lg:mb-0 border">
        <img
          src={selected}
          width={350}
          height={420}
          className="rounded-md h-full w-full object-contain hover:scale-105 transition-all duration-500"
          alt={data.name}
          onError={(e) => {
            // @ts-ignore
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
    </div>
  );
};

export default PhotoSection;
