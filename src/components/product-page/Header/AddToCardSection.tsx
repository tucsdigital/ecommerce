"use client";

import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from '@/types/product';
import { formatPrice } from "@/lib/utils";

const AddToCardSection = ({ data }: { data: Product }) => {
  const precioFinal =
    data.discount.percentage > 0
      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
      : data.discount.amount > 0
      ? data.price - data.discount.amount
      : data.price;

  const cuotas = 3;
  const cuotaAmount = Math.round((precioFinal / cuotas) * 100) / 100;
  const transferenciaDescuento = 0.05;
  const precioTransferencia = Math.round(
    precioFinal * (1 - transferenciaDescuento)
  );
  const hasDiscount = data.discount.percentage > 0 || data.discount.amount > 0;

  return (
    <div className="lg:sticky lg:top-24 w-full">
      <div className="w-full bg-white rounded-2xl shadow-lg border border-[rgba(138,109,90,0.06)] p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Precio final
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(precioFinal)}
            </div>
            {hasDiscount && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(data.price)}
              </div>
            )}
          </div>
          {data.discount.percentage > 0 && (
            <div className="text-sm font-semibold bg-[color:var(--brown,#8B5E3C)]/10 text-[color:var(--brown,#8B5E3C)] px-3 py-1 rounded-full">
              {`-${data.discount.percentage}%`}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-black/10 p-3 bg-white">
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Cuotas sin interés
            </div>
            <div className="text-sm text-gray-700 mt-1">
              {cuotas} cuotas de {formatPrice(cuotaAmount)}
            </div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              -5% OFF transferencia
            </div>
            <div className="text-base font-semibold text-gray-900 mt-1">
              {formatPrice(precioTransferencia)}
            </div>
          </div>
        </div>

        <AddToCartBtn data={data} />

        <div className="rounded-xl border border-[rgba(138,109,90,0.12)] shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[color:var(--brown,#8B5E3C)]">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Calculá los m² de tu pileta</h4>
              <span className="text-xs text-white/80">Indicá medidas en metros</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <input placeholder="Ancho m" className="p-2 rounded-md border border-[rgba(0,0,0,0.06)]" />
              <input placeholder="Largo m" className="p-2 rounded-md border border-[rgba(0,0,0,0.06)]" />
            </div>
            <div className="flex justify-end">
              <button className="bg-[color:var(--brown,#8B5E3C)] text-white px-4 py-1.5 rounded-md text-sm shadow-sm hover:opacity-95">
                Calcular
              </button>
            </div>
          </div>
        </div>

        {data.description && (
          <p className="text-base text-gray-600 leading-relaxed">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddToCardSection;
