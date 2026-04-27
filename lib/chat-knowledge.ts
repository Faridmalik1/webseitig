export type KnowledgeEntry = {
  keywords: string[];
  answer: string;
  isLeadIntent?: boolean;
};

export type LeadData = {
  name?: string;
  email?: string;
  phone?: string;
  branche?: string;
  step?: 'name' | 'email' | 'phone' | 'branche' | 'confirm';
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
  // Lead submission intents
  {
    keywords: ["anfrage", "angebot", "kontakt", "lead", "submit", "form", "formular", "anmelden", "registrieren"],
    answer: "Ich helfe Ihnen gerne dabei, eine Anfrage zu stellen! Lassen Sie uns Ihre Kontaktdaten sammeln. Wie ist Ihr Name?",
    isLeadIntent: true,
  },
  {
    keywords: ["kostenlos anfragen", "jetzt anfragen", "kostenlose anfrage", "anfrage stellen"],
    answer: "Perfekt! Ich helfe Ihnen dabei, eine kostenlose Anfrage zu stellen. Wie ist Ihr Name?",
    isLeadIntent: true,
  },
  // Company and brand
  {
    keywords: ["webseitig", "web-seitig", "company"] ,
    answer:
      "webseitig bieten professionelle Website-Erstellung, Design, Hosting und laufende Betreuung für Schweizer KMU.",
  },
];

const FALLBACK_ANSWER =
  "Das ist eine interessante Frage, aber ich habe nur Informationen zu webseitig und unseren Website-Services. Wie kann ich dir bei Fragen zu Services, Preisen, Kontakt oder anderen Themen helfen?";

export type ChatResponse = {
  message: string;
  isLeadIntent?: boolean;
  leadData?: LeadData;
};

export function getAnswer(question: string, currentLeadData?: LeadData): Promise<ChatResponse> {
  const normalized = question.toLowerCase();

  // Handle ongoing lead collection
  if (currentLeadData?.step) {
    return handleLeadCollection(question, currentLeadData);
  }

  // First, try exact keyword match
  const exactMatch = KNOWN_ANSWERS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  if (exactMatch) {
    return Promise.resolve({
      message: exactMatch.answer,
      isLeadIntent: exactMatch.isLeadIntent,
      leadData: exactMatch.isLeadIntent ? { step: 'name' } : undefined,
    });
  }

  // Fuzzy match: check if question contains parts of keywords
  const fuzzyMatch = KNOWN_ANSWERS.find((entry) =>
    entry.keywords.some((keyword) => {
      const keywordParts = keyword.split(' ');
      return keywordParts.some(part => normalized.includes(part) && part.length > 2);
    })
  );
  if (fuzzyMatch) {
    return Promise.resolve({
      message: fuzzyMatch.answer,
      isLeadIntent: fuzzyMatch.isLeadIntent,
      leadData: fuzzyMatch.isLeadIntent ? { step: 'name' } : undefined,
    });
  }

  // If no match, call AI API
  return callAIAPI(question);
}

async function handleLeadCollection(question: string, currentLeadData: LeadData): Promise<ChatResponse> {
  const { step } = currentLeadData;

  switch (step) {
    case 'name':
      if (question.trim().length < 2) {
        return {
          message: "Bitte geben Sie einen gültigen Namen ein.",
          leadData: currentLeadData,
        };
      }
      return {
        message: "Danke! Jetzt benötige ich Ihre E-Mail-Adresse (optional, aber empfohlen).",
        leadData: { ...currentLeadData, name: question.trim(), step: 'email' },
      };

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (question.trim() && !emailRegex.test(question.trim())) {
        return {
          message: "Das sieht nicht wie eine gültige E-Mail-Adresse aus. Bitte versuchen Sie es erneut oder lassen Sie es leer.",
          leadData: currentLeadData,
        };
      }
      return {
        message: "Vielen Dank! Jetzt bitte Ihre Telefonnummer.",
        leadData: {
          ...currentLeadData,
          email: question.trim() || undefined,
          step: 'phone'
        },
      };

    case 'phone':
      if (question.trim().length < 5) {
        return {
          message: "Bitte geben Sie eine gültige Telefonnummer ein.",
          leadData: currentLeadData,
        };
      }
      return {
        message: "Perfekt! Zuletzt, welcher Branche gehört Ihr Unternehmen? (Handwerk & Bau, Gastronomie & Food, Kosmetik & Beauty, Gesundheit & Fitness, Einzelhandel, Dienstleistung & Beratung, Immobilien, oder Andere)",
        leadData: { ...currentLeadData, phone: question.trim(), step: 'branche' },
      };

    case 'branche':
      const validBranches = [
        "Handwerk & Bau", "Gastronomie & Food", "Kosmetik & Beauty",
        "Gesundheit & Fitness", "Einzelhandel", "Dienstleistung & Beratung",
        "Immobilien", "Andere"
      ];
      const branche = validBranches.find(b =>
        b.toLowerCase().includes(question.toLowerCase()) ||
        question.toLowerCase().includes(b.toLowerCase().split(' & ')[0])
      ) || "Andere";

      const completeLeadData = {
        ...currentLeadData,
        branche,
        step: 'confirm' as const
      };

      return {
        message: `Vielen Dank für Ihre Angaben! Hier ist eine Zusammenfassung:\n\nName: ${completeLeadData.name}\nE-Mail: ${completeLeadData.email || 'Nicht angegeben'}\nTelefon: ${completeLeadData.phone}\nBranche: ${completeLeadData.branche}\n\nIst das korrekt? (Ja/Nein)`,
        leadData: completeLeadData,
      };

    case 'confirm':
      if (question.toLowerCase().includes('ja') || question.toLowerCase().includes('yes')) {
        // Submit the lead
        try {
          const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: currentLeadData.name,
              email: currentLeadData.email,
              phone: currentLeadData.phone,
              branche: currentLeadData.branche,
              source: 'chatbot'
            }),
          });

          if (response.ok) {
            return {
              message: "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Ein Mitglied unseres Teams wird sich in Kürze bei Ihnen melden.",
              leadData: undefined, // Reset lead data
            };
          } else {
            throw new Error('API error');
          }
        } catch (error) {
          return {
            message: "Es gab ein Problem bei der Übermittlung. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
            leadData: undefined,
          };
        }
      } else {
        return {
          message: "Kein Problem! Lassen Sie uns das korrigieren. Wie ist Ihr Name?",
          leadData: { step: 'name' },
        };
      }

    default:
      return {
        message: "Entschuldigung, da ist etwas schiefgelaufen. Lassen Sie uns von vorne beginnen. Wie ist Ihr Name?",
        leadData: { step: 'name' },
      };
  }
}

async function callAIAPI(question: string): Promise<ChatResponse> {
  const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

  if (!huggingFaceApiKey) {
    return { message: FALLBACK_ANSWER };
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
      return { message: FALLBACK_ANSWER };
    }
    return { message: generatedText };
  } catch (error) {
    console.error('AI API error:', error);
    return { message: FALLBACK_ANSWER };
  }
}
