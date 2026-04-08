import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Trophy, Flame, BookOpen } from "lucide-react"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    return <div className="p-8 text-center mt-20 text-muted-foreground">Vui lòng đăng nhập để xem tiến độ của bạn.</div>
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  return (
    <div className="p-4 space-y-6 flex flex-col items-center mt-10">
      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-4xl font-bold text-primary mb-2 shadow-lg">
        {user?.name?.[0] || "U"}
      </div>
      <h1 className="text-2xl font-bold">{user?.name || "Người dùng ẩn danh"}</h1>

      <div className="grid grid-cols-1 w-full gap-4 mt-6">
        <Card className="p-5 flex items-center gap-5 border-2 hover:border-orange-500/50 transition-colors">
          <div className="p-3 bg-orange-500/10 rounded-full"><Flame className="w-8 h-8 text-orange-500" /></div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Chuỗi học (Streak)</div>
            <div className="text-2xl font-bold">{user?.currentStreak || 0} ngày</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-5 border-2 hover:border-yellow-500/50 transition-colors">
          <div className="p-3 bg-yellow-500/10 rounded-full"><Trophy className="w-8 h-8 text-yellow-500" /></div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Tổng điểm XP</div>
            <div className="text-2xl font-bold">{user?.totalQuizScore || 0} XP</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-5 border-2 hover:border-blue-500/50 transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-full"><BookOpen className="w-8 h-8 text-blue-500" /></div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Từ vựng đã Master</div>
            <div className="text-2xl font-bold">{user?.masteredWordsCount || 0} từ</div>
          </div>
        </Card>
      </div>
    </div>
  )
}