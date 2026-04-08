import { prisma } from "@/lib/prisma"
import { subDays, subMonths } from "date-fns"

export type LeaderboardType = "score" | "streak" | "mastery"
export type LeaderboardRange = "all" | "weekly" | "monthly"

export async function getAdvancedLeaderboard(type: LeaderboardType, range: LeaderboardRange) {
  let dateFilter: Date | undefined

  if (range === "weekly") dateFilter = subDays(new Date(), 7)
  if (range === "monthly") dateFilter = subMonths(new Date(), 1)

  const where = range === "all" ? {} : {
    lastActivityDate: { gte: dateFilter },
  }

  const orderByMap = {
    score: { totalQuizScore: "desc" as const },
    streak: { currentStreak: "desc" as const },
    mastery: { masteredWordsCount: "desc" as const },
  }

  return prisma.user.findMany({
    where,
    orderBy: orderByMap[type],
    take: 50,
    // Tối ưu hiệu năng: Chỉ lấy những gì cần thiết
    select: {
      id: true,
      name: true,
      totalQuizScore: true,
      currentStreak: true,
      masteredWordsCount: true,
      image: true,
    },
  })
}