import Link from "next/link";

export default function ObrigadoPage() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 dark:bg-black dark:text-white bg-white text-black transition-colors">
            <div className="flex flex-col items-center gap-6 max-w-lg w-full">
                <span className="text-5xl mb-2" aria-label="Comemoração" role="img">🎉</span>
                <h1 className="text-3xl font-bold">Parabéns!</h1>
                <p className="text-lg text-center text-gray-700 dark:text-gray-200">
                    {"Você entrou para a lista de espera do "}<span className="font-semibold text-blue-400">Afiado</span>{"!"}<br/>
                    {"Estamos muito felizes em ter você com a gente."}
                </p>
                <div className="rounded-lg border bg-green-50 p-4 text-green-800 dark:bg-green-900 dark:text-green-100 text-center shadow-sm">
                    {"Fique de olho no seu e-mail! Você será um dos primeiros a saber de qualquer novidade"}
                </div>
                <Link href="/" className="mt-4 rounded bg-black px-6 py-3 text-lg font-semibold text-white shadow hover:bg-gray-800 focus:outline-none focus:ring dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    {"Voltar ao início"}
                </Link>
            </div>
        </main>
    );
}