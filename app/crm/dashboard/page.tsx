import { redirect } from "next/navigation";
import { CrmDashboard } from "@/components/crm/crm-dashboard";
import { getLeadStats, listLeads } from "@/lib/leads";
import { isAuthenticated } from "@/lib/auth";

export default async function CrmDashboardPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/crm");
  }

  const [stats, leadData] = await Promise.all([
    getLeadStats(),
    listLeads({ page: 1, limit: 50 }),
  ]);

  return <CrmDashboard initialLeads={leadData} initialStats={stats} />;
}
