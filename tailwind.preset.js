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
        xsmall: 'var(--size-font-xsmall)',
        small: 'var(--size-font-small)',
        md: 'var(--size-font-medium)',
        lg: 'var(--size-font-large)',
        xl: 'var(--size-font-xlarge)',
        '2xl': 'var(--size-font-2xlarge)',
        '3xl': 'var(--size-font-3xlarge)',
        '4xl': 'var(--size-font-4xlarge)',
        '5xl': 'var(--size-font-5xlarge)',
        '6xl': 'var(--size-font-6xlarge)',
        '7xl': 'var(--size-font-7xlarge)',
        '8xl': 'var(--size-font-8xlarge)',
        '9xl': 'var(--size-font-9xlarge)',
        '10xl': 'var(--size-font-10xlarge)',
        base: 'var(--size-font-base)',
      },
      borderRadius: {
        button: 'var(--button-border-radius)',
      },
    },
  },
};