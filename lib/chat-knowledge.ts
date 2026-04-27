export type KnowledgeEntry = {
  keywords: string[];
  answer: string;
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
    keywords: ["webseitig", "web-seitig", "company"] ,
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


async function callAIAPI(question: string): Promise<string> {
  const relevant = KNOWN_ANSWERS
  .filter(entry =>
    entry.keywords.some(k =>
      question.toLowerCase().includes(k)
    )
  )
  .slice(0, 3); // limit to 3 matches

const knowledgeText = relevant.length
  ? relevant.map(e => e.answer).join("\n")
  : "No relevant knowledge found.";

  if (!relevant.length) {
    return FALLBACK_ANSWER;
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, knowledgeText }),
    });

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
      
      if (errorMsg.includes("loading") || errorMsg.includes("Loading") || 
          errorMsg.includes("No Inference Provider") || errorMsg.includes("Not Found")) {
        return 'Das Modell wird gerade geladen. Bitte versuche es in 20 Sekunden erneut.';
      }

      console.warn(`API route error (${response.status}): ${errorMsg}`);
      return FALLBACK_ANSWER;
    }

    // Extract generated text (handle different possible formats)
    const generatedText = data?.[0]?.generated_text || 
                         data?.generated_text || 
                         responseText;

    return generatedText && generatedText.length > 15 
      ? generatedText.trim() 
      : FALLBACK_ANSWER;

  } catch (error) {
    console.error('AI API fetch error:', error);
    return FALLBACK_ANSWER;
  }
}
const FALLBACK_ANSWER =
  "Das ist eine interessante Frage, aber ich habe nur Informationen zu webseitig und unseren Website-Services. Wie kann ich dir bei Fragen zu Services, Preisen, Kontakt oder anderen Themen helfen?";

export function getAnswer(question: string): Promise<string> {
  const normalized = question.toLowerCase();
  // First, try exact keyword match
  const exactMatch = KNOWN_ANSWERS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  if (exactMatch) return Promise.resolve(exactMatch.answer);

  // Fuzzy match: check if question contains parts of keywords
  const fuzzyMatch = KNOWN_ANSWERS.find((entry) =>
    entry.keywords.some((keyword) => {
      const keywordParts = keyword.split(' ');
      return keywordParts.some(part => normalized.includes(part) && part.length > 2);
    })
  );
  if (fuzzyMatch) return Promise.resolve(fuzzyMatch.answer);

  // If no match, call AI API
  return callAIAPI(question);
}
