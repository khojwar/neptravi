import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildItineraryPrompt } from "./buildItineraryPrompt";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
  }
});

export async function generateFullItineraryWithLLM({ userQuery, weatherData }: { userQuery: any; weatherData: any }) {
  const prompt = buildItineraryPrompt({ userQuery, weatherData });

const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { 
      responseMimeType: "application/json"
    }
  });

  const responseText = result.response.text();
  return JSON.parse(responseText);
}
