import WaitlistForm from "./WaitlistForm";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#ede9fe] text-gray-900">
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-purple-50 to-purple-100">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center text-purple-900 mb-6">
          {"Controle financeiro afiado para negócios inteligentes"}
        </h1>
        <p className="text-lg sm:text-2xl text-center max-w-2xl mb-8 text-purple-800">
          {"Automatize o controle financeiro da sua empresa, elimine planilhas e tenha decisões mais inteligentes. Entre para a lista de espera do "}<span className="font-bold">{"Afiado"}</span>{"!"}
        </p>
        <WaitlistForm />
      </section>

      <section id="beneficios" className="w-full max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-8 text-center">{"Por que escolher o Afiado?"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">{"Automação total"}</h3>
            <p className="text-gray-700">{"Diga adeus à digitação manual e às planilhas caóticas. O Afiado organiza tudo para você automaticamente."}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">{"Acesso de qualquer lugar"}</h3>
            <p className="text-gray-700">{"Veja o panorama financeiro do seu negócio em qualquer dispositivo, a qualquer hora."}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">{"Relatórios inteligentes"}</h3>
            <p className="text-gray-700">{"Visualize relatórios claros, prontos para decisões rápidas e estratégicas."}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">{"Segurança e privacidade"}</h3>
            <p className="text-gray-700">{"Seus dados protegidos, com privacidade e transparência total."}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="w-full max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-8 text-center">{"Perguntas frequentes"}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">{"Quando o Afiado será lançado?"}</h3>
            <p className="text-gray-700">{"Estamos em fase inicial de desenvolvimento. Inscreva-se na waitlist para ser avisado em primeira mão, das novidades do desenvolvimento!"}</p>
          </div>
          <div>
            <h3 className="font-semibold">{"O Afiado é para mim?"}</h3>
            <p className="text-gray-700">{"Se você é empreendedor, freelancer, ou dono de pequeno negócio e quer mais tempo livre e menos burocracia, sim!"}</p>
          </div>
          <div>
            <h3 className="font-semibold">{"Quanto vai custar?"}</h3>
            <p className="text-gray-700">{"Teremos planos acessíveis para todos os perfis."}</p>
          </div>
        </div>
      </section>

      <section id="sobre" className="w-full max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-8 text-center">{"Sobre o Afiado"}</h2>
        <p className="text-lg text-gray-800 text-center max-w-2xl mx-auto">
          {"O "}<span className="font-bold">{"Afiado"}</span>{" nasceu para eliminar a dor de cabeça do controle financeiro. Queremos que você foque no que importa: crescer e atender seus clientes, enquanto nós cuidamos das finanças."}
        </p>
      </section>

      <section id="contato" className="w-full max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4">{"Fale conosco"}</h2>
        <p className="text-gray-700 mb-2">{"Dúvidas? Sugestões? Envie um e-mail para "}<a href="mailto:contato@tmtecnologia.dev.br" className="underline text-purple-700">contato@tmtecnologia.dev.br</a></p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://x.com/afiado_app" target="_blank" rel="noopener" className="text-purple-700 hover:underline">{"X"}</a>
        </div>
      </section>
    </main>
  );
}
