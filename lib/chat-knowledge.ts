export type KnowledgeEntry = {
  keywords: string[];
  answer: string;
};

export type LeadStep = "start" | "name" | "email" | "phone" | "branche" | "confirm";

export type LeadData = {
  step: LeadStep;
  name?: string;
  email?: string;
  phone?: string;
  branche?: string;
};

export type ChatResponse = {
  message: string;
  options?: string[];
  leadData?: LeadData;
  isFallback?: boolean;
};

export const KNOWN_ANSWERS: KnowledgeEntry[] = [
  // Conversational responses
  {
    keywords: ["hello", "hi", "hey", "guten tag", "grüezi", "hallo"],
    answer:
      "Hallo! Schön, dass du da bist. Wie kann ich dir bei Fragen zu webseitig helfen? Ich habe Informationen zu Services, Preisen, Kontakt und mehr.",
  },
  {
    keywords: ["how are you", "wie gehts", "wie geht es dir", "how do you do"],
    answer:
      "Mir geht es gut, danke! Ich bin hier, um dir bei Fragen zu webseitig zu helfen. Was möchtest du wissen über unsere Website-Services?",
  },
  {
    keywords: ["thank you", "thanks", "danke", "vielen dank"],
    answer:
      "Gerne geschehen! Wenn du weitere Fragen zu webseitig hast, lass es mich wissen.",
  },
  {
    keywords: ["bye", "goodbye", "tschüss", "auf wiedersehen"],
    answer:
      "Auf Wiedersehen! Besuche uns bald wieder auf web-seitig.ch.",
  },
  // Company and brand
  {
    keywords: ["webseitig", "web-seitig", "company"],
    answer:
      "webseitig bieten professionelle Website-Erstellung, Design, Hosting und laufende Betreuung für Schweizer KMU.",
  },
  {
    keywords: ["service", "services", "offer", "angebote", "leistungen"],
    answer:
      "webseitig bietet Website-Design, Entwicklung, Hosting, Kontaktformulare, SEO-Grundlagen, Google Maps-Integration und laufenden Support für Schweizer kleine und mittelständische Unternehmen.",
  },
  {
    keywords: ["pricing", "price", "cost", "plan", "paket", "monat"],
    answer:
      "Die Preise richten sich nach den gewählten Paketen. Es gibt Starter- und Business-Pro-Pakete mit Leistungen wie Hosting, Domain, SEO und Google Maps. Für ein individuelles Angebot sollten Sie ein Erstgespräch vereinbaren.",
  },
  {
    keywords: ["feature", "features", "funktionen", "benefits"],
    answer:
      "Die Website betont moderne, mobile-optimierte Layouts, hohe Performance, professionelle Darstellung, nützliche Kontaktformulare und grundlegende SEO-Optimierung.",
  },
  {
    keywords: ["portfolio", "work", "projects", "examples", "referenzen"],
    answer:
      "Im Portfolio werden frühere Website-Projekte und Referenzen gezeigt, damit Besucher die Qualität und Vielfalt der Webdesign-Lösungen sehen können.",
  },
  {
    keywords: ["testimonial", "review", "customer", "client", "feedback"],
    answer:
      "Testimonials auf der Website zeigen zufriedene Kundenerfahrungen und stärken das Vertrauen in die angebotenen Webdesign- und Betreuungslösungen.",
  },
  {
    keywords: ["contact", "kontakt", "email", "telephone", "support"],
    answer:
      "Sie können webseitig über hello@webseitig.ch kontaktieren. Die Website bietet ein Kontaktformular, mit dem Sie Anfragen schnell an das Team senden können.",
  },
  {
    keywords: ["impressum", "legal", "unternehmen", "adresse", "zürich"],
    answer:
      "Im Impressum wird webseitig genannt mit Sitz in Schärenmoosstrasse 77, 8052 Zürich. Kontakt per E-Mail: hello@webseitig.ch und Web: web-seitig.ch.",
  },
  {
    keywords: ["datenschutz", "privacy", "data", "daten"],
    answer:
      "Die Datenschutzerklärung von webseitig beschreibt Prinzipien wie Rechtmäßigkeit, Zweckbindung, Datensparsamkeit, Integrität und Vertraulichkeit sowie die Verarbeitung technischer Besucherdaten und Kontaktanfragen.",
  },
  {
    keywords: ["cookies", "tracking", "analytics", "google analytics"],
    answer:
      "webseitig verwendet technisch notwendige Cookies für die Website-Funktion. Mit Einwilligung kann Google Analytics genutzt werden, wobei die IP-Adresse anonymisiert wird.",
  },
  {
    keywords: ["hosting", "server", "hosting provider"],
    answer:
      "Die Website und Kunden-Websites werden bei einem europäischen Hosting-Anbieter gehostet. Daten werden in der Schweiz oder der EU verarbeitet.",
  },
  {
    keywords: ["contact form", "contactformular", "frage", "anfrage"],
    answer:
      "Beim Ausfüllen des Kontaktformulars werden Name, E-Mail-Adresse, Telefonnummer optional und Anfragedetails erfasst. Diese Daten werden zur Bearbeitung Ihrer Anfrage verwendet.",
  },
  {
    keywords: ["rights", "rechte", "auskunft", "löschung", "datenschutzrechte"],
    answer:
      "Sie haben das Auskunftsrecht, Berichtigungsrecht, Löschungsrecht, Recht auf Datenportabilität, Widerspruchsrecht und das Beschwerderecht beim EDÖB.",
  },
  {
    keywords: ["agb", "terms", "vertrag", "kündigung", "laufzeit"],
    answer:
      "Die AGB regeln die Vertragserstellung von webseitig, die Mindestlaufzeit von 12 Monaten, die Zahlungsbedingungen in CHF und Kündigungsfristen von 3 Monaten zum Laufzeitende.",
  },
  {
    keywords: ["starter", "business pro", "pakete", "angebot"],
    answer:
      "Aktuelle Pakete sind Starter und Business Pro. Starter enthält bis zu fünf Seiten, Hosting und Domain. Business Pro bietet bis zu zehn Seiten, Google Maps, SEO-Optimierung und erweiterten Support.",
  },
  {
    keywords: ["lieferung", "abnahme", "Änderung", "mängel"],
    answer:
      "Nach Fertigstellung erhalten Kunden einen Freigabe-Link. Sie haben fünf Arbeitstage zur Abnahme. Änderungswünsche ausserhalb des vereinbarten Umfangs werden separat angeboten.",
  },
  {
    keywords: ["mitwirkungspflicht", "kunde", "lieferzeit", "informationen"],
    answer:
      "Der Kunde muss alle Inhalte, Texte und Bilder rechtzeitig bereitstellen. Verzögerungen durch fehlende Informationen können die Lieferzeit verlängern.",
  },
  {
    keywords: ["haftung", "gewährleistung", "haftbar"],
    answer:
      "webseitig haftet für Vorsatz und grobe Fahrlässigkeit. Eine Haftung für mittelbare Schäden, entgangenen Gewinn oder Datenverlust ist ausgeschlossen, soweit gesetzlich zulässig.",
  },
  {
    keywords: ["urheberrecht", "nutzungsrecht", "copyright"],
    answer:
      "webseitig behält sich das Urheberrecht an eigenen Designs, Templates und Code vor. Kunden erhalten ein einfaches Nutzungsrecht nach vollständiger Bezahlung.",
  },
  {
    keywords: ["datenspeicherung", "löschung", "aufbewahrung"],
    answer:
      "Daten werden nur so lange gespeichert, wie es für den Zweck nötig ist. Kontaktanfragen 2 Jahre, Vertragsdaten und Rechnungen 10 Jahre, Website-Logs 30 Tage.",
  },
  {
    keywords: ["sicherheit", "tls", "ssl", "datensicherheit"],
    answer:
      "webseitig setzt SSL/TLS, Sicherheitsupdates, Zugriffsbeschränkungen und Datensicherungen ein, um Daten gegen unberechtigten Zugriff zu schützen.",
  },
];

