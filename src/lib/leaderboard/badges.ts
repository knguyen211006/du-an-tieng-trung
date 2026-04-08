export function getBadge(score: number) {
  if (score > 5000) return { label: "🏆 Grandmaster", color: "text-red-500" }
  if (score > 2000) return { label: "🥇 Elite", color: "text-yellow-500" }
  if (score > 500) return { label: "🥈 Advanced", color: "text-blue-500" }
  return { label: "🥉 Beginner", color: "text-slate-400" }
}