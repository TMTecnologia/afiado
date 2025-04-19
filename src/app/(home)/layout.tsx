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
          text: "Perguntas Frequentes",
          url: "#perguntas-frequentes",
        },
        {
          text: "Acesso Antecipado",
          url: "#lista-espera",
        },
        {
          text: "Sobre",
          url: "#sobre",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
