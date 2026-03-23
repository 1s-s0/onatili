import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Section } from '@/data/uzbek-verbs'
import {
  SparklesIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  ClockIcon,
  TagIcon,
  HandRaisedIcon,
  DocumentTextIcon,
  MapPinIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import {
  SparklesIcon as SparklesSolidIcon,
  Squares2X2Icon as Squares2X2SolidIcon,
  ArrowPathIcon as ArrowPathSolidIcon,
  ClockIcon as ClockSolidIcon,
  TagIcon as TagSolidIcon,
  HandRaisedIcon as HandRaisedSolidIcon,
  DocumentTextIcon as DocumentTextSolidIcon,
  MapPinIcon as MapPinSolidIcon,
  XCircleIcon as XCircleSolidIcon
} from '@heroicons/react/24/solid'

interface SidebarProps {
  sections: Section[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  isOpen: boolean
  onClose: () => void
}

const iconMap: Record<string, { outline: React.ComponentType<{ className?: string }>; solid: React.ComponentType<{ className?: string }> }> = {
  '📚': { outline: SparklesIcon, solid: SparklesSolidIcon },
  '🏗️': { outline: Squares2X2Icon, solid: Squares2X2SolidIcon },
  '🔄': { outline: ArrowPathIcon, solid: ArrowPathSolidIcon },
  '⏰': { outline: ClockIcon, solid: ClockSolidIcon },
  '🎯': { outline: TagIcon, solid: TagSolidIcon },
  '🤝': { outline: HandRaisedIcon, solid: HandRaisedSolidIcon },
  '📝': { outline: DocumentTextIcon, solid: DocumentTextSolidIcon },
  '📍': { outline: MapPinIcon, solid: MapPinSolidIcon },
  '❌': { outline: XCircleIcon, solid: XCircleSolidIcon }
}

export function Sidebar({ sections, activeSection, onSectionClick, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 h-full w-72 glass-dark z-50 overflow-y-auto border-r border-white/10',
          'lg:translate-x-0 lg:static lg:z-0 lg:opacity-100'
        )}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-lime flex items-center justify-center shadow-lg shadow-lime-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">O'zbek Fe'li</h1>
              <p className="text-xs text-white/50">Grammatika</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {sections.map((section) => {
              const Icons = iconMap[section.icon] || iconMap['📚']
              const isActive = activeSection === section.id
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    onSectionClick(section.id)
                    onClose()
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
                    isActive
                      ? 'bg-lime-500/15 text-lime-500 border border-lime-500/20'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive ? (
                    <Icons.solid className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <Icons.outline className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="font-medium text-sm">{section.title}</span>
                </motion.button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              O'zbek tili o'rganish uchun
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
