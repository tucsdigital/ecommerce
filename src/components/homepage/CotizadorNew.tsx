import React from "react";
import { Search, Ruler, DollarSign } from "lucide-react";
import { satoshi } from "@/styles/fonts";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Buscá y elegí",
    desc: "Elegí entre nuestra selección de productos y acabados.",
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Ingresá medidas",
    desc: "Proporcioná medidas precisas para una estimación realista.",
    icon: <Ruler className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Recibí presupuesto",
    desc: "Obtené un presupuesto estimado al instante o por mail.",
    icon: <DollarSign className="w-5 h-5" />,
  },
];

const IconStep: React.FC<{
  title: string;
  desc: string;
  icon: React.ReactNode;
}> = ({ title, desc, icon }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[rgba(90,58,42,0.08)] text-primary shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-600">{desc}</div>
      </div>
    </div>
  );
};

const CotizadorNew: React.FC = () => {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 my-8">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 md:p-10">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <h3 className={cn([satoshi.className, "text-2xl md:text-3xl font-bold text-primary"])}>
                Cotizá en tiempo real
              </h3>
              <div className="w-24 h-1 rounded mt-3 mb-4 bg-accent" />
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "#8B5E3C", color: "#ffffff" }}
                >
                  Atención exclusiva
                </span>
               
              </div>
              <p className="text-base md:text-lg text-gray-700 max-w-xl leading-relaxed">
                Con nuestro cotizador obtendrás una estimación rápida y confiable. Elegí el producto, cargá las medidas y recibí un presupuesto estimado para tu obra.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s) => (
                <IconStep key={s.id} title={s.title} desc={s.desc} icon={s.icon} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2">
              <a
                href={`https://wa.me/5491123456789?text=${encodeURIComponent(
                  "Hola! Me interesa obtener más información sobre el cotizador y sus productos."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold shadow-sm"
              >
                Conocé nuestros productos
              </a>

              <a
                href="/contacto"
                className="btn bg-[color:var(--brown,#5A3A2A)] text-white inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Solicitar presupuesto
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-md border border-gray-100 bg-gradient-to-b from-white to-[rgba(250,247,244,0.9)]">
              <div className="relative h-64 bg-[url('/images/cotizador-mockup.jpg')] bg-center bg-cover">
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow"
                  style={{ backgroundColor: "#8B5E3C", color: "#ffffff" }}
                >
                  Cotizador Online
                </div>
              </div>
              <div className="p-5">
                {/* Mockup-only: mantener estructura visual, no funcionalidad */}
                <div className="h-28 w-full rounded-md bg-[rgba(0,0,0,0.03)]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CotizadorNew;

