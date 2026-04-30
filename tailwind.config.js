/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Martel Sans"', 'Quicksand', '"Noto Serif SC"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
      },
      fontSize: {
        'fluid-2xs': 'clamp(0.5625rem, 0.52rem + 0.15vw, 0.6875rem)',
        'fluid-xs': 'clamp(0.625rem, 0.56rem + 0.22vw, 0.8125rem)',
        'fluid-sm': 'clamp(0.75rem, 0.69rem + 0.2vw, 0.875rem)',
        'fluid-base': 'clamp(0.8125rem, 0.74rem + 0.26vw, 0.9375rem)',
        'fluid-md': 'clamp(0.875rem, 0.8rem + 0.28vw, 1rem)',
        'fluid-lg': 'clamp(0.9375rem, 0.82rem + 0.42vw, 1.125rem)',
        'fluid-xl': 'clamp(1.0625rem, 0.9rem + 0.58vw, 1.375rem)',
        'fluid-2xl': 'clamp(1.25rem, 1rem + 0.9vw, 1.75rem)',
        'fluid-3xl': 'clamp(1.5rem, 1.08rem + 1.45vw, 2.25rem)',
        'fluid-4xl': 'clamp(1.75rem, 1.2rem + 2vw, 3.25rem)',
        'fluid-5xl': 'clamp(2rem, 1.2rem + 2.8vw, 4.25rem)',
        'fluid-hero': 'clamp(2.375rem, 1.3rem + 3.8vw, 4.75rem)',
        'fluid-display': 'clamp(4.5rem, 2.9rem + 5.4vw, 7.5rem)',
      },
      screens: {
        hero: '920px',
        wide: '1800px',
      },
    },
  },
  plugins: [],
}
