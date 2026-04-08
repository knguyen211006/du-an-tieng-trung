"use server"

import { prisma } from "@/lib/prisma"
import { calculateSRS } from "@/lib/srs/srs"

type Answer = {
  wordId: string
  selected: string
  correct: string
}

export async function submitQuiz(userId: string, answers: Answer[]) {
  let score = 0

  const session = await prisma.quizSession.create({
    data: { userId },
  })

  for (const ans of answers) {
    const isCorrect = ans.selected === ans.correct
    if (isCorrect) score += 10

    const progress = await prisma.userWordProgress.findUnique({
      where: {
        userId_wordId: { userId, wordId: ans.wordId },
      },
    })

    const srs = calculateSRS({
      familiarity: progress?.familiarity || 0,
      isCorrect,
    })

    await prisma.userWordProgress.upsert({
      where: {
        userId_wordId: { userId, wordId: ans.wordId },
      },
      update: {
        familiarity: srs.familiarity,
        nextReview: srs.nextReview,
        isMastered: srs.isMastered,
        lastReviewed: new Date(),
        correctCount: { increment: isCorrect ? 1 : 0 },
        wrongCount: { increment: !isCorrect ? 1 : 0 },
      },
      create: {
        userId,
        wordId: ans.wordId,
        familiarity: srs.familiarity,
        nextReview: srs.nextReview,
        isMastered: srs.isMastered,
        lastReviewed: new Date(),
        correctCount: isCorrect ? 1 : 0,
        wrongCount: !isCorrect ? 1 : 0,
      },
    })

    await prisma.quizResult.create({
      data: {
        sessionId: session.id,
        wordId: ans.wordId,
        userId: userId,
        isCorrect,
        selected: ans.selected,
        correct: ans.correct,
      },
    })
  }

  // Update user stats
  await prisma.user.update({
    where: { id: userId },
    data: { totalQuizScore: { increment: score } },
  })

  return { score }
}