const FALLBACK_ANSWER =
  "Ich habe nur Informationen zu Webseiten und unseren Website-Services. Wie kann ich dir bei Fragen zu Services, Preisen, Kontakt oder anderen Themen helfen?";

const COMPANY_CONTEXT = `
webseitig ist eine Schweizer Webdesign-Agentur mit Sitz in Zürich (Schärenmoosstrasse 77, 8052 Zürich).
Wir bieten professionelle Website-Erstellung, Design, Hosting und laufende Betreuung für Schweizer KMU.
Unsere Pakete:
- Starter: Bis zu 5 Seiten, Hosting, Domain inklusive.
- Business Pro: Bis zu 10 Seiten, Google Maps Integration, SEO-Optimierung, erweiterter Support.
Preise: Individuell nach Paket und Anforderungen. Erstgespräch ist kostenlos.
Kontakt: hello@webseitig.ch.
Mission: Moderne, mobile-optimierte Websites mit hoher Performance und nützlichen Funktionen wie Kontaktformularen.
`;

const LEAD_START_OPTIONS = ["Ja, Formular starten", "Nein, danke"];
const LEAD_CONFIRM_OPTIONS = ["Absenden", "Neu starten", "Abbrechen"];
const BRANCHE_CHOICES = [
  { value: "Handwerk & Bau", aliases: ["handwerk", "bau", "construction"] },
  { value: "Gastronomie & Food", aliases: ["gastro", "restaurant", "food"] },
  { value: "Kosmetik & Beauty", aliases: ["kosmetik", "beauty", "salon"] },
  { value: "Gesundheit & Fitness", aliases: ["gesundheit", "fitness", "health"] },
  { value: "Einzelhandel", aliases: ["einzelhandel", "retail", "shop"] },
  { value: "Dienstleistung & Beratung", aliases: ["dienstleistung", "beratung", "service"] },
  { value: "Immobilien", aliases: ["immobilien", "real estate"] },
  { value: "Andere", aliases: ["andere", "sonstige", "other"] },
];

