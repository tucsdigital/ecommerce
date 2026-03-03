"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

const InfoAccordion = ({ product }: { product: Product }) => {
  return (
    <div className="max-w-frame mx-auto px-4 xl:px-0">
      <Accordion type="single" defaultValue="description" collapsible={false} className="w-full">
        <AccordionItem value="description">
          <AccordionTrigger>Descripción</AccordionTrigger>
          <AccordionContent>
            {product.description ? (
              <div className="prose max-w-none text-sm text-gray-700">
                <p>{product.description}</p>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No hay descripción disponible.</div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tech">
          <AccordionTrigger>Información técnica</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <li><strong>Categoría:</strong> {product.category || "—"}</li>
              <li><strong>Subcategoría:</strong> {product.subcategory || "—"}</li>
              <li><strong>Tipo:</strong> {product.tipoMadera || "—"}</li>
              <li><strong>Stock:</strong> {typeof product.stock === "number" ? product.stock : "—"}</li>
              <li><strong>Precio:</strong> {formatPrice(product.price)}</li>
              <li><strong>Promos:</strong> {product.promos && product.promos.length ? product.promos.map((p) => `${p.cantidad}x -${p.descuento}%`).join(", ") : "—"}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="more">
          <AccordionTrigger>Más información</AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-700 space-y-2">
              <div><strong>Envío:</strong> {product.freeShipping ? "Envío gratis" : "Consultar envío"}</div>
              <div><strong>Marca destacada:</strong> {product.featuredBrand ? "Sí" : "No"}</div>
              <div><strong>Creado:</strong> {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "—"}</div>
              <div><strong>Última actualización:</strong> {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : "—"}</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InfoAccordion;

