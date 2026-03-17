export const designTokens = {
  color: {
    primary: '#0F172A',
    onPrimary: '#FFFFFF',
    secondary: '#F1F5F9',
    onSecondary: '#0F172A',
    surface: '#FFFFFF',
    error: '#EF4444',
    success: '#10B981',
    outline: '#CBD5E1',
  },
  spacing: {
    sm: '0.25rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  font: {
    family: {
      base: '"Inter", sans-serif',
    },
    size: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    },
    weight: {
      regular: '400',
      medium: '500',
      bold: '700'
    }
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  }
} as const;

export type DesignTokens = typeof designTokens;
