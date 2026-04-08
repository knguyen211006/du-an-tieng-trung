type SRSInput = {
  familiarity: number
  isCorrect: boolean
}

export function calculateSRS({ familiarity, isCorrect }: SRSInput) {
  let newFamiliarity = familiarity

  if (isCorrect) {
    newFamiliarity += 1
  } else {
    newFamiliarity = Math.max(0, familiarity - 1)
  }

  const now = new Date()
  const intervals = [1, 2, 4, 7, 15, 30, 60] // days
  const interval = intervals[Math.min(newFamiliarity, intervals.length - 1)]

  const nextReview = new Date(now)
  nextReview.setDate(now.getDate() + interval)

  const isMastered = newFamiliarity >= 5

  return {
    familiarity: newFamiliarity,
    nextReview,
    isMastered,
  }
}