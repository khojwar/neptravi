import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from "fs/promises"; // For server-side file reading
import { extname } from "path";   


// Utility function to convert a File object to a base64 string
export async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}

// Utility to extract text from text-based files (e.g., TXT, PDF)
export async function extractTextFromFile(file: File): Promise<string> {
  const ext = extname(file.name).toLowerCase();
  if (ext === ".txt") {
    return await file.text();
  } else if (ext === ".pdf") {
    // dont handle pdfs for now
    return "PDF text extraction not implemented.";
  }
  return "";
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


export async function extractTripDetailsWithLLM(description: string, file?: File) {
  let prompt = `
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

  let content: any = [{ role: "user", parts: [{ text: prompt }] }];

  if (file) {
    const ext = extname(file.name).toLowerCase();
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

    if (imageExtensions.includes(ext)) {
      // Handle image files
      const base64Data = await fileToBase64(file);
      prompt += `\n\nAttached file: An image (${file.name}). Analyze the image for additional trip details (e.g., landmarks, destinations, or activities).`;
      content[0].parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        }
      });
    } else if ([".txt", ".pdf"].includes(ext)) {
      // Handle text-based files
      const fileText = await extractTextFromFile(file);
      prompt += `\n\nAttached file content (${file.name}): ${fileText}\nUse this content to extract additional trip details.`;
      content[0].parts[0].text = prompt; // Update prompt with file text
    } else {
      return {
        error: `Unsupported file type: ${ext}. Please upload an image (.png, .jpg, .jpeg, .gif), PDF, or text file (.txt).`,
      };
    }
  }

const result = await model.generateContent({
    contents: content,
    generationConfig: { 
      responseMimeType: "application/json",
      temperature: 0.3
    }
  });
  
  const responseText = result.response.text();
  return JSON.parse(responseText);
}