const BRANCHE_OPTIONS = BRANCHE_CHOICES.map((entry) => entry.value);
const LEAD_INTENT_KEYWORDS = [
  "formular",
  "angebot",
  "anfrage",
  "offerte",
  "projekt",
  "zusammenarbeit",
  "website",
  "webseite",
  "service",
  "leistungen",
  "buchen",
  "kaufen",
  "bestellen",
  "erstellen",
  "bauen",
  "design",
  // "kontakt",
  // "contact",
];

function normalizeInput(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeForCompare(value: string): string {
  return normalizeInput(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isAffirmative(value: string): boolean {
  const startsWithToken = ["ja", "yes", "ok", "okay", "klar"].some(
    (token) => value === token || value.startsWith(`${token} `),
  );

  return (
    startsWithToken ||
    value.includes("formular starten") ||
    value.includes("starten") ||
    value.includes("absenden") ||
    value.includes("senden")
  );
}

function isNegative(value: string): boolean {
  return (
    value === "nein" ||
    value === "no" ||
    value.startsWith("nein") ||
    value.startsWith("no") ||
    value.includes("abbrechen") ||
    value.includes("danke") && value.includes("nein")
  );
}

function isSkipEmail(value: string): boolean {
  return (
    value === "skip" ||
    value === "überspringen" ||
    value === "ueberspringen" ||
    value === "nein" ||
    value === "keine"
  );
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const compact = value.replace(/\s+/g, "");
  return /^[\d+()\-/.]{6,}$/.test(compact);
}

function isLeadIntent(normalizedQuestion: string): boolean {
  return LEAD_INTENT_KEYWORDS.some((keyword) => normalizedQuestion.includes(keyword));
}

function resolveBranche(input: string): string | undefined {
  const normalized = normalizeForCompare(input);
  if (!normalized) {
    return undefined;
  }

  for (const choice of BRANCHE_CHOICES) {
    const normalizedValue = normalizeForCompare(choice.value);
    if (
      normalized === normalizedValue ||
      normalized.includes(normalizedValue) ||
      normalizedValue.includes(normalized)
    ) {
      return choice.value;
    }

    if (choice.aliases.some((alias) => normalized.includes(normalizeForCompare(alias)))) {
      return choice.value;
    }
  }

  return undefined;
}

function formatLeadSummary(leadData: LeadData): string {
  return [
    "Bitte bestaetige deine Angaben:",
    `Name: ${leadData.name ?? "-"}`,
    `E-Mail: ${leadData.email ?? "Nicht angegeben"}`,
    `Telefon: ${leadData.phone ?? "-"}`,
    `Branche: ${leadData.branche ?? "-"}`,
  ].join("\n");
}

async function submitLeadForm(leadData: LeadData): Promise<ChatResponse> {
  if (!leadData.name || !leadData.phone || !leadData.branche) {
    return {
      message:
        "Ein paar Pflichtfelder fehlen noch. Wir starten das Formular neu. Wie ist dein Name?",
      leadData: { step: "name" },
    };
  }

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        branche: leadData.branche,
        source: "chatbot",
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      console.error("Lead submission failed:", response.status, errorPayload);
      return {
        message:
          "Die Uebermittlung hat gerade nicht geklappt. Bitte versuche es nochmal oder waehle Neu starten.",
        options: LEAD_CONFIRM_OPTIONS,
        leadData: { ...leadData, step: "confirm" },
      };
    }

    return {
      message:
        "Perfekt, danke! Deine Anfrage wurde erfolgreich uebermittelt. Unser Team meldet sich so schnell wie moeglich.",
    };
  } catch (error) {
    console.error("Lead submission error:", error);
    return {
      message:
        "Ich konnte die Anfrage gerade nicht senden. Bitte versuche es in einem Moment erneut.",
      options: LEAD_CONFIRM_OPTIONS,
      leadData: { ...leadData, step: "confirm" },
    };
  }
}

async function handleLeadCollection(question: string, currentLeadData: LeadData): Promise<ChatResponse> {
  const answer = question.trim();
  const normalized = normalizeInput(answer);

  switch (currentLeadData.step) {
    case "start":
      if (isAffirmative(normalized)) {
        return {
          message: "Super, dann legen wir los. Wie ist dein Name?",
          leadData: { step: "name" },
        };
      }

      if (isNegative(normalized)) {
        return {
          message:
            "Alles klar. Wenn du spaeter eine Anfrage senden moechtest, sag einfach Bescheid.",
        };
      }

      return {
        message:
          "Ich kann dein Lead-Formular direkt hier im Chat aufnehmen. Soll ich starten?",
        options: LEAD_START_OPTIONS,
        leadData: { step: "start" },
        isFallback: true, // Mark this so getAnswer can decide whether to override it
      };

    case "name":
      if (answer.length < 2) {
        return {
          message: "Bitte gib einen gueltigen Namen ein.",
          leadData: currentLeadData,
        };
      }

      return {
        message:
          "Danke! Gib bitte deine E-Mail-Adresse ein (optional) oder waehle Ueberspringen.",
        options: ["Ueberspringen"],
        leadData: { ...currentLeadData, step: "email", name: answer },
      };

    case "email":
      if (isSkipEmail(normalized) || answer.length === 0) {
        return {
          message: "Alles klar. Wie lautet deine Telefonnummer?",
          leadData: { ...currentLeadData, step: "phone", email: undefined },
        };
      }

      if (!isValidEmail(answer)) {
        return {
          message: "Bitte gib eine gueltige E-Mail-Adresse ein oder waehle Ueberspringen.",
          options: ["Ueberspringen"],
          leadData: currentLeadData,
        };
      }

      return {
        message: "Danke! Wie lautet deine Telefonnummer?",
        leadData: { ...currentLeadData, step: "phone", email: answer },
      };

    case "phone":
      if (!isValidPhone(answer)) {
        return {
          message: "Bitte gib eine gueltige Telefonnummer ein.",
          leadData: currentLeadData,
        };
      }

      return {
        message: "Top. Waehle jetzt bitte deine Branche:",
        options: BRANCHE_OPTIONS,
        leadData: { ...currentLeadData, step: "branche", phone: answer },
      };

    case "branche": {
      const branche = resolveBranche(answer);
      if (!branche) {
        return {
          message: "Bitte waehle eine der Branchen-Optionen.",
          options: BRANCHE_OPTIONS,
          leadData: currentLeadData,
        };
      }

      const completedLead: LeadData = {
        ...currentLeadData,
        step: "confirm",
        branche,
      };

      return {
        message: formatLeadSummary(completedLead),
        options: LEAD_CONFIRM_OPTIONS,
        leadData: completedLead,
      };
    }

    case "confirm":
      if (normalized.includes("neu starten") || normalized.includes("restart")) {
        return {
          message: "Kein Problem, wir starten neu. Wie ist dein Name?",
          leadData: { step: "name" },
        };
      }

      if (isNegative(normalized)) {
        return {
          message:
            "Verstanden. Ich habe die Uebermittlung abgebrochen. Wenn du wieder starten willst, sag einfach Bescheid.",
        };
      }

      if (isAffirmative(normalized)) {
        return submitLeadForm(currentLeadData);
      }

      return {
        message: "Bitte waehle eine Option zum Abschliessen.",
        options: LEAD_CONFIRM_OPTIONS,
        leadData: currentLeadData,
      };

    default:
      return {
        message: "Lass uns frisch starten. Wie ist dein Name?",
        leadData: { step: "name" },
      };
  }
}

async function callAIAPI(question: string): Promise<string> {
  const relevant = KNOWN_ANSWERS
    .filter((entry) => entry.keywords.some((k) => question.toLowerCase().includes(k)))
    .slice(0, 3); // limit to 3 matches

  const knowledgeText = relevant.length
    ? relevant.map((e) => e.answer).join("\n")
    : "";

  const fullContext = `${COMPANY_CONTEXT}\n\nZusätzliches Wissen:\n${knowledgeText}`;

  console.log("Calling AI API with context length:", fullContext.length);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, knowledgeText: fullContext }),
    });

    console.log("AI API response status:", response.status);

    // First, read as text
    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse API response:", responseText);
      return FALLBACK_ANSWER;
    }

    if (!response.ok) {
      const errorMsg = data?.error || responseText || "Unknown error";

      if (
        errorMsg.includes("loading") ||
        errorMsg.includes("Loading") ||
        errorMsg.includes("No Inference Provider") ||
        errorMsg.includes("Not Found")
      ) {
        return "Das Modell wird gerade geladen. Bitte versuche es in 20 Sekunden erneut.";
      }

      console.warn(`API route error (${response.status}): ${errorMsg}`);
      return FALLBACK_ANSWER;
    }

    // Extract generated text (handle different possible formats)
    const generatedText = data?.[0]?.generated_text || data?.generated_text || responseText;

    console.log("AI API final text extracted:", {
      original: responseText.substring(0, 50) + "...",
      extracted: generatedText?.substring(0, 50) + "..."
    });

    return generatedText && generatedText.trim().length > 0
      ? generatedText.trim()
      : FALLBACK_ANSWER;
  } catch (error: any) {
    console.error("AI API fetch error details:", {
      message: error?.message || "No message",
      stack: error?.stack || "No stack",
      url: "/api/chat"
    });
    return FALLBACK_ANSWER;
  }
}

