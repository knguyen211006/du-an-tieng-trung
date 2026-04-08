import { prisma } from "@/lib/prisma"

export async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  const today = new Date()
  const last = user?.lastActivityDate

  let currentStreak = user?.currentStreak || 0

  if (last) {
    const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 1) {
      currentStreak += 1
    } else if (diff > 1) {
      currentStreak = 1
    }
  } else {
    currentStreak = 1
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak,
      longestStreak: Math.max(currentStreak, user?.longestStreak || 0),
      lastActivityDate: today,
    },
  })
}