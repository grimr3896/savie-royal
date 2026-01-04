
import { GoogleGenAI } from "@google/genai";

export const generateEventInsights = async (bookingData: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are an expert event strategist for Savie Royal, a high-end catering and funeral planning company. 
      Analyze the following booking request and provide a 3-sentence professional strategy for our team.
      Focus on tone, dietary vibe, and staffing needs.

      Client: ${bookingData.name}
      Event: ${bookingData.type}
      Message: ${bookingData.message}
      Guests: ${bookingData.guests}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("AI Insights Error:", error);
    return "Standard high-excellence service required.";
  }
};

export const sendToN8N = async (webhookUrl: string, payload: any) => {
  if (!webhookUrl) return { success: false, error: "No webhook configured" };
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        source: 'Savie Royal Web Portal',
        priority: 'High'
      })
    });
    return { success: response.ok };
  } catch (err) {
    return { success: false, error: err };
  }
};
