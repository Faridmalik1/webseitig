import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { deleteLead, updateLead } from "@/lib/leads";
import { updateLeadSchema } from "@/lib/validations/lead";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const authenticated = await requireAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = updateLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { id } = await context.params;
  const lead = await updateLead(id, parsed.data);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  return NextResponse.json({ lead });
}

export async function DELETE(_: Request, context: RouteContext) {
  const authenticated = await requireAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteLead(id);
  return NextResponse.json({ success: true });
}
