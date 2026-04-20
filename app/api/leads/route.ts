import { NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/leads";
import { requireAuth } from "@/lib/auth";
import { sendLeadCaptureEmails } from "@/lib/email";
import { createLeadSchema, leadQuerySchema } from "@/lib/validations/lead";

export async function GET(request: Request) {
  const authenticated = await requireAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const parsed = leadQuerySchema.safeParse({
    status: url.searchParams.get("status") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    page: url.searchParams.get("page") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query parameters." }, { status: 400 });
  }

  const data = await listLeads(parsed.data);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = await createLead(parsed.data);

  try {
    const emailResult = await sendLeadCaptureEmails({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      branche: parsed.data.branche,
    });

    return NextResponse.json({ success: true, lead, ...emailResult }, { status: 201 });
  } catch (error) {
    console.error("Lead saved but email sending failed.", error);

    return NextResponse.json(
      {
        success: true,
        lead,
        adminSent: false,
        senderSent: false,
        ...(process.env.NODE_ENV !== "production" && error instanceof Error
          ? { emailError: error.message }
          : {}),
      },
      { status: 201 },
    );
  }
}
