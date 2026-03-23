import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/contexts/theme-provider'
import { GameProvider } from '@/contexts/game-context'
import { Sidebar } from '@/components/presentation/sidebar'
import { ContentSection } from '@/components/presentation/content-section'
import { GameMode } from '@/components/game/game-mode'
import { NavigationDock } from '@/components/navigation-dock'
import { sections } from '@/data/uzbek-verbs'
import { cn } from '@/lib/utils'
import { BookOpenIcon, Bars3Icon } from '@heroicons/react/24/outline'

type AppMode = 'presentation' | 'game'

function AppContent() {
  const [mode, setMode] = useState<AppMode>('presentation')
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSectionClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Update active section on scroll
  useEffect(() => {
    if (mode !== 'presentation') return

    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-lime-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Layout wrapper - flex container for sidebar + main */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Sidebar - always in DOM, visibility controlled */}
        <div className={cn(
          'flex-shrink-0 transition-all duration-500 ease-in-out',
          mode === 'presentation' ? 'w-0 opacity-100' : 'w-0 opacity-0 overflow-hidden'
        )}>
          <Sidebar
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main content - flex-1 ensures it fills remaining space */}
        <main className="flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">
            {mode === 'presentation' ? (
              <motion.div
                key="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16 pb-32"
              >
                {/* Mobile header with hamburger menu */}
                <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 safe-top">
                  <motion.button
                    onClick={() => setSidebarOpen(true)}
                    className="p-3 rounded-xl glass-dark text-white/80 hover:text-white touch-target"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bars3Icon className="w-6 h-6" />
                  </motion.button>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl gradient-lime flex items-center justify-center shadow-lg shadow-lime-500/30">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold text-sm">O'zbek Fe'li</span>
                  </div>
                  <div className="w-10" /> {/* Spacer for centering */}
                </div>

                {/* Content centered with max-width - this is the key fix */}
                <div className="w-full max-w-6xl mx-auto space-y-12 sm:space-y-16 pt-16 lg:pt-8">
                  {/* Hero section */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4 sm:space-y-6 pt-4 sm:pt-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl gradient-lime mb-4 shadow-2xl shadow-lime-500/30">
                      <BookOpenIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
                      O'zbek Fe'li
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto font-light px-4">
                      O'zbek tili grammatikasini chuqur o'rganing: fe'l yasovchi qo'shimchalar, zamon, mayl, nisbat va ko'makchi fe'llar
                    </p>
                  </motion.div>

                  {/* Sections */}
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ContentSection section={section} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full px-4 sm:px-6 py-8 pb-32 pt-20 lg:pt-8"
              >
                {/* Game content centered */}
                <div className="w-full max-w-4xl mx-auto">
                  <GameMode onExit={() => setMode('presentation')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Navigation Dock */}
      <NavigationDock mode={mode} onModeChange={setMode} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="uzbek-feli-theme">
      <GameProvider>
        <AppContent />
      </GameProvider>
    </ThemeProvider>
  )
}
