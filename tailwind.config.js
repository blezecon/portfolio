/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Define simplified color scheme without nested objects
        'primary': '#3b82f6',
        'primary-light': '#60a5fa',
        'primary-dark': '#1d4ed8',
        'secondary': '#ec4899',
        'secondary-light': '#f472b6',
        'secondary-dark': '#db2777',
        'light': '#f9fafb',
        'light-dark': '#f3f4f6', 
        'dark': '#111827',
        'dark-light': '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}