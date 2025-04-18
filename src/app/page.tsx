import WaitlistForm from "./WaitlistForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#f8fafc] to-[#ede9fe] text-gray-900">
      <section className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 px-4 py-20">
        <h1 className="mb-6 text-center font-extrabold text-4xl text-purple-900 sm:text-6xl">
          {"Controle financeiro afiado para negócios inteligentes"}
        </h1>
        <p className="mb-8 max-w-2xl text-center text-lg text-purple-800 sm:text-2xl">
          {
            "Automatize o controle financeiro da sua empresa, elimine planilhas e tenha decisões mais inteligentes. Entre para a lista de espera do "
          }
          <span className="font-bold">{"Afiado"}</span>
          {"!"}
        </p>
        <WaitlistForm />
      </section>

      <section id="beneficios" className="mx-auto w-full max-w-4xl px-4 py-16">
        <h2 className="mb-8 text-center font-bold text-2xl text-purple-900 sm:text-3xl">
          {"Por que escolher o Afiado?"}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-2 font-bold text-lg">{"Automação total"}</h3>
            <p className="text-gray-700">
              {
                "Diga adeus à digitação manual e às planilhas caóticas. O Afiado organiza tudo para você automaticamente."
              }
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-2 font-bold text-lg">
              {"Acesso de qualquer lugar"}
            </h3>
            <p className="text-gray-700">
              {
                "Veja o panorama financeiro do seu negócio em qualquer dispositivo, a qualquer hora."
              }
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-2 font-bold text-lg">
              {"Relatórios inteligentes"}
            </h3>
            <p className="text-gray-700">
              {
                "Visualize relatórios claros, prontos para decisões rápidas e estratégicas."
              }
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-2 font-bold text-lg">
              {"Segurança e privacidade"}
            </h3>
            <p className="text-gray-700">
              {"Seus dados protegidos, com privacidade e transparência total."}
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-16">
        <h2 className="mb-8 text-center font-bold text-2xl text-purple-900 sm:text-3xl">
          {"Perguntas frequentes"}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">{"Quando o Afiado será lançado?"}</h3>
            <p className="text-gray-700">
              {
                "Estamos em fase inicial de desenvolvimento. Inscreva-se na waitlist para ser avisado em primeira mão, das novidades do desenvolvimento!"
              }
            </p>
          </div>
          <div>
            <h3 className="font-semibold">{"O Afiado é para mim?"}</h3>
            <p className="text-gray-700">
              {
                "Se você é empreendedor, freelancer, ou dono de pequeno negócio e quer mais tempo livre e menos burocracia, sim!"
              }
            </p>
          </div>
          <div>
            <h3 className="font-semibold">{"Quanto vai custar?"}</h3>
            <p className="text-gray-700">
              {"Teremos planos acessíveis para todos os perfis."}
            </p>
          </div>
        </div>
      </section>

      <section id="sobre" className="mx-auto w-full max-w-4xl px-4 py-16">
        <h2 className="mb-8 text-center font-bold text-2xl text-purple-900 sm:text-3xl">
          {"Sobre o Afiado"}
        </h2>
        <p className="mx-auto max-w-2xl text-center text-gray-800 text-lg">
          {"O "}
          <span className="font-bold">{"Afiado"}</span>
          {
            " nasceu para eliminar a dor de cabeça do controle financeiro. Queremos que você foque no que importa: crescer e atender seus clientes, enquanto nós cuidamos das finanças."
          }
        </p>
      </section>

      <section
        id="contato"
        className="mx-auto w-full max-w-4xl px-4 py-16 text-center"
      >
        <h2 className="mb-4 font-bold text-2xl text-purple-900 sm:text-3xl">
          {"Fale conosco"}
        </h2>
        <p className="mb-2 text-gray-700">
          {"Dúvidas? Sugestões? Envie um e-mail para "}
          <a
            href="mailto:contato@tmtecnologia.dev.br"
            className="text-purple-700 underline"
          >
            contato@tmtecnologia.dev.br
          </a>
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="https://x.com/afiado_app"
            target="_blank"
            rel="noreferrer noopener"
            className="text-purple-700 hover:underline"
          >
            {"X"}
          </a>
        </div>
      </section>
    </main>
  );
}
