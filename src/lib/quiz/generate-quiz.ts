import { prisma } from "@/lib/prisma"

export async function generateQuiz(userId: string, limit = 10) {
  const now = new Date()

  // 1. Ưu tiên từ cần ôn (SRS)
  const dueWords = await prisma.userWordProgress.findMany({
    where: {
      userId,
      nextReview: { lte: now },
    },
    include: { word: true },
    take: limit,
  })

  let words = dueWords.map((w) => w.word)

  // 2. Nếu thiếu → lấy từ mới
  if (words.length < limit) {
    const newWords = await prisma.hskWord.findMany({
      take: limit - words.length,
      orderBy: { createdAt: "asc" },
    })
    words = [...words, ...newWords]
  }

  // 3. Generate options
  const quiz = await Promise.all(
    words.map(async (word) => {
      const distractors = await prisma.hskWord.findMany({
        where: { id: { not: word.id } },
        take: 3,
      })

      const options = [
        word.definition_en,
        ...distractors.map((d) => d.definition_en),
      ].sort(() => Math.random() - 0.5)

      return {
        wordId: word.id,
        question: word.hanzi,
        correct: word.definition_en,
        options,
      }
    })
  )

  return quiz
}