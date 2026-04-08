import { prisma } from "@/lib/prisma"
// 1. Thay đổi import: Bỏ Flashcard, dùng WordDetailDrawer
import { WordDetailDrawer } from "@/components/vocab/word-detail-drawer" 

export default async function VocabPage() {
  // Lấy 20 từ đầu tiên ra để học thử
  const words = await prisma.hskWord.findMany({
    take: 20,
    orderBy: { level: 'asc' }
  })

  return (
    <div className="p-4 flex flex-col gap-6 max-w-2xl mx-auto"> 
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Kho Từ Vựng AI
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Bấm vào chữ Hán để Gemini giải thích</p>
      </div>

      <div className="grid gap-4">
        {words.map((word) => (
          // 2. Thay thế Flashcard bằng WordDetailDrawer
          <WordDetailDrawer key={word.id} word={word} />
        ))}
      </div>
    </div>
  )
}