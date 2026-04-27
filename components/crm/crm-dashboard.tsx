"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteLead,
  getLeads,
  getStats,
  updateLead,
  type Lead,
  type LeadStatus,
  type LeadsResponse,
  type StatsResponse,
} from "@/lib/api-client";
import LeadDrawer from "@/components/crm/LeadDrawer";
import Pagination from "@/components/Pagination"; // adjust path as needed
import Link from "next/link";

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

type DashboardProps = {
  initialLeads: LeadsResponse;
  initialStats: StatsResponse;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function CrmDashboard({ initialLeads, initialStats }: DashboardProps) {
  const router = useRouter();
  const [stats, setStats] = useState<StatsResponse | null>(initialStats);
  const [leads, setLeads] = useState<Lead[]>(initialLeads.leads);
  const [total, setTotal] = useState(initialLeads.total);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("alle");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // ── Pagination state ──────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // ─────────────────────────────────────────────────────────────────────────

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, leadData] = await Promise.all([
        getStats(),
        getLeads({
          status: statusFilter,
          search,
          // Pass pagination params to your API — add these fields to getLeads() if not already supported
          page: currentPage,
          limit: recordsPerPage,
        }),
      ]);
      setStats(statsData);
      setLeads(leadData.leads);
      setTotal(leadData.total);
      setSelectedLead((current) =>
        current
          ? leadData.leads.find((lead) => lead._id === current._id) ?? null
          : null,
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        router.push("/crm");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }, [router, search, statusFilter, currentPage, recordsPerPage]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // Reset to page 1 whenever filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchInput), 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  async function handleStatusChange(lead: Lead, status: LeadStatus) {
    try {
      const { lead: updated } = await updateLead(lead._id, { status });
      setLeads((previous) =>
        previous.map((item) => (item._id === updated._id ? updated : item)),
      );
      if (selectedLead?._id === updated._id) setSelectedLead(updated);
      void fetchData();
    } catch {}
  }

  async function handleDelete(lead: Lead) {
    if (!window.confirm(`Lead von ${lead.name} wirklich loschen?`)) return;
    await deleteLead(lead._id);
    setLeads((previous) => previous.filter((item) => item._id !== lead._id));
    if (selectedLead?._id === lead._id) setSelectedLead(null);
    void fetchData();
  }

  async function handleNotesSave(lead: Lead, notes: string) {
    const { lead: updated } = await updateLead(lead._id, { notes });
    setLeads((previous) =>
      previous.map((item) => (item._id === updated._id ? updated : item)),
    );
    setSelectedLead(updated);
  }

  return (
    <div className="min-h-screen bg-[#171717] flex flex-col">
      <header className="border-b border-white/[0.07] px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="text-white flex items-center gap-2 text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0"
        >
          <img src="/NavbarLogo.svg" alt="Logo" className="w-36" />
        </Link>
        <button
          onClick={() => void logout()}
          className="text-xs text-white/30 hover:text-white/60 transition"
        >
          Ausloggen
        </button>
      </header>

      <div className="flex-1 px-4 sm:px-6 py-5 sm:py-6 max-w-7xl mx-auto w-full">
        {/* ── Stats ── */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {Object.entries({
            total: stats?.total ?? 0,
            neu: stats?.neu ?? 0,
            kontakt: stats?.kontakt ?? 0,
            qualifiziert: stats?.qualifiziert ?? 0,
            gewonnen: stats?.gewonnen ?? 0,
            verloren: stats?.verloren ?? 0,
          }).map(([key, value]) => (
            <div
              key={key}
              className="bg-[#1c1c1c] border border-white/[0.07] rounded-xl p-3 sm:p-4"
            >
              <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${STAT_STYLES[key]?.dot}`}
                />
                <span className="text-[10px] sm:text-xs text-white/40 truncate">
                  {STAT_LABELS[key] ?? key}
                </span>
              </div>
              <div
                className={`text-xl sm:text-2xl font-bold ${STAT_STYLES[key]?.num}`}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-5">
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === key
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
            placeholder="Suchen..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="sm:ml-auto bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-[#C8E646]/40 transition w-full sm:w-56"
          />
        </div>

        {/* ── Table ── */}
        <div className="bg-[#1c1c1c] border border-white/[0.07] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-white/30 text-sm">
              Wird geladen...
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="text-4xl">Inbox</div>
              <p className="text-white/30 text-sm">Keine Leads gefunden</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {["Name", "Telefon", "Branche", "Status", "Datum", ""].map(
                        (heading) => (
                          <th
                            key={heading}
                            className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-semibold text-white/30 uppercase tracking-widest whitespace-nowrap"
                          >
                            {heading}
                          </th>
                        ),
                      )}
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
                          <div className="font-medium text-white text-sm">
                            {lead.name}
                          </div>
                          {lead.email ? (
                            <div className="text-xs text-white/30 mt-0.5 truncate max-w-[120px]">
                              {lead.email}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 sm:px-5 py-3 text-white/60 text-sm whitespace-nowrap">
                          {lead.phone}
                        </td>
                        <td className="px-4 sm:px-5 py-3 text-white/60 text-sm">
                          <span className="truncate block max-w-[100px]">
                            {lead.branche}
                          </span>
                        </td>
                        <td
                          className="px-4 sm:px-5 py-3"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <select
                            value={lead.status}
                            onChange={(event) =>
                              void handleStatusChange(
                                lead,
                                event.target.value as LeadStatus,
                              )
                            }
                            className={`text-xs font-semibold border rounded-lg px-2 py-1 outline-none cursor-pointer bg-transparent transition ${STATUS_COLORS[lead.status]}`}
                          >
                            {(
                              [
                                "neu",
                                "kontakt",
                                "qualifiziert",
                                "gewonnen",
                                "verloren",
                              ] as LeadStatus[]
                            ).map((status) => (
                              <option
                                key={status}
                                value={status}
                                className="bg-[#1c1c1c] text-white"
                              >
                                {STATUS_LABELS[status]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 sm:px-5 py-3 text-white/40 text-xs whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td
                          className="px-4 sm:px-5 py-3 text-right"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            onClick={() => void handleDelete(lead)}
                            className="text-white/20 hover:text-red-400 transition text-xs px-2 py-1 rounded"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Pagination ── */}
              <Pagination
                recordsPerPage={recordsPerPage}
                setRecordsPerPage={(value) => {
                  setRecordsPerPage(value);
                  setCurrentPage(1);
                }}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalRecords={total}
                className="border-t border-white/[0.04] bg-transparent"
                recordsPerPageOptions={[10, 25, 50]}
              />
            </>
          )}
        </div>
      </div>

      {selectedLead ? (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
          onNotesSave={handleNotesSave}
          onDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}