import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

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

export const getInteractions = async (rawText, name, lang = "en") => {
  const prompt = `
    You are a medical assistant. Based on the following medicine data for ${name},
    list the most important drug interactions — what medicines or substances should NOT be taken together with ${name}.
    Respond in this language: ${lang}.
    Respond ONLY with a JSON array of strings, each string being one interaction warning.
    Maximum 5 items. No extra text, no markdown.
    Medicine data:
    ${rawText}
  `;
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};
