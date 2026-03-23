import { affixes, conjugationTables, grammarRules, sections, verbTypes } from '@/data/uzbek-verbs'

export interface GeneratedExercise {
  id: string;
  type: 'suffix-select' | 'fill-blank' | 'sentence-builder';
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  section: string;
}

// Fisher-Yates shuffle algorithm - properly implemented
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[randomIndex]
    shuffled[randomIndex] = temp
  }
  return shuffled
}

// Helper to ensure correct answer is never always in first position
function createOptionsWithRandomizedCorrectAnswer(correctAnswer: string, distractors: string[]): string[] {
  // Remove duplicates from distractors
  const uniqueDistractors = [...new Set(distractors.filter(d => d !== correctAnswer))]
  
  // Take up to 3 distractors
  const selectedDistractors = shuffleArray(uniqueDistractors).slice(0, 3)
  
  // Create options array with correct answer
  const options = [correctAnswer, ...selectedDistractors]
  
  // Shuffle so correct answer is in random position
  return shuffleArray(options)
}

// Generate suffix selection questions from affixes
function generateSuffixQuestions(): GeneratedExercise[] {
  const exercises: GeneratedExercise[] = []
  const usedIds = new Set<string>()
  
  const nisbatAffixes = affixes.filter(a => a.category === 'nisbat')
  const zamonAffixes = affixes.filter(a => a.category === 'zamon')
  const maylAffixes = affixes.filter(a => a.category === 'mayl')
  
  // Nisbat questions
  nisbatAffixes.forEach((affix) => {
    if (usedIds.has(affix.id)) return
    usedIds.add(affix.id)
    
    const example = affix.examples[0]
    // Extract base form by removing the affix
    const affixForm = affix.form.replace(/-\(i\)/g, 'i').replace(/-\(a\)/g, 'a').replace('-', '')
    const baseForm = example.replace(affixForm, '')
    
    // Get distractors from other affixes
    const distractors = nisbatAffixes
      .filter(a => a.id !== affix.id)
      .map(a => a.form.replace(/-\(i\)/g, 'i').replace(/-\(a\)/g, 'a').replace('-', ''))
    
    exercises.push({
      id: `suffix-nisbat-${affix.id}`,
      type: 'suffix-select',
      question: `"${baseForm}___" - ${affix.name} uchun to'g'ri affiksni tanlang`,
      correctAnswer: affixForm,
      options: createOptionsWithRandomizedCorrectAnswer(affixForm, distractors),
      explanation: `${affix.name}: ${baseForm} + ${affixForm} = ${example}`,
      difficulty: 'medium',
      section: 'Nisbat shakllari'
    })
  })
  
  // Zamon questions
  zamonAffixes.forEach((affix) => {
    if (usedIds.has(affix.id)) return
    usedIds.add(affix.id)
    
    const verb = 'bor'
    const affixForm = affix.form.replace(/-\(i\)/g, 'i').replace(/-\(a\)/g, 'a').replace('-', '')
    const conjugated = `${verb}${affixForm}man`
    
    // Get distractors from other affixes
    const distractors = zamonAffixes
      .filter(a => a.id !== affix.id)
      .map(a => {
        const form = a.form.replace(/-\(i\)/g, 'i').replace(/-\(a\)/g, 'a').replace('-', '')
        return form + 'man'
      })
    
    exercises.push({
      id: `suffix-zamon-${affix.id}`,
      type: 'suffix-select',
      question: `"Men ${verb}___" - ${affix.name} uchun to'g'ri shaklni tanlang`,
      correctAnswer: affixForm + 'man',
      options: createOptionsWithRandomizedCorrectAnswer(affixForm + 'man', distractors),
      explanation: `${affix.name}: ${verb} + ${affixForm} + man = ${conjugated}`,
      difficulty: 'easy',
      section: 'Zamon shakllari'
    })
  })
  
  // Mayl questions
  maylAffixes.forEach((affix) => {
    if (usedIds.has(affix.id)) return
    usedIds.add(affix.id)
    
    const verb = 'kel'
    const affixForm = affix.form.replace(/-\(i\)/g, 'i').replace(/-\(a\)/g, 'a').replace('-', '')
    const conjugated = `${verb}${affixForm}`
    
    const distractors = maylAffixes
      .filter(a => a.id !== affix.id)
      .map(a => a.form.replace(/-\(i\)/g, 'i').replace(/-\(a\)/g, 'a').replace('-', ''))
    
    exercises.push({
      id: `suffix-mayl-${affix.id}`,
      type: 'suffix-select',
      question: `"${verb}___" - ${affix.name} uchun to'g'ri affiksni tanlang`,
      correctAnswer: affixForm,
      options: createOptionsWithRandomizedCorrectAnswer(affixForm, distractors),
      explanation: `${affix.name}: ${verb} + ${affixForm} = ${conjugated}`,
      difficulty: 'medium',
      section: 'Mayl shakllari'
    })
  })
  
  return exercises
}

