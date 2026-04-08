import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// const test = await model.generateContent("say hi");
// console.log("GEMINI TEST:", test.response.text());
console.log("GEMINI KEY IN SERVICE:", process.env.GEMINI_API_KEY);
export const summarizeMedicine = async (rawText, lang = "en") => {
  const prompt = `
    You are a medical assistant. Summarize the following medicine information in a clear and simple way.
    Respond in this language: ${lang}.
    Structure your response as JSON with these fields:
    - purpose: what the medicine is used for (1-2 sentences)
    - dosage: dosage instructions (1-2 sentences)
    - sideEffects: most common side effects (1-2 sentences)
    - warnings: array of short warning strings (max 3)

    Only respond with the JSON object, no extra text.

    Medicine data:
    ${rawText}
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};
