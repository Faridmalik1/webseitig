import { useState } from "react";
import { useLocation } from "wouter";
import { API_BASE_URL } from "../lib/api";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`${API_BASE_URL}/leads/stats`, {
        headers: { "X-Admin-Key": key },
      });
      if (res.status === 401) {
        setError(true);
      } else {
        sessionStorage.setItem("crm_admin_key", key);
        navigate("/dashboard");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-2xl font-black tracking-tight text-white mb-1">
            web<span className="text-[#C8E646]">.</span>seitig
          </div>
          <div className="text-sm text-white/40">CRM — Interner Bereich</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1c1c1c] border border-white/[0.07] rounded-2xl p-8"
        >
          <h1 className="text-lg font-bold text-white mb-6">Anmelden</h1>

          <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
            Admin-Schlüssel
          </label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="••••••••••••••••"
            autoFocus
            className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition
              ${error ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-[#C8E646]/60"}`}
          />

          {error && (
            <p className="text-red-400 text-xs mt-2">Ungültiger Schlüssel. Bitte versuche es erneut.</p>
          )}

          <button
            type="submit"
            disabled={!key || loading}
            className="mt-6 w-full bg-[#C8E646] hover:bg-[#d4ee56] text-[#171717] font-bold text-sm py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Wird geprüft…" : "Einloggen"}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          Snow Dream Studios GmbH · Nur für autorisierte Mitarbeiter
        </p>
      </div>
    </div>
  );
}
