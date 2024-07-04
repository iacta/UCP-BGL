import React from "react";
import "./globals.css";
import { inter } from "./fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "UCP - Brasil Gamer Life",
  description: "User Control Painel do servidor Brasil Gamer Life.",
  metadataBase: new URL("https://seusite.com"), // Altere para a URL do seu site
  openGraph: {
    title: "UCP - Brasil Gamer Life",
    description: "User Control Painel do servidor Brasil Gamer Life.",
    url: "https://ucp-bgl.vercel.app",  
    type: "website",
    images: [
      {
        url: "/ogbgl.png",  // URL da sua imagem no diretório public
        width: 800,
        height: 600,
        alt: "Descrição da imagem",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        {metadata.openGraph.images.map((image, index) => (
          <React.Fragment key={index}>
            <meta property="og:image" content={image.url} />
            <meta property="og:image:width" content={image.width} />
            <meta property="og:image:height" content={image.height} />
            <meta property="og:image:alt" content={image.alt} />
          </React.Fragment>
        ))}
      </head>
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
