import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectMongoDB, isDbConnected } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

const UpdateLeadSchema = z.object({
  status: z
    .enum(["neu", "kontakt", "qualifiziert", "gewonnen", "verloren"])
    .optional(),
  notes: z.string().max(2000).optional(),
});

function adminAuth(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key");
  const adminKey = process.env.CRM_ADMIN_KEY;
  return !!(adminKey && key === adminKey);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectMongoDB();

  const body = await request.json().catch(() => ({}));
  const parse = UpdateLeadSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });
  }

  if (!isDbConnected()) {
    return NextResponse.json({ error: "Datenbank nicht verbunden" }, { status: 503 });
  }

  const lead = await Lead.findByIdAndUpdate(
    id,
    { $set: parse.data },
    { new: true, runValidators: true },
  ).lean();

  if (!lead) {
    return NextResponse.json({ error: "Lead nicht gefunden" }, { status: 404 });
  }

  return NextResponse.json({ lead });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectMongoDB();

  if (!isDbConnected()) {
    return NextResponse.json({ error: "Datenbank nicht verbunden" }, { status: 503 });
  }

  await Lead.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
