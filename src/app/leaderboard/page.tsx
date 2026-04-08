import { getAdvancedLeaderboard } from "@/lib/leaderboard/get-advanced-leaderboard"
import { LeaderboardClient } from "@/components/leaderboard/leaderboard-client"

export const dynamic = "force-dynamic" // Luôn cập nhật điểm mới nhất

export default async function LeaderboardPage() {
  // Mặc định lấy bảng xếp hạng All-time Score
  const initialData = await getAdvancedLeaderboard("score", "all")

  return <LeaderboardClient initialData={initialData} />
}