
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { theme } from '../../theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: `bg-gradient-to-r from-${theme.colors.primary.main} to-${theme.colors.secondary.main} text-white hover:opacity-90 focus:ring-${theme.colors.primary.main}`,
    secondary: `bg-${theme.colors.secondary.light} text-${theme.colors.secondary.dark} hover:bg-${theme.colors.secondary.main} focus:ring-${theme.colors.secondary.main}`,
    outline: `border-2 border-${theme.colors.primary.main} text-${theme.colors.primary.main} hover:bg-${theme.colors.primary.main} hover:text-white focus:ring-${theme.colors.primary.main}`,
    ghost: `text-${theme.colors.gray[600]} hover:bg-${theme.colors.gray[100]} focus:ring-${theme.colors.gray[500]}`,
  };

  const sizes = {
    sm: `px-3 py-1.5 text-sm ${theme.spacing.text.sm}`,
    md: `px-4 py-2 text-base ${theme.spacing.text.base}`,
    lg: `px-6 py-3 text-lg ${theme.spacing.text.lg}`,
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};
