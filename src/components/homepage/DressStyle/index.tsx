import { cn } from "@/lib/utils";
import { satoshi } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";

const categorias = [
  {
    titulo: "Tablas",
    subtitulo: "Decks macizas",
    url: "/shop?category=tablas-decks-macizas",
    imagen: "/images/categories/tablas-decks-macizas.jpg",
  },
  {
    titulo: "Wall panel",
    subtitulo: "wpc - pvc - eps",
    url: "/shop?category=wall-panel-wpc-pvc-eps",
    imagen: "/images/categories/wall-panel-wpc-pvc-eps.jpg",
  },
  {
    titulo: "Wall panel",
    subtitulo: "Madera nativa",
    url: "/shop?category=wall-panel-madera-nativa",
    imagen: "/images/categories/wall-panel-madera-nativa.jpg",
  },
  {
    titulo: "Placas",
    subtitulo: "PVC / simil madera",
    url: "/shop?category=placas-pvc-simil-madera",
    imagen: "/images/categories/placas-pvc-simil-madera.jpg",
  },
  {
    titulo: "Piedra",
    subtitulo: "Flex",
    url: "/shop?category=piedra-flex",
    imagen: "/images/categories/piedra-flex.jpg",
  },
];

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {categorias.map((categoria) => (
            <motion.div 
              key={categoria.subtitulo} 
              whileHover={{ scale: 1.02 }} 
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <DressStyleCard
                titulo={categoria.titulo}
                subtitulo={categoria.subtitulo}
                url={categoria.url}
                imagen={categoria.imagen}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
