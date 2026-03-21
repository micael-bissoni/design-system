// tailwind.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'brand-primary': 'var(--color-brand-primary)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'base-black': 'var(--color-base-black)',
        'base-gray-light': 'var(--color-base-gray-light)',
        'base-gray-medium': 'var(--color-base-gray-medium)',
        'base-gray-dark': 'var(--color-base-gray-dark)',
        'base-red': 'var(--color-base-red)',
        'base-green': 'var(--color-base-green)',
        'action-primary': 'var(--color-action-primary)',
        'action-secondary': 'var(--color-action-secondary)',
        'action-tertiary': 'var(--color-action-tertiary)',
        'font-base': 'var(--color-font-base)',
        'font-primary': 'var(--color-font-primary)',
        'font-secondary': 'var(--color-font-secondary)',
        'font-tertiary': 'var(--color-font-tertiary)',
      },
      fontFamily: {
        headers: 'var(--font-family-headers)',
        base: 'var(--font-family-base)',
      },
      fontSize: {
        sm: 'var(--size-font-small)',
        md: 'var(--size-font-medium)',
        lg: 'var(--size-font-large)',
        base: 'var(--size-font-base)',
      },
      borderRadius: {
        button: 'var(--button-border-radius)',
      }
    },
  },
};