// Generate fill-in-the-blank questions from conjugation tables
function generateFillBlankQuestions(): GeneratedExercise[] {
  const exercises: GeneratedExercise[] = []
  
  const persons = ['Men', 'Sen', 'U', 'Biz', 'Siz', 'Ular']
  const verbs = ['bormoq', 'kelmoq', 'oqimoq', 'yazmoq', 'ishlamoq']
  
  conjugationTables.forEach((table) => {
    const randomPersonIdx = Math.floor(Math.random() * persons.length)
    const person = persons[randomPersonIdx]
    const correctForm = table.examples[randomPersonIdx]?.form
    
    if (!correctForm) return
    
    const verb = verbs[Math.floor(Math.random() * verbs.length)]
    const verbBase = verb.replace('moq', '').replace('qimoq', 'q').replace('lmoq', 'l')
    
    // Extract suffix from correct form
    const suffix = correctForm.replace(verbBase, '')
    
    // Get distractors from other affixes in the table
    const distractors = table.affixes
      .map(a => a.replace(verbBase, ''))
      .filter(s => s !== suffix)
    
    exercises.push({
      id: `fill-${table.tense}-${person}-${verb}`,
      type: 'fill-blank',
      question: `"${person} ${verbBase}___" (${table.tense})`,
      correctAnswer: suffix,
      options: createOptionsWithRandomizedCorrectAnswer(suffix, distractors),
      explanation: `${table.tense}, ${person}: ${verbBase} + ${suffix} = ${correctForm}`,
      difficulty: 'medium',
      section: table.tense
    })
  })
  
  // Generate questions from grammar rules
  grammarRules.forEach((rule) => {
    const example = rule.examples[Math.floor(Math.random() * rule.examples.length)]
    const parts = example.split('=')
    
    if (parts.length === 2) {
      const result = parts[1].trim()
      const formula = parts[0].trim()
      
      // Create blank in formula
      const blanked = formula.replace(/\w+/g, (match) => {
        if (Math.random() > 0.5) return '___'
        return match
      })
      
      // Get distractors from other examples
      const distractors = rule.examples
        .map(e => e.split('=')[1]?.trim())
        .filter(r => r && r !== result)
      
      exercises.push({
        id: `fill-rule-${rule.id}-${example}`,
        type: 'fill-blank',
        question: `To'g'ri shaklni tanlang: ${blanked}`,
        correctAnswer: result,
        options: createOptionsWithRandomizedCorrectAnswer(result, distractors),
        explanation: rule.content,
        difficulty: 'hard',
        section: rule.title
      })
    }
  })
  
  return exercises
}

