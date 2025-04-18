import "~/styles/globals.css";

import type { Metadata } from "next";

import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { ptBR } from "@clerk/localizations";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Afiado – Controle financeiro afiado para negócios inteligentes",
  description: "Automatize o controle financeiro da sua empresa e elimine planilhas. Entre para a lista de espera do Afiado.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Afiado – Controle financeiro afiado para negócios inteligentes",
    description: "Automatize o controle financeiro da sua empresa e elimine planilhas. Entre para a lista de espera do Afiado.",
    type: "website",
    locale: "pt_BR",
    url: "https://afiado.app.br/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center p-4 gap-4 h-16">
            <div className="font-bold text-lg text-purple-800">{"Afiado"}</div>
            <nav className="flex gap-4">
              <a href="#beneficios" className="hover:underline">{"Benefícios"}</a>
              <a href="#faq" className="hover:underline">{"FAQ"}</a>
              <a href="#sobre" className="hover:underline">{"Sobre"}</a>
              <a href="#contato" className="hover:underline">{"Contato"}</a>
            </nav>
          </header>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once people.unset people.increment people.append people.remove people.group people.set_group people.track_pageview register unregister opt_in_capturing opt_out_capturing has_opted_out_capturing has_opted_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1.0)})(document,window.posthog||[]);
                posthog.init(
                  process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
                  { api_host: 'https://app.posthog.com' }
                );
              `,
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
