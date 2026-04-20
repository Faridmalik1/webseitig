import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionCookie, getAdminKey } from "@/lib/auth";

const loginSchema = z.object({
  key: z.string().min(1, "Admin key is required."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const adminKey = getAdminKey();
  if (!adminKey || parsed.data.key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(createSessionCookie());
  return response;
}
