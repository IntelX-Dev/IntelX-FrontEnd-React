
import React from 'react'
import { cn } from '@/lib/utils'

interface SpacingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  direction?: 'horizontal' | 'vertical' | 'all'
  className?: string
}

const spacingStyles = {
  xs: { horizontal: 'mx-1', vertical: 'my-1', all: 'm-1' },
  sm: { horizontal: 'mx-2', vertical: 'my-2', all: 'm-2' },
  md: { horizontal: 'mx-4', vertical: 'my-4', all: 'm-4' },
  lg: { horizontal: 'mx-6', vertical: 'my-6', all: 'm-6' },
  xl: { horizontal: 'mx-8', vertical: 'my-8', all: 'm-8' },
  '2xl': { horizontal: 'mx-12', vertical: 'my-12', all: 'm-12' }
}

export function Spacing({ size = 'md', direction = 'all', className }: SpacingProps) {
  return (
    <div className={cn(spacingStyles[size][direction], className)} />
  )
}
