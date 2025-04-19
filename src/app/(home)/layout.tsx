import { baseOptions } from "~/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      className="pt-0"
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
          text: "Sobre",
          url: "#sobre",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
