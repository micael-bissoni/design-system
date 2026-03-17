// tailwind.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        'on-secondary': 'var(--color-on-secondary)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        outline: 'var(--color-outline)',
        ml: {
            base: '#005A57',
            contrast: '#AFE108',
            foreground: '#EBECEC',
        },
      },
      spacing: {
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
      fontFamily: {
        base: 'var(--font-family-base)',
        sans: ['Barlow', 'sans-serif'],
      },
      fontSize: {
        sm: 'var(--font-size-sm)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        bold: 'var(--font-weight-bold)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      }
    },
  },
};