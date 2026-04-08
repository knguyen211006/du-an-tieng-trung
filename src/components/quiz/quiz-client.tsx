"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { submitQuiz } from "@/actions/submit-quiz"
import { motion, AnimatePresence } from "framer-motion"

export function QuizClient({ quiz, userId }: { quiz: any[], userId: string }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!quiz || quiz.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">Chưa có câu hỏi nào hôm nay!</div>
  }

  const current = quiz[index]

  const handleAnswer = async (option: string) => {
    const newAnswers = [
      ...answers,
      {
        wordId: current.wordId,
        selected: option,
        correct: current.correct,
      },
    ]
    setAnswers(newAnswers)

    if (index < quiz.length - 1) {
      setIndex(index + 1)
    } else {
      setIsSubmitting(true)
      const result = await submitQuiz(userId, newAnswers)
      alert(`🎉 Chúc mừng! Điểm của bạn: ${result.score}`)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 flex flex-col h-full justify-center min-h-[70vh]">
      <div className="mb-8 w-full bg-secondary h-2 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((index) / quiz.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <Card className="flex-1 flex items-center justify-center mb-8 p-8 border-2 shadow-lg">
            <h2 className="text-6xl font-bold text-primary">{current.question}</h2>
          </Card>

          <div className="grid gap-3 mt-auto">
            {current.options.map((opt: string) => (
              <Button 
                key={opt} 
                onClick={() => handleAnswer(opt)}
                disabled={isSubmitting}
                variant="outline"
                className="h-16 text-lg justify-start px-6 border-2 hover:border-primary hover:bg-primary/10 whitespace-normal text-left py-4"
              >
                {opt}
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}