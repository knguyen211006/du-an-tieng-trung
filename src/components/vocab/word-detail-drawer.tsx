"use client"

// 1. Đã thêm useEffect vào đây
import { useState, useEffect } from "react" 
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Sparkles, Volume2, Loader2 } from "lucide-react"
import { explainWord } from "@/actions/ai/explain-word"

export function WordDetailDrawer({ word }: { word: any }) {
  const [aiResponse, setAiResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAIExplain = async () => {
    setIsLoading(true)
    const result = await explainWord(word.hanzi)
    setAiResponse(result)
    setIsLoading(false)
  }

  const playVoice = () => {
    const utter = new SpeechSynthesisUtterance(word.hanzi)
    utter.lang = "zh-CN"
    window.speechSynthesis.speak(utter)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* Thẻ từ vựng để người dùng nhấn vào */}
        <div className="p-5 border rounded-3xl bg-card hover:border-primary transition-all cursor-pointer shadow-sm">
          <h3 className="text-3xl font-bold">{word.hanzi}</h3>
          <p className="text-muted-foreground">{word.pinyin}</p>
          <p className="mt-2 text-primary font-medium">{word.meaning}</p>
        </div>
      </DrawerTrigger>

      <DrawerContent className="p-6">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="flex flex-row justify-between items-center px-0">
            <div>
              <DrawerTitle className="text-4xl">{word.hanzi}</DrawerTitle>
              <DrawerDescription className="sr-only">
                Chi tiết từ vựng {word.hanzi}
              </DrawerDescription>
              <p className="text-xl text-muted-foreground">{word.pinyin}</p>
            </div>
            <Button size="icon" variant="secondary" onClick={playVoice} className="rounded-full h-12 w-12">
              <Volume2 className="h-6 w-6" />
            </Button>
          </DrawerHeader>

          <div className="mt-6 space-y-4 overflow-y-auto max-h-[50vh]">
            {/* Nút bấm gọi AI */}
            {!aiResponse ? (
              <Button
                onClick={handleAIExplain}
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                {isLoading ? "Đang nhờ Gemini giải thích..." : "✨ Giải thích chuyên sâu bằng AI"}
              </Button>
            ) : (
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 text-primary font-bold mb-3">
                  <Sparkles className="h-4 w-4" />
                  GEMINI PHÂN TÍCH
                </div>
                {/* 2. Đã thay thế bằng component TypingEffect */}
                <TypingEffect text={aiResponse} />
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// 3. Cỗ máy tạo hiệu ứng gõ chữ được đặt ngay đây
function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    
    // Tốc độ gõ: 15ms một ký tự. Khôi có thể tăng giảm số này để nó gõ nhanh hoặc chậm hơn
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 15); 

    return () => clearInterval(interval);
  }, [text]);

  // Giữ nguyên các class định dạng chữ cũ của Khôi
  return <div className="text-sm leading-relaxed whitespace-pre-wrap">{displayedText}</div>;
}