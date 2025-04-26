import {
  ChartLine,
  FileSpreadsheet,
  Globe,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import WaitListForm from "./WaitListForm";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-white text-black transition-colors dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-4 font-black text-4xl md:text-6xl">
          {"Controle financeiro "}
          <span className="text-blue-400">{"Afiado"}</span>
          {" para negócios inteligentes"}
        </h1>
        <p className="mb-8 max-w-xl font-light text-lg md:text-xl">
          {
            "Automatize seu controle financeiro e foque no que realmente importa: vender mais."
          }
        </p>
        <Link
          href="#lista-espera"
          className="rounded bg-blue-500 px-8 py-4 font-semibold text-lg text-white shadow-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring"
        >
          {"Entrar na lista de espera"}
        </Link>
      </section>

      {/* Benefits Section */}
      <section
        id="beneficios"
        className="bg-gray-50 px-4 py-16 dark:bg-gray-900"
      >
        <h2 className="pb-8 text-center font-bold text-2xl md:text-3xl">
          {"Por que escolher o "}
          <span className="text-blue-400">{"Afiado"}</span>
          {"?"}
        </h2>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <FileSpreadsheet className="h-6 w-6 pt-1 text-blue-400" />
            <div>
              <h3 className="pb-1 font-semibold text-lg">
                {"Mais vendas, menos planilhas"}
              </h3>
              <p className="text-base text-current/70">
                {
                  "Acompanhe suas vendas em tempo real e diga adeus à pilha de recibos para digitar em casa."
                }
              </p>
            </div>
          </Card>
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <Globe className="h-6 w-6 pt-1 text-blue-400" />
            <div>
              <h3 className="pb-1 font-semibold text-lg">
                {"Acesso de qualquer lugar"}
              </h3>
              <p className="text-base text-current/70">
                {
                  "Veja o panorama financeiro do seu negócio em qualquer dispositivo, a qualquer hora."
                }
              </p>
            </div>
          </Card>
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <ChartLine className="h-6 w-6 pt-1 text-blue-400" />
            <div>
              <h3 className="pb-1 font-semibold text-lg">
                {"Relatórios inteligentes"}
              </h3>
              <p className="text-base text-current/70">
                {
                  "Visualize relatórios claros e prontos para decisões rápidas e estratégicas."
                }
              </p>
            </div>
          </Card>
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <ShieldCheck className="mt-1 h-6 w-6 text-blue-400" />
            <div>
              <h3 className="mb-1 font-semibold text-lg">
                {"Segurança e privacidade"}
              </h3>
              <p className="text-base text-current/70">
                {
                  "Seus dados protegidos, com privacidade e transparência total."
                }
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Market Stats Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 font-bold text-2xl md:text-3xl">
            {"O mercado em números"}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-bold text-3xl text-blue-400">
                {"7,4 milhões"}
              </p>
              <p className="mt-2 text-sm">
                {"empresas ativas no comércio brasileiro"}
              </p>
            </div>
            <div>
              <p className="font-bold text-3xl text-blue-400">
                {"3,7 milhões"}
              </p>
              <p className="mt-2 text-sm">{"MEIs no setor de comércio"}</p>
            </div>
            <div>
              <p className="font-bold text-3xl text-blue-400">
                {"19,7 milhões"}
              </p>
              <p className="mt-2 text-sm">{"empreendedores informais"}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-xs">
            {"Fonte: Mapa de Empresas do Governo Federal, IBGE e SEBRAE, 2025"}
          </p>
        </div>
      </section>

      {/* Brazilian Team Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-blue-400" />
          <h2 className="mb-4 font-bold text-2xl md:text-3xl">
            {"Feito no Brasil 🇧🇷"}
          </h2>
          <p className="text-lg">
            {`Entendemos os desafios únicos do empreendedor brasileiro porque vivemos a mesma realidade.
              Queremos transformar a gestão financeira de quem vende no Brasil`}
          </p>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src="/github-octocat-logo.svg"
            className="mx-auto mb-4 invert dark:invert-0"
            alt="GitHub"
            width={48}
            height={48}
          />
          <h2 className="mb-4 font-bold text-2xl md:text-3xl">
            {"100% Open Source"}
          </h2>
          <p className="mb-6 text-lg">
            {"Todo nosso código é aberto e pode ser auditado pela comunidade."}
          </p>
          <a
            href="https://github.com/tmtecnologia/afiado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-400 hover:underline"
          >
            <Image
              src="/github-octocat-logo.svg"
              className="invert dark:invert-0"
              alt="GitHub"
              width={20}
              height={20}
            />
            <span>{"Veja nosso código no GitHub"}</span>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="perguntas-frequentes"
        className="bg-gray-50 px-4 py-16 dark:bg-gray-900"
      >
        <h2 className="mb-6 text-center font-bold text-2xl md:text-3xl">
          {"Perguntas frequentes"}
        </h2>
        <div className="mx-auto max-w-2xl space-y-4">
          <details className="rounded border p-4">
            <summary className="cursor-pointer font-medium text-lg">
              {"Quando o "}
              <span className="font-semibold text-blue-400">{"Afiado"}</span>
              {" será lançado?"}
            </summary>
            <p className="mt-2 text-base">
              {
                "Estamos em fase inicial de desenvolvimento. Siga-nos nas redes sociais para ficar por dentro das novidades."
              }
            </p>
          </details>
          <details className="rounded border p-4">
            <summary className="cursor-pointer font-medium text-lg">
              {"Quanto vai custar?"}
            </summary>
            <p className="mt-2 text-base">
              {"Teremos planos acessíveis para todos os perfis."}
            </p>
          </details>
        </div>
      </section>

      {/* WaitList Form Section */}
      <section id="lista-espera" className="mx-auto max-w-xl px-4 py-16">
        <h2 className="mb-6 text-center font-bold text-2xl md:text-3xl">
          {"Garanta seu acesso antecipado"}
        </h2>
        <p className="mb-8 text-center">
          {"Seja um dos primeiros a experimentar o "}
          <span className="font-bold text-blue-400">{"Afiado"}</span>
          {" quando lançarmos"}
        </p>
        <WaitListForm />
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 pt-12 text-center text-xs opacity-80">
        <div className="pb-2">
          {"Criado por "}
          <a
            href="https://www.tmtecnologia.dev.br/"
            className="underline hover:opacity-60"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"TMTecnologia"}
          </a>
        </div>
        {/* TODO: Write Terms of Service and Privacy Policy
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
          <a href="/docs/termos-servico" className="hover:underline">
            {"Termos de Serviço"}
          </a>
          <a href="/docs/politica-privacidade" className="hover:underline">
            {"Política de Privacidade"}
          </a>
        </div>
        */}
        <div className="pt-2">
          {"© "}
          {new Date().getFullYear()}
          {" TMTecnologia. Todos os direitos reservados."}
        </div>
      </footer>
    </main>
  );
}
