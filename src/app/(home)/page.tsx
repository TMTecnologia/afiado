import { BarChart, CreditCard, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Card } from '~/components/ui/card';  
import WaitListForm from "./WaitListForm";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full dark:bg-black dark:text-white bg-white text-black transition-colors">
      {/* Hero Section */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-black md:text-6xl">{"Controle financeiro "}<span className="text-blue-400">{"Afiado"}</span>{" para negócios inteligentes"}</h1>
        <p className="mb-8 max-w-xl text-lg font-light md:text-xl">
          {"Automatize o controle financeiro da sua empresa, elimine planilhas e tome decisões mais inteligentes."}
        </p>
        <Link href="#lista-espera" className="rounded bg-black px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-800 focus:outline-none focus:ring dark:bg-white dark:text-black dark:hover:bg-gray-200">
          {"Entrar na lista de espera"}
        </Link>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="pb-8 text-center text-2xl font-bold md:text-3xl">{"Por que escolher o "}<span className="text-blue-400">{"Afiado"}</span>{"?"}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <CreditCard className="pt-1 h-6 w-6 text-blue-400" />
            <div>
              <h3 className="pb-1 font-semibold text-lg">
                {"Automação total"}
              </h3>
              <p className="text-base text-current/70">
                {"Diga adeus à digitação manual e às planilhas caóticas. O Afiado organiza tudo para você automaticamente."}
              </p>
            </div>
          </Card>
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <Globe className="pt-1 h-6 w-6 text-blue-400" />
            <div>
              <h3 className="pb-1 font-semibold text-lg">
                {"Acesso de qualquer lugar"}
              </h3>
              <p className="text-base text-current/70">
                {"Veja o panorama financeiro do seu negócio em qualquer dispositivo, a qualquer hora."}
              </p>
            </div>
          </Card>
          <Card className="flex items-start space-x-4 p-6 shadow-lg">
            <BarChart className="pt-1 h-6 w-6 text-blue-400" />
            <div>
              <h3 className="pb-1 font-semibold text-lg">
                {"Relatórios inteligentes"}
              </h3>
              <p className="text-base text-current/70">
                {"Visualize relatórios claros e prontos para decisões rápidas e estratégicas."}
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
                {"Seus dados protegidos, com privacidade e transparência total."}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="perguntas-frequentes" className="mx-auto max-w-2xl px-4 py-16">
        <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">{"Perguntas frequentes"}</h2>
        <div className="space-y-4">
          <details className="rounded border p-4" open>
            <summary className="cursor-pointer text-lg font-medium">{"O "}<span className="font-semibold text-blue-400">{"Afiado"}</span>{" é para mim?"}</summary>
            <p className="mt-2 text-base">{"Se você é empreendedor, freelancer ou pequeno empresário e quer mais tempo livre e menos burocracia, sim!"}</p>
          </details>
          <details className="rounded border p-4">
            <summary className="cursor-pointer text-lg font-medium">{"Quando o "}<span className="font-semibold text-blue-400">{"Afiado"}</span>{" será lançado?"}</summary>
            <p className="mt-2 text-base">{"Estamos em fase inicial de desenvolvimento. Inscreva-se na lista de espera para ficar por dentro das novidades!"}</p>
          </details>
          <details className="rounded border p-4">
            <summary className="cursor-pointer text-lg font-medium">{"Quanto vai custar?"}</summary>
            <p className="mt-2 text-base">{"Teremos planos acessíveis para todos os perfis."}</p>
          </details>
        </div>
      </section>

      <WaitListForm />

      {/* About Section */}
      <section id="sobre" className="mx-auto max-w-2xl px-4 py-16">
        <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">{"Sobre o "}<span className="text-blue-400">{"Afiado"}</span></h2>
        <p className="text-center text-base">
          {"O "}<span className="font-semibold text-blue-400">{"Afiado"}</span>{" nasceu para eliminar a dor de cabeça do controle financeiro. Foque no crescimento enquanto cuidamos das finanças."}
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t px-4 py-8 text-center text-xs opacity-80">
        <div className="mb-2">Criado por <a href="https://www.tmtecnologia.dev.br/" className="underline hover:opacity-60" target="_blank" rel="noopener noreferrer">TMTecnologia</a></div>
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
          <a href="/docs/termos-servico" className="hover:underline">{"Termos de Serviço"}</a>
          <a href="/docs/politica-privacidade" className="hover:underline">{"Política de Privacidade"}</a>
        </div>
        <div className="mt-2">{"2025 TMTecnologia. Todos os direitos reservados."}</div>
      </footer>
    </main>
  );
}
