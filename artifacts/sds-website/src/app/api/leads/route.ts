import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectMongoDB, isDbConnected } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { getLeadEmailConfigStatus, sendLeadEmails } from "@/lib/mailer";

const CreateLeadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1).max(50),
  branche: z.string().min(1).max(100),
});

function adminAuth(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key");
  const adminKey = process.env.CRM_ADMIN_KEY;
  return !!(adminKey && key === adminKey);
}

export async function POST(request: NextRequest) {
  await connectMongoDB();

  const body = await request.json().catch(() => ({}));
  const parse = CreateLeadSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe", details: parse.error.issues },
      { status: 400 },
    );
  }

  const data = parse.data;

  if (!isDbConnected()) {
    console.error("Lead creation blocked — DB not connected", data);
    return NextResponse.json(
      { error: "Datenbank nicht verbunden", details: ["MONGODB_URI"] },
      { status: 503 },
    );
  }

  const emailConfig = getLeadEmailConfigStatus();
  if (!emailConfig.configured) {
    console.error("Lead creation blocked — SMTP not configured", { missing: emailConfig.missing });
    return NextResponse.json(
      { error: "E-Mail Versand nicht konfiguriert", details: emailConfig.missing },
      { status: 503 },
    );
  }

  try {
    const lead = await Lead.create({
      name: data.name,
      email: data.email || undefined,
      phone: data.phone,
      branche: data.branche,
    });

    await sendLeadEmails(data);

    return NextResponse.json({ success: true, id: lead._id }, { status: 201 });
  } catch (err) {
    console.error("Failed to create lead", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectMongoDB();

  if (!isDbConnected()) {
    return NextResponse.json({ leads: [], total: 0 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Number(searchParams.get("limit")) || 50);

  const filter: Record<string, unknown> = {};
  if (status && status !== "alle") filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { branche: { $regex: search, $options: "i" } },
    ];
  }

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  return NextResponse.json({ leads, total, page, limit });
}
