import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import { baseOptions } from "~/app/layout.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        ...(baseOptions.links ?? []),
        {
          text: "Benefícios",
          url: "#beneficios",
        },
        {
          text: "Feito no Brasil",
          url: "#feito-no-brasil",
        },
        {
          text: "Código Aberto",
          url: "#codigo-aberto",
        },
        {
          text: "Perguntas Frequentes",
          url: "#perguntas-frequentes",
        },
        {
          text: "Acesso Antecipado",
          url: "#lista-espera",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
