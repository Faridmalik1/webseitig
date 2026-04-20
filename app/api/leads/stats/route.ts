import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getLeadStats } from "@/lib/leads";

export async function GET() {
  const authenticated = await requireAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getLeadStats();
  return NextResponse.json(stats);
}
