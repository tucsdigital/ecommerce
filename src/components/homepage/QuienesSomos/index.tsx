import React from "react";
import * as motion from "framer-motion/client";
import { satoshi } from "@/styles/fonts";
import { cn } from "@/lib/utils";

const QuienesSomos = () => {
  const BROWN = "#5A3A2A";

  return (
    <div className="px-4 xl:px-0">
      <section id="nosotros" className="max-w-frame mx-auto px-4 md:px-6 py-12 bg-white rounded-3xl shadow-sm">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ y: "40px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn([satoshi.className, "text-2xl md:text-3xl font-bold text-gray-900"])}
          >
            Nosotros
          </motion.h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-3">
            Nativa Revestimientos: materiales, asesoramiento y proyectos con foco en calidad y durabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-700 leading-relaxed text-base">
              Somos especialistas en revestimientos y maderas nativas. Suministramos materiales seleccionados y brindamos asesoramiento técnico para garantizar la correcta elección e instalación en cada proyecto.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-gray-100 bg-[rgba(90,58,42,0.04)]">
                <h4 className="text-sm font-semibold text-gray-900">Por naturaleza únicos</h4>
                <p className="text-xs text-gray-600 mt-1">Vetado y carácter natural en cada pieza.</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100 bg-[rgba(90,58,42,0.04)]">
                <h4 className="text-sm font-semibold text-gray-900">10 especies nativas</h4>
                <p className="text-xs text-gray-600 mt-1">Variedad para distintos usos y acabados.</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100 bg-[rgba(90,58,42,0.04)]">
                <h4 className="text-sm font-semibold text-gray-900">Finger Joint</h4>
                <p className="text-xs text-gray-600 mt-1">Uniones estables y confiables.</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100 bg-[rgba(90,58,42,0.04)]">
                <h4 className="text-sm font-semibold text-gray-900">Buenos Aires</h4>
                <p className="text-xs text-gray-600 mt-1">Distribución y soporte local.</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 italic mt-2">Calidad, asesoramiento y servicio para tu proyecto.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-md">
              <div className="h-56 bg-[url('/images/team-placeholder.jpg')] bg-center bg-cover" />
              <div style={{ background: BROWN }} className="p-6 text-white">
                <h3 className="text-lg font-semibold">Nuestro Equipo</h3>
                <p className="text-sm mt-2">Profesionales en revestimientos, diseño y ejecución.</p>
                <div className="mt-4 text-sm opacity-90">
                  <div>Materiales seleccionados</div>
                  <div>Asesoramiento técnico</div>
                  <div>Proyectos a medida</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
