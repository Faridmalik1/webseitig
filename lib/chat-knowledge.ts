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
    keywords: ["webseitig", "web-seitig", "snow dream studios", "company"] ,
    answer:
      "webseitig ist der Markenname von Snow Dream Studios GmbH. Wir bieten professionelle Website-Erstellung, Design, Hosting und laufende Betreuung für Schweizer KMU.",
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
      "Sie können webseitig über hello@web-seitig.ch kontaktieren. Die Website bietet ein Kontaktformular, mit dem Sie Anfragen schnell an das Team senden können.",
  },
  {
    keywords: ["impressum", "legal", "unternehmen", "adresse", "zürich"],
    answer:
      "Im Impressum wird Snow Dream Studios GmbH genannt mit Sitz in Schärenmoosstrasse 77, 8052 Zürich. Kontakt per E-Mail: hello@web-seitig.ch und Web: web-seitig.ch.",
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

async function callAIAPI(question: string): Promise<string> {
  const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

  if (!huggingFaceApiKey) {
    return FALLBACK_ANSWER;
  }

  const knowledgeText = KNOWN_ANSWERS.map(entry => `${entry.keywords.join(', ')}: ${entry.answer}`).join('\n');
  const prompt = `You are a chatbot for webseitig, a Swiss website design company. Your role is to answer questions ONLY using the provided knowledge below. Do not make up information or answer questions outside of webseitig services, pricing, contact, legal info, or related topics.

If the user's question is not related to webseitig or cannot be answered from the knowledge, respond politely: "I'm sorry, I only have information about webseitig. Do you have any questions related to our web services, pricing, or contact?"

Knowledge:
${knowledgeText}

User question: ${question}

Answer based only on the knowledge above:`;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 150,
          temperature: 0.1,  // Lower temperature for more consistent responses
          do_sample: true,
          top_p: 0.9,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    let generatedText = data[0]?.generated_text || FALLBACK_ANSWER;
    // Remove the prompt from the response
    if (generatedText.includes('Answer based only on the knowledge above:')) {
      generatedText = generatedText.split('Answer based only on the knowledge above:')[1].trim();
    }
    // If the response is too short or doesn't match, use fallback
    if (generatedText.length < 10 || !generatedText.toLowerCase().includes('webseitig')) {
      return FALLBACK_ANSWER;
    }
    return generatedText;
  } catch (error) {
    console.error('AI API error:', error);
    return FALLBACK_ANSWER;
  }
}
