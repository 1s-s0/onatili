import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { useGame } from '@/contexts/game-context'
import { cn } from '@/lib/utils'
import { CheckIcon, XMarkIcon, FireIcon } from '@heroicons/react/24/solid'
import type { GeneratedExercise } from '@/lib/exercise-generator'

interface FeedbackProps {
  exercise: GeneratedExercise
  onContinue: () => void
}

export function Feedback({ exercise, onContinue }: FeedbackProps) {
  const { isCorrect, streak, score } = useGame()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isCorrect && canvasRef.current) {
      confetti({
        origin: {
          x: 0.5,
          y: 0.5
        },
        spread: 100,
        particleCount: 100,
        colors: ['#A8E63D', '#E63D3D', '#FFFFFF'],
        disableForReducedMotion: true
      })
    }
  }, [isCorrect])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />
      
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={cn(
              'p-8 rounded-3xl border-2',
              isCorrect
                ? 'bg-gradient-to-br from-lime-500/20 to-lime-500/5 border-lime-500/50'
                : 'bg-gradient-to-br from-red-500/20 to-red-500/5 border-red-500/50'
            )}
          >
            {/* Result header */}
            <div className="flex items-center gap-5 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center shadow-2xl',
                  isCorrect 
                    ? 'bg-gradient-to-br from-lime-500 to-lime-600 shadow-lime-500/30' 
                    : 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30'
                )}
              >
                {isCorrect ? (
                  <CheckIcon className="w-10 h-10 text-white" />
                ) : (
                  <XMarkIcon className="w-10 h-10 text-white" />
                )}
              </motion.div>
              <div className="flex-1">
                <h3 className={cn(
                  'text-3xl font-bold',
                  isCorrect ? 'text-lime-500' : 'text-red-500'
                )}>
                  {isCorrect ? "To'g'ri!" : "Noto'g'ri"}
                </h3>
                {isCorrect && streak > 1 && (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white/60 flex items-center gap-2 mt-1"
                  >
                    <FireIcon className="w-5 h-5 text-orange-500" />
                    {streak} ketma-ket to'g'ri javob!
                  </motion.p>
                )}
              </div>
            </div>

            {/* Correct answer */}
            {!isCorrect && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-white/50 text-sm mb-2">To'g'ri javob:</p>
                <p className="text-lime-500 font-semibold text-xl">
                  {exercise.correctAnswer}
                </p>
              </motion.div>
            )}

            {/* Explanation */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <p className="text-white/50 text-sm mb-2 font-medium">Izoh:</p>
              <p className="text-white/80 leading-relaxed">{exercise.explanation}</p>
            </div>

            {/* Score */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Ball</p>
                  <p className="text-3xl font-bold gradient-lime bg-clip-text text-transparent">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Seriya</p>
                  <div className="flex items-center gap-2">
                    <FireIcon className="w-6 h-6 text-orange-500" />
                    <p className="text-3xl font-bold text-white">{streak}</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={onContinue}
                variant="lime"
                size="lg"
                className="shadow-xl shadow-lime-500/30"
              >
                Davom etish
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
