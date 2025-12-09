import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildItineraryPrompt } from "./buildItineraryPrompt";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

/* ---- OLD NON-STREAM VERSION (kept for fallback) ---- */
// export async function generateFullItineraryWithLLM({ userQuery, weatherData }: {
//   userQuery: any;
//   weatherData: any;
// }) {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.5-flash",
//     generationConfig: { temperature: 0.7 }
//   });

//   const prompt = buildItineraryPrompt({ userQuery, weatherData });

//   const result = await model.generateContent({
//     contents: [{ role: "user", parts: [{ text: prompt }] }],
//     generationConfig: { responseMimeType: "application/json" },
//   });

//   const responseText = result.response.text();
//   return JSON.parse(responseText);
// }


/* ---- 🔥 NEW STREAM VERSION ---- */
export async function streamFullItineraryWithLLM({ userQuery, weatherData }: { userQuery: any; weatherData: any; }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 0.7 }
  });

  const prompt = buildItineraryPrompt({ userQuery, weatherData });

  return await model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  });
}
