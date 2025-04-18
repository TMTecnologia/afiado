import {
  BarChart,
  CreditCard,
  Globe,
  ShieldCheck,
  X as XIcon,
} from "lucide-react";
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
      <section id="faq" className="container max-w-3xl mx-auto px-4 py-16">
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
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4 text-gray-600">
            {"Dúvidas? Sugestões? Envie um e-mail para "}
            <a
              href="mailto:contato@tmtecnologia.dev.br"
              className="text-purple-700 underline"
            >
              {"contato@tmtecnologia.dev.br"}
            </a>
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://x.com/afiado_app" target="_blank" rel="noreferrer">
              <XIcon className="h-5 w-5 text-purple-700" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
