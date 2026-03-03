import type { Metadata } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import RootLayoutClient from "./root-layout-client";
import Providers from "./providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nativa",
  description: "Tienda de maderas y productos de ferretería de Nativa. Maderas premium, cortes a medida, accesorios y envíos a domicilio.",
  keywords: [
    "maderas", "madera", "ferretería", "ferreteria",
    "corte a medida", "cortes a medida", "cepillado", "redondeado",
    "tablas", "listones", "vigas", "machimbre", "deck",
    "mdf", "melamina", "laminados",
    "herrajes", "tornillos", "herramientas", "adhesivos",
    "lijas", "barnices", "selladores",
    "carpintería", "construcción", "obra",
    "eucalipto", "pino", "saligna", "grandis", "quebracho"
  ],
  authors: [{ name: "Nativa" }],
  creator: "Nativa",
  publisher: "Nativa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://caballeromaderas.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nativa",
    description: "Tienda de maderas y productos de ferretería de Nativa. Maderas premium, cortes a medida, accesorios y envíos a domicilio.",
    url: "https://caballeromaderas.com",
    siteName: "Nativa",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nativa | Maderas Premium",
    description: "Tienda de maderas y productos de ferretería. Maderas premium, cortes a medida, accesorios y envíos a domicilio.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(satoshi.variable)}>
      <head>
        <meta name="geo.region" content="AR" />
        <meta name="geo.placename" content="Argentina" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Nativa",
                url: "https://caballeromaderas.com",
                logo: "https://caballeromaderas.com/images/og-image.jpg",
                telephone: "01134976239",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Dr. Honorio Pueyrredón 4625",
                  postalCode: "B1631",
                  addressLocality: "Villa Rosa",
                  addressRegion: "Provincia de Buenos Aires",
                  addressCountry: "AR",
                },
                sameAs: [
                  "https://www.instagram.com/maderas_caballero/",
                  "https://www.facebook.com/profile.php?id=61578345904014&mibextid=ZbWKwL",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Nativa",
                url: "https://caballeromaderas.com",
                inLanguage: "es-AR",
              },
              {
                "@context": "https://schema.org",
                "@type": "HardwareStore",
                name: "Nativa",
                url: "https://caballeromaderas.com",
                areaServed: "AR",
                telephone: "01134976239",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Dr. Honorio Pueyrredón 4625",
                  postalCode: "B1631",
                  addressLocality: "Villa Rosa",
                  addressRegion: "Provincia de Buenos Aires",
                  addressCountry: "AR",
                },
                sameAs: [
                  "https://www.instagram.com/maderas_caballero/",
                  "https://www.facebook.com/profile.php?id=61578345904014&mibextid=ZbWKwL",
                ],
                hasMap: "https://maps.app.goo.gl/7yjPAd41fKKH9ErF9",
              },
            ]),
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-white antialiased")}>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}