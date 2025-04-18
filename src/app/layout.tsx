import "~/styles/globals.css";

import type { Metadata } from "next";

import { RootProvider } from 'fumadocs-ui/provider';
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <ClerkProvider localization={ptBR}>
      <RootProvider>
        <html lang="pt-BR">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <header className="flex h-16 items-center justify-between gap-4 p-4">
              <div className="font-bold text-lg text-purple-800">{"Afiado"}</div>
              <nav className="flex gap-4">
                <a href="#beneficios" className="hover:underline">
                  {"Benefícios"}
                </a>
                <a href="#faq" className="hover:underline">
                  {"FAQ"}
                </a>
                <a href="#sobre" className="hover:underline">
                  {"Sobre"}
                </a>
                <a href="#contato" className="hover:underline">
                  {"Contato"}
                </a>
              </nav>
            </header>
            {children}
          </body>
        </html>
      </RootProvider>
    </ClerkProvider>
  );
}
