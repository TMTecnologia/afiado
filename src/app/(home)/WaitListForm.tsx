"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiResponseSchema } from "~/lib/api/schemas";
import { isSuccessResponse } from "~/lib/api/types";

type FormErrors = {
  [key: string]: string;
};

/**
 * Displays a waitlist signup form for users to submit their email address.
 *
 * Manages form state, handles validation and submission to the waitlist API, displays relevant error messages, and redirects to a thank-you page upon successful signup.
 */
export default function WaitListForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Clear field-specific error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => {
        const { [e.target.name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      // Parse Response Body
      let responseBody: unknown;
      try {
        responseBody = await response.json();
      } catch {
        // If parsing fails, consider body empty
        responseBody = null;
      }

      const parsedResult = apiResponseSchema.safeParse(responseBody);

      // Check API response body parsing result
      if (!parsedResult.success) {
        // Response has no body, unknown response
        setFormErrors({
          form: `Resposta desconhecida: ${response.status} - ${response.statusText}`,
        });
        return;
      }

      const data = parsedResult.data;

      if (isSuccessResponse(data)) {
        router.push("/obrigado");
        return;
      }

      // Convert array of errors to object with field names as keys
      const errors = data.errors.reduce((acc: FormErrors, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {} as FormErrors);

      setFormErrors({ ...errors, form: data.message });
    } catch (error) {
      setFormErrors({
        form: "Erro ao adicionar email",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {formErrors.form && (
        <p className="rounded bg-red-50 p-3 text-red-500 text-sm dark:bg-red-900/50">
          {formErrors.form}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="flex flex-col text-left font-medium text-sm"
        >
          E-mail
          <input
            id="email"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className={`mt-1 rounded border px-3 py-2 text-black focus:outline-none focus:ring dark:bg-gray-900 dark:text-white ${
              formErrors.email ? "border-red-500" : ""
            }`}
            autoComplete="email"
            disabled={isSubmitting}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? "email-error" : undefined}
          />
        </label>
        {formErrors.email && (
          <p id="email-error" className="text-red-500 text-sm" role="alert">
            {formErrors.email}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-8 py-4 font-semibold text-lg text-white shadow-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring disabled:opacity-50"
        >
          {isSubmitting ? "Reservando..." : "Reservar Minha Vaga"}
        </button>
      </div>
    </form>
  );
}
