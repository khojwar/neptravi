import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


export async function extractTripDetailsWithLLM(description: string) {
  const prompt = `
  Extract structured trip details strictly as JSON.

  User description: "${description}"

  Return:
  {
    "destination": "City, Country",
    "lat": number (if known),
    "lon": number (if known),
    "trip_length": number,
    "start_date": "YYYY-MM-DD" | null,
    "travelers": number | null,
    "travel_style": "relaxed | adventure | culture | food | family" | null,
    "budget": number | null,
    "activities": [ ...strings ],
    "error": null
  }

  If missing info, infer reasonable defaults.
  `;

const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { 
      responseMimeType: "application/json",
      temperature: 0.3
    }
  });
  
  const responseText = result.response.text();
  return JSON.parse(responseText);
}
