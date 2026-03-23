import { createContext, useContext, useState, useCallback } from 'react'
import { ExerciseSession, type GeneratedExercise } from '@/lib/exercise-generator'

interface GameState {
  score: number
  streak: number
  currentExerciseIndex: number
  completedExercises: number
  isCorrect: boolean | null
  showExplanation: boolean
  selectedAnswer: string | null
  exercises: GeneratedExercise[]
  usedExerciseIds: Set<string>
}

interface GameContextType extends GameState {
  addScore: (points: number) => void
  resetStreak: () => void
  setCurrentExercise: (index: number) => void
  markComplete: () => void
  setIsCorrect: (correct: boolean) => void
  setShowExplanation: (show: boolean) => void
  setSelectedAnswer: (answer: string | null) => void
  resetGame: () => void
  getNextExercise: () => GeneratedExercise | null
  getCurrentExercise: () => GeneratedExercise | undefined
}

const initialState: GameState = {
  score: 0,
  streak: 0,
  currentExerciseIndex: 0,
  completedExercises: 0,
  isCorrect: null,
  showExplanation: false,
  selectedAnswer: null,
  exercises: [],
  usedExerciseIds: new Set()
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(initialState)
  const sessionRef = useState<ExerciseSession>(new ExerciseSession())[0]

  const initializeExercises = useCallback(() => {
    const exercises: GeneratedExercise[] = []
    for (let i = 0; i < 20; i++) {
      const exercise = sessionRef.getNextExercise()
      if (exercise) exercises.push(exercise)
    }
    return exercises
  }, [sessionRef])

  const addScore = useCallback((points: number) => {
    setState(prev => ({
      ...prev,
      score: prev.score + points,
      streak: prev.streak + 1,
      isCorrect: true
    }))
  }, [])

  const resetStreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      streak: 0,
      isCorrect: false
    }))
  }, [])

  const setCurrentExercise = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentExerciseIndex: index,
      selectedAnswer: null,
      isCorrect: null,
      showExplanation: false
    }))
  }, [])

  const markComplete = useCallback(() => {
    setState(prev => ({
      ...prev,
      completedExercises: prev.completedExercises + 1,
      currentExerciseIndex: prev.currentExerciseIndex + 1
    }))
  }, [])

  const setIsCorrect = useCallback((correct: boolean) => {
    setState(prev => ({ ...prev, isCorrect: correct }))
  }, [])

  const setShowExplanation = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showExplanation: show }))
  }, [])

  const setSelectedAnswer = useCallback((answer: string | null) => {
    setState(prev => ({ ...prev, selectedAnswer: answer }))
  }, [])

  const resetGame = useCallback(() => {
    sessionRef.reset()
    setState({
      ...initialState,
      exercises: initializeExercises()
    })
  }, [sessionRef, initializeExercises])

  const getNextExercise = useCallback(() => {
    return sessionRef.getNextExercise()
  }, [sessionRef])

  const getCurrentExercise = useCallback(() => {
    return state.exercises[state.currentExerciseIndex]
  }, [state.exercises, state.currentExerciseIndex])

  // Initialize exercises on mount
  const exercises = state.exercises.length === 0 ? initializeExercises() : state.exercises
  if (state.exercises.length === 0) {
    setState(prev => ({ ...prev, exercises }))
  }

  return (
    <GameContext.Provider value={{
      ...state,
      exercises,
      addScore,
      resetStreak,
      setCurrentExercise,
      markComplete,
      setIsCorrect,
      setShowExplanation,
      setSelectedAnswer,
      resetGame,
      getNextExercise,
      getCurrentExercise
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
