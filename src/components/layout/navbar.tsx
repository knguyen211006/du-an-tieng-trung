"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Book, Brain, Trophy, User } from "lucide-react"

const navItems = [
  { href: "/", label: "Học", icon: Brain },
  { href: "/vocab", label: "Từ vựng", icon: Book },
  { href: "/leaderboard", label: "BXH", icon: Trophy },
  { href: "/profile", label: "Cá nhân", icon: User },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 z-50 w-full border-t bg-background flex justify-around p-3 md:top-0 md:bottom-auto">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-xs gap-1 opacity-70 transition-opacity",
              pathname === item.href && "text-primary opacity-100 font-bold"
            )}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Link>
        )
      })} 
    </nav>
  )
}