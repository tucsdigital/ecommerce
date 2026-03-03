import { /*Button*/ } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { satoshi } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

const BROWN = "#5A3A2A";
// Contraste en formato RGBA para mayor control de opacidad (equivalente a #8B5E3C)
const LIGHT_BROWN = "rgba(139,94,60,1)";

const NewsLetterSection = () => {
  return (
    <div className="relative max-w-frame mx-auto px-4 xl:px-0 my-8">
      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-8 px-6 md:py-10 md:px-12"
          style={{ background: BROWN }}
        >
          {/* Left: heading + description */}
          <div className="flex flex-col items-start md:items-start">
            <p
              className={cn([
                satoshi.className,
                "font-bold text-lg md:text-2xl text-white",
              ])}
            >
              ¿Querés recibir promos y novedades?
            </p>
            <p className="text-base text-white/90 mt-2 max-w-md">
              Suscribite a nuestro newsletter para recibir ofertas exclusivas y
              novedades antes que nadie.
            </p>
            <div className="w-12 h-1 rounded mt-4" style={{ background: "#3e2b24" }} />
          </div>

          {/* Right: input + button (stacked on mobile) */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="w-full max-w-lg">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <InputGroup className="flex bg-white flex-1 rounded-xl">
                  <InputGroup.Text>
                    <Image
                      priority
                      src="/icons/envelope.svg"
                      height={20}
                      width={20}
                      alt="email"
                      className="min-w-5 min-h-5"
                    />
                  </InputGroup.Text>
                  <InputGroup.Input
                    type="email"
                    name="email"
                    placeholder="Ingresá tu e-mail"
                    className="bg-transparent placeholder:text-gray-400 text-sm py-3"
                  />
                </InputGroup>
                <button
                  aria-label="Subscribe to Newsletter"
                  type="button"
                  className="btn text-white w-full sm:w-auto rounded-xl px-6 py-3 font-medium"
                  style={{ background: "rgba(139,94,60,1)" }}
                >
                  ENVIAR
                </button>
              </div>

              <p className="text-xs text-white/80 mt-3">
                No compartimos tu información. Podés darte de baja cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