export async function getAnswer(question: string, currentLeadData?: LeadData): Promise<ChatResponse> {
  const normalized = question.toLowerCase();

  if (currentLeadData?.step) {
    const leadResponse = await handleLeadCollection(question, currentLeadData);
    
    // If we are in the 'start' phase and the user asks something else (isFallback),
    // try to answer with AI first.
    if (currentLeadData.step === "start" && leadResponse.isFallback) {
      const aiResponse = await callAIAPI(question);
      if (aiResponse !== FALLBACK_ANSWER) {
        return {
          ...leadResponse,
          message: `${aiResponse}\n\nMöchtest du trotzdem, dass ich deine Daten für eine Anfrage aufnehme?`,
          isFallback: false,
        };
      }
    }
    
    return leadResponse;
  }

  // Broad lead intent check for starting the form
  if (isLeadIntent(normalized)) {
    return {
      message:
        "Gerne! Ich kann deine Daten für eine unverbindliche Anfrage direkt hier im Chat aufnehmen. Möchtest du das Formular jetzt starten?",
      options: LEAD_START_OPTIONS,
      leadData: { step: "start" },
    };
  }

  const aiResponse = await callAIAPI(question);
  
  // Check if AI response suggests a form or inquiry
  const lowerAI = aiResponse.toLowerCase();
  const suggestsForm = [
    "direkt hier im chat aufnehmen", 
    "daten für eine unverbindliche anfrage",
    "formular jetzt starten"
  ].some(term => lowerAI.includes(term));
  
  if (suggestsForm) {
    return {
      message: aiResponse,
      options: LEAD_START_OPTIONS,
      leadData: { step: "start" },
    };
  }

  return { message: aiResponse };
}
