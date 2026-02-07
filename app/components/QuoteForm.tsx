"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  city_or_zip: string;
  home_type: "house" | "condo" | "apartment" | "";
  beds: string;
  baths: string;
  frequency: "one-time" | "weekly" | "bi-weekly" | "monthly" | "";
  condition: "light" | "normal" | "heavy" | "";
  message: string;
  consent: boolean;
  company: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  city_or_zip: "",
  home_type: "",
  beds: "",
  baths: "",
  frequency: "",
  condition: "",
  message: "",
  consent: false,
  company: ""
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      /.+@.+\..+/.test(form.email) &&
      form.phone.trim().length >= 7 &&
      form.city_or_zip.trim().length > 2 &&
      form.home_type !== "" &&
      form.frequency !== "" &&
      form.condition !== "" &&
      form.consent
    );
  }, [form]);

  const update = (
    key: keyof FormState,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isValid) {
      setStatus("error");
      setError("Please complete the required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          beds: form.beds ? Number(form.beds) : undefined,
          baths: form.baths ? Number(form.baths) : undefined
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
  };

  return (
    <div className="rounded-3xl bg-white/80 p-8 shadow-card backdrop-blur">
      <h3 className="text-3xl font-semibold text-ink-900">
        Request a quote
      </h3>
      <p className="mt-2 text-sm text-ink-500">
        Share a few details and we will follow up quickly.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Name *
            <input
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Email *
            <input
              type="email"
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Phone *
            <input
              type="tel"
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            City or ZIP *
            <input
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.city_or_zip}
              onChange={(event) => update("city_or_zip", event.target.value)}
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Home type *
            <select
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.home_type}
              onChange={(event) =>
                update("home_type", event.target.value)
              }
              required
            >
              <option value="">Select</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="apartment">Apartment</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Beds
            <input
              type="number"
              min={0}
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.beds}
              onChange={(event) => update("beds", event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Baths
            <input
              type="number"
              min={0}
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.baths}
              onChange={(event) => update("baths", event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Frequency *
            <select
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.frequency}
              onChange={(event) =>
                update("frequency", event.target.value)
              }
              required
            >
              <option value="">Select</option>
              <option value="one-time">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            Condition *
            <select
              className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={form.condition}
              onChange={(event) =>
                update("condition", event.target.value)
              }
              required
            >
              <option value="">Select</option>
              <option value="light">Light</option>
              <option value="normal">Normal</option>
              <option value="heavy">Heavy</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
          Message (optional)
          <textarea
            rows={4}
            className="rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
          />
        </label>

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          aria-hidden="true"
        />

        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-cloud-200 text-brand-600 focus:ring-brand-400"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
            required
          />
          <span>
            Text me about my quote. I understand Eva Home Cleaning may
            follow up about my request.
          </span>
        </label>

        {status === "error" && error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {status === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Thanks! Eva will reply shortly to ask a few quick questions.
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending..." : "Get a Free Quote"}
        </button>
      </form>
    </div>
  );
}
