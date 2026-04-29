const HUGGINGFACE_MODEL = "bilalRahib/TinyLLama-NSFW-Chatbot";
const HUGGINGFACE_URL = `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`;

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

    console.log(`[${new Date().toISOString()}] Chat API called:`, { question, knowledgeLength: knowledgeText.length });

    if (!question) {
      return Response.json({ error: "Question is required." }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    console.log("HUGGINGFACE_API_KEY present:", !!apiKey);
    if (!apiKey) {
      console.warn("Missing HUGGINGFACE_API_KEY, returning fallback answer.");
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    let hfResponse: Response;
    try {
      hfResponse = await fetch(HUGGINGFACE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          inputs: `<|system|>\nDu bist ein hilfreicher Assistent für webseitig (Schweizer Webdesign-Agentur).\nNutze folgendes Wissen: ${knowledgeText}.\n\nWICHTIG: Wenn der Nutzer Interesse an unseren Services zeigt, ein Angebot möchte oder eine Webseite kaufen will, MUSST du ihm anbieten, seine Daten direkt hier im Chat aufzunehmen. Sage: "Möchtest du, dass ich deine Daten für eine unverbindliche Anfrage direkt hier im Chat aufnehme?"</s>\n<|user|>\n${question}</s>\n<|assistant|>\n`,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      });
    } catch (fetchError: any) {
      console.error("HF fetch failed details:", {
        message: fetchError?.message,
        stack: fetchError?.stack,
        url: HUGGINGFACE_URL
      });
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    const responseText = await hfResponse.text();
    console.log("HF status:", hfResponse.status, "Response start:", responseText.substring(0, 100));

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("HF Response is not JSON:", responseText);
      data = null;
    }

    if (!hfResponse.ok) {
      const errorMsg = data?.error || responseText || "HF request failed";
      console.error("HF ERROR:", hfResponse.status, errorMsg);
      
      if (errorMsg.toLowerCase().includes("loading")) {
        return asChatResponse(MODEL_LOADING_TEXT);
      }
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    const generatedText = 
      data?.choices?.[0]?.message?.content || 
      data?.generated_text || 
      (Array.isArray(data) ? data[0]?.generated_text : null);

    if (!generatedText) {
      console.error("Unexpected HF response shape. Full body:", data || responseText);
      return asChatResponse(FALLBACK_CHAT_TEXT);
    }

    console.log("AI success, response length:", generatedText.length);
    return Response.json([{ generated_text: generatedText }]);
  } catch (error: any) {
    console.error("API route error:", error?.message || error);
    return asChatResponse(FALLBACK_CHAT_TEXT);
  }
}