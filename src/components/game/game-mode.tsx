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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onExit} variant="ghost" size="sm" className="gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          Chiqish
        </Button>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500/10 border border-lime-500/20">
            <TrophyIcon className="w-5 h-5 text-lime-500" />
            <span className="text-xl font-bold text-lime-500">{score}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <FireIcon className="w-5 h-5 text-orange-500" />
            <span className="text-xl font-bold text-white">{streak}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
            <AcademicCapIcon className="w-5 h-5 text-white/60" />
            <span className="text-xl font-bold text-white">
              {completedExercises}/{exercises.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="h-full gradient-lime"
        />
      </div>

      {/* Question card */}
      <Card variant="glass" className="overflow-hidden">
        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
          <div className="flex items-center gap-3 mb-3">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
              currentExercise.difficulty === 'easy' && 'bg-lime-500/20 text-lime-500',
              currentExercise.difficulty === 'medium' && 'bg-yellow-500/20 text-yellow-500',
              currentExercise.difficulty === 'hard' && 'bg-red-500/20 text-red-500'
            )}>
              {currentExercise.difficulty === 'easy' && 'Oson'}
              {currentExercise.difficulty === 'medium' && "O'rta"}
              {currentExercise.difficulty === 'hard' && 'Qiyin'}
            </span>
            <span className="text-white/50 text-sm font-medium">
              {currentExerciseIndex + 1}-savol
            </span>
            <span className="text-white/40 text-xs ml-auto">
              {currentExercise.section}
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
            {currentExercise.question}
          </h2>
        </CardHeader>
        <CardContent className="pt-6">
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
      <Card variant="glass" className="p-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-24 h-24 rounded-full gradient-lime flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-lime-500/30"
        >
          <TrophyIcon className="w-12 h-12 text-white" />
        </motion.div>
        
        <h2 className="text-4xl font-bold text-white mb-3">
          Tabriklaymiz!
        </h2>
        <p className="text-white/60 mb-10 text-lg">
          Siz mashqni muvaffaqiyatli yakunladingiz
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-lime-500/10 to-transparent border border-lime-500/20">
            <TrophyIcon className="w-8 h-8 text-lime-500 mx-auto mb-2" />
            <p className="text-white/50 text-sm mb-1">Jami ball</p>
            <p className="text-4xl font-bold text-lime-500">{score}</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20">
            <AcademicCapIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
            <p className="text-white/50 text-sm mb-1">Mashqlar</p>
            <p className="text-4xl font-bold text-white">{totalExercises}</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
            <FireIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-white/50 text-sm mb-1">Eng uzun seriya</p>
            <p className="text-4xl font-bold text-orange-500">{streak}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onRestart} variant="lime" size="lg" className="shadow-xl shadow-lime-500/30">
            Qayta boshlash
          </Button>
          <Button onClick={onExit} variant="ghost" size="lg">
            Bosh sahifa
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
