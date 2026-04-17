import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import {
  getLeads,
  getStats,
  updateLead,
  deleteLead,
  type Lead,
  type LeadStatus,
  type StatsResponse,
} from "../lib/api";
import LeadDrawer from "../components/LeadDrawer";

const STATUS_LABELS: Record<string, string> = {
  alle: "Alle",
  neu: "Neu",
  kontakt: "In Kontakt",
  qualifiziert: "Qualifiziert",
  gewonnen: "Gewonnen",
  verloren: "Verloren",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  neu: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  kontakt: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  qualifiziert: "bg-purple-500/15 text-purple-300 border-purple-500/25",
  gewonnen: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  verloren: "bg-red-500/15 text-red-400 border-red-500/25",
};

const STAT_STYLES: Record<string, { dot: string; num: string }> = {
  total: { dot: "bg-white/30", num: "text-white" },
  neu: { dot: "bg-blue-400", num: "text-blue-300" },
  kontakt: { dot: "bg-amber-400", num: "text-amber-300" },
  qualifiziert: { dot: "bg-purple-400", num: "text-purple-300" },
  gewonnen: { dot: "bg-emerald-400", num: "text-emerald-300" },
  verloren: { dot: "bg-red-400", num: "text-red-400" },
};

const STAT_LABELS: Record<string, string> = {
  total: "Gesamt",
  neu: "Neu",
  kontakt: "Kontakt",
  qualifiziert: "Qualif.",
  gewonnen: "Gewonnen",
  verloren: "Verloren",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("alle");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  function logout() {
    sessionStorage.removeItem("crm_admin_key");
    navigate("/");
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [s, l] = await Promise.all([
        getStats(),
        getLeads({ status: statusFilter, search }),
      ]);
      setStats(s);
      setLeads(l.leads);
      setTotal(l.total);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        sessionStorage.removeItem("crm_admin_key");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  async function handleStatusChange(lead: Lead, status: LeadStatus) {
    try {
      const { lead: updated } = await updateLead(lead._id, { status });
      setLeads((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
      if (selectedLead?._id === updated._id) setSelectedLead(updated);
      fetchData();
    } catch {}
  }

  async function handleDelete(lead: Lead) {
    if (!confirm(`Lead von ${lead.name} wirklich löschen?`)) return;
    await deleteLead(lead._id);
    setLeads((prev) => prev.filter((l) => l._id !== lead._id));
    if (selectedLead?._id === lead._id) setSelectedLead(null);
    fetchData();
  }

  async function handleNotesSave(lead: Lead, notes: string) {
    const { lead: updated } = await updateLead(lead._id, { notes });
    setLeads((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
    setSelectedLead(updated);
  }

  return (
    <div className="min-h-screen bg-[#171717] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/[0.07] px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-black tracking-tight text-white">
            web<span className="text-[#C8E646]">.</span>seitig
          </span>
          <span className="text-white/20 text-sm hidden sm:inline">/ CRM</span>
        </div>
        <button
          onClick={logout}
          className="text-xs text-white/30 hover:text-white/60 transition"
        >
          Ausloggen
        </button>
      </header>

      <div className="flex-1 px-4 sm:px-6 py-5 sm:py-6 max-w-7xl mx-auto w-full">
        {/* Stats — responsive 3-col on mobile, 6-col on lg */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {Object.entries({
            total: stats?.total ?? 0,
            neu: stats?.neu ?? 0,
            kontakt: stats?.kontakt ?? 0,
            qualifiziert: stats?.qualifiziert ?? 0,
            gewonnen: stats?.gewonnen ?? 0,
            verloren: stats?.verloren ?? 0,
          }).map(([key, val]) => (
            <div
              key={key}
              className="bg-[#1c1c1c] border border-white/[0.07] rounded-xl p-3 sm:p-4"
            >
              <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STAT_STYLES[key]?.dot}`} />
                <span className="text-[10px] sm:text-xs text-white/40 truncate">
                  {STAT_LABELS[key] ?? key}
                </span>
              </div>
              <div className={`text-xl sm:text-2xl font-bold ${STAT_STYLES[key]?.num}`}>
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-5">
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition
                  ${statusFilter === key
                    ? "bg-[#C8E646] text-[#171717]"
                    : "bg-white/[0.04] text-white/50 hover:text-white/80 hover:bg-white/[0.07]"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <input
            type="search"
            placeholder="Suchen…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="sm:ml-auto bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-[#C8E646]/40 transition w-full sm:w-56"
          />
        </div>

        {/* Table */}
        <div className="bg-[#1c1c1c] border border-white/[0.07] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-white/30 text-sm">
              Wird geladen…
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="text-4xl">📭</div>
              <p className="text-white/30 text-sm">Keine Leads gefunden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Name", "Telefon", "Branche", "Status", "Datum", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-semibold text-white/30 uppercase tracking-widest whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      onClick={() => setSelectedLead(lead)}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition"
                    >
                      <td className="px-4 sm:px-5 py-3">
                        <div className="font-medium text-white text-sm">{lead.name}</div>
                        {lead.email && (
                          <div className="text-xs text-white/30 mt-0.5 truncate max-w-[120px]">{lead.email}</div>
                        )}
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-white/60 text-sm whitespace-nowrap">{lead.phone}</td>
                      <td className="px-4 sm:px-5 py-3 text-white/60 text-sm">
                        <span className="truncate block max-w-[100px]">{lead.branche}</span>
                      </td>
                      <td className="px-4 sm:px-5 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead, e.target.value as LeadStatus)
                          }
                          className={`text-xs font-semibold border rounded-lg px-2 py-1 outline-none cursor-pointer bg-transparent transition ${STATUS_COLORS[lead.status]}`}
                        >
                          {(["neu", "kontakt", "qualifiziert", "gewonnen", "verloren"] as LeadStatus[]).map(
                            (s) => (
                              <option key={s} value={s} className="bg-[#1c1c1c] text-white">
                                {STATUS_LABELS[s]}
                              </option>
                            ),
                          )}
                        </select>
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-white/40 text-xs whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td
                        className="px-4 sm:px-5 py-3 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleDelete(lead)}
                          className="text-white/20 hover:text-red-400 transition text-xs px-2 py-1 rounded"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 sm:px-5 py-3 text-xs text-white/25 border-t border-white/[0.04]">
                {total} Lead{total !== 1 ? "s" : ""} gefunden
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead detail drawer */}
      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
          onNotesSave={handleNotesSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
