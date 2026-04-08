"use server"

import { prisma } from "@/lib/prisma";
import { geminiModel } from "@/lib/ai/gemini";

export async function explainWord(hanzi: string) {
  const cacheKey = `explain:${hanzi}`;

  try {
    const cached = await prisma.aIGeneratedContent.findFirst({
      where: { prompt: cacheKey },
    });

    if (cached) return cached.response;

    const prompt = `Giải thích từ "${hanzi}" bằng tiếng Việt ngắn gọn, dễ hiểu.`;
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    await prisma.aIGeneratedContent.create({
      data: { prompt: cacheKey, response: text },
    });

    return text;
  } catch (error: any) {
    // DÒNG NÀY CỰC KỲ QUAN TRỌNG: Nó sẽ hiện lỗi thật ở Terminal của Khôi
    console.error("❌ LỖI GEMINI ĐÂY KHÔI ƠI:", error.message || error);
    
    return "Hệ thống AI đang bận một chút, Khôi hãy thử lại sau vài giây nhé!";
  }
}