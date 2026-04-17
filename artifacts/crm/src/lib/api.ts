export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api").replace(/\/$/, "");

function getKey(): string {
  return sessionStorage.getItem("crm_admin_key") ?? "";
}

function headers(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Admin-Key": getKey(),
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: headers() });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export type LeadStatus = "neu" | "kontakt" | "qualifiziert" | "gewonnen" | "verloren";

export interface Lead {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  branche: string;
  status: LeadStatus;
  notes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
}

export interface StatsResponse {
  neu: number;
  kontakt: number;
  qualifiziert: number;
  gewonnen: number;
  verloren: number;
  total: number;
}

export async function getLeads(params?: {
  status?: string;
  search?: string;
  page?: number;
}): Promise<LeadsResponse> {
  const q = new URLSearchParams();
  if (params?.status && params.status !== "alle") q.set("status", params.status);
  if (params?.search) q.set("search", params.search);
  if (params?.page) q.set("page", String(params.page));
  return request<LeadsResponse>(`/leads?${q}`);
}

export async function getStats(): Promise<StatsResponse> {
  return request<StatsResponse>("/leads/stats");
}

export async function updateLead(
  id: string,
  data: { status?: LeadStatus; notes?: string },
): Promise<{ lead: Lead }> {
  return request<{ lead: Lead }>(`/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteLead(id: string): Promise<void> {
  await request(`/leads/${id}`, { method: "DELETE" });
}
