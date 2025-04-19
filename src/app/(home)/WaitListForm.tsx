'use client';

import { useState } from 'react';

export default function WaitListForm() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission to Database
        window.history.pushState(null, '', '/obrigado');
        window.location.reload();
    };

    return (
        <section id="lista-espera" className="mx-auto max-w-3xl px-4 py-16">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">{"Garanta seu acesso antecipado"}</h2>
            <p className="mb-8 text-center text-lg font-light md:text-xl">{"Inscreva-se na lista de espera e seja o primeiro a saber quando lançarmos!"}</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col text-left text-sm font-medium">
              {"E-mail"}
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 rounded border px-3 py-2 text-black focus:outline-none focus:ring dark:bg-gray-900 dark:text-white"
                autoComplete="email"
              />
            </label>
            <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-lg rounded bg-black px-4 py-2 font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {"Quero ser avisado"}
            </button>
            </div>
          </form>
        </section>
    );
}