import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon as BookOpenSolidIcon, AcademicCapIcon as AcademicCapSolidIcon } from '@heroicons/react/24/solid'

interface NavigationDockProps {
  mode: 'presentation' | 'game'
  onModeChange: (mode: 'presentation' | 'game') => void
}

export function NavigationDock({ mode, onModeChange }: NavigationDockProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 safe-bottom">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="glass-dark rounded-2xl px-1 sm:px-2 py-2 flex items-center gap-1 pointer-events-auto shadow-2xl shadow-black/50 touch-target"
      >
        <DockButton
          isActive={mode === 'presentation'}
          onClick={() => onModeChange('presentation')}
          icon={BookOpenIcon}
          activeIcon={BookOpenSolidIcon}
          label="Ta'lim"
        />
        <div className="w-px h-6 sm:h-8 bg-white/10 mx-1" />
        <DockButton
          isActive={mode === 'game'}
          onClick={() => onModeChange('game')}
          icon={AcademicCapIcon}
          activeIcon={AcademicCapSolidIcon}
          label="O'yin"
        />
      </motion.div>
    </div>
  )
}

interface DockButtonProps {
  isActive: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  activeIcon: React.ComponentType<{ className?: string }>
  label: string
}

function DockButton({ isActive, onClick, icon: Icon, activeIcon: ActiveIcon, label }: DockButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 touch-target',
        isActive
          ? 'bg-lime-500/20 text-lime-500'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 bg-lime-500/10 rounded-xl"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      <div className="relative z-10">
        {isActive ? (
          <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </div>
      <span className={cn(
        'text-xs mt-1 font-medium transition-all duration-300 whitespace-nowrap',
        isActive ? 'text-lime-500 opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}>
        {label}
      </span>
    </motion.button>
  )
}
