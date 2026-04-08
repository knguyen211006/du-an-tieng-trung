import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  // Sử dụng "gemini-flash-latest" để Google tự chọn bản mới nhất (Gemini 3)
  model: "gemini-flash-latest", 
});