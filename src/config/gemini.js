import { GoogleGenAI } from "@google/genai";

// ⚠️ IMPORTANT: Replace with your actual Gemini API key.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the GoogleGenAI client with the API key
// 'ai' is the client instance.
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Sends a prompt to the Gemini model and returns the response text.
 * @param {string} prompt The user's input.
 * @returns {Promise<string>} The model's response text.
 */
export async function runChat(prompt) {
  try {
    // FIX: Use the 'ai.models.generateContent' method directly
    // This is the common pattern for the new @google/genai SDK.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Specify the model here
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    // If an error still occurs, it's likely a network/API key/caching issue
    console.error("Error in runChat:", error);
    return "I apologize, but I encountered an error. Please try again.";
  }
}