const HUGGINGFACE_MODEL_URL =
  "https://api-inference.huggingface.co/models/google/flan-t5-base";

const FALLBACK_CHAT_TEXT =
  "Das ist eine interessante Frage, aber ich habe nur Informationen zu webseitig und unseren Website-Services. Wie kann ich dir bei Fragen zu Services, Preisen, Kontakt oder anderen Themen helfen?";

const MODEL_LOADING_TEXT =
  "Das Modell wird gerade geladen. Bitte versuche es in 20 Sekunden erneut.";

function asChatResponse(text: string) {
  return Response.json([{ generated_text: text }]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question =
      typeof body?.question === "string" ? body.question.trim() : "";
    const knowledgeText =
      typeof body?.knowledgeText === "string" ? body.knowledgeText.trim() : "";

    if (!question) {
      return Response.json({ error: "Question is required." }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.warn("Missing HUGGINGFACE_API_KEY, returning fallback answer.");
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    let hfResponse: Response;
    try {
      hfResponse = await fetch(HUGGINGFACE_MODEL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `${knowledgeText}\n\nQuestion: ${question}`,
        }),
      });
    } catch (fetchError) {
      console.error("HF request failed before response:", fetchError);
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    const data = await hfResponse.json().catch(() => null);

    if (!hfResponse.ok) {
      const errorText =
        typeof data?.error === "string" ? data.error : "HF request failed";

      if (/loading/i.test(errorText)) {
        return asChatResponse(MODEL_LOADING_TEXT);
      }

      console.error("HF ERROR:", hfResponse.status, data);
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    return Response.json(data);
  } catch (error: unknown) {
    console.error("API route error:", error);
    return asChatResponse(FALLBACK_CHAT_TEXT);
  }
}
