import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-16 text-black transition-colors dark:bg-black dark:text-white">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <span className="mb-2 text-5xl" aria-label="Comemoração" role="img">
          🎉
        </span>
        <h1 className="font-bold text-3xl">Parabéns!</h1>
        <p className="text-center text-gray-700 text-lg dark:text-gray-200">
          {"Você entrou para a lista de espera do "}
          <span className="font-semibold text-blue-400">Afiado</span>
          {"!"}
          <br />
          {"Estamos muito felizes em ter você com a gente."}
        </p>
        <div className="rounded-lg border bg-green-50 p-4 text-center text-green-800 shadow-sm dark:bg-green-900 dark:text-green-100">
          {
            "Fique de olho no seu e-mail! Você será um dos primeiros a saber de qualquer novidade"
          }
        </div>
        <Link
          href="/"
          className="mt-4 rounded bg-black px-6 py-3 font-semibold text-lg text-white shadow hover:bg-gray-800 focus:outline-none focus:ring dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          {"Voltar ao início"}
        </Link>
      </div>
    </main>
  );
}
