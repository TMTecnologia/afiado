"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToWaitlist } from "~/app/actions/waitlist";

type FormErrors = {
  [key: string]: string;
};

/**
 * Renders a waitlist signup form that allows users to submit their email address.
 *
 * Handles form state, validation, and submission to add the email to the waitlist. Displays field-specific and general error messages, and navigates to a thank-you page upon successful submission.
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
      const result = await addToWaitlist(form.email);

      if (result.success) {
        router.push("/obrigado");
        return;
      }

      console.error("addToWaitlist::Erro na Server Action:", result);

      if (result.errors) {
        // Convert array of errors to object with field names as keys
        const errors = result.errors.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {} as FormErrors);
        setFormErrors(errors);
      } else {
        // Handle general error
        setFormErrors({ form: result.message });
      }
    } catch (error) {
      console.debug(error);
      setFormErrors({
        form: "Erro ao adicionar email. Tente novamente mais tarde.",
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
