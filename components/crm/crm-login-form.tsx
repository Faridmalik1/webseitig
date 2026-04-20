"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CrmLoginForm() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (response.status === 401 || !response.ok) {
        setError(true);
        return;
      }

      router.push("/crm/dashboard");
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1c1c1c] border border-white/[0.07] rounded-2xl p-8"
    >
      <h1 className="text-lg font-bold text-white mb-6">Anmelden</h1>

      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        Admin-Schlussel
      </label>
      <input
        type="password"
        value={key}
        onChange={(event) => setKey(event.target.value)}
        placeholder="••••••••••••••••"
        autoFocus
        className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition ${
          error
            ? "border-red-500/50 focus:border-red-400"
            : "border-white/10 focus:border-[#C8E646]/60"
        }`}
      />

      {error ? (
        <p className="text-red-400 text-xs mt-2">
          Ungultiger Schlussel. Bitte versuche es erneut.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!key || loading}
        className="mt-6 w-full bg-[#C8E646] hover:bg-[#d4ee56] text-[#171717] font-bold text-sm py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Wird gepruft..." : "Einloggen"}
      </button>
    </form>
  );
}
