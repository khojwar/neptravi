import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildItineraryPrompt } from "./buildItineraryPrompt";
import { fileToBase64, extractTextFromFile } from "./extractTripDetailsWithLLM";
import { extname } from "path";  

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Function to stream full itinerary generation using LLM
export async function streamFullItineraryWithLLM({
  userQuery,
  weatherData,
  file,
}: {
  userQuery: any;
  weatherData: any;
  file?: File;
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 0.7 },
  });

  let prompt = buildItineraryPrompt({ userQuery, weatherData });
  let content: any = [{ role: "user", parts: [{ text: prompt }] }];

  if (file) {
    const ext = extname(file.name).toLowerCase();
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

    if (imageExtensions.includes(ext)) {
      // Handle image files
      const base64Data = await fileToBase64(file);
      prompt += `\n\nAttached file: An image (${file.name}). Use the image to enhance the itinerary (e.g., include activities related to landmarks or destinations visible in the image).`;
      content[0].parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        },
      });
    } else if ([".txt", ".pdf"].includes(ext)) {
      // Handle text-based files
      const fileText = await extractTextFromFile(file);
      prompt += `\n\nAttached file content (${file.name}): ${fileText}\nUse this content to enhance the itinerary with additional details or preferences.`;
      content[0].parts[0].text = prompt; // Update prompt with file text
    } else {
      throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  return await model.generateContentStream({
    contents: content,
    generationConfig: { responseMimeType: "application/json" },
  });
}
