export const API_BASE_URL = "/api";

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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

export async function getLeads(params?: {
  status?: string;
  search?: string;
  page?: number;
}): Promise<LeadsResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "alle") query.set("status", params.status);
  if (params?.search) query.set("search", params.search);
  if (params?.page) query.set("page", String(params.page));
  return request<LeadsResponse>(`/leads?${query.toString()}`);
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
  await request(`/leads/${id}`, {
    method: "DELETE",
  });
}