// Generate sentence builder questions
function generateSentenceQuestions(): GeneratedExercise[] {
  const exercises: GeneratedExercise[] = []
  
  const sentenceTemplates = [
    {
      base: "Men maktabga bordim",
      words: ["Men", "maktabga", "bordim"],
      explanation: "O'zbek tilida gap tartibi: Ega + To'ldiruvchi + Kesim"
    },
    {
      base: "U kitob oqiyapti",
      words: ["U", "kitob", "oqiyapti"],
      explanation: "Hozirgi zamon: oqi + yap + ti = oqiyapti"
    },
    {
      base: "Biz oqib chiqdik",
      words: ["Biz", "oqib", "chiqdik"],
      explanation: "Ko'makchi fe'lli konstruksiya: oqib (yetakchi) + chiqdik (ko'makchi)"
    },
    {
      base: "Ular yordam berdilar",
      words: ["Ular", "yordam", "berdilar"],
      explanation: "Qo'shma fe'l: yordam + berdilar"
    },
    {
      base: "Sen darsga kelding",
      words: ["Sen", "darsga", "kelding"],
      explanation: "O'tgan zamon, II shaxs: kel + di + ng = kelding"
    },
    {
      base: "Biz uyda yozamiz",
      words: ["Biz", "uyda", "yozamiz"],
      explanation: "Kelasi zamon, I shaxs ko'plik: yoz + a + miz = yozamiz"
    },
    {
      base: "U tez yugurdi",
      words: ["U", "tez", "yugurdi"],
      explanation: "Ravish + fe'l: tez (qanday?) + yugurdi"
    },
    {
      base: "Men bugun ishladim",
      words: ["Men", "bugun", "ishladim"],
      explanation: "O'tgan zamon: ishla + di + m = ishladim"
    },
    {
      base: "Siz ertaga borasiz",
      words: ["Siz", "ertaga", "borasiz"],
      explanation: "Kelasi zamon, II shaxs: bor + a + siz = borasiz"
    },
    {
      base: "Ular oqib otirdilar",
      words: ["Ular", "oqib", "otirdilar"],
      explanation: "Ko'makchi fe'l (davomlilik): oqib + otirdilar"
    },
    {
      base: "Men kecha keldim",
      words: ["Men", "kecha", "keldim"],
      explanation: "O'tgan zamon: kel + di + m = keldim"
    },
    {
      base: "Siz bugun kelyapsiz",
      words: ["Siz", "bugun", "kelyapsiz"],
      explanation: "Hozirgi zamon: kel + yap + siz = kelyapsiz"
    },
    {
      base: "Biz ertaga boramiz",
      words: ["Biz", "ertaga", "boramiz"],
      explanation: "Kelasi zamon: bor + a + miz = boramiz"
    },
    {
      base: "U doim o'qiydi",
      words: ["U", "doim", "o'qiydi"],
      explanation: "Hozirgi zamon: o'qi + y + di = o'qiydi"
    },
    {
      base: "Men sizni ko'rdim",
      words: ["Men", "sizni", "ko'rdim"],
      explanation: "O'tgan zamon: ko'r + di + m = ko'rdim"
    }
  ]
  
  // Add questions from sections content
  sections.forEach((section) => {
    section.subsections.forEach((subsection) => {
      subsection.content.forEach((block) => {
        if (block.type === 'list' && Array.isArray(block.content)) {
          block.content.forEach((item: string) => {
            if (item.includes('=')) {
              const parts = item.split('=')
              if (parts.length === 2) {
                const result = parts[1].trim()
                const words = result.split(' ').filter(w => w.length > 1)
                
                if (words.length >= 2) {
                  const distractors = ['emas', 'yoq', 'kerak', 'mumkin']

                  exercises.push({
                    id: `sentence-${section.id}-${subsection.id}-${words.join('-')}`,
                    type: 'sentence-builder',
                    question: `Quyidagi so'zlardan to'g'ri gap tuzing: "${words.join(' / ')}"`,
                    correctAnswer: result,
                    options: shuffleArray([...words, ...distractors]),
                    explanation: `${section.title}: ${item}`,
                    difficulty: 'medium',
                    section: section.title
                  })
                }
              }
            }
          })
        }
      })
    })
  })
  
  // Add template sentences with varied distractors
  const allDistractors = [
    'emas', 'yoq', 'kerak', 'mumkin', 'lozim',
    'bugun', 'ertaga', 'kecha', 'hozir',
    'uyga', 'ishga', 'maktabga', 'dostga',
    'men', 'sen', 'u', 'biz', 'siz', 'ular'
  ]
  
  sentenceTemplates.forEach((template, index) => {
    // Use different random distractors for each template
    const shuffledDistractors = shuffleArray(allDistractors)
    const randomDistractors = shuffledDistractors.slice(0, 3 + (index % 3))
    
    exercises.push({
      id: `sentence-template-${index}`,
      type: 'sentence-builder',
      question: `Quyidagi so'zlardan to'g'ri gap tuzing: "${template.words.join(' / ')}"`,
      correctAnswer: template.base,
      options: shuffleArray([...template.words, ...randomDistractors]),
      explanation: template.explanation,
      difficulty: index < 5 ? 'easy' : 'medium',
      section: 'Gap tuzilishi'
    })
  })
  
  return exercises
}

