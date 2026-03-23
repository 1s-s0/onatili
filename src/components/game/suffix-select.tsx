import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGame } from '@/contexts/game-context'
import { cn } from '@/lib/utils'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { GeneratedExercise } from '@/lib/exercise-generator'

interface SuffixSelectProps {
  exercise: GeneratedExercise
  onComplete: () => void
}

export function SuffixSelect({ exercise, onComplete }: SuffixSelectProps) {
  const { addScore, resetStreak, setIsCorrect, setShowExplanation } = useGame()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = useCallback((option: string) => {
    if (isSubmitted) return

    const correct = option === exercise.correctAnswer

    setSelectedOption(option)
    setIsCorrect(correct)
    setIsSubmitted(true)

    if (correct) {
      addScore(10)
    } else {
      resetStreak()
    }
    setShowExplanation(true)
  }, [isSubmitted, exercise.correctAnswer, addScore, resetStreak, setIsCorrect, setShowExplanation])

  const handleNext = useCallback(() => {
    onComplete()
  }, [onComplete])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Options */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {exercise.options.map((option, index) => {
          const isSelected = selectedOption === option
          const isCorrect = option === exercise.correctAnswer

          let buttonStyle = 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          let showIcon = null

          if (isSubmitted) {
            if (isCorrect) {
              buttonStyle = 'bg-gradient-to-r from-lime-500 to-lime-600 border-lime-500 text-white shadow-lg shadow-lime-500/30'
              showIcon = <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'bg-gradient-to-r from-red-500 to-red-600 border-red-500 text-white shadow-lg shadow-red-500/30'
              showIcon = <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            }
          }

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSubmit(option)}
              disabled={isSubmitted}
              className={cn(
                'p-4 sm:p-6 rounded-2xl border-2 font-semibold transition-all flex items-center justify-between group touch-target',
                buttonStyle,
                !isSubmitted && 'hover:scale-105 hover:shadow-xl',
                'text-sm sm:text-lg'
              )}
            >
              <span>{option}</span>
              {showIcon}
            </motion.button>
          )
        })}
      </div>

      {/* Next button */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleNext}
            variant="lime"
            size="lg"
            className="text-sm sm:text-base"
          >
            Keyingi
          </Button>
        </motion.div>
      )}
    </div>
  )
}

interface FillBlankProps {
  exercise: GeneratedExercise
  onComplete: () => void
}

export function FillBlank({ exercise, onComplete }: FillBlankProps) {
  const { addScore, resetStreak, setIsCorrect, setShowExplanation } = useGame()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = useCallback((option: string) => {
    if (isSubmitted) return

    const correct = option === exercise.correctAnswer

    setSelectedOption(option)
    setIsCorrect(correct)
    setIsSubmitted(true)

    if (correct) {
      addScore(10)
    } else {
      resetStreak()
    }
    setShowExplanation(true)
  }, [isSubmitted, exercise.correctAnswer, addScore, resetStreak, setIsCorrect, setShowExplanation])

  const handleNext = useCallback(() => {
    onComplete()
  }, [onComplete])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Question with blank */}
      <Card variant="glass">
        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
          <p className="text-base sm:text-lg lg:text-xl text-white text-center leading-relaxed">
            {exercise.question.split('___').map((part, index, arr) => (
              <span key={index}>
                {part}
                {index < arr.length - 1 && (
                  <span className="inline-block min-w-[100px] sm:min-w-[120px] border-b-2 border-lime-500/50 mx-1">
                    {selectedOption ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          'inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base',
                          isSubmitted
                            ? selectedOption === exercise.correctAnswer
                              ? 'gradient-lime text-white'
                              : 'gradient-red text-white'
                            : 'gradient-lime text-white'
                        )}
                      >
                        {selectedOption}
                      </motion.span>
                    ) : (
                      <span className="text-white/30 text-sm">___</span>
                    )}
                  </span>
                )}
              </span>
            ))}
          </p>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {exercise.options.map((option, index) => {
          const isSelected = selectedOption === option
          const isCorrect = option === exercise.correctAnswer

          let buttonStyle = 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          let showIcon = null

          if (isSubmitted) {
            if (isCorrect) {
              buttonStyle = 'bg-gradient-to-r from-lime-500 to-lime-600 border-lime-500 text-white shadow-lg shadow-lime-500/30'
              showIcon = <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'bg-gradient-to-r from-red-500 to-red-600 border-red-500 text-white shadow-lg shadow-red-500/30'
              showIcon = <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            }
          }

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSubmit(option)}
              disabled={isSubmitted}
              className={cn(
                'p-4 sm:p-6 rounded-2xl border-2 font-semibold transition-all flex items-center justify-between touch-target',
                buttonStyle,
                !isSubmitted && 'hover:scale-105 hover:shadow-xl',
                'text-sm sm:text-lg'
              )}
            >
              <span>{option}</span>
              {showIcon}
            </motion.button>
          )
        })}
      </div>

      {/* Next button */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleNext}
            variant="lime"
            size="lg"
            className="text-sm sm:text-base"
          >
            Keyingi
          </Button>
        </motion.div>
      )}
    </div>
  )
}
