"use client";

import { useState } from "react";

const industries = [
  "Handwerk & Bau",
  "Gastronomie & Food",
  "Kosmetik & Beauty",
  "Gesundheit & Fitness",
  "Einzelhandel",
  "Dienstleistung & Beratung",
  "Immobilien",
  "Andere",
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  branche: "",
};

export function LeadCaptureForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          email: form.email || undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | { success: true }
        | null;

      if (!response.ok) {
        const message =
          payload && "error" in payload ? payload.error : "Could not submit the lead.";
        throw new Error(message);
      }

      setForm(initialState);
      setMessage("Lead captured successfully.");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Max Mustermann"
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="max@example.com"
          />
        </label>
      </div>

      <div className="field-grid">
        <label className="field">
          <span>Phone</span>
          <input
            required
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            placeholder="+41 79 000 00 00"
          />
        </label>
        <label className="field">
          <span>Industry</span>
          <select
            required
            value={form.branche}
            onChange={(event) =>
              setForm((current) => ({ ...current, branche: event.target.value }))
            }
          >
            <option value="">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>
      </div>

      {message ? <p className="message-success">{message}</p> : null}
      {error ? <p className="message-error">{error}</p> : null}

      <button className="button button-primary form-submit" disabled={loading} type="submit">
        {loading ? "Submitting..." : "Save lead to MongoDB"}
      </button>
    </form>
  );
}
