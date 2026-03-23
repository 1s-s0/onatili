import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGame } from '@/contexts/game-context'
import { cn } from '@/lib/utils'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import type { GeneratedExercise } from '@/lib/exercise-generator'

interface SentenceBuilderProps {
  exercise: GeneratedExercise
  onComplete: () => void
}

export function SentenceBuilder({ exercise, onComplete }: SentenceBuilderProps) {
  const { addScore, resetStreak, setIsCorrect, setShowExplanation } = useGame()
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>(exercise.options)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleWordClick = useCallback((word: string) => {
    if (isSubmitted) return
    
    setSelectedWords(prev => [...prev, word])
    setAvailableWords(prev => {
      const index = prev.indexOf(word)
      if (index === -1) return prev
      const newWords = [...prev]
      newWords.splice(index, 1)
      return newWords
    })
  }, [isSubmitted])

  const handleRemoveWord = useCallback((index: number) => {
    if (isSubmitted) return
    
    const wordToRemove = selectedWords[index]
    setSelectedWords(prev => prev.filter((_, i) => i !== index))
    setAvailableWords(prev => [...prev, wordToRemove])
  }, [isSubmitted])

  const handleSubmit = useCallback(() => {
    const answer = selectedWords.join(' ')
    const correct = answer === exercise.correctAnswer
    
    setIsCorrect(correct)
    setIsSubmitted(true)
    
    if (correct) {
      addScore(10)
    } else {
      resetStreak()
    }
    setShowExplanation(true)
  }, [selectedWords, exercise.correctAnswer, addScore, resetStreak, setIsCorrect, setShowExplanation])

  const handleReset = useCallback(() => {
    setSelectedWords([])
    setAvailableWords(exercise.options)
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowExplanation(false)
  }, [exercise.options, setIsCorrect, setShowExplanation])

  const handleNext = useCallback(() => {
    onComplete()
  }, [onComplete])

  return (
    <div className="space-y-6">
      {/* Answer area */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg text-white/80 flex items-center gap-2">
            <span className="w-1 h-6 gradient-lime rounded-full" />
            Javobingiz:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[80px] p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedWords.map((word, index) => (
                <motion.button
                  key={`${word}-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => handleRemoveWord(index)}
                  disabled={isSubmitted}
                  className={cn(
                    'px-4 py-2.5 rounded-xl font-medium transition-all',
                    isSubmitted
                      ? 'bg-lime-500/20 text-lime-500 border border-lime-500/30 cursor-default'
                      : 'bg-white/20 text-white hover:bg-red-500/50 border border-white/10 cursor-pointer'
                  )}
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
            {selectedWords.length === 0 && (
              <p className="text-white/40 italic flex items-center gap-2">
                <ArrowPathIcon className="w-4 h-4" />
                So'zlarni tanlang...
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Word options */}
      <div className="flex flex-wrap gap-3 justify-center">
        {availableWords.map((word, index) => (
          <motion.button
            key={`${word}-${index}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => handleWordClick(word)}
            disabled={isSubmitted}
            className={cn(
              'px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg',
              'bg-gradient-to-r from-lime-500 to-lime-600 text-white',
              'hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105',
              isSubmitted && 'opacity-50 cursor-not-allowed'
            )}
          >
            {word}
          </motion.button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-center">
        {!isSubmitted ? (
          <>
            <Button
              onClick={handleReset}
              variant="ghost"
              size="lg"
              className="gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Tozalash
            </Button>
            <Button
              onClick={handleSubmit}
              variant="lime"
              size="lg"
              disabled={selectedWords.length === 0}
              className="gap-2"
            >
              <CheckIcon className="w-5 h-5" />
              Tekshirish
            </Button>
          </>
        ) : (
          <Button
            onClick={handleNext}
            variant="lime"
            size="lg"
          >
            Keyingi
          </Button>
        )}
      </div>
    </div>
  )
}
