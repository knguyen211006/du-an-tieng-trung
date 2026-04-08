import { generateQuiz } from "@/lib/quiz/generate-quiz"
import { QuizClient } from "@/components/quiz/quiz-client"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()

  if (!session?.user?.id) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-2">Chào mừng đến với HSK Mastery</h1>
        <p className="text-muted-foreground">Vui lòng đăng nhập để bắt đầu học.</p>
      </div>
    )
  }

  // Tự động tạo 10 câu hỏi cho người dùng
  const quiz = await generateQuiz(session.user.id, 10)

  return <QuizClient quiz={quiz} userId={session.user.id} />
}