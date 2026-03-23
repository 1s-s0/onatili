import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'lime' | 'red' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl touch-target'

    const variants = {
      default: 'bg-white/20 hover:bg-white/30 text-white border border-white/20',
      lime: 'gradient-lime text-white shadow-lg shadow-lime-500/30 hover:shadow-xl hover:shadow-lime-500/40',
      red: 'gradient-red text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
      outline: 'border-2 border-lime-500 text-lime-500 hover:bg-lime-500/10',
      ghost: 'hover:bg-white/10 text-white'
    }

    const sizes = {
      sm: 'h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm gap-1.5',
      md: 'h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base gap-2',
      lg: 'h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg gap-2.5'
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
