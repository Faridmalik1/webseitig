import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmails } from "@/lib/mailer";

const SubmitContactBody = z.object({
  name: z.string().describe("Full name of the submitter"),
  email: z.string().email().describe("Email address"),
  phone: z.string().optional().describe("Phone number (optional)"),
  subject: z.string().optional().describe("Subject or inquiry type"),
  message: z.string().describe("Message content"),
  language: z.string().optional().describe("Locale language code (en, ar)"),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parseResult = SubmitContactBody.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });
  }

  try {
    await sendContactEmails(parseResult.data);
    return NextResponse.json({ success: true, message: "Your message has been sent successfully." });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
