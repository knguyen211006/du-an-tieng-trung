"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function Flashcard({ word }: { word: any }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div 
      className="perspective-1000 w-full cursor-pointer h-48"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Mặt trước của thẻ (Tiếng Trung + Pinyin) */}
        <Card className="absolute backface-hidden w-full h-full flex flex-col items-center justify-center p-6 shadow-md border-2 hover:border-primary/50 transition-colors">
          <div className="text-5xl font-bold mb-2 text-primary">{word.hanzi}</div>
          <div className="text-xl text-muted-foreground">{word.pinyin}</div>
        </Card>

        {/* Mặt sau của thẻ (Nghĩa tiếng Anh/Việt) */}
        <Card className="absolute backface-hidden w-full h-full flex flex-col items-center justify-center p-6 shadow-md border-2 border-primary/20 bg-primary/5 rotate-x-180">
          <div className="text-lg text-center font-medium leading-relaxed">
            {word.definition_en}
          </div>
          <div className="mt-4 text-sm text-muted-foreground font-semibold bg-background px-3 py-1 rounded-full">
            HSK {word.level}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}