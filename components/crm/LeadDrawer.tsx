"use client";

import { useState, useEffect } from "react";
import { type Lead, type LeadStatus } from "@/lib/api-client";

const STATUS_LABELS: Record<LeadStatus, string> = {
  neu: "Neu",
  kontakt: "In Kontakt",
  qualifiziert: "Qualifiziert",
  gewonnen: "Gewonnen",
  verloren: "Verloren",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  neu: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  kontakt: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  qualifiziert: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  gewonnen: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  verloren: "bg-red-500/15 text-red-400 border-red-500/30",
};

interface Props {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (lead: Lead, status: LeadStatus) => Promise<void>;
  onNotesSave: (lead: Lead, notes: string) => Promise<void>;
  onDelete: (lead: Lead) => Promise<void>;
}

export default function LeadDrawer({
  lead,
  onClose,
  onStatusChange,
  onNotesSave,
  onDelete,
}: Props) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNotes(lead.notes ?? "");
    setSaved(false);
  }, [lead._id, lead.notes]);

  async function handleSaveNotes() {
    setSaving(true);
    try {
      await onNotesSave(lead, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1a1a1a] border-l border-white/[0.07] z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07] shrink-0">
          <h2 className="font-bold text-white text-base">{lead.name}</h2>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Status selector */}
          <div>
            <label className="block text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {(["neu", "kontakt", "qualifiziert", "gewonnen", "verloren"] as LeadStatus[]).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(lead, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition
                      ${lead.status === s
                        ? STATUS_COLORS[s]
                        : "bg-transparent border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
                      }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Info fields */}
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-1">
                WhatsApp / Telefon
              </div>
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#C8F135] hover:underline"
              >
                {lead.phone}
              </a>
            </div>

            {lead.email && (
              <div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-1">
                  E-Mail
                </div>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sm text-[#C8F135] hover:underline"
                >
                  {lead.email}
                </a>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-1">
                Branche
              </div>
              <div className="text-sm text-white">{lead.branche}</div>
            </div>

            <div>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-1">
                Erstellt am
              </div>
              <div className="text-sm text-white/50">{formatDate(lead.createdAt)}</div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">
              Notizen
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Notizen zum Lead…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#C8F135]/40 resize-none transition"
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="mt-2 px-4 py-2 bg-[#C8F135] hover:bg-[#d4ee56] text-[#171717] text-xs font-bold rounded-lg transition disabled:opacity-50"
            >
              {saving ? "Speichert…" : saved ? "✓ Gespeichert" : "Speichern"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.07] px-6 py-4 shrink-0">
          <button
            onClick={() => onDelete(lead)}
            className="w-full py-2.5 rounded-xl border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition"
          >
            Lead löschen
          </button>
        </div>
      </div>
    </>
  );
}
