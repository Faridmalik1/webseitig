import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB, isDbConnected } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

function adminAuth(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key");
  const adminKey = process.env.CRM_ADMIN_KEY;
  return !!(adminKey && key === adminKey);
}

export async function GET(request: NextRequest) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectMongoDB();

  if (!isDbConnected()) {
    return NextResponse.json({
      neu: 0,
      kontakt: 0,
      qualifiziert: 0,
      gewonnen: 0,
      verloren: 0,
      total: 0,
    });
  }

  const stats = await Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);

  const result: Record<string, number> = {
    neu: 0,
    kontakt: 0,
    qualifiziert: 0,
    gewonnen: 0,
    verloren: 0,
    total: 0,
  };

  for (const s of stats) {
    result[s._id as string] = s.count;
    result.total += s.count;
  }

  return NextResponse.json(result);
}
