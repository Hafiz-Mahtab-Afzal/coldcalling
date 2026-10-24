const token = (name) => ({ opacityValue }) =>
  opacityValue === undefined ? `rgb(var(${name}))` : `rgb(var(${name}) / ${opacityValue})`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: token('--shell'),
        bg: token('--bg'),
        card: token('--card'),
        'card-2': token('--card-2'),
        ink: { DEFAULT: token('--ink'), muted: token('--ink-muted'), faint: token('--ink-faint') },
        line: { DEFAULT: token('--line'), strong: token('--line-strong') },
        accent: { DEFAULT: token('--accent'), ink: token('--accent-ink'), soft: token('--accent-soft') },
        ok: { DEFAULT: token('--ok'), soft: token('--ok-soft'), ink: token('--ok-ink') },
        warn: { DEFAULT: token('--warn'), soft: token('--warn-soft'), ink: token('--warn-ink') },
        bad: { DEFAULT: token('--bad'), soft: token('--bad-soft'), ink: token('--bad-ink') },
        info: { DEFAULT: token('--info'), soft: token('--info-soft'), ink: token('--info-ink') },
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      borderRadius: {
        card: '18px',
        tile: '22px',
        pill: '999px',
      },
      transitionDuration: { 180: '180ms' },
    },
  },
  plugins: [],
};
