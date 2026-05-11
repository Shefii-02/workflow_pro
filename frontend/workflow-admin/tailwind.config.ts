import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        'background-muted': 'var(--color-background-muted)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        border: 'var(--color-border)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary)',
          600: 'var(--color-primary-600)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(15, 23, 42, 0.06)',
        card: '0 18px 50px rgba(15, 23, 42, 0.08)',
        elevated: '0 26px 80px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config
