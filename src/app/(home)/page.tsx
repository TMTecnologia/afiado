import {
  BarChart,
  CreditCard,
  Globe,
  ShieldCheck,
  X as XIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Card } from "~/components/ui/card";
import WaitlistForm from "./WaitlistForm";

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-[#f8fafc] to-[#ede9fe]">
      {/* Hero section */}
      <section className="relative bg-purple-600 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">
            {"Controle financeiro afiado para negócios inteligentes"}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            {
              "Automatize o controle financeiro da sua empresa, elimine planilhas e tome decisões mais inteligentes."
            }
          </p>
          <div className="mx-auto w-full max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section
        id="beneficios"
        className="flex w-full justify-center px-4 py-16"
      >
        <div className="w-full max-w-3xl">
          <h2 className="mb-12 text-center font-bold text-3xl text-purple-900">
            {"Por que escolher o Afiado?"}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="flex items-start space-x-4 p-6 shadow-lg">
              <CreditCard className="mt-1 h-6 w-6 text-purple-600" />
              <div>
                <h3 className="mb-1 font-semibold text-lg">
                  {"Automação total"}
                </h3>
                <p className="text-gray-700">
                  {
                    "Diga adeus à digitação manual e às planilhas caóticas. O Afiado organiza tudo para você automaticamente."
                  }
                </p>
              </div>
            </Card>
            <Card className="flex items-start space-x-4 p-6 shadow-lg">
              <Globe className="mt-1 h-6 w-6 text-purple-600" />
              <div>
                <h3 className="mb-1 font-semibold text-lg">
                  {"Acesso de qualquer lugar"}
                </h3>
                <p className="text-gray-700">
                  {
                    "Veja o panorama financeiro do seu negócio em qualquer dispositivo, a qualquer hora."
                  }
                </p>
              </div>
            </Card>
            <Card className="flex items-start space-x-4 p-6 shadow-lg">
              <BarChart className="mt-1 h-6 w-6 text-purple-600" />
              <div>
                <h3 className="mb-1 font-semibold text-lg">
                  {"Relatórios inteligentes"}
                </h3>
                <p className="text-gray-700">
                  {
                    "Visualize relatórios claros e prontos para decisões rápidas e estratégicas."
                  }
                </p>
              </div>
            </Card>
            <Card className="flex items-start space-x-4 p-6 shadow-lg">
              <ShieldCheck className="mt-1 h-6 w-6 text-purple-600" />
              <div>
                <h3 className="mb-1 font-semibold text-lg">
                  {"Segurança e privacidade"}
                </h3>
                <p className="text-gray-700">
                  {
                    "Seus dados protegidos, com privacidade e transparência total."
                  }
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="faq" className="container mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-center font-bold text-3xl text-purple-900">
          {"Perguntas frequentes"}
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="launch">
            <AccordionTrigger>
              {"Quando o Afiado será lançado?"}
            </AccordionTrigger>
            <AccordionContent>
              {
                "Estamos em fase inicial de desenvolvimento. Inscreva-se na lista de espera para ficar por dentro das novidades!"
              }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="who">
            <AccordionTrigger>{"O Afiado é para mim?"}</AccordionTrigger>
            <AccordionContent>
              {
                "Se você é empreendedor, freelancer ou pequeno empresário e quer mais tempo livre e menos burocracia, sim!"
              }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>{"Quanto vai custar?"}</AccordionTrigger>
            <AccordionContent>
              {"Teremos planos acessíveis para todos os perfis."}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* About section */}
      <section id="sobre" className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center font-bold text-3xl text-purple-900">
          {"Sobre o Afiado"}
        </h2>
        <p className="mx-auto max-w-2xl text-center text-gray-800">
          {"O "}
          <span className="font-bold">{"Afiado"}</span>
          {
            " nasceu para eliminar a dor de cabeça do controle financeiro. Foque no crescimento enquanto cuidamos das finanças."
          }
        </p>
      </section>

      {/* Footer section */}
      <footer className="mt-12 border-t bg-gray-100 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="text-gray-600 text-sm">
            {"Criado por "}
            <a
              href="https://www.tmtecnologia.dev.br/"
              className="font-semibold text-purple-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"TMTecnologia"}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 text-sm hover:text-purple-700">
              Termos de Serviço
            </a>
            <a href="#" className="text-gray-600 text-sm hover:text-purple-700">
              Política de Privacidade
            </a>
            <a
              href="https://x.com/afiado_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:text-purple-900"
              aria-label="X (Twitter)"
            >
              {/* X/Twitter SVG */}
              <Image
                src="/twitter-x-logo.svg"
                className="invert"
                alt="X (Twitter)"
                width={22}
                height={22}
              />
            </a>
            <a
              href="https://github.com/tmtecnologia/afiado"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:text-purple-900"
              aria-label="GitHub"
            >
              {/* GitHub SVG */}
              <Image
                src="/github-octocat-logo.svg"
                className="invert"
                alt="GitHub"
                width={26}
                height={26}
              />
            </a>
          </div>
          <div className="text-center text-gray-500 text-xs md:text-right">
            © {new Date().getFullYear()} TMTecnologia. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
