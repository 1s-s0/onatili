import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGame } from '@/contexts/game-context'
import { SentenceBuilder } from './sentence-builder'
import { SuffixSelect, FillBlank } from './suffix-select'
import { Feedback } from './feedback'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, FireIcon, TrophyIcon } from '@heroicons/react/24/solid'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import type { GeneratedExercise } from '@/lib/exercise-generator'

interface GameModeProps {
  onExit: () => void
}

export function GameMode({ onExit }: GameModeProps) {
  const {
    currentExerciseIndex,
    setCurrentExercise,
    score,
    streak,
    completedExercises,
    showExplanation,
    exercises,
    resetGame
  } = useGame()

  const [isComplete, setIsComplete] = useState(false)
  const [currentExercise, setCurrentExerciseData] = useState<GeneratedExercise | null>(
    exercises[currentExerciseIndex] || null
  )

  const handleComplete = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExercise(currentExerciseIndex + 1)
      setCurrentExerciseData(exercises[currentExerciseIndex + 1])
    } else {
      setIsComplete(true)
    }
  }, [currentExerciseIndex, exercises, setCurrentExercise])

  if (isComplete) {
    return <GameComplete totalExercises={exercises.length} onExit={onExit} onRestart={resetGame} />
  }

  if (!currentExercise) {
    return (
      <div className="text-center text-white/60">
        Mashqlar yuklanmoqda...
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <Button onClick={onExit} variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm">
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Chiqish</span>
          <span className="sm:hidden">Orqaga</span>
        </Button>

        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-lime-500/10 border border-lime-500/20 flex-shrink-0">
            <TrophyIcon className="w-4 h-4 sm:w-5 sm:h-5 text-lime-500" />
            <span className="text-lg sm:text-xl font-bold text-lime-500">{score}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex-shrink-0">
            <FireIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span className="text-lg sm:text-xl font-bold text-white">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 border border-white/20 flex-shrink-0">
            <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
            <span className="text-lg sm:text-xl font-bold text-white">
              {completedExercises}/{exercises.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="h-full gradient-lime"
        />
      </div>

      {/* Question card */}
      <Card variant="glass" className="overflow-hidden">
        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            <span className={cn(
              'px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
              currentExercise.difficulty === 'easy' && 'bg-lime-500/20 text-lime-500',
              currentExercise.difficulty === 'medium' && 'bg-yellow-500/20 text-yellow-500',
              currentExercise.difficulty === 'hard' && 'bg-red-500/20 text-red-500'
            )}>
              {currentExercise.difficulty === 'easy' && 'Oson'}
              {currentExercise.difficulty === 'medium' && "O'rta"}
              {currentExercise.difficulty === 'hard' && 'Qiyin'}
            </span>
            <span className="text-white/50 text-xs sm:text-sm font-medium">
              {currentExerciseIndex + 1}-savol
            </span>
            <span className="text-white/40 text-xs ml-auto flex-shrink-0">
              {currentExercise.section}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
            {currentExercise.question}
          </h2>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {!showExplanation ? (
              <motion.div
                key="exercise"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {currentExercise.type === 'sentence-builder' && (
                  <SentenceBuilder
                    exercise={currentExercise}
                    onComplete={handleComplete}
                  />
                )}
                {currentExercise.type === 'suffix-select' && (
                  <SuffixSelect
                    exercise={currentExercise}
                    onComplete={handleComplete}
                  />
                )}
                {currentExercise.type === 'fill-blank' && (
                  <FillBlank
                    exercise={currentExercise}
                    onComplete={handleComplete}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Feedback
                  exercise={currentExercise}
                  onContinue={handleComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

function GameComplete({
  totalExercises,
  onExit,
  onRestart
}: {
  totalExercises: number
  onExit: () => void
  onRestart: () => void
}) {
  const { score, streak } = useGame()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card variant="glass" className="p-6 sm:p-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full gradient-lime flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl shadow-lime-500/30"
        >
          <TrophyIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
          Tabriklaymiz!
        </h2>
        <p className="text-white/60 mb-6 sm:mb-10 text-base sm:text-lg px-4">
          Siz mashqni muvaffaqiyatli yakunladingiz
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-10">
          <div className="p-3 sm:p-6 rounded-2xl bg-gradient-to-br from-lime-500/10 to-transparent border border-lime-500/20">
            <TrophyIcon className="w-5 h-5 sm:w-8 sm:h-8 text-lime-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-white/50 text-xs sm:text-sm mb-1">Jami ball</p>
            <p className="text-2xl sm:text-4xl font-bold text-lime-500">{score}</p>
          </div>
          <div className="p-3 sm:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20">
            <AcademicCapIcon className="w-5 h-5 sm:w-8 sm:h-8 text-white/60 mx-auto mb-1 sm:mb-2" />
            <p className="text-white/50 text-xs sm:text-sm mb-1">Mashqlar</p>
            <p className="text-2xl sm:text-4xl font-bold text-white">{totalExercises}</p>
          </div>
          <div className="p-3 sm:p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
            <FireIcon className="w-5 h-5 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-white/50 text-xs sm:text-sm mb-1">Seriya</p>
            <p className="text-2xl sm:text-4xl font-bold text-orange-500">{streak}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onRestart} variant="lime" size="lg" className="shadow-xl shadow-lime-500/30 w-full sm:w-auto">
            Qayta boshlash
          </Button>
          <Button onClick={onExit} variant="ghost" size="lg" className="w-full sm:w-auto">
            Bosh sahifa
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
