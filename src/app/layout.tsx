import "~/styles/globals.css";

import type { Metadata } from "next";

import { RootProvider as FumadocsRootProvider } from "fumadocs-ui/provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ConvexClientProvider, PostHogProvider } from "~/app/_providers";
import { env } from "~/env.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afiado – Controle financeiro afiado para negócios inteligentes",
  description:
    "Automatize o controle financeiro da sua empresa e elimine planilhas. Entre para a lista de espera do Afiado.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Afiado – Controle financeiro afiado para negócios inteligentes",
    description:
      "Automatize o controle financeiro da sua empresa e elimine planilhas. Entre para a lista de espera do Afiado.",
    type: "website",
    locale: "pt_BR",
    url: "https://afiado.app.br/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <PostHogProvider>
          <FumadocsRootProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </FumadocsRootProvider>
        </PostHogProvider>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
