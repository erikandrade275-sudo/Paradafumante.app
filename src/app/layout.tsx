import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Parada Fumante - Sua Jornada para uma Vida Livre do Cigarro",
  description: "Acompanhe seu progresso, economize dinheiro e recupere sua saúde com o app mais completo para parar de fumar. Sistema de conquistas, dashboard completo e mensagens motivacionais.",
  keywords: ["parar de fumar", "deixar cigarro", "saúde", "bem-estar", "motivação", "economia", "app saúde"],
  authors: [{ name: "Parada Fumante" }],
  creator: "Parada Fumante",
  publisher: "Parada Fumante",
  robots: "index, follow",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://paradafumante.com.br",
    title: "Parada Fumante - Sua Jornada para uma Vida Livre do Cigarro",
    description: "Acompanhe seu progresso, economize dinheiro e recupere sua saúde com o app mais completo para parar de fumar.",
    siteName: "Parada Fumante",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Parada Fumante - App para Parar de Fumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parada Fumante - Sua Jornada para uma Vida Livre do Cigarro",
    description: "Acompanhe seu progresso, economize dinheiro e recupere sua saúde com o app mais completo para parar de fumar.",
    images: ["/og-image.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#00FF00",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Parada Fumante",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Parada Fumante" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Parada Fumante" />
        <meta name="msapplication-TileColor" content="#00FF00" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="font-inter antialiased bg-[#0D0D0D]">
        {children}
        <Analytics />
        
        {/* Registro do Service Worker */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registrado com sucesso:', registration.scope);
                  },
                  function(err) {
                    console.log('Falha ao registrar Service Worker:', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
