
import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'
  className?: string
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

const variantStyles = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs text-muted-foreground'
}

export function Typography({ 
  variant = 'body1', 
  className, 
  children, 
  as 
}: TypographyProps) {
  const Component = as || (variant.startsWith('h') ? variant : 'p')
  
  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  )
}
