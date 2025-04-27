"use client";

import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "~/convex/_generated/api";

export default function WaitListForm() {
  const addEntry = useMutation(api.waitlist.addEntry);

  const [form, setForm] = useState({
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
    addEntry(form).then(() => {
      window.history.pushState(null, "", "/obrigado");
      window.location.reload();
    });
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
          className="rounded bg-blue-500 px-8 py-4 font-semibold text-lg text-white shadow-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring"
        >
          {"Reservar Minha Vaga"}
        </button>
      </div>
    </form>
  );
}
