import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product";
import { satoshi } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import AddToCardSection from "./AddToCardSection";

function formatearTituloProducto(nombre: string): string {
  if (!nombre || typeof nombre !== "string") return "";
  const palabrasMinusculas = new Set([
    "de",
    "del",
    "la",
    "el",
    "los",
    "las",
    "y",
    "e",
    "o",
    "u",
    "para",
    "con",
    "sin",
    "en",
    "por",
    "al",
  ]);
  return nombre
    .toLowerCase()
    .split(/\s+/)
    .map((palabra, indice) => {
      if (palabra === "x") return "X";
      if (/^[0-9]/.test(palabra)) return palabra;
      if (palabrasMinusculas.has(palabra) && indice !== 0) return palabra;
      if (!palabra) return palabra;
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    })
    .join(" ");
}

const Header = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        <div>
          <PhotoSection data={data} />
        </div>
        <div className="pt-0 lg:pt-2">
          <h1
            className={cn([
              satoshi.className,
              "text-2xl sm:text-3xl md:text-4xl leading-[1.2] mb-4",
            ])}
          >
            {formatearTituloProducto(data.name)}
          </h1>
          
          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
};

export default Header;
