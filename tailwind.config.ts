/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Fondamentale per attivare la dark mode con la classe .dark
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'xmas-bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'xmas-text': 'rgb(var(--color-text) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}