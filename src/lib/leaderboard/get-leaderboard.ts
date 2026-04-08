import { prisma } from "@/lib/prisma"
import { subDays } from "date-fns"

export async function getLeaderboard(type: "all" | "weekly") {
  if (type === "all") {
    return prisma.user.findMany({
      orderBy: { totalQuizScore: "desc" },
      take: 50,
    })
  }

  const lastWeek = subDays(new Date(), 7)
  return prisma.user.findMany({
    where: { lastActivityDate: { gte: lastWeek } },
    orderBy: { totalQuizScore: "desc" },
    take: 50,
  })
}