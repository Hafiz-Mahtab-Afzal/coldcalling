/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563EB', fg: '#FFFFFF', soft: '#3B82F6' },
        accent: { DEFAULT: '#059669', fg: '#FFFFFF' },
        surface: { DEFAULT: '#F8FAFC', card: '#FFFFFF', muted: '#F1F5FD' },
        ink: { DEFAULT: '#0F172A', muted: '#475569' },
        line: '#E4ECFC',
        danger: { DEFAULT: '#DC2626', fg: '#FFFFFF' },
      },
      fontFamily: {
        sans: ['Fira Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.06), 0 1px 3px 0 rgb(15 23 42 / 0.04)',
        pop: '0 8px 24px -8px rgb(15 23 42 / 0.18)',
      },
      borderRadius: { card: '10px' },
    },
  },
  plugins: [],
};
