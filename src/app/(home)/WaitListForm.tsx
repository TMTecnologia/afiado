"use client";

import { useState } from "react";

export default function WaitListForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
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
    window.history.pushState(null, "", "/obrigado");
    window.location.reload();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col text-left font-medium text-sm">
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
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="rounded bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring transition-colors"
        >
          {"Reservar Minha Vaga"}
        </button>
      </div>
    </form>
  );
}
