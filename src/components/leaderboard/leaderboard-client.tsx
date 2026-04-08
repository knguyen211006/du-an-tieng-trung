"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { getBadge } from "@/lib/leaderboard/badges"

export function LeaderboardClient({ initialData }: { initialData: any[] }) {
  const [type, setType] = useState<any>("score")
  const [data, setData] = useState(initialData)

  const getValue = (user: any, type: string) => {
    if (type === "score") return `${user.totalQuizScore} XP`
    if (type === "streak") return `${user.currentStreak} ngày`
    return `${user.masteredWordsCount} từ`
  }

  return (
    <div className="p-4 space-y-8 max-w-2xl mx-auto pb-24">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Đấu Trường HSK</h1>
        <p className="text-muted-foreground text-sm">Học chăm chỉ, leo hạng cao!</p>
      </div>

      <Tabs defaultValue="score" onValueChange={(v) => setType(v)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="score">🏆 Điểm</TabsTrigger>
          <TabsTrigger value="streak">🔥 Chuỗi</TabsTrigger>
          <TabsTrigger value="mastery">📚 Master</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-2 px-2 h-48">
        {data.slice(0, 3).map((u, i) => {
          const order = i === 0 ? 2 : i === 1 ? 1 : 3 // Thứ tự hiển thị: 2 - 1 - 3
          const height = i === 0 ? "h-40" : i === 1 ? "h-32" : "h-24"
          return (
            <motion.div 
              key={u.id} 
              className={`flex-1 flex flex-col items-center justify-end p-2 rounded-t-xl bg-secondary/30 relative border-x border-t ${height}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ order: order }}
            >
              <div className="absolute -top-10 text-3xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
              <div className="font-bold text-xs truncate w-full text-center">{u.name || "User"}</div>
              <div className="text-xs font-bold text-primary">{getValue(u, type)}</div>
            </motion.div>
          )
        })}
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {data.map((u, i) => (
            <motion.div
              layout
              key={u.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 border-2 rounded-xl bg-background hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-muted-foreground w-6">#{i + 1}</span>
                <div>
                  <div className="font-bold">{u.name || "Người dùng ẩn danh"}</div>
                  <div className={`text-[10px] font-bold uppercase ${getBadge(u.totalQuizScore).color}`}>
                    {getBadge(u.totalQuizScore).label}
                  </div>
                </div>
              </div>
              <div className="font-bold text-lg">{getValue(u, type)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}