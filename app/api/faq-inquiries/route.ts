import { NextResponse } from "next/server";
import { sendFaqInquiryEmails } from "@/lib/email";
import { createFaqInquirySchema } from "@/lib/validations/faq-inquiry";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createFaqInquirySchema.safeParse(body);
console.log('parsed',parsed.data)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const result = await sendFaqInquiryEmails(parsed.data);
    return NextResponse.json({ success: true, ...result }, { status: 200 });
  } catch (error) {
    console.error("Failed to send FAQ inquiry emails.", error);
    const details = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "We could not send your message right now. Please try again later.",
        ...(process.env.NODE_ENV !== "production" ? { details } : {}),
      },
      { status: 500 },
    );
  }
}