// Generate questions from verb types
function generateVerbTypeQuestions(): GeneratedExercise[] {
  const exercises: GeneratedExercise[] = []
  
  verbTypes.forEach((verbType) => {
    verbType.examples.forEach((example) => {
      const words = example.split(' ')
      if (words.length > 1) {
        // Get distractors from other verb types
        const distractors = verbTypes
          .filter(v => v.id !== verbType.id)
          .map(v => v.name)
        
        exercises.push({
          id: `verbtype-${verbType.id}-${example}`,
          type: 'fill-blank',
          question: `"${example}" - bu qaysi fe'l turiga kiradi?`,
          correctAnswer: verbType.name,
          options: createOptionsWithRandomizedCorrectAnswer(verbType.name, distractors),
          explanation: `${verbType.name}: ${verbType.description}. Misol: ${example}`,
          difficulty: 'medium',
          section: `Fe'l turlari (${verbType.name})`
        })
      }
    })
  })
  
  return exercises
}

// Main generator function
export function generateExercises(totalCount: number = 20): GeneratedExercise[] {
  const allExercises: GeneratedExercise[] = []
  
  // Generate from each category
  const suffixQuestions = generateSuffixQuestions()
  const fillBlankQuestions = generateFillBlankQuestions()
  const sentenceQuestions = generateSentenceQuestions()
  const verbTypeQuestions = generateVerbTypeQuestions()
  
  allExercises.push(...suffixQuestions, ...fillBlankQuestions, ...sentenceQuestions, ...verbTypeQuestions)
  
  // Remove duplicates by ID
  const uniqueExercises = Array.from(
    new Map(allExercises.map(e => [e.id, e])).values()
  )
  
  // Shuffle and return requested count
  const shuffled = shuffleArray(uniqueExercises)
  
  // Ensure correct answer is never always in first position
  return shuffled.slice(0, totalCount).map(exercise => ({
    ...exercise,
    options: shuffleArray([...new Set(exercise.options)]) // Remove duplicates and shuffle
  }))
}

// Session manager to prevent repeats
export class ExerciseSession {
  private usedIds: Set<string> = new Set()
  private availableExercises: GeneratedExercise[] = []
  
  constructor() {
    this.availableExercises = generateExercises(50) // Generate pool of 50
  }
  
  getNextExercise(): GeneratedExercise | null {
    const available = this.availableExercises.filter(e => !this.usedIds.has(e.id))
    
    if (available.length === 0) {
      // Regenerate if all used
      this.availableExercises = generateExercises(50)
      this.usedIds.clear()
      return this.getNextExercise()
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const exercise = available[randomIndex]
    this.usedIds.add(exercise.id)
    
    return exercise
  }
  
  reset(): void {
    this.usedIds.clear()
    this.availableExercises = generateExercises(50)
  }
  
  getProgress(): { used: number; remaining: number } {
    return {
      used: this.usedIds.size,
      remaining: this.availableExercises.length - this.usedIds.size
    }
  }
}
