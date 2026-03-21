// tailwind.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        action: {
          primary: 'var(--color-action-primary)',
          secondary: 'var(--color-action-secondary)',
          tertiary: 'var(--color-action-tertiary)',
        },
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
      },
    },
  },
};