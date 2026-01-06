import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedPlan, ModificationResult, CreatorMode, ChatMessage, ProgressData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Flash for quick chat interactions
const CHAT_MODEL = 'gemini-3-flash-preview';
// Using Pro for complex reasoning (Plan generation and Modification logic)
const REASONING_MODEL = 'gemini-3-pro-preview';

/**
 * Sends a message to the AI interviewer.
 */
export const sendInterviewMessage = async (
  history: ChatMessage[],
  newMessage: string,
  mode: CreatorMode
): Promise<string> => {
  try {
    const systemInstruction = `
      Jesteś profesjonalnym trenerem personalnym i dietetykiem. Twoim celem jest przeprowadzenie krótkiego wywiadu z użytkownikiem (w języku polskim), aby stworzyć plan: ${mode === CreatorMode.WORKOUT ? 'treningowy' : 'dietetyczny'}.
      
      Zasady:
      1. Zadawaj PO JEDNYM pytaniu na raz.
      2. Pytaj o: cel, poziom zaawansowania, dostępny sprzęt (jeśli trening), alergie/preferencje (jeśli dieta), kontuzje/choroby.
      3. Bądź uprzejmy, motywujący, ale konkretny.
      4. Nie generuj jeszcze planu, tylko zbieraj informacje.
    `;

    const contents = [
      ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
      { role: 'user', parts: [{ text: newMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Przepraszam, wystąpił błąd. Spróbuj ponownie.";
  } catch (error) {
    console.error("Interview Error:", error);
    return "Wystąpił błąd połączenia z AI.";
  }
};

/**
 * Generates the initial JSON plan based on the interview history.
 */
export const generateInitialPlan = async (history: ChatMessage[], mode: CreatorMode): Promise<GeneratedPlan> => {
  const planSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "Tytuł planu, np. 'Trening FBW na Masę'" },
      description: { type: Type.STRING, description: "Krótki opis założeń planu" },
      mode: { type: Type.STRING, enum: [CreatorMode.WORKOUT, CreatorMode.DIET] },
      schedule: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            dayName: { type: Type.STRING, description: "Np. Poniedziałek, Trening A" },
            summary: { type: Type.STRING, description: "Krótkie podsumowanie dnia" },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Nazwa ćwiczenia lub posiłku" },
                  details: { type: Type.STRING, description: "Np. '3x12 powtórzeń' lub '500 kcal, 30g białka'" },
                  note: { type: Type.STRING, description: "Wskazówka techniczna lub kulinarna" }
                },
                required: ["name", "details"]
              }
            }
          },
          required: ["dayName", "items"]
        }
      },
      progress: {
        type: Type.OBJECT,
        description: "Symulacja postępów na start.",
        properties: {
          metricName: { type: Type.STRING, description: "Główny parametr do śledzenia (np. Waga Ciała, Przysiad)" },
          unit: { type: Type.STRING, description: "Jednostka, np. kg" },
          dataPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                week: { type: Type.NUMBER },
                value: { type: Type.NUMBER },
                type: { type: Type.STRING, enum: ['projected'] }
              }
            }
          }
        },
        required: ["metricName", "unit", "dataPoints"]
      }
    },
    required: ["title", "description", "mode", "schedule", "progress"]
  };

  const prompt = `
    Na podstawie powyższej rozmowy, wygeneruj kompletny plan ${mode === CreatorMode.WORKOUT ? 'treningowy' : 'dietetyczny'} w formacie JSON.
    1. Plan musi być dostosowany do odpowiedzi użytkownika (np. kontuzje, cel).
    2. Wygeneruj plan na cały tydzień lub cykl treningowy.
    3. Dodatkowo w polu 'progress' wygeneruj PROGNOZĘ postępów na najbliższe 4 tygodnie (Weeks 0-4). 
       - Jeśli to dieta redukcyjna -> symuluj spadek wagi.
       - Jeśli to dieta na masę -> symuluj wzrost wagi.
       - Jeśli to trening -> symuluj wzrost siły w głównym ćwiczeniu (np. Przysiad, Wyciskanie).
       - Punkty danych powinny mieć type: 'projected'.
  `;

  // Filter history to simple text block for context
  const conversationText = history.map(m => `${m.role}: ${m.text}`).join('\n');

  const response = await ai.models.generateContent({
    model: REASONING_MODEL,
    contents: {
      parts: [
        { text: "Historia rozmowy:\n" + conversationText },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: planSchema
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as GeneratedPlan;
  }
  throw new Error("Failed to generate plan JSON");
};

/**
 * Modifies the plan based on user request with validation.
 */
export const modifyPlanWithAI = async (
  currentPlan: GeneratedPlan,
  userRequest: string
): Promise<ModificationResult> => {

  const modificationSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      approved: { type: Type.BOOLEAN, description: "Czy zmiana jest bezpieczna i możliwa do wprowadzenia?" },
      refusalReason: { type: Type.STRING, description: "Jeśli approved=false, wyjaśnij dlaczego (np. konflikt z kontuzją)." },
      plan: { 
        type: Type.OBJECT, // Recursive GeneratedPlan definition simplified
        description: "Zaktualizowany obiekt planu (tylko jeśli approved=true). Zachowaj pole progress bez zmian, chyba że użytkownik prosi o zmianę celu.",
        properties: {
             title: { type: Type.STRING },
             description: { type: Type.STRING },
             mode: { type: Type.STRING },
             schedule: { 
                 type: Type.ARRAY,
                 items: {
                     type: Type.OBJECT,
                     properties: {
                         dayName: { type: Type.STRING },
                         summary: { type: Type.STRING },
                         items: {
                             type: Type.ARRAY,
                             items: {
                                 type: Type.OBJECT,
                                 properties: {
                                     name: { type: Type.STRING },
                                     details: { type: Type.STRING },
                                     note: { type: Type.STRING }
                                 }
                             }
                         }
                     }
                 }
             },
             progress: {
                type: Type.OBJECT,
                properties: {
                    metricName: { type: Type.STRING },
                    unit: { type: Type.STRING },
                    dataPoints: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                week: { type: Type.NUMBER },
                                value: { type: Type.NUMBER },
                                type: { type: Type.STRING }
                            }
                        }
                    }
                }
             }
        }
      },
      validationLog: { type: Type.STRING, description: "Krótka walidacja (1-2 zdania). Potwierdź, co zostało zmienione." }
    },
    required: ["approved", "validationLog"]
  };

  const prompt = `
    Jesteś supervisorem AI.
    Aktualny plan (JSON): ${JSON.stringify(currentPlan)}
    
    Żądanie użytkownika: "${userRequest}"
    
    Zadanie:
    1. Przeanalizuj żądanie pod kątem bezpieczeństwa, sensowności i historii wywiadu.
    2. Jeśli zmiana jest OK -> Zmodyfikuj JSON planu i ustaw approved: true. Upewnij się, że struktura 'progress' zostanie zachowana (chyba że użytkownik zmienia cel).
    3. Jeśli zmiana jest NIEBEZPIECZNA/BEZSENSU -> Ustaw approved: false i podaj refusalReason.
    4. W polu 'validationLog' wpisz 1-2 zdania po polsku w stylu: "Zmiana zatwierdzona. Zamieniono X na Y zgodnie z prośbą, zachowując objętość treningową."
  `;

  const response = await ai.models.generateContent({
    model: REASONING_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: modificationSchema
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as ModificationResult;
  }
  throw new Error("Failed to modify plan");
};
