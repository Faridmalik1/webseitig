// const API_URL = "https://api.openai.com/v1/chat/completions";
// const MODEL = "gpt-3.5-turbo";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const MODEL_LOADING_TEXT =
  "Das Modell wird gerade geladen. Bitte versuche es in 20 Sekunden erneut.";

function asChatResponse(text: string) {
  return Response.json({ answer: text });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    const knowledgeText = typeof body?.knowledgeText === "string" ? body.knowledgeText.trim() : "";

    console.log(`[${new Date().toISOString()}] Chat API called:`, { question });

    if (!question) {
      return Response.json({ error: "Question is required." }, { status: 400 });
    }

    // It will automatically use OpenAI if GROQ is not found
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return asChatResponse("API-Schlüssel fehlt. Bitte trage deinen GROQ_API_KEY in die .env Datei ein.");
    }

    let apiResponse: Response;
    try {
      console.log("DEBUG: Calling AI URL:", API_URL);

      apiResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
content: `Du bist ein hilfreicher und höflicher Assistent für webseitig (Schweizer Webdesign-Agentur).

WICHTIG: Antworte IMMER auf Schweizer Hochdeutsch (lokalisiertes Deutsch), egal in welcher Sprache der Nutzer schreibt. Wechsle niemals die Sprache.
Sei stets freundlich, respektvoll und professionell in deiner Kommunikation.

Beantworte Fragen basierend auf diesem Kontext: ${knowledgeText}.
NUR wenn der Nutzer Interesse an unseren Dienstleistungen zeigt, füge am Ende hinzu: "Möchtest du, dass ich deine Daten für eine unverbindliche Anfrage direkt hier im Chat aufnehme?"`
//               role: "system",
//               content: `Du bist ein hilfreicher und freundlicher Assistent für webseitig (Schweizer Webdesign-Agentur). 
// Beantworte Fragen basierend auf diesem Kontext: ${knowledgeText}. 
// NUR wenn der Nutzer Interesse an unseren Dienstleistungen zeigt, füge am Ende hinzu: "Möchtest du, dass ich deine Daten für eine unverbindliche Anfrage direkt hier im Chat aufnehme?"`
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
    } catch (error: any) {
      console.error("DEBUG: AI fetch failed:", error.message);
      return asChatResponse(`Fetch failed: ${error.message}`);
    }

    const responseText = await apiResponse.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Response is not JSON:", responseText);
      data = null;
    }

    if (!apiResponse.ok) {
      const errorMsg = data?.error?.message || data?.error || responseText || "Request failed";
      console.error("AI ERROR:", apiResponse.status, errorMsg);
      return asChatResponse(`API Error (${apiResponse.status}): ${errorMsg}`);
    }

    // OpenAI / Groq standard response extraction
    const generatedText = data?.choices?.[0]?.message?.content;

    if (!generatedText) {
      console.error("Unexpected response shape. Full body:", data || responseText);
      return asChatResponse(`Unexpected response shape: ${JSON.stringify(data || responseText)}`);
    }

    console.log("AI SUCCESS RESPONSE:", generatedText.substring(0, 50) + "...");
    return Response.json({ answer: generatedText });
  } catch (error: any) {
    console.error("API route error:", error?.message || error);
    return Response.json({ answer: `Internal Server Error: ${error?.message || error}` });
  }
